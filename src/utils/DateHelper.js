import { dayNames, shortDayNames } from "./Strings"
//Takes a Date object
//Returns an integer number representing the number of weeks
//of a month
export const getWeeksOfMonth = day => {
  const firstDay = new Date(day.setDate(1)).getDay()
  const totalDays = new Date(day.getFullYear(), day.getMonth() + 1, 0).getDate()
  return Math.ceil((firstDay + totalDays) / 7)
}

//Returns an integer number representing the week of the month
//depending on the selected day
export const getWeekOfMonth = (year, month, day) => {
  const firstWeekday = new Date(year, month, 1).getDay()
  const d = new Date(year, month, day)
  const offsetDate = d.getDate() + firstWeekday - 1
  return Math.floor(offsetDate / 7) + 1
}

export const getWeekDateRange = (month, year, weekNumber) => {
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
    return [firstNum, ""]
  }
  return [firstNum, endNum]
}

export const getDaysInMonth = (year, month) => {
  let d = new Date(year, month + 1, 0)
  return d
}

export const getStartOfWeek = (month, year, weekNumber) => {
  const day = new Date(year, month, 1)
  const weeksOfMonth = getWeeksOfMonth(day)
  const startDay = day.getDay()
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

export const getWeekArray = (month, year, weekNumber) => {
  const daysInMonth = new Date(year, month + 1, 0)
  const lastMonth = new Date(year, month, 0)
  const day = new Date(year, month, 1)
  const weeksOfMonth = getWeeksOfMonth(day)
  const startDay = day.getDay()
  let firstDay
  let weekArray = []

  if (weekNumber === 1) {
    firstDay = lastMonth.getDate() + 1 - startDay

    for (let i = 0; i < 7; i++) {
      if (i < startDay) {
        let newMonth
        if (month - 1 === -1){
          newMonth = 11
        }else{
          newMonth = month - 1
        }
        weekArray[i] = {
          month: newMonth,
          day: firstDay + i,
          dayNameFull: dayNames[i],
          dayName: shortDayNames[i]
        }
      } else {
        weekArray[i] = {
          month: month,
          day: 1 + (i - startDay),
          dayNameFull: dayNames[i],
          dayName: shortDayNames[i]
        }
      }
    }
  } else if (weekNumber === weeksOfMonth) {
    firstDay = 7 * (weeksOfMonth - 2) + (7 - startDay) + 1

    for (let i = 0; i < 7; i++) {
      if (i <= daysInMonth.getDay()) {
        weekArray[i] = {
          month: month,
          day: firstDay + i,
          dayNameFull: dayNames[i],
          dayName: shortDayNames[i]
        }
      } else {
        let newMonth
        if (month + 1 === 12){
          newMonth = 0
        }else{
          newMonth = month + 1
        }
        weekArray[i] = {
          month: newMonth,
          day: i - daysInMonth.getDay(),
          dayNameFull: dayNames[i],
          dayName: shortDayNames[i]
        }
      }
    }
  } else {
    firstDay = 7 * (weekNumber - 1) - startDay + 1
    for (let i = 0; i < 7; i++) {
      weekArray[i] = {
        month: month,
        day: firstDay + i,
        dayNameFull: dayNames[i],
        dayName: shortDayNames[i]
      }
    }
  }
  return weekArray
}

export const getMilitaryTime = timeString => {
    timeString = timeString.toUpperCase()
    const reg = new RegExp("^([0-9]|0[0-9]|1?[0-9]|2[0-3]):[0-5]?[0-9][A-Z]")
    const reg2 = new RegExp("^([0-9]|0[0-9]|1?[0-9]|2[0-3]):[0-5]?[0-9] [A-Z]")
    let hours, minutes
    if (reg.test(timeString) === true){
      const splitArray = timeString.split(":")
      hours = parseInt(splitArray[0], 10)
      minutes = splitArray[1].substring(0, 2)

      if (splitArray[1].substring(2, 3) === "P" && hours !== 12) {
        hours += 12
      }
    }else if (reg2.test(timeString) === true){
      const splitArray = timeString.split(":")
      hours = parseInt(splitArray[0], 10)
      minutes = splitArray[1].substring(0, 2)

      if (splitArray[1].substring(3, 4) === "P" && hours !== 12) {
        hours += 12
      }
    }else{
      console.error("Invalid start time:", timeString)
    }

  return { hours: hours, minutes: parseInt(minutes, 10) }
}

//This method is used in the day and week view components to determine
//how far eventButtons should be extended past their half hour slot. If
//sizing is changed in the CSS, one must make sure to reevaluate the 4.6
//number
export const getDesiredHeight = (starttime, endtime) => {
  const startObj = getMilitaryTime(starttime)
  const endObj = getMilitaryTime(endtime)
  const startHour = startObj.hours
  const startMinutes = startObj.minutes
  const endHour = endObj.hours
  const endMinutes = endObj.minutes
  const minutes = (endMinutes - startMinutes) / 60
  const hours = endHour - startHour
  return (hours + minutes) * 200
}

//Similar to the getDesiredHeight() method, this method determines
//how much a top margin the events in week and day view should have.
//This is seen if a class starts at 2:15 or some other non half-hour time
export const getStartPadding = starttime => {
  let startMinutes = getMilitaryTime(starttime).minutes
  if (startMinutes > 30) {
    startMinutes -= 30
  } else if (startMinutes === 30) {
    startMinutes = 0
  }
  startMinutes /= 30
  return startMinutes * 27
}
