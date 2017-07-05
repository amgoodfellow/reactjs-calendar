import React, { Component } from "react"
import PropTypes from "prop-types"
import { prettyHours, shortDayNames, monthNames } from "../utils/Strings"
import { withStyles, createStyleSheet } from "material-ui/styles"
import {
  getStartPadding,
  getDesiredHeight,
  getWeekArray,
  getMilitaryTime
} from "../utils/DateHelper"
import Typography from "material-ui/Typography"

const styleSheet = createStyleSheet("Weekview", theme => ({
  weekContent: {
    border: "1px solid black",
    height: 950,
    display: "flex",
    fontFamily: "Arimo"
  },
  weekBox: {
    border: "1px solid lightgrey",
    height: "2.65%"
  },

  buttonStyles: {
    backgroundColor: "#0074b7",
    color: "white",
    fontWeight: "bold",
    border: "none",
    width: "100%"
  },

  dayHeader: {
    height: "2.7%",
    color: "black",
    opacity: ".7",
    border: "1px solid rgba(0, 0, 0, 0.075)",
    fontWeight: "bold",
    fontSize: "medium"
  },

  hourColumn: {
    display: "flex",
    flexDirection: "column",
    width: "5%",
    minWidth: 40
  },

  weekColumn: {
    width: "14%",
    height: "100%",
    textAlign: "center"
  },

  hourHeader: {
    height: "5.72%",
    color: "black",
    opacity: ".7",
    fontWeight: "bold",
    textAlign: "center",
    minWidth: 40,
    marginRight: 1
  }
}))

const hourCol = classes => {
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
      <Typography
        component="div"
        className={classes.hourHeader}
        key={prettyHours[i]}
      >
        {prettyHours[i]}
      </Typography>
    )
  }
  return column
}

const newWeekCol = (meetings, weekArrayObj, classes) => {
  let column = []
  for (let i = 0; i < 34; i++) {
    column.push(
      <Typography
        component="div"
        key={weekArrayObj.day + "-" + i}
        className={classes.weekBox}
      />
    )
  }
  if (!Object.is(meetings, null) && !Object.is(meetings, undefined)) {
    for (let j = 0; j < meetings.length; j++) {
      let colIndex = getMilitaryTime(meetings[j].starttime).hours * 2 - 14
      let desiredHeight = getDesiredHeight(
        meetings[j].starttime,
        meetings[j].endtime
      )
      let elemHeight = {
        height: desiredHeight.toString() + "%",
        marginTop: getStartPadding(meetings[j].starttime) + "px",
        backgroundColor: meetings[j].color
      }
      let aria = `${meetings[j].coursename} on ${monthNames[
        weekArrayObj.month
      ]} ${weekArrayObj.day} at ${meetings[j].starttime}`
      column[colIndex] = (
        <Typography
          component="div"
          key={weekArrayObj.day + "-" + colIndex}
          id={"weekCol-" + weekArrayObj.day + "-" + colIndex}
          className={classes.weekBox}
        >
          <button
            aria-label={aria}
            tabIndex="0"
            className={classes.buttonStyles}
            style={elemHeight}
          >
            {meetings[j].coursetitle + "\n"}
          </button>
        </Typography>
      )
    }
  }
  return column
}

class Weekview extends Component {
  getWeekCol = () => {
    const currentDate = this.props.currentDateRange
    const classes = this.props.classes
    let weekcols = []
    let weekArray = getWeekArray(
      currentDate.month,
      currentDate.year,
      currentDate.week
    )
    for (let i = 0; i < 7; i++) {
      let weekGrid = ""
      try {
        weekGrid = newWeekCol(
          this.props.meetings[weekArray[i].month][weekArray[i].day],
          weekArray[i],
          classes
        )
      } catch (err) {
        weekGrid = newWeekCol(null, weekArray, classes)
      }
      weekcols.push(
        <div className={classes.weekColumn} key={"hourDiv" + i}>
          <Typography component="div" className={classes.dayHeader}>
            {shortDayNames[i]}
          </Typography>
          {weekGrid}
        </div>
      )
    }
    return weekcols
  }

  render() {
    const classes = this.props.classes
    return (
      <div className={classes.weekContent}>
        <div className={classes.hourColumn}> {hourCol(classes)} </div>{" "}
        {this.getWeekCol()}
      </div>
    )
  }
}

Weekview.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styleSheet)(Weekview)
