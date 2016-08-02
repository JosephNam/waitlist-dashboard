import { Cache } from "../../server/models/cache"

const cache = new Cache()
import test from "ava"


// local data
const SameDateData = {
  data: {
    pointsBetween: [
      {
        timestamp: 1456001009000,
        restaurant_id: 61495,
        party_size: 2,
        quoted: 0,
        actual: 0,
        availability: 0,
        estimated: 0
      },
      {
        timestamp: 1455975924000,
        restaurant_id: 104454,
        party_size: 3,
        quoted: 0,
        actual: 0,
        availability: 0,
        estimated: 0
      },
      {
        timestamp: 1455990437000,
        restaurant_id: 109275,
        party_size: 4,
        quoted: 0,
        actual: 0,
        availability: 48,
        estimated: 240
      }
    ]
  }
}

const DifferentDateData = {
  data: {
    pointsBetween: [
      {
        timestamp: 1456001009000,
        restaurant_id: 61495,
        party_size: 2,
        quoted: 0,
        actual: 0,
        availability: 0,
        estimated: 0
      },
      {
        timestamp: 1455975924000,
        restaurant_id: 104454,
        party_size: 3,
        quoted: 0,
        actual: 0,
        availability: 0,
        estimated: 0
      },
      {
        timestamp: 1455990437000,
        restaurant_id: 109275,
        party_size: 4,
        quoted: 0,
        actual: 0,
        availability: 48,
        estimated: 240
      },
      {
        timestamp: 1457004667000,
        restaurant_id: 116487,
        party_size: 2,
        quoted: 0,
        actual: 0,
        availability: 0,
        estimated: 0
      },
      {
        timestamp: 1457004667000,
        restaurant_id: 117447,
        party_size: 2,
        quoted: 0,
        actual: 0,
        availability: 48,
        estimated: 240
      },
      {
        timestamp: 1458004667000,
        restaurant_id: 148111,
        party_size: 2,
        quoted: 0,
        actual: 0,
        availability: 0,
        estimated: 0
      }
    ]
  }
}

const sameDateExpected =
  [{ timestamp: 1455975924000,
      restaurant_id: 104454,
      party_size: 3,
      quoted: 0,
      actual: 0,
      availability: 0,
      estimated: 0 },
    { timestamp: 1455990437000,
      restaurant_id: 109275,
      party_size: 4,
      quoted: 0,
      actual: 0,
      availability: 48,
      estimated: 240 },
    { timestamp: 1456001009000,
    restaurant_id: 61495,
    party_size: 2,
    quoted: 0,
    actual: 0,
    availability: 0,
    estimated: 0 }]

const sameDateOneRidExpected =
  [{ timestamp: 1456001009000,
    restaurant_id: 61495,
    party_size: 2,
    quoted: 0,
    actual: 0,
    availability: 0,
    estimated: 0 }]

function testNullDateSet() {
  cache.set(null)
  return cache.size()
}
function testNullDateGet() {
  return cache.get(1456001009000, null)
}
// test setter for local data(one date)
function testOneDateSet() {
  const jsonAsString = JSON.stringify(SameDateData)
  const json = JSON.parse(jsonAsString)
  cache.set(json.data.pointsBetween)
  return cache.size()
}

// test getter for local data(one date), should hit
function testOneDateGet() {
  return cache.get(1456001009000, 1456004667000)
}

// test setter for local data(same date)
function testDifferentDateSet() {
  const jsonAsString = JSON.stringify(DifferentDateData)
  const json = JSON.parse(jsonAsString)
  cache.set(json.data.pointsBetween)
  return cache.size()
}

// test getter for local data(same date), should hit
function testDifferentDateGet() {
  return cache.get(1456001009000, 1458004667000)
}

function testOneRidDateGet() {
  return cache.get(1456001009000, 1456004667000, 61495)
}
// run the test

// test for data from graphql server

test("testNullDateSet ", t => {
  t.deepEqual(
    testNullDateSet(), 0
  )
})
test("testNullDateGet ", t => {
  t.deepEqual(
    testNullDateGet(), null
  )
})
test("testOneDateSet ", t => {
  t.deepEqual(
    testOneDateSet(), 1
  )
})
test("testDifferentDateSet ", t => {
  t.deepEqual(
    testDifferentDateSet(), 3
  )
})
test("testOneDateGet ", t => {
  t.deepEqual(
    testOneDateGet(), sameDateExpected
  )
})
test("testDifferentDateGet ", t => {
  t.deepEqual(
    testDifferentDateGet(), null
  )
})
test("testOneRidDateGet ", t => {
  t.deepEqual(
    testOneRidDateGet(), sameDateOneRidExpected
  )
})
