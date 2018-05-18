import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { I18nextProvider } from 'react-i18next'
import i18n from './utils/i18n'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import registerServiceWorker from './registerServiceWorker'
import 'typeface-arimo'

const oaklandTheme = createMuiTheme({
  palette: {
    primary: {
      light: '#b89f74',
      main: '#877148',
      dark: '#58461f',
      contrastText: '#fff'
    },
    secondary: {
      light: '#56a2ea',
      main: '#0074b7',
      dark: '#004987',
      contrastText: '#fff'
    }
  }
})

const termBounds = [1494216000000, 1503720000000]

ReactDOM.render(
  <I18nextProvider i18n={i18n}>
    <MuiThemeProvider theme={oaklandTheme}>
      <App
        theme={oaklandTheme}
        eventsURLObj={{
          url: 'Demo',
          credentialsNeeded: false
        }}
        termBounds={termBounds}
        rootID="root"
      />
    </MuiThemeProvider>
  </I18nextProvider>,
  document.getElementById('root')
)
registerServiceWorker()
