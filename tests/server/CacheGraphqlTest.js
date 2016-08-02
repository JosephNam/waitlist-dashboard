import { Cache } from "../../server/models/cache"
const moment = require("moment")
const rp = require("request-promise")
const promise = require("bluebird")
const _ = require("lodash")

const cache = new Cache()
function fetchDatafromCache() {
  // example for fetch data
  const result = cache.get(moment("2016-04-01T00:00:00Z").utc(), moment("2016-04-02T23:59:59Z").utc(), 5580)
}

// testGraphqlinSmallerTimeRange
function graphqlSevenDaysQuery(start) {
  const startDate = moment(start).utc().startOf("day")
  .format()
  const endDate = moment(start).utc().add(6, "day")
  .endOf("day")
  .format()
  console.log("start date: ", startDate)
  console.log("end date: ", endDate)
  const q = "http://waitlist-estimator.pp-uswest2.otenv.com/graphql?query={pointsBetween(startDate:\"" + startDate + "\" endDate:\"" + endDate + "\"){ timestamp restaurant_id type state party_size quoted actual availability estimated}}"
  return rp(q)
}

function graphqlTimeRangeQuery(start, end) {
  let currentDate = moment(start).utc()
  const rpList = []
  while (moment(currentDate).utc().isSameOrBefore(end, "day")) {
    rpList.push(graphqlSevenDaysQuery(currentDate))
    currentDate = moment(currentDate).utc().add(7, "day")
  }
  promise.all(rpList)
    .spread((...bodys) => {
      // All requests succeeded.
      let result = []
      bodys.forEach((body) => {
        console.log("Get success response")
        const json = JSON.parse(body)
        console.log(json.data.pointsBetween.length, "reservations")
        cache.set(json.data.pointsBetween)
        result = _.union(result, json.data.pointsBetween)
      })
      console.log("result length: ", result.length)
      // fetchDatafromCache()
      return result
    })
    .catch((err) => {
        // At least one request failed.
      console.log(err)
      return null
    })
}


const s = "2016-04-01T00:00:00Z"
const e = "2016-04-5T00:00:00Z"

graphqlTimeRangeQuery(s, e)
