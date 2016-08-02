const express = require("express")
const router = new express.Router()
const logger = require("ot-logger")
const datahelper = require("../helpers/DataReadHelpers")
const request = require("request")
// const development = process.env.NODE_ENV !== "production"

router.get("/", (req, res) => {
  logger.info("received request to /")
  res.render("index")
})

router.get("/favicon.ico", (req, res) => {
  logger.info("received request to /favicon.ico")
  res.send()
})

router.get("/health", (req, res) => {
  logger.info("received request to /health")
  res.send({ healthy: true })
})

/*
  can filter based on the given request body
  currently restaurant id, and timestamp within range
*/
router.get("/estimates", (req, res) => {
  const filters = req.query
  if (filters.party_sizes) {
    const partySizes = []
    for (let i = 0; i < filters.party_sizes.length; i++) {
      partySizes.push(parseInt(filters.party_sizes[i], 10))
    }
    return datahelper
      .granularizeLevel("./server/mocks/waitlistService/singleRid.json",
                        "utf8", filters.restaurant_id,
                        filters.startstamp, filters.endstamp,
                        filters.level, partySizes)
      .then(data => {
        res.json(data)
      })
  }
  return datahelper
    .granularizeLevel("./server/mocks/waitlistService/singleRid.json",
                      "utf8", filters.restaurant_id,
                      filters.startstamp, filters.endstamp,
                      filters.level)
    .then(data => {
      res.json(data)
    })
})

router.get("/overquoted", (req, res) => (
  datahelper.getOverQuoted("./server/mocks/waitlistService/singleRid.json",
    "utf8")
    .then((num) => res.json(num * 100))
))

router.get("/graphql", (req, res) => (
  request("http://localhost:8000/graphql?query={pointsBetween(startDate:\"2016-02-20T00:00:00Z\"endDate:\"2016-03-20T12:00:00Z\"){ timestamp restaurant_id party_size quoted actual availability estimated}}",
  (error, response, body) => {
    console.log("sending query")
    if (response.statusCode === 200) {
      res.send(body)
    } else {
      console.log(error)
      console.log(response.statusCode)
      res.send(response.statusCode)
    }
  })
))

router.get("/rId/:rId/startstamp/:startstamp/endstamp/:endstamp", (req, res) => {
  logger.info("received request to /health")
  res.send(req.params)
})

module.exports = router
