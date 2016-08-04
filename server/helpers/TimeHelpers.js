const GRANULARITY_LEVEL = require("./GranularityLevels")

function isSameTimeFrame(a, b, level) {
  const aDate = new Date(a)
  const bDate = new Date(b)
  const aYear = aDate.getUTCFullYear()
  const bYear = bDate.getUTCFullYear()
  const aMonth = aDate.getUTCMonth()
  const bMonth = bDate.getUTCMonth()
  const aDay = aDate.getUTCDate()
  const bDay = bDate.getUTCDate()
  switch (level) {
    case GRANULARITY_LEVEL.HOUR: {
      const aHour = aDate.getUTCHours()
      const bHour = bDate.getUTCHours()
      return aHour === bHour && aYear === bYear && aDay === bDay && aMonth === bMonth
    }
    case GRANULARITY_LEVEL.DAY:
      return aDay === bDay && aYear === bYear && aMonth === bMonth
    default:
      return aDay === bDay && aYear === bYear
  }
}

module.exports = isSameTimeFrame
