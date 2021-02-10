import React from 'react'
import { AppBar, Toolbar, Typography, IconButton, Button } from '@material-ui/core'
import PersonAddIcon from '@material-ui/icons/PersonAdd'

const Header = () => {
  return (
    <AppBar position='static'>
      <Toolbar>
        <Typography
          variant="h6"
        >Welcome to K-Food!
        </Typography>
        <Button
          aria-label="display more actions"
          edge="end"
          color="inherit"
          startIcon={<PersonAddIcon />}
          style={{ position: 'fixed', right: 20 }}
        >Sign Up</Button>
      </Toolbar>
    </AppBar>
  )
}

export default Header
