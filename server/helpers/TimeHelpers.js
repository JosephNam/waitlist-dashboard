const moment = require("moment")
const GRANULARITY_LEVEL = require("./GranularityLevels")

function isSameTimeFrame(a, b, level) {
  const aDay = moment(a).dayOfYear()
  const bDay = moment(b).dayOfYear()
  switch (level) {
    case GRANULARITY_LEVEL.HOUR: {
      const aHour = moment(a).hour()
      const bHour = moment(b).hour()
      return aHour === bHour && aDay === bDay && moment(a).year() === moment(b).year()
    }
    case GRANULARITY_LEVEL.DAY:
      return aDay === bDay && moment(a).year() === moment(b).year()
    default:
      return aDay === bDay && moment(a).year() === moment(b).year()
  }
}

module.exports = isSameTimeFrame
