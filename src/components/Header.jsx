import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Menu, Button, Icon, Segment } from 'semantic-ui-react'

const Header = () => {
  const { credentials } = useSelector(state => state)
  const dispatch = useDispatch()
  const handleOpen = () => {
    dispatch({ type: 'OPEN_REGISTRATION_FORM' })
  }

  return (
    <Segment inverted>
      <Menu size='large' inverted secondary>
        <Menu.Item style={{ fontSize: 20, fontFamily: 'cursive' }}>
          Restaurant K-FOOD
        </Menu.Item>
        <Menu.Item position='right'>
          {credentials ?
            <p data-cy="message">Welcome, {credentials.uid}!</p>
            :
            <Button
              icon
              labelPosition='right'
              onClick={handleOpen}
              data-cy='btn-sign-up'
              inverted
            >Sign Up
             <Icon name='user plus' />
            </Button>
          }
        </Menu.Item>
      </Menu>
    </Segment>
  )
}

export default Header
