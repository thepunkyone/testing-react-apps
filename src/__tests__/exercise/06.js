// mocking Browser APIs and modules
// http://localhost:3000/location

import * as React from 'react'
import {render, screen, act} from '@testing-library/react'
import {useCurrentPosition} from 'react-use-geolocation'
import Location from '../../examples/location'

jest.mock('react-use-geolocation')

test('displays the users current location when the position is retrieved successfully', async () => {
  const fakePosition = {coords: {latitude: 54, longitude: -2}}

  let setReturnValue

  useCurrentPosition.mockImplementation(() => {
    const state = React.useState([])
    setReturnValue = state[1]

    return state[0]
  })

  render(<Location />)

  expect(screen.getByLabelText(/loading/)).toBeVisible()

  await act(() => {
    setReturnValue([fakePosition])
  })

  expect(screen.queryByLabelText(/loading/)).not.toBeInTheDocument()

  expect(screen.getByText(/latitude/i)).toHaveTextContent(
    `Latitude: ${fakePosition.coords.latitude}`,
  )
  expect(screen.getByText(/longitude/i)).toHaveTextContent(
    `Longitude: ${fakePosition.coords.longitude}`,
  )
})

test('displays an error when the users position could not be retrieved successfully', async () => {
  const fakeError = {message: 'Could not retrieve coordinates!'}

  let setReturnValue

  useCurrentPosition.mockImplementation(() => {
    const state = React.useState([])
    setReturnValue = state[1]

    return state[0]
  })

  render(<Location />)

  expect(screen.getByLabelText(/loading/)).toBeVisible()

  await act(() => {
    setReturnValue([undefined, fakeError])
  })

  expect(screen.queryByLabelText(/loading/)).not.toBeInTheDocument()

  expect(screen.getByRole('alert')).toHaveTextContent(fakeError.message)
})

/*
eslint
  no-unused-vars: "off",
*/
