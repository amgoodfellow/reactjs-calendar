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

export { getWeekOfMonth, getWeeksOfMonth, getWeekDateRange }
