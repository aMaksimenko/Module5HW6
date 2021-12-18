import React from 'react'
import { Box, Button, Grid, Stack, TextField, Typography } from '@mui/material'
import { types, useInjection } from 'ioc'
import LoginStore from './Login.store'
import { observer } from 'mobx-react-lite'
import * as mocked from 'tests/mocked/users'

const Login = observer(() => {
  const store = useInjection<LoginStore>(types.LoginStore)

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={6} lg={4}>
        <Box
          component="form"
          autoComplete="off"
          mb={4}
          onSubmit={store.onSubmit}
        >
          <Stack spacing={2}>
            <TextField
              fullWidth
              name="email"
              label="Email"
              variant="outlined"
              type="email"
              value={store.state.email}
              onChange={store.onChange}
              required
            />
            <TextField
              fullWidth
              name="password"
              label="Password"
              variant="outlined"
              type="password"
              value={store.state.password}
              onChange={store.onChange}
              required
            />
            <Button
              fullWidth
              variant="contained"
              type="submit"
            >
              Submit
            </Button>
          </Stack>
        </Box>

        <Typography variant="subtitle1">
          Fill with mocked user:
        </Typography>
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <Button fullWidth size="small" variant="outlined"
                    onClick={() => store.fillWithData(mocked.user_1)}>#1</Button>
          </Grid>
          <Grid item xs={4}>
            <Button fullWidth size="small" variant="outlined"
                    onClick={() => store.fillWithData(mocked.user_2)}>#2</Button>
          </Grid>
          <Grid item xs={4}>
            <Button fullWidth size="small" variant="outlined"
                    onClick={() => store.fillWithData(mocked.user_3)}>#3</Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
})

export default Login
