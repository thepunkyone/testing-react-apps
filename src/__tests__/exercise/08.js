// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useCounter from '../../components/use-counter'

const MockComponent = () => {
  const {count, increment, decrement} = useCounter()

  return (
    <div>
      <span>Count: {count}</span>
      <button onClick={decrement}>decrement</button>
      <button onClick={increment}>increment</button>
    </div>
  )
}

test('exposes the count and increment/decrement functions', async () => {
  render(<MockComponent />)

  const decrementButton = screen.getByRole('button', {name: 'decrement'})
  const incrementButton = screen.getByRole('button', {name: 'increment'})

  expect(screen.getByText(/count/i)).toHaveTextContent('Count: 0')

  await userEvent.click(incrementButton)

  expect(screen.getByText(/count/i)).toHaveTextContent('Count: 1')

  await userEvent.click(decrementButton)

  expect(screen.getByText(/count/i)).toHaveTextContent('Count: 0')
})

/* eslint no-unused-vars:0 */
