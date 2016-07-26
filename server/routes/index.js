const express = require("express")
const router = new express.Router()
const logger = require("ot-logger")
const GRANULARITY_LEVEL = require("../helpers/GranularityLevels")
const granularizeLevel = require("../helpers/DataReadHelpers")
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
  /* TODO: partial filtering */
  if (Object.keys(filters).length === 0 && filters.constructor === Object) {
    logger.info("received request to /estimates with no filters")
    return granularizeLevel("./server/mocks/waitlistService/singleRid.json",
      "utf8", GRANULARITY_LEVEL.DAY)
      .then((data) => res.json(data))
  }
  return granularizeLevel("./server/mocks/waitlistService/singleRid.json", "utf8")
    .then((json) => (
      json.filter((datum) => (
        datum.restaurant_id ===
          filters.restaurant_id * 1 &&
          datum.timestamp > filters.startstamp * 1 &&
          datum.timestamp < filters.endstamp * 1
      ))
    ))
    .then(data => {
      res.json(data)
    })
})

module.exports = router
