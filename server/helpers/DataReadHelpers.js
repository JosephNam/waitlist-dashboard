const GRANULARITY_LEVEL = require("./GranularityLevels")
const isSameTimeFrame = require("./TimeHelpers")
const fs = require("fs")
const _ = require("lodash")

function getAllFilesFromFolder(dir) {
  return new Promise((fulfill, reject) => {
    fs.readdir(dir, (err, files) => {
      if (err) reject(err)
      else fulfill(files)
    })
  })
}

function readFile(file, enc, partySizes, startstamp, endstamp) {
  return new Promise((fulfill, reject) => {
    fs.readFile(file, enc, (err, res) => {
      if (err) {
        console.log(err)
        reject(err)
      } else {
        const json = JSON.parse(res)
        const valid = _(json)
          .filter((datum) => _(partySizes).includes(datum.party_size))
          .filter((datum) => (datum.timestamp >= startstamp && datum.timestamp < endstamp))
          .reverse()
          .value()
        fulfill(valid)
      }
    })
  })
}

function granularizeJSON(file, enc, level, partySizes, startstamp, endstamp) {
  return new Promise((fulfill, reject) => {
    try {
      readFile(file, enc, partySizes, startstamp, endstamp).then((json) => {
        const bySize = {}
        const byTimeFrame = {}
        const averages = {}

        _([1, 2, 3, 4, 5, 6]).forEach((val) => {
          bySize[`${val}`] = _(json).filter({ party_size: val }).take(1).value()
          byTimeFrame[`${val}`] = [{
            timestamp: bySize[`${val}`][0].timestamp,
            quoted: 0,
            actual: 0,
            availability: 0,
            totalInTimeFrame: 0,
            party_size: val
          }]
          averages[`${val}`] = []
        })

        _(json).forEach((party) => {
          const size = party.party_size
          const index = byTimeFrame[`${size}`].length - 1
          if (isSameTimeFrame(party.timestamp, byTimeFrame[`${size}`][index].timestamp, level)) {
            byTimeFrame[`${size}`][index].quoted += party.quoted
            byTimeFrame[`${size}`][index].actual += party.actual
            byTimeFrame[`${size}`][index].availability += party.availability
            byTimeFrame[`${size}`][index].totalInTimeFrame++
          } else {
            const item = byTimeFrame[`${size}`][index]
            averages[`${size}`].push({
              quoted: item.quoted / item.totalInTimeFrame,
              actual: item.actual / item.totalInTimeFrame,
              availability: item.availability / item.totalInTimeFrame,
              totalInTimeFrame: item.totalInTimeFrame,
              timestamp: item.timestamp,
              party_size: item.party_size,
              size: item.totalInTimeFrame / 10000
            })
            byTimeFrame[`${size}`].push({
              timestamp: party.timestamp,
              quoted: 0,
              actual: 0,
              availability: 0,
              totalInTimeFrame: 0,
              party_size: size
            })
          }
        })
        fulfill(averages)
      })
    } catch (ex) {
      reject(ex)
    }
  })
}

const today = new Date().getTime()

function processData(file, enc, restaurantID = null,
  startstamp = 0, endstamp = today,
  level = GRANULARITY_LEVEL.HOUR, partySizeList = [1, 2, 3, 4, 5, 6]) {
  return new Promise((fulfill, reject) => {
    try {
      granularizeJSON(file, enc, level, partySizeList, startstamp, endstamp)
        .then((json) => {
          fulfill(json)
        })
    } catch (ex) {
      reject(ex)
    }
  })
}

function processDateRange(dir, restaurantID = -1,
  startstamp = 0, endstamp = today,
  level = GRANULARITY_LEVEL.HOUR, partySizeList = [1, 2, 3, 4, 5, 6]) {
  return new Promise((fulfill, reject) => {
    getAllFilesFromFolder(dir)
      .then((files) => {
        const promises = []
        _.forEach(files, (file) => {
          if (file.substring(file.length - 5, file.length) === ".json") {
            const date = new Date(parseInt(file.substring(0, file.length - 5), 10)).valueOf()
            if (date >= startstamp && date < endstamp) {
              promises.push(processData(`${dir}${file}`, "utf8",
                restaurantID, startstamp,
                endstamp, GRANULARITY_LEVEL.DAY, partySizeList))
            }
          }
        })
        Promise.all(promises)
          .then((values) => {
            const data = {
              1: [],
              2: [],
              3: [],
              4: [],
              5: [],
              6: []
            }

            const finalData = []
            _.forEach(values, (val) => {
              _.forEach(val, (datum, key) => {
                data[key].push(datum)
              })
            })

            _.forEach(data, (list) => {
              finalData.push(list)
            })
            fulfill(_.sortBy(_.flattenDeep(finalData)), "timestamp")
          }).catch((err) => {
            console.log(err)
            reject(err)
          })
      })
  })
}

function getOverQuoted(file, enc) {
  return new Promise((fulfill, reject) => {
    readFile(file, enc)
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
  processDateRange,
  getOverQuoted
}
