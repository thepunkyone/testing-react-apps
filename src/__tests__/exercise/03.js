// Avoid implementation details
// http://localhost:3000/counter

import * as React from 'react'
import {screen, render} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Counter from '../../components/counter'

test('counter increments and decrements when the buttons are clicked', async () => {
  render(<Counter />)

  const decrement = screen.getByRole('button', {name: 'Decrement'})
  const increment = screen.getByRole('button', {name: 'Increment'})

  const message = screen.getByText(/Current count:/)

  expect(message).toHaveTextContent('Current count: 0')

  await userEvent.click(increment)

  expect(message).toHaveTextContent('Current count: 1')

  await userEvent.click(decrement)

  expect(message).toHaveTextContent('Current count: 0')
})
