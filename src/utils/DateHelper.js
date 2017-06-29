
import { dayNames, shortDayNames } from "./Strings"

//Params: Date Object
//Output: int number
//Desc: A function that takes a date object and returns
//the number of weeks in that date's month
const getWeeksOfMonth = (day: Date) => {
  const firstDay = new Date(day.setDate(1)).getDay()
  const totalDays = new Date(day.getFullYear(), day.getMonth() + 1, 0).getDate()
  return Math.ceil((firstDay + totalDays) / 7)
}

//Params: int month, int year, int week of month
//Output: int saying how many weeks are in a month
//Desc: Returns an integer number representing the week of the month
//depending on the selected day
//https://stackoverflow.com/a/36036273
const getWeekOfMonth = (year: number, month: number, day: number) => {
  const firstWeekday = new Date(year, month, 1).getDay()
  const d = new Date(year, month, day)
  const offsetDate = d.getDate() + firstWeekday - 1
  return Math.floor(offsetDate / 7) + 1
}

//Params: int month, int year, int week of month
//Output: Array of start and end dates of week
//Desc: Returns an array of integers - the 0th index being the start date
//of the week, and then the 1st index is the end date
const getWeekDateRange = (month: number, year: number, weekNumber: number) => {
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

const getDaysInMonth = (year, month) => {
  let d = new Date(year, month + 1, 0)
  return d
}

//Params: int month, int year, int week of month
//Output: int first number (date) of given week
//Desc: given a month, year, and weeknumber, this method
//returns the date of the first day in the week
const getStartOfWeek = (month: number, year: number, weekNumber: number) => {
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

//Params: int month, int year, int week of month
//Output: Array of objects containing the integer month and date
//Desc: This method, given a month year and week number, will return
//the month and day associated with the ith day of the week
const getWeekArray = (month: number, year: number, weekNumber: number) => {
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
        weekArray[i] = {
          month: month - 1,
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
        weekArray[i] = {
          month: month + 1,
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

//Params: A string that looks like '10:00pm'
//Output: An object with minute and hour attributes in military (24 hour) time
//Desc: This method take a human readable time string and transforms it into
//an object with hour and minute attributes
const getMilitaryTime = (timeString: string) => {
  const splitArray = timeString.split(":")
  let hours = parseInt(splitArray[0], 10)
  const minutes = splitArray[1].substring(0, 2)

  if (splitArray[1].substring(2, 3) === "p") {
    hours += 12
  }
  return {
    hours: hours,
    minutes: minutes
  }
}

//Params: start and end time human readable strings
//Output: an integer number representing the percentage height a weekview event should take up
//Desc: This method is used in the day and week view components to determine
//how far eventButtons should be extended past their half hour slot.
const getDesiredHeight = (starttime: string, endtime: string) => {
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

//Params: start time human readable string
//Output: an integer number representing the pixels of padding that a weekview event should have
//Desc: Similar to the getDesiredHeight() method, this method determines
//how much a top margin the events in week and day view should have.
//This is seen if a class starts at 2:15 or some other non half-hour time
const getStartPadding = (starttime: string) => {
  let startMinutes = getMilitaryTime(starttime).minutes
  if (startMinutes > 30) {
    startMinutes -= 30
  } else if (startMinutes === 30) {
    startMinutes = 0
  }
  startMinutes /= 30
  return startMinutes * 27
}

export {
  getStartPadding,
  getWeekOfMonth,
  getWeeksOfMonth,
  getWeekDateRange,
  getStartOfWeek,
  getWeekArray,
  getMilitaryTime,
  getDesiredHeight,
  getDaysInMonth
}
