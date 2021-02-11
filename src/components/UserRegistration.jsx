import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import createAccount from '../modules/authentication'
import { Modal, Button, Form } from 'semantic-ui-react'

const UserRegistration = () => {
  const dispatch = useDispatch()
  const { credentials, errorMessage, setRegistrationOpen } = useSelector(state => state)

  const handleOpen = () => {
    dispatch({ type: 'OPEN_REGISTRATION_FORM' })
  }

  const handleClose = () => {
    dispatch({ type: 'CLOSE_REGISTRATION_FORM' })
  }
  return (
    <>
      {!credentials &&
        <Modal open={setRegistrationOpen} onClose={handleClose} onOpen={handleOpen}>
          <Modal.Header>Create An Account</Modal.Header>
          <Modal.Content>
          To order food, please create an account here!
            <Form onSubmit={event => createAccount(event, dispatch)} style={{ marginTop: 10 }}>
              <Form.Input label='Email' type='email' id='email' data-cy='input-email' />
              <Form.Input label='Password' type='password' id='password' data-cy='input-password' />
              <Form.Input label='Password Confirmation' type='password' id='password_confirmation' data-cy='input-password-confirmation' />
              <Button type="submit" data-cy='btn-submit'>Submit</Button>
            </Form>
            {errorMessage}
          </Modal.Content>
          <Modal.Actions>
            <Button
              onClick={handleClose}
            >Cancel
            </Button>
          </Modal.Actions>
        </Modal>
      }
    </>
  )
}

export default UserRegistration
