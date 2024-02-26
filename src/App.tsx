import React, {useEffect, useState} from 'react'
import {priceToNumber, totalPrice, user} from './data/user'
import {elements, ConsumptionElement, Device} from './data/consumption'
import * as counts from './data/counts'
import './App.css'

function App() {
  const [price, setPrice] = useState<number>(0)
  const [highestConsumptionElement, setHighestConsumptionElement] = useState<Device>()

  const [consumptions, setConsumptions] = useState<ConsumptionElement[]>([])

  const handlePriceFormat = (value: number | undefined = undefined): string => {
    return Number(value).toFixed(2)
  }

  useEffect(() => {
    const userContractPrice = priceToNumber(user.contract.price)
    const consumptionArray = counts.countConsumptionsPerElement(elements, userContractPrice)
    setConsumptions(consumptionArray)
    setPrice(userContractPrice)
    setHighestConsumptionElement(counts.deviceWithHighestConsumption(elements))
  }, [])

  return (
    <div>
      <p>
        Käyttäjä {user.firstName} {user.lastName}
      </p>

      <table>
        <tbody>
          <tr>
            <td>Keskikulutus:</td>
            <td>{handlePriceFormat(counts.overallAverageConsumption(elements))} kWh</td>
          </tr>
          <tr>
            <td>Mediaani:</td>
            <td>{handlePriceFormat(counts.overallMedianConsumption(elements))} kWh</td>
          </tr>

          {highestConsumptionElement && (
            <tr>
              <td>Suurin kertakulutus:</td>
              <td>
                {handlePriceFormat(highestConsumptionElement.maxKwh)} kWh ({highestConsumptionElement.name})
              </td>
            </tr>
          )}

          <tr>
            <td>Sähkösopimus</td>
            <td>{handlePriceFormat(price)} € / kWh</td>
          </tr>

          <tr>
            <td>Hinta yhteensä</td>
            <td>{handlePriceFormat(totalPrice)} €</td>
          </tr>
        </tbody>
      </table>

      <h2>Kulutus per laite</h2>
      <table>
        <thead>
          <tr>
            <th>Laite</th>
            <th>Kerrat</th>
            <th>Keskikulutus</th>
            <th>Mediaani</th>
            <th>Suurin</th>
            <th>Yhteensä</th>
            <th>Hinta</th>
          </tr>
        </thead>
        <tbody>
          {consumptions.map((element, index) => (
            <tr key={`el-${index + 1}`}>
              <td>{element.name}</td>
              <td>{element.consumptionPerDay.length}</td>
              <td>{handlePriceFormat(element.averageConsumption)}</td>
              <td>{handlePriceFormat(element.medianConsumption)}</td>
              <td>{handlePriceFormat(element.maxConsumption)}</td>
              <td>{handlePriceFormat(element.totalConsumption)}</td>
              <td>{handlePriceFormat(element.totalPrice)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default App
