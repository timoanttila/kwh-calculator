import type {Consumption, ConsumptionElement, Device} from './consumption'

export const roundNumber = (value: number) => Math.round(value * 100) / 100

/**
 * Average consumption
 */

// Calculate the average consumption based on the given element.
const consumptionAverage = (element: Consumption[]): number => {
  const totalKwh = element.reduce((sum, day) => sum + day.kwh, 0)
  const daysCount = element.length
  return daysCount > 0 ? totalKwh / daysCount : 0
}

// Calculate the overall average consumption for all elements
export const overallAverageConsumption = (elements: ConsumptionElement[]): number => {
  const totalKwh = elements.reduce((sum, element) => sum + element.consumptionPerDay.reduce((daySum, day) => daySum + day.kwh, 0), 0)
  const totalDays = elements.reduce((sum, element) => sum + element.consumptionPerDay.length, 0)
  return totalDays > 0 ? totalKwh / totalDays : 0
}

/**
 * MEDIAN
 */

// Calculate the median consumption based on the given element.
const consumptionMedian = (consumptions: Consumption[]): number => {
  const sortedKwhValues = consumptions.map(day => day.kwh).sort((a, b) => a - b)
  const midIndex = Math.floor(sortedKwhValues.length / 2)
  return sortedKwhValues.length % 2 === 0 ? (sortedKwhValues[midIndex - 1] + sortedKwhValues[midIndex]) / 2 : sortedKwhValues[midIndex]
}

// Calculate the overall median consumption for all elements
export const overallMedianConsumption = (elements: ConsumptionElement[]): number => {
  // Extract all kWh values into a single array and sort them
  const allKwhs = elements.flatMap(element => element.consumptionPerDay.map(day => day.kwh)).sort((a, b) => a - b)

  // Calculate the median
  const length = allKwhs.length
  if (length === 0) return 0

  const middleIndex = Math.floor(length / 2)
  return length % 2 === 0 ? (allKwhs[middleIndex - 1] + allKwhs[middleIndex]) / 2 : allKwhs[middleIndex]
}

/**
 * Highest consumption
 */

// Find the maximum consumption for a single ConsumptionElement
const maxConsumption = (element: Consumption[]): number => {
  if (element.length === 0) {
    return 0
  }

  const highestConsumptionDay = element.reduce((maxDay, currentDay) => {
    return maxDay.kwh > currentDay.kwh ? maxDay : currentDay
  })

  return highestConsumptionDay.kwh
}

// Find the device with the highest consumption
export const deviceWithHighestConsumption = (elements: ConsumptionElement[]): Device => {
  return elements.reduce(
    (maxElement, currentElement) => {
      const currentMaxKwh = maxConsumption(currentElement.consumptionPerDay)
      if (currentMaxKwh > (maxElement.maxKwh || 0)) {
        return {name: currentElement.name, maxKwh: currentMaxKwh}
      }
      return maxElement
    },
    {name: '', maxKwh: 0}
  )
}

/**
 * Calculate the total consumption price for all elements.
 */

const elementCost = (element: Consumption[], price: number) => {
  const elementCost = element.reduce((sum, day) => {
    return sum + day.kwh
  }, 0)
  return elementCost * price
}

// Sum up the total cost for all elements
export const consumptionPrice = (elements: ConsumptionElement[], price: number): number =>
  roundNumber(
    elements.reduce((total, element) => {
      return total + elementCost(element.consumptionPerDay, price)
    }, 0)
  )

/**
 * Count the consumptions for each element in the array and calculate the average and maximum consumption.
 */

export const countConsumptionsPerElement = (elements: ConsumptionElement[], price: number): ConsumptionElement[] =>
  elements.map(element => ({
    ...element,
    averageConsumption: consumptionAverage(element.consumptionPerDay),
    maxConsumption: maxConsumption(element.consumptionPerDay),
    medianConsumption: consumptionMedian(element.consumptionPerDay),
    totalConsumption: element.consumptionPerDay.reduce((sum, day) => sum + day.kwh, 0),
    totalPrice: roundNumber(consumptionPrice([element], price))
  }))
