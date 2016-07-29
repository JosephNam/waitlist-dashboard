const express = require("express")
const router = new express.Router()
const logger = require("ot-logger")
const datahelper = require("../helpers/DataReadHelpers")
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
module.exports = router
