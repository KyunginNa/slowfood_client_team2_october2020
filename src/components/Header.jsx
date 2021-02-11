import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Menu, Button, Icon } from 'semantic-ui-react'

const Header = () => {
  const { credentials } = useSelector(state => state)
  const dispatch = useDispatch()
  const handleOpen = () => {
    dispatch({ type: 'OPEN_REGISTRATION_FORM' })
  }

  return (
    <Menu size='large'>
      <Menu.Item>Welcome to K-Food!</Menu.Item>
      {!credentials &&
        <Menu.Item position='right'>
          <Button
            icon
            labelPosition='right'
            onClick={handleOpen}
          >Sign Up
             <Icon name='user plus' />
          </Button>
        </Menu.Item>
      }
    </Menu>
  )
}

export default Header
