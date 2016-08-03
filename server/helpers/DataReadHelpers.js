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
        fulfill(JSON.parse(res).data.pointsBetween)
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
        const parties = _.filter(sorted, (datum) => (
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
              ) {
              sums[dayCounter].quoted += parties[j].quoted
              sums[dayCounter].actual += parties[j].actual
              sums[dayCounter].estimated += parties[j].estimated
              sums[dayCounter].totalInDay++
            } else {
              const days = sums[dayCounter].totalInDay
              averages.push({
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
                          endstamp = today, level = GRANULARITY_LEVEL.HOUR,
                          partySizeList = [1, 2, 3, 4, 5, 6]) {
  if (restaurantID === 0 || restaurantID == null || restaurantID === "0") {
    return new Promise((fulfill, reject) => {
      try {
        granularizeJSON(file, enc, level, partySizeList)
          .then((json) => {
            fulfill(_.filter(json, (datum) => (
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
          fulfill(_.filter(json, (datum) => (
              datum.restaurant_id === restaurantID
              && datum.timestamp >= startstamp * 1
              && datum.timestamp <= endstamp * 1
          )))
        })
    } catch (ex) {
      reject(ex)
    }
  })
}

function processData(file, enc, restaurantID = null,
  startstamp = 0, endstamp = today,
  level, partySizeList = [1, 2, 3, 4, 5, 6]) {
  return new Promise((fulfill, reject) => {
    try {
      granularizeLevel(file, enc,
        restaurantID, startstamp,
        endstamp, GRANULARITY_LEVEL.HOUR, partySizeList)
        .then((json) => {
          const newData = {
            party_size_1: [],
            party_size_2: [],
            party_size_3: [],
            party_size_4: [],
            party_size_5: [],
            party_size_6: []
          }
          _.forEach(json, (val) => {
            newData[`party_size_${val.party_size}`].push(val)
          })
          fulfill(newData)
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
          _.forEach(data, (val) => {
            if (val.quoted > val.actual) count++
          })
          fulfill((count * 1.0) / data.length)
        } catch (ex) {
          reject(ex)
        }
      })
  })
}

module.exports = {
  processData,
  getOverQuoted
}
