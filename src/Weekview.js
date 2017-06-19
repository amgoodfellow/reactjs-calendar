import React, { Component } from "react"
import { prettyHours, shortDayNames } from "./utils/Strings"
import {
  getStartPadding,
  getDesiredHeight,
  getStartOfWeek,
  getWeekArray,
  getMilitaryTime
} from "./utils/DateHelper"
import Typography from "material-ui/Typography"

const columnStyle = {
  width: "14%",
  height: "100%",
  textAlign: "center"
}

const hourColStyle = {
  display: "flex",
  flexDirection: "column",
  width: "5%",
  minWidth: 40
}

const dayHeaderStyle = {
  height: "2.7%",
  color: "black",
  opacity: ".7",
  border: "1px solid rgba(0, 0, 0, 0.075)",
  fontWeight: "bold",
  fontSize: "medium"
}

const hourHeaderStyle = {
  height: "5.72%",
  color: "black",
  opacity: ".7",
  fontWeight: "bold",
  textAlign: "center",
  minWidth: 40,
  marginRight: 1
}

const buttonStyles = {
  backgroundColor: "#0074b7",
  color: "white",
  fontWeight: "bold",
  border: "none",
  width: "100%"
}

const hourCol = () => {
  let column = [
    <div
      key="TopLeftCorner"
      style={{
        height: "1.8%"
      }}
    />
  ]
  for (let i = 0, size = prettyHours.length; i < size; i++) {
    column.push(
      <Typography component="div" style={hourHeaderStyle} key={prettyHours[i]}>
        {" "}{prettyHours[i]}
        {" "}
      </Typography>
    )
  }
  return column
}

const weekCol = meetings => {
  let column = []
  for (let i = 0; i < 34; i++) {
    //if there is a meeting happening today (the math is necessary since the weekview isn't 24 hours)
    if (meetings !== null && meetings !== undefined) {
      let shouldPushClass = false
      let meetingdata = ""
      let elemHeight
      for (let j = 0; j < meetings.length; j++) {
        if (getMilitaryTime(meetings[j].starttime).hours * 2 - 14 == i) {
          shouldPushClass = true
          meetingdata = meetings[j]
          elemHeight = {
            height:
              getDesiredHeight(meetingdata.starttime, meetingdata.endtime) +
                "%",
            marginTop: getStartPadding(meetingdata.starttime) + "px"
          }
        }
      }
      if (shouldPushClass === true) {
        column.push(
          <div
            style={{
              border: "1px solid lightgrey",
              height: "2.65%"
            }}
          >
            <button style={Object.assign(buttonStyles, elemHeight)}>
              {" "}{"class"}{""}{elemHeight.marginTop}
              {" "}
            </button>
            {" "}
          </div>
        )
      } else {
        column.push(
          <div
            style={{
              border: "1px solid lightgrey",
              height: "2.65%"
            }}
          />
        )
      }
    } else {
      column.push(
        <div
          style={{
            border: "1px solid lightgrey",
            height: "2.65%"
          }}
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
      let weekGrid = ""
      try {
        weekGrid = weekCol(
          this.props.meetings[currentDate.month][startOfWeek + i]
        )
      } catch (err) {
        weekGrid = weekCol(null)
      }
      weekcols.push(
        <div style={columnStyle}>
          <Typography component="div" style={dayHeaderStyle}>
            {" "}{shortDayNames[i]}
            {" "}
          </Typography>
          {" "}{weekGrid}
          {" "}
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
    return (
      <div
        style={{
          border: "1px solid black",
          height: 950,
          display: "flex",
          fontFamily: "Arimo"
        }}
      >
        <div style={hourColStyle}> {hourCol()} </div> {this.getWeekCol()}
        {" "}
      </div>
    )
  }
}

export default Weekview
