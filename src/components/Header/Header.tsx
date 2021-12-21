import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Container from '@mui/material/Container'
import { Badge, Box, Button, IconButton, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import LogoutIcon from '@mui/icons-material/Logout'
import LoginIcon from '@mui/icons-material/Login'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import rootStore from 'stores'

const Header = observer(() => {
  const navigate = useNavigate()
  const { authStore, cartStore } = rootStore

  const logOut = () => {
    authStore.removeUser()
    cartStore.clear()
    navigate('/')
  }

  return (
    <AppBar position="static">
      <Container>
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, cursor: 'pointer' }}
            onClick={() => navigate('/')}
          >
            MDB
          </Typography>

          {!!authStore.user ? (
            <Box>
              <IconButton size="large" onClick={() => navigate('/order')}>
                <Badge badgeContent={cartStore.orderIds.size} color="primary">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
              <Button
                color="primary"
                sx={{ textTransform: 'capitalize', ml: 2 }}
                size="small"
                variant="outlined"
                endIcon={<LogoutIcon />}
                onClick={logOut}
              >
                {authStore.user.firstName}
              </Button>
            </Box>
          ) : (
            <Button
              color="primary"
              size="small"
              variant="outlined"
              endIcon={<LoginIcon />}
              onClick={() => navigate('/login')}
            >
              Login
            </Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  )
})

export default Header
