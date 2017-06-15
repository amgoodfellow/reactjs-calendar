//Takes a Date object
//Returns an integer number representing the number of weeks
//of a month
const getWeeksOfMonth = day => {
  const firstDay = new Date(day.setDate(1)).getDay()
  const totalDays = new Date(day.getFullYear(), day.getMonth() + 1, 0).getDate()
  return Math.ceil((firstDay + totalDays) / 7)
}

//Returns an integer number representing the week of the month
//depending on the selected day
const getWeekOfMonth = (year, month, day) => {
  const firstWeekday = new Date(year, month, 1).getDay()
  const d = new Date(year, month, day)
  const offsetDate = d.getDate() + firstWeekday - 1
  return Math.floor(offsetDate / 7) + 1
}


const getWeekDateRange = (month, year, weekNumber) => {
  const day = new Date(year, month, 1)
  const weeksOfMonth = getWeeksOfMonth(day)
  const startDay = day.getDay()
  let daysInMonth = new Date(year, month + 1, 0)
  daysInMonth = daysInMonth.getDate()
  let firstNum, endNum

  if (weekNumber === 1) {
    firstNum = 1
    endNum = 7 - startDay
  } else if (weekNumber === weeksOfMonth) {
    firstNum = 7 * (weeksOfMonth - 2) + (7 - startDay) + 1
    endNum = daysInMonth
  } else {
    firstNum = 7 * (weekNumber - 1) - startDay + 1
    endNum = firstNum + 6
  }

  if (firstNum === endNum) {
    return firstNum
  }
  return firstNum + " - " + endNum
}


const getStartOfWeek = (month, year, weekNumber) => {
  const day = new Date(year, month, 1)
  const weeksOfMonth = getWeeksOfMonth(day)
  const startDay = day.getDay()
  let daysInMonth = new Date(year, month + 1, 0)
  daysInMonth = daysInMonth.getDate()
  let firstNum

  if (weekNumber === 1) {
    firstNum = 1
  } else if (weekNumber === weeksOfMonth) {
    firstNum = 7 * (weeksOfMonth - 2) + (7 - startDay) + 1
  } else {
    firstNum = 7 * (weekNumber - 1) - startDay + 1
  }

  return firstNum 
}


const getWeekArray = (month, year, weekNumber) => {
  const daysInMonth = new Date(year, month + 1, 0)
  const lastMonth = new Date(year, month, 0)
  const day = new Date(year, month, 1)
  const weeksOfMonth = getWeeksOfMonth(day)
  const startDay = day.getDay()
  let firstDay, endDay
  let weekArray = []

    if (weekNumber === 1){
      endDay = 7 - startDay 
      firstDay = lastMonth.getDate() + 1 - startDay
      
      for (let i = 0; i < 7; i++){
        if (i < startDay){
          weekArray[i] = {month: (month - 1), day: (firstDay + i)}
        }else{
          weekArray[i] = {month: month, day: (1 + (i - startDay))}
        }
      }
    }else if (weekNumber === weeksOfMonth){
      firstDay = 7 * (weeksOfMonth - 2) + (7 - startDay) + 1
      endDay = 7 - daysInMonth.getDay()

      for (let i = 0; i < 7; i++){
        if (i <= daysInMonth.getDay()){
          weekArray[i] = {month: (month), day: (firstDay + i)}
        }else{
          weekArray[i] = {month: (month + 1), day: (endDay - (i - daysInMonth.getDay()))}
        }
      }
    }else{
      firstDay = 7 * (weekNumber - 1) - startDay + 1
      for (let i = 0; i < 7; i++){
        weekArray[i] = {month: (month), day: (firstDay + i)}
      }
    }
    return weekArray
}

const getMilitaryTime = (timeString) => {
  const splitArray = timeString.split(":")
  let hours = parseInt(splitArray[0])
  const minutes = splitArray[1].substring(0, 2)
  let afternoon = false

  if (splitArray[1].substring(2, 3) == "p"){
    afternoon = true
    hours += 12
  }
  return ({hours: hours, minutes: minutes})
  
}

export { getWeekOfMonth, getWeeksOfMonth, getWeekDateRange, getStartOfWeek, getWeekArray, getMilitaryTime }
