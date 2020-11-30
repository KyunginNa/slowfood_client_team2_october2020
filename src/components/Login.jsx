import React, { Component } from 'react'
import axios from 'axios'
import { Container, Form, Button, Icon } from 'semantic-ui-react'

class Login extends Component {
  state = {
    renderRegistrationForm: false
  }
  
  async authenticate(e) {
    e.preventDefault()
    let credentials = {
      email: e.target.email.value,
      password: e.target.password.value,
      password_confirmation: e.target.password_confirmation.value
    }
    let response = await axios.post('/auth', credentials)
    const userData = {
      uid: response.headers.uid,
      client: response.headers.client,
      token_type: response.headers.token_type,
      expiry: response.headers.expiry 
    }
    localStorage.setItem("credentials", JSON.stringify(userData))
    localStorage.setItem("authenticated", true)
    this.props.toggleAuthenticatedState()
    this.setState({ renderRegistrationForm: false })
  }

  render() {
    return (
    <Container>
      { this.state.renderRegistrationForm ? 
      <Form onSubmit={(e) => this.authenticate(e)}>
        <Form.Field>
          <label>E-mail</label>
          <input 
            type="text" 
            name="email" 
            data-cy="email" 
            placeholder='email@email.com' 
          />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input 
            type="password" 
            name="password" 
            data-cy="password" 
            placeholder='Password' 
          />
        </Form.Field>
        <Form.Field>
          <label>Confirm Password</label>
          <input 
            type="password" 
            name="password_confirmation" 
            data-cy="password-confirmation" 
            placeholder='Type Your Password Again' 
          />
        </Form.Field>
        <Button 
          type="submit" 
          value="Register" 
          data-cy="register" 
        >
          Sign Up!
        </Button>
      </Form>
      :
      <Button animated='fade'
        data-cy="register-action"
        onClick={() => this.setState({ renderRegistrationForm: true })}
      >
        <Button.Content visible>
          Register Here
        </Button.Content>
        <Button.Content hidden>
          <Icon name='arrow right' />
        </Button.Content>
      </Button>
      }
    </Container>
    )
  }
}

export default Login;
