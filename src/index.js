import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import registerServiceWorker from "./registerServiceWorker"
import { MuiThemeProvider, createMuiTheme } from "material-ui/styles"
import createPalette from "material-ui/styles/palette"
import createTypography from "material-ui/styles/typography"
import "typeface-arimo"

const oakland = {
  50: "#fleee9",
  100: "#dbd4c8",
  200: "#c3b8a4",
  300: "#ab9c7f",
  400: "#998663",
  500: "#877148",
  600: "#7f6941",
  700: "#745e38",
  800: "#6a5430",
  900: "#574221",
  A100: "#ffd59a",
  A200: "#ffc067",
  A400: "#ffab34",
  A700: "#ffa11a",
  contrastDefaultColor: "light"
}

const oaklandAccent = {
  50: "#e0eef6",
  100: "#b3d5e9",
  200: "#80badb",
  300: "#4d9ecd",
  400: "#2689c2",
  500: "#0074b7",
  600: "#004987",
  700: "#004987",
  800: "#004987",
  900: "#004987",
  A100: "#56a2ea",
  A200: "#56a2ea",
  A400: "#56a2ea",
  A700: "#56a2ea",
  constrastDefaultColor: "light"
}

const palette = createPalette({
  primary: oakland,
  secondary: oaklandAccent,
  type: "light"
})

const theme = createMuiTheme({
  palette: palette,
  typography: createTypography(palette, {
    fontFamily: "Arimo"
  })
})

ReactDOM.render(
  <MuiThemeProvider theme={theme}><App theme={theme} /></MuiThemeProvider>,
  document.getElementById("root")
)
registerServiceWorker()
