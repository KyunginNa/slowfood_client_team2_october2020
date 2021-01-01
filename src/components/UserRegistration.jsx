import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'

const UserRegistration = (e) => {
  const dispatch = useDispatch()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [passwordConfirmation, setPasswordConfirmation] = useState()

  const userID = useSelector(state => state.credentials.uid)

  const createAccount = async (e) => {
    e.preventDefault()
    await axios.post("http://localhost:3000/api/auth", {
      email: email,
      password: password,
      password_confirmation: passwordConfirmation
    })
    const response = await axios.post("http://localhost:3000/api/auth/sign_in", {
      email: email,
      password: password
    })
    const credentials = {
      uid: response.headers["uid"],
      access_token: response.headers["access-token"],
      token_type: response.headers["token-type"],
      expiry: response.headers["expiry"],
      client: response.headers["client"],
    };
    dispatch({ type: "SET_CURRENT_USER", payload: credentials })
  }
  return (
    <>
      {!userID ? (
        <form>
          <input
            type="email"
            name="email"
            data-cy="input-email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name="password"
            data-cy="input-password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            name="password_confirmation"
            data-cy="input-password-confirmation"
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
          <input
            type="submit"
            value="Submit"
            data-cy="btn-submit"
            onClick={createAccount}
          />
        </form>
      ) : (
          <p data-cy="message">Welcome, {userID}!</p>
        )
      }
    </>
  )
}

export default UserRegistration
