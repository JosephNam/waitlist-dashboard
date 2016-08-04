const express = require("express")
const logger = require("ot-logger")
const datahelper = require("../helpers/DataReadHelpers")
const _ = require("lodash")

const router = new express.Router()
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
    const partySizes = _.map(filters.party_sizes, (party) => parseInt(party, 10))
    return datahelper
      .processDateRange("./server/mocks/waitlistService/",
          filters.restaurantID, filters.startstamp, filters.endstamp, filters.level, partySizes)
      .then((data) => {
        console.log("sending data to client")
        res.json(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  return datahelper
    .processDateRange("./server/mocks/waitlistService/",
        filters.restaurantID, filters.startstamp, filters.endstamp, filters.level)
    .then((data) => {
      console.log("sending data to client", data)
      res.json(data)
    })
    .catch((err) => {
      console.log(err)
    })
})

router.get("/overquoted", (req, res) => {
  logger.info("received request to /overquoted")
  return datahelper
    .getOverQuoted("./server/mocks/waitlistService/someData.json", "utf8")
    .then((num) => res.json(num * 100))
})

module.exports = router
