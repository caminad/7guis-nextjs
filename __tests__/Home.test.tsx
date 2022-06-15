import { render, screen, within } from '@testing-library/react'
import { expect, test } from 'vitest'
import Home from '../pages'

test('home', () => {
  render(<Home />)

  const main = within(screen.getByRole('main'))
  expect(
    main.getByRole('heading', {
      level: 1,
      name: /7guis tasks built with next\.js and pico\.css/i,
    })
  ).toBeDefined()

  const footer = within(screen.getByRole('contentinfo'))
  expect(
    footer.getByRole('link', {
      name: /source code/i,
    })
  ).toBeDefined()
})
