const express = require("express")
const logger = require("ot-logger")
const datahelper = require("../helpers/DataReadHelpers")
const _ = require("lodash")

const router = new express.Router()
// const development = process.env.NODE_ENV !== "production"

// force datahelper and values to be cached before routes can be serviced
datahelper.init("./server/mocks/waitlistService/").then((cache) => {
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
    can filter cached data based on the given request body
    currently restaurant id, and timestamp within range
  */
  router.get("/estimates", (req, res) => {
    const filters = req.query
    console.log(filters)
    const partySizes = _.map(filters.party_sizes, (party) => parseInt(party, 10))
    const filtered = _(cache.averages)
      .filter((datum) => _(partySizes).includes(datum.party_size))
      .filter((datum) => (
        datum.timestamp >= parseInt(filters.startstamp, 10)
          && datum.timestamp < parseInt(filters.endstamp, 10)
      ))
      .value()
    res.json(filtered)
  })

  router.get("/overquoted", (req, res) => {
    logger.info("received request to /overquoted")
    res.json(cache.overquotes)
  })
})
module.exports = router
