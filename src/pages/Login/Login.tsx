import React from 'react'
import Login from 'containers/Login'
import { types, useInjection } from 'ioc'
import AuthStore from 'stores/AuthStore'
import { Button, Container, Grid, Typography } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'

const LoginPage = observer(() => {
  const authStore = useInjection<AuthStore>(types.AuthStore)
  const navigate = useNavigate()

  return (
    <Container>
      {!!authStore.user ? (
        <Grid container justifyContent="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h6" mb={4}>
              Logged as {authStore.user.firstName} {authStore.user.lastName} - <strong>{authStore.user.email}</strong>
            </Typography>
            <Button variant="contained" onClick={() => navigate('/')}>
              Go Home page
            </Button>
          </Grid>
        </Grid>
      ) : (
        <Login />
      )}
    </Container>
  )
})

export default LoginPage
