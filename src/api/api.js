export const getEvents = async url => {
  try {
    const response = await fetch(url, { credentials: "include" })
    const events = await response.json()
    return events
  } catch (err) {
    console.error(err)
  }
}
