const express = require("express")
const router = new express.Router()
const logger = require("ot-logger")
const fs = require("fs")
const development = process.env.NODE_ENV !== "production"

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

router.get("/estimates", (req, res) => {
  logger.info("received request to /mock")
  if (development) {
    const mockData = JSON.parse(
      fs.readFileSync("./server/mocks/waitlistService/singleRid.json", "utf8"))
    res.setHeader("Content-Type", "application/json")
    res.json(mockData)
  } else {
    res.render("index")
  }
})

module.exports = router
