const GRANULARITY_LEVEL = require("./GranularityLevels")
const isSameTimeFrame = require("./TimeHelpers")
const fs = require("fs")
const _ = require("lodash")

function readFile(file, enc) {
  return new Promise((fulfill, reject) => {
    fs.readFile(file, enc, (err, res) => {
      if (err) reject(err)
      else fulfill(res)
    })
  })
}

function readJSON(file, enc) {
  return new Promise((fulfill, reject) => {
    readFile(file, enc).then((res) => {
      try {
        fulfill(JSON.parse(res))
      } catch (ex) {
        reject(ex)
      }
    }, reject)
  })
}

function granularizeJSON(file, enc, level, partySizes) {
  return new Promise((fulfill, reject) => {
    readJSON(file, enc).then((json) => {
      try {
        const sorted = json.sort((a, b) => (parseInt(a.timestamp, 10) - parseInt(b.timestamp, 10)))
        const parties = sorted.filter((datum) => (
          _.includes(partySizes, datum.party_size)
        ))
        const averages = []
        /* for all days in range find average */
        const sums = [{
          quoted: parties[0].quoted,
          actual: parties[0].actual,
          estimated: parties[0].estimated,
          totalInDay: 1
        }]
        for (let i = 0; i < partySizes.length; i++) {
          let dayCounter = 0
          for (let j = 1; j < parties.length; j++) {
            if (isSameTimeFrame(parties[j].timestamp, parties[j - 1].timestamp, level)
              && partySizes[i]) {
              sums[dayCounter].quoted += parties[j].quoted
              sums[dayCounter].actual += parties[j].actual
              sums[dayCounter].estimated += parties[j].estimated
              sums[dayCounter].totalInDay++
            } else {
              const days = sums[dayCounter].totalInDay
              averages.push({
                restaurant_id: parties[j - 1].restaurant_id,
                timestamp: parties[j - 1].timestamp,
                quoted: sums[dayCounter].quoted / days,
                actual: sums[dayCounter].actual / days,
                estimated: sums[dayCounter].estimated / days,
                party_size: partySizes[i],
                selected: false
              })
              sums.push({
                quoted: parties[j].quoted,
                actual: parties[j].actual,
                estimated: parties[j].estimated,
                totalInDay: 1
              })
              dayCounter++
            }
          }
        }
        fulfill(averages)
      } catch (ex) {
        reject(ex)
      }
    })
  })
}

const today = new Date().getTime()

function granularizeLevel(file, enc, restaurantID = null, startstamp = 0,
                          endstamp = today, level = GRANULARITY_LEVEL.DAY,
                          partySizeList = [1, 2, 3, 4, 5, 6]) {
  if (restaurantID === null) {
    return new Promise((fulfill, reject) => {
      try {
        granularizeJSON(file, enc, level, partySizeList)
          .then((json) => {
            fulfill(json.filter((datum) => (
              datum.timestamp >= startstamp * 1
                && datum.timestamp <= endstamp * 1
            )))
          })
      } catch (ex) {
        reject(ex)
      }
    })
  }
  return new Promise((fulfill, reject) => {
    try {
      granularizeJSON(file, enc, level, partySizeList)
        .then((json) => {
          fulfill(json.filter((datum) => (
            datum.restaurant_id === restaurantID * 1
              && datum.timestamp >= startstamp * 1
              && datum.timestamp <= endstamp * 1
          )))
        })
    } catch (ex) {
      reject(ex)
    }
  })
}

function getOverQuoted(file, enc) {
  return new Promise((fulfill, reject) => {
    readJSON(file, enc)
      .then((data) => {
        try {
          let count = 0
          for (let i = 0; i < data.length; i++) {
            if (data[i].quoted > data[i].actual) count++
          }
          fulfill((count * 1.0) / data.length)
        } catch (ex) {
          reject(ex)
        }
      })
  })
}


module.exports = {
  granularizeLevel,
  getOverQuoted
}
