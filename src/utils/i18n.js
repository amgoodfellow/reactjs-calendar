import i18n from "i18next"
import Cache from "i18next-localstorage-cache"
import LanguageDetector from "i18next-browser-languagedetector"
import FetchBackend from "i18next-fetch-backend"

var stuff = "/translations/api/v1/locales/calendar/{{lng}}/{{ns}}.json"

export const changeURL = url => {
  if (!Object.is(url, null)) {
    stuff = url
  }
}

i18n.use(FetchBackend).use(Cache).use(LanguageDetector).init({
  fallbackLng: "en",
  // have a common namespace used around the full app
  ns: ["view"],
  defaultNS: "view",

  load: "all",
  backend: {
    credentials: "include",
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
