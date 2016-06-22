const express = require("express")
const router = new express.Router()

router.get("/", (req, res) => {
  res.render("index")
})

router.get("/expiremental", (req, res) => {
  res.render("expiremental")
})

router.get("/favicon.ico", (req, res) => {
  res.send()
})

module.exports = router
