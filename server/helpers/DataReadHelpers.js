const GRANULARITY_LEVEL = require("./GranularityLevels")
const isSameTimeFrame = require("./TimeHelpers")
const fs = require("fs")

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

function granularizeJSON(file, enc, level) {
  return new Promise((fulfill, reject) => {
    readJSON(file, enc).then((json) => {
      try {
        const sorted = json.sort((a, b) => (parseInt(a.timestamp, 10) - parseInt(b.timestamp, 10)))
        const averages = []
        /* for all days in range find average */
        const sums = [{
          quoted: sorted[0].quoted,
          actual: sorted[0].actual,
          estimated: sorted[0].estimated,
          totalInDay: 1
        }]
        let dayCounter = 0
        for (let i = 1; i < sorted.length; i++) {
          if (isSameTimeFrame(sorted[i].timestamp, sorted[i - 1].timestamp, level)) {
            sums[dayCounter].quoted += sorted[i].quoted
            sums[dayCounter].actual += sorted[i].actual
            sums[dayCounter].estimated += sorted[i].estimated
            sums[dayCounter].totalInDay++
          } else {
            const days = sums[dayCounter].totalInDay
            averages.push({
              restaurant_id: sorted[i - 1].restaurant_id,
              timestamp: sorted[i - 1].timestamp,
              quoted: sums[dayCounter].quoted / days,
              actual: sums[dayCounter].actual / days,
              estimated: sums[dayCounter].estimated / days
            })
            sums.push({
              quoted: sorted[i].quoted,
              actual: sorted[i].actual,
              estimated: sorted[i].estimated,
              totalInDay: 1
            })
            dayCounter++
          }
        }
        fulfill(averages)
      } catch (ex) {
        reject(ex)
      }
    })
  })
}

function granularizeLevel(file, enc, level) {
  switch (level) {
    case GRANULARITY_LEVEL.HOUR:
      return new Promise((fulfill, reject) => {
        try {
          granularizeJSON(file, enc, GRANULARITY_LEVEL.HOUR)
            .then((json) => fulfill(json))
        } catch (ex) {
          reject(ex)
        }
      })
    case GRANULARITY_LEVEL.DAY:
      return new Promise((fulfill, reject) => {
        try {
          granularizeJSON(file, enc, GRANULARITY_LEVEL.DAY)
            .then((json) => fulfill(json))
        } catch (ex) {
          reject(ex)
        }
      })
    default:
      return new Promise((fulfill, reject) => {
        try {
          granularizeJSON(file, enc, GRANULARITY_LEVEL.DAY)
            .then((json) => fulfill(json))
        } catch (ex) {
          reject(ex)
        }
      })
  }
}


module.exports = granularizeLevel
