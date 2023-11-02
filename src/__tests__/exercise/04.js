// form testing
// http://localhost:3000/login

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import faker from 'faker'
import {build} from '@jackfranklin/test-data-bot'
import Login from '../../components/login'

test('submitting the form calls onSubmit with username and password', async () => {
  const handleSubmit = jest.fn()

  const userBuilder = build({
    fields: {
      username: faker.internet.userName(),
      password: faker.internet.password(),
    },
  })

  const {username, password} = userBuilder({overrides: {username: 'Crabby'}})

  render(<Login onSubmit={handleSubmit} />)

  const usernameField = screen.getByLabelText('Username')
  const passwordField = screen.getByLabelText('Password')
  const submitButton = screen.getByRole('button', {name: 'Submit'})

  await userEvent.type(usernameField, username)
  await userEvent.type(passwordField, password)
  await userEvent.click(submitButton)

  expect(handleSubmit).toHaveBeenCalledWith({
    username,
    password,
  })
})

/*
eslint
  no-unused-vars: "off",
*/
