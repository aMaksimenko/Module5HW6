import React from 'react'
import ReactDOM from 'react-dom'
import App from 'containers/App'
import darkTheme from 'themes/Dark'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom'
import history from 'routes/history'

ReactDOM.render(
  <React.StrictMode>
    <HistoryRouter history={history}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </HistoryRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
