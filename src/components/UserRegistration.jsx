import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import createAccount from '../modules/authentication'

const UserRegistration = (e) => {
  const dispatch = useDispatch()
  const { credentials } = useSelector(state => state)

  return (
    <>
      {!credentials ? (
        <form onSubmit={event => createAccount(event, dispatch)}>
          <input
            type="email"
            name="email"
            data-cy="input-email"
          />
          <input
            type="password"
            name="password"
            data-cy="input-password"
          />
          <input
            type="password"
            name="password_confirmation"
            data-cy="input-password-confirmation"
          />
          <input
            type="submit"
            value="Submit"
            data-cy="btn-submit"
          />
        </form>
      ) : (
          <p data-cy="message">Welcome, {credentials.uid}!</p>
        )
      }
    </>
  )
}

export default UserRegistration
