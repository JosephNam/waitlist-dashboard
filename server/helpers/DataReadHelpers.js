const GRANULARITY_LEVEL = require("./GranularityLevels")
const isSameTimeFrame = require("./TimeHelpers")
const fs = require("fs")
const _ = require("lodash")

/*
* returns a list of files from dir
*/
function getAllFilesFromFolder(dir) {
  return new Promise((fulfill, reject) => {
    fs.readdir(dir, (err, files) => {
      if (err) reject(err)
      else fulfill(files)
    })
  })
}

/*
* reads the file and returns its json within the start (inclusive) and endstamp (exclusive)
*/
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

/*
* averages the json into a browser ready format
*/
function granularizeJSON(file, enc, level, partySizes, startstamp, endstamp) {
  return new Promise((fulfill, reject) => {
    try {
      readFile(file, enc, partySizes, startstamp, endstamp).then((json) => {
        const bySize = {}
        const byTimeFrame = {}
        const averages = {}

        // first find the first example of a party size in the data
        // then set its timeframe
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

        // following that sum up the fields while within the same time frame
        // if not same time frame append the sums by the total in
        // day field to get average for that time frame
        // then move on to next timeframe
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
            // normalize party size 2 since it is so much larger than the others
            if (item.party_size === 2) {
              averages[`${size}`].push({
                quoted: item.quoted / item.totalInTimeFrame,
                actual: item.actual / item.totalInTimeFrame,
                availability: item.availability / item.totalInTimeFrame,
                totalInTimeFrame: item.totalInTimeFrame,
                timestamp: item.timestamp,
                party_size: item.party_size,
                size: Math.log(item.totalInTimeFrame / 8500) + 1
              })
            } else {
              averages[`${size}`].push({
                quoted: item.quoted / item.totalInTimeFrame,
                actual: item.actual / item.totalInTimeFrame,
                availability: item.availability / item.totalInTimeFrame,
                totalInTimeFrame: item.totalInTimeFrame,
                timestamp: item.timestamp,
                party_size: item.party_size,
                size: item.totalInTimeFrame / 8500
              })
            }
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

// Simply calls the averaging function
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

// processes all data in dir and caches data
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
            const fd = _.sortBy(_.flattenDeep(finalData), "timestamp")
            // console.log("final data is ", fd)
            fulfill(fd)
          }).catch((err) => {
            console.log(err)
            reject(err)
          })
      })
  })
}

// gets overquoted within 10 minutes and gets severely overquoted > 10 min
function getOverQuoted(data) {
  const lowOverquoteLength = (_.filter(data, (datum) => (
    (datum.quoted - datum.actual <= 10) && datum.actual !== 0
  ))).length

  const highOverquoteLength = (_.filter(data, (datum) => (
    (datum.quoted - datum.actual) > 10 && datum.actual !== 0))).length
  const waitDataLength = data.length
  const lowOverquote = (lowOverquoteLength / waitDataLength) * 100
  const highOverquote = (highOverquoteLength / waitDataLength) * 100
  return {
    lowOverquote,
    highOverquote
  }
}

function getJoins(data) {
  const online = (_.filter(data, { type: "online" })).length
  const walkin = (_.filter(data, { type: "walkin" })).length
  const percentOnline = (online / data.length) * 100
  const percentWalkin = (walkin / data.length) * 100
  return {
    percentOnline,
    percentWalkin
  }
}
// calculates overall stats and also returns allData object which is the unaveraged data
function calculateStats(dir, startstamp = 0, endstamp = today) {
  return new Promise((fulfill, reject) => {
    try {
      getAllFilesFromFolder(dir).then((files) => {
        const promises = []
        _.forEach(files, (file) => {
          if (file.substring(file.length - 5, file.length) === ".json") {
            const date = new Date(parseInt(file.substring(0, file.length - 5), 10)).valueOf()
            if (date >= startstamp && date < endstamp) {
              promises.push(readFile(`${dir}${file}`, "utf8",
              [1, 2, 3, 4, 5, 6], startstamp, endstamp))
            }
          }
        })
        const data = []
        Promise.all(promises).then((vals) => {
          _.forEach(vals, (val) => {
            data.push(val)
          })
          const allData = _.flatten(data)
          const overquotes = getOverQuoted(allData)
          const joins = getJoins(allData)
          fulfill({
            allData,
            overquotes,
            joins
          })
        })
      })
    } catch (ex) {
      reject(ex)
    }
  })
}

// caches data from process date range and calculate stats
function init(dir) {
  return new Promise((fulfill, reject) => {
    try {
      const cache = {}
      processDateRange(dir).then((averages) => {
        cache.averages = averages
        calculateStats(dir).then((stats) => {
          cache.allData = stats.allData
          cache.overquotes = stats.overquotes
          fulfill(cache)
        })
      })
    } catch (ex) {
      console.log(ex)
      reject(ex)
    }
  })
}

module.exports = {
  processDateRange,
  getOverQuoted,
  calculateStats,
  init
}

// init("../mocks/smallData/")
// .then((cache) => {
//   console.log(cache)
//   console.log("cache overquotes", cache.overquotes.length)
// })
