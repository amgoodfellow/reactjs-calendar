import React, { Component } from "react"
import { prettyHours, dayNames, shortDayNames } from "./../utils/Strings"
import { getStartOfWeek, getWeekArray } from "./../utils/DateHelper"

const columnStyle = {
  width: "14%",
  height: "100%",
  textAlign: "center"
}

const hourColStyle = {
  display: "flex",
  flexDirection: "column",
  width: "5%"
}

const hourCol = () => {
  let column = [<div style={{ height: "1.8%" }} />]
  for (let i = 0, size = prettyHours.length; i < size; i++) {
    column.push(
      <div
        style={{ textAlign: "center", height: "5.72%" }}
        key={prettyHours[i]}
      >
        {prettyHours[i]}
      </div>
    )
  }
  return column
}

const weekCol = meetings => {
  let column = []
  for (let i = 0; i < 34; i++) {
    //if there is a meeting happening today (the math is necessary since the weekview isn't 24 hours)
    if (
      meetings !== null &&
      meetings !== undefined &&
      meetings[0].starttime.substring(0, 2) * 2 - 14 === i
    ) {
      column.push(
        <div
          key={"weekCol" + i}
          style={{ border: "1px solid lightgrey", height: "2.65%" }}
        >
          <button
            style={{
              backgroundColor: "lightblue",
              border: "none",
              width: "100%",
              height: "250%"
            }}
          >
            {meetings[0].coursetitle}
          </button>
        </div>
      )
    } else {
      column.push(
        <div
          key={"weekCol" + i}
          style={{ border: "1px solid lightgrey", height: "2.65%" }}
        />
      )
    }
  }
  return column
}

class Weekview extends Component {
  getWeekCol = () => {
    const currentDate = this.props.currentDateRange
    const startOfWeek = getStartOfWeek(
      currentDate.month,
      currentDate.year,
      currentDate.week
    )
    let weekcols = []
    for (let i = 0; i < 7; i++) {
      let a = ""
      try {
        a = weekCol(this.props.meetings[currentDate.month][startOfWeek + i])
      } catch (err) {
        a = weekCol(null)
      }
      weekcols.push(
        <div style={columnStyle}>
          <div style={{ height: "2.7%" }}>
            {dayNames[i]}
          </div>
          {a}
        </div>
      )
    }
    return weekcols
  }

  render() {
    const currentDate = this.props.currentDateRange
    const startOfWeek = getStartOfWeek(
      currentDate.month,
      currentDate.year,
      currentDate.week
    )
    console.log(
      getWeekArray(currentDate.month, currentDate.year, currentDate.week)
    )
    return (
      <div style={{ border: "1px solid black", height: 950, display: "flex" }}>
        <div style={hourColStyle}>
          {hourCol()}
        </div>
        {this.getWeekCol()}
      </div>
    )
  }
}

export default Weekview
