import test from "ava"
import request from "superagent-es6-promise"

test("get /", t => {
  request.get("/")
    .then( (res) => {
      t.is(res.status, 200)
      t.pass()
    })
    .catch( (error) => {
      t.fail()
    })
})

test("get /health", t=> {
  request.get("/health")
    .then( (res) => {
      t.is(res.health, true)
      t.pass()
    })
    .catch( (error) => {
      t.fail()
    })
})
