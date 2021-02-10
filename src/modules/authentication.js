import axios from 'axios'

const createAccount = async (event, dispatch) => {
  event.preventDefault()
  const email = event.target.email.value
  const password = event.target.password.value
  const password_confirmation = event.target.password_confirmation.value
  try {
    let response = await axios.post('http://localhost:3000/api/auth', {
      email: email,
      password: password,
      password_confirmation: password_confirmation,
    })
    response = await axios.post('http://localhost:3000/api/auth/sign_in', {
      email: email,
      password: password,
    })
    const credentials = {
      uid: response.headers['uid'],
      access_token: response.headers['access-token'],
      token_type: response.headers['token-type'],
      expiry: response.headers['expiry'],
      client: response.headers['client'],
    }
    dispatch({ type: 'SET_CURRENT_USER', payload: credentials })
  } catch (error) {
    dispatch({
      type: 'SET_ERROR_MESSAGE',
      payload: error.response.data.errors.full_messages[0],
    })
  }
}

export default createAccount
