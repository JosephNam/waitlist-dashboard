const express = require("express")
const router = new express.Router()
const logger = require('ot-logger')

router.get("/", (req, res) => {
  logger.info('received request to /')
  res.render("index")
})

router.get("/favicon.ico", (req, res) => {
  logger.info('received request to /favicon.ico')
  res.send()
})

router.get("/health", (req, res) => {
  logger.info('received request to /health')
  res.send({ healthy: true })
})

module.exports = router
