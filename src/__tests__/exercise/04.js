// form testing
// http://localhost:3000/login

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../../components/login'

test('submitting the form calls onSubmit with username and password', async () => {
  const handleSubmit = jest.fn()

  render(<Login onSubmit={handleSubmit} />)

  const usernameField = screen.getByLabelText('Username')
  const passwordField = screen.getByLabelText('Password')
  const submitButton = screen.getByRole('button', {name: 'Submit'})

  await userEvent.type(usernameField, 'Crabsy')
  await userEvent.type(passwordField, 'crabsarecool')
  await userEvent.click(submitButton)

  expect(handleSubmit).toHaveBeenCalledWith({
    username: 'Crabsy',
    password: 'crabsarecool',
  })
})

/*
eslint
  no-unused-vars: "off",
*/
