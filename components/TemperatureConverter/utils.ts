import { Big } from 'big.js'

function tryBig(value: string) {
  try {
    return new Big(value)
  } catch {
    // ignore
  }
}

export function fahrenheitToCelsius(fahrenheit: string) {
  return tryBig(fahrenheit)?.minus(32).times(5).div(9).toString() ?? ''
}

export function celsiusToFahrenheit(celsius: string) {
  return tryBig(celsius)?.times(9).div(5).plus(32).toString() ?? ''
}
