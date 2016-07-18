const express = require("express")
const router = new express.Router()
const logger = require('ot-logger')
var fs = require('fs');
var development = process.env.NODE_ENV !== 'production';


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

router.get("/mock", (req, res) => {
  logger.info('received request to /')
  if(development){
  	const mockdata = fs.readFileSync("./dev/data/data.json", 'utf8')
  	//console.log(mockdata);
  	res.json(mockdata)
  } else{
  	  res.render("index")
  	}
})

module.exports = router
