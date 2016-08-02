const _ = require("lodash")
const moment = require("moment")

export class Cache {
  constructor() {
    this.reservations = new Map()
  }

  set(list) {
    if (!list) return
    // change all rows to date-format
    // built-in sort is faster than lodash sort
    const start = process.hrtime()
    list.sort((a, b) => (
       a.timestamp - b.timestamp
    ))
    // list = _.sortBy(list, function(a){return a.timestamp})
    console.log("sorting time: ", process.hrtime()[0] - start[0], "s")
    let currentstamp,
      laststamp
    let dayList = []

    for (let i = 0; i < list.length; i++) {
      currentstamp = moment(list[i].timestamp).utc().format("YYYY-MM-DD")
      if (laststamp == null || moment(currentstamp).utc().isSame(laststamp, "day")) {
        dayList.push(list[i])
        laststamp = currentstamp
      } else {
        // strore the laststamp list and create a new list for the currentstamp
        this.reservations.set(laststamp, dayList)
        dayList = []
        dayList.push(list[i])
        laststamp = currentstamp
      }
    }
    // set the last timestamp
    this.reservations.set(currentstamp, dayList)
  }

  get(start, end, rid) {
    if (!start || !end) { return null }

    // create a list for return
    let result = []
    const startstamp = moment(start).utc().format("YYYY-MM-DD")
    const endtimestamp = moment(end).utc().format("YYYY-MM-DD")
    let currentstamp = startstamp
    console.log(startstamp)
    console.log(endtimestamp)
    // return null if data is missing
    while (moment(currentstamp).utc().isSameOrBefore(endtimestamp, "day")) {
      if (!this.reservations.has(moment(currentstamp).utc().format("YYYY-MM-DD"))) {
        console.log("Cache Miss", moment(currentstamp).utc().format("YYYY-MM-DD"))
        return null
      }
      currentstamp = moment(currentstamp).utc().add(1, "day")
    }

    currentstamp = startstamp
    while (moment(currentstamp).utc().isSameOrBefore(endtimestamp, "day")) {
      let list = this.reservations.get(currentstamp)
      if (rid) {
        list = _.filter(list, { restaurant_id: rid })
      }
      result = _.union(result, list)
      currentstamp = moment(currentstamp).utc().add(1, "day")
    }
    return result
  }

  keys() {
    return this.reservations.keys()
  }

  size() {
    return this.reservations.size
  }

  values() {
    return this.reservations.values()
  }

  reset() {
    this.reservations.clear()
  }
}
