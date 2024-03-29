import { Big } from 'big.js'

function tryBig(value: string): Big | undefined {
  try {
    return new Big(value)
  } catch {
    return undefined
  }
}

export function fahrenheitToCelsius(fahrenheit: string): string {
  return tryBig(fahrenheit)?.minus(32).times(5).div(9).toString() ?? ''
}

export function celsiusToFahrenheit(celsius: string): string {
  return tryBig(celsius)?.times(9).div(5).plus(32).toString() ?? ''
}
