import {consumptionPrice, countConsumptionsPerElement, deviceWithHighestConsumption, overallAverageConsumption, overallMedianConsumption, roundNumber} from './counts'
import type {ConsumptionElement} from './consumption'

const elements: ConsumptionElement[] = [
  {
    name: 'd1',
    consumptionPerDay: [
      {dayNum: 7, kwh: 3},
      {dayNum: 8, kwh: 2},
      {dayNum: 9, kwh: 5},
      {dayNum: 10, kwh: 4}
    ]
  },
  {
    name: 'd2',
    consumptionPerDay: [
      {dayNum: 7, kwh: 2},
      {dayNum: 8, kwh: 6},
      {dayNum: 9, kwh: 4}
    ]
  },
  {
    name: 'd3',
    consumptionPerDay: [
      {dayNum: 7, kwh: 1},
      {dayNum: 8, kwh: 7},
      {dayNum: 9, kwh: 3}
    ]
  }
]

const price = 0.1

describe('counts.ts tests', () => {
  describe('overallAverageConsumption', () => {
    // Total consumption = 3+2+5+4 + 2+6+4 + 1+7+3 = 37
    // Number of records = 10
    // Average consumption = 37 / 10
    console.log('TULOS ON ' + overallAverageConsumption(elements))
    test('calculates overall average consumption correctly', () => {
      expect(overallAverageConsumption(elements)).toEqual(3.7)
    })

    test('returns 0 for no elements', () => {
      expect(overallAverageConsumption([])).toEqual(0)
    })
  })

  describe('overallMedianConsumption', () => {
    // Sorted consumption values: [1, 2, 2, 3, 3, 4, 5, 6, 7]
    // Median consumption = 3 (middle value of sorted array)
    test('calculates overall median consumption correctly', () => {
      expect(overallMedianConsumption(elements)).toEqual(3.5)
    })
  })

  describe('deviceWithHighestConsumption', () => {
    // Highest consumption per day: d1=5, d2=6, d3=7
    // Device with highest consumption: d3 (7 kWh)
    test('finds the device with the highest consumption', () => {
      expect(deviceWithHighestConsumption(elements)).toEqual({name: 'd3', maxKwh: 7})
    })

    test('returns empty object for no elements', () => {
      expect(deviceWithHighestConsumption([])).toEqual({name: '', maxKwh: 0})
    })
  })

  describe('consumptionPrice', () => {
    // Total consumption = 37 kWh
    // Total price = 37 * 0.1
    test('calculates the total consumption price correctly', () => {
      expect(consumptionPrice(elements, price)).toEqual(3.7)
    })
  })

  describe('countConsumptionsPerElement', () => {
    test('calculates consumption metrics correctly for each element', () => {
      const countedElements = countConsumptionsPerElement(elements, price)

      const expectedResults = [
        {
          name: 'd1',
          consumptionPerDay: elements[0].consumptionPerDay,
          averageConsumption: (3 + 2 + 5 + 4) / 4,
          maxConsumption: 5,
          medianConsumption: 3.5,
          totalConsumption: 3 + 2 + 5 + 4,
          totalPrice: roundNumber(14 * price)
        },
        {
          name: 'd2',
          consumptionPerDay: elements[1].consumptionPerDay,
          averageConsumption: (2 + 6 + 4) / 3,
          maxConsumption: 6,
          medianConsumption: 4,
          totalConsumption: 2 + 6 + 4,
          totalPrice: roundNumber(12 * price)
        },
        {
          name: 'd3',
          consumptionPerDay: elements[2].consumptionPerDay,
          averageConsumption: (1 + 7 + 3) / 3,
          maxConsumption: 7,
          medianConsumption: 3,
          totalConsumption: 1 + 7 + 3,
          totalPrice: roundNumber(11 * price)
        }
      ]

      expect(countedElements).toEqual(expectedResults)
    })
  })
})
