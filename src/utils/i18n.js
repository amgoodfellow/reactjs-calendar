import i18n from "i18next"
import Fetch from "i18next-fetch-backend"
import Cache from "i18next-localstorage-cache"
import LanguageDetector from "i18next-browser-languagedetector"

var stuff = ""

export const changeURL = url => {
  if (!Object.is(url, null)){
    stuff = url
  }
}

i18n.use(Fetch).use(Cache).use(LanguageDetector).init({
  fallbackLng: "en",
  // have a common namespace used around the full app
  ns: ["view"],
  defaultNS: "view",

  load: "all",
  backend: {
    credentials:'include',
    loadPath: stuff
  },
  interpolation: {
    formatSeparator: ",",
    format: function(value, format, lng) {
      if (Object.is(format, "uppercase")) {
        return value.toUpperCase()
      } else {
        return value
      }
    }
  }
})

export default i18n
