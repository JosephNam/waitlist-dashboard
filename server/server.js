const express = require("express")
const path = require("path")
// const favicon = require("serve-favicon")
const logger = require("ot-logger")
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser")
const routes = require("./routes/index")
// const users = require("./routes/users")

//logger.init()
// using let
const app = express()

app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")

//app.use(logger.middleware)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

// app.use(express.static(("#{__dirname}/app")))
app.use(express.static("client"))

app.use("/", routes)
// app.use("/users", users)

// using arrow syntax
app.use((req, res, next) => {
  const err = new Error("Not Found")
  err.status = 404
  next(err)
})

if (app.get("env") === "development") {
  app.use((err, req, res) => {
    res.status(err.status || 500)
    res.render("error", {
      message: err.message,
      error: err
    })
  })
}

app.use((err, req, res) => {
  res.status(err.status || 500)
  res.render("error", {
    message: err.message,
    error: {}
  })
})

module.exports = app
