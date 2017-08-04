export const getEvents = async obj => {
  try {
    let response
    if ((Object.is(obj, null)) || (obj.credentialsNeeded === false)){
      response = await fetch(obj.url)
    }else{
      response = await fetch(obj.url, { credentials: "include" })
    }
    const events = await response.json()
    return events.events
  } catch (err) {
    console.error(err)
  }
}
