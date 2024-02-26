import {elements} from './consumption'
import * as counts from './counts'

export const user = {
  firstName: 'Mikko',
  lastName: 'Mallikas',
  contract: {
    price: '0,04 €'
  }
}

// Convert price string to a number
export const priceToNumber = (price: string): number => {
  const realPrice = price.replace(',', '.').replace(/[^0-9.]/g, '')
  return parseFloat(realPrice)
}

// Calculate the total cost of consumption using the given dayNum per element
export const totalPrice = counts.consumptionPrice(elements, priceToNumber(user.contract.price))
