// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {render, screen, renderHook} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useCounter from '../../components/use-counter'
import {act} from 'react-dom/test-utils'

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

const setup = (props = {}) => {
  const results = {}
  function TestComponent(props) {
    Object.assign(results, useCounter(props))
    return null
  }

  render(<TestComponent {...props} />)

  return results
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

test('exposes the count and increment/decrement functions - simplified mock component', () => {
  let result
  function TestComponent(props) {
    result = useCounter(props)
    return null
  }

  render(<TestComponent />)

  expect(result.count).toBe(0)

  act(() => {
    result.increment()
  })

  expect(result.count).toBe(1)

  act(() => {
    result.decrement()
  })

  expect(result.count).toBe(0)
})

test('allows customization of the initial count', () => {
  const {result} = renderHook(() => useCounter({initialCount: 1}))

  expect(result.current.count).toBe(1)
})

test('allows customization of the step', () => {
  const {result} = renderHook(() => useCounter({step: 2}))

  act(() => {
    result.current.increment()
  })

  expect(result.current.count).toBe(2)
})

/* eslint no-unused-vars:0 */
