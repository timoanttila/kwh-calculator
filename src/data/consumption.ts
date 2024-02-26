export interface Consumption {
  dayNum: number
  kwh: number
}

export interface ConsumptionElement {
  averageConsumption?: number
  consumptionPerDay: Consumption[]
  maxConsumption?: number
  medianConsumption?: number
  name: string
  totalConsumption?: number
  totalPrice?: number
}

export interface Device {
  maxKwh: number
  name: string
}

export const elements: ConsumptionElement[] = [
  {
    name: 'washingMachine',
    consumptionPerDay: [
      {
        dayNum: 5,
        kwh: 0.5
      },
      {
        dayNum: 6,
        kwh: 1.5
      },
      {
        dayNum: 7,
        kwh: 0.8
      },
      {
        dayNum: 8,
        kwh: 1.2
      },
      {
        dayNum: 9,
        kwh: 0.7
      },
      {
        dayNum: 10,
        kwh: 1.8
      }
    ]
  },
  {
    name: 'sauna',
    consumptionPerDay: [
      {
        dayNum: 5,
        kwh: 3.5
      },
      {
        dayNum: 6,
        kwh: 0
      },
      {
        dayNum: 7,
        kwh: 0
      },
      {
        dayNum: 8,
        kwh: 4.2
      },
      {
        dayNum: 9,
        kwh: 8.1
      },
      {
        dayNum: 10,
        kwh: 3.3
      }
    ]
  }
]
