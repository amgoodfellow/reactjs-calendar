/* flow */
import React, { Component } from "react"
import { shortDayNames } from "./../utils/Strings"
import { withStyles, createStyleSheet } from "material-ui/styles"
import Typography from "material-ui/Typography"
import PropTypes from "prop-types"
import Paper from "material-ui/Paper"
import { getWeeksOfMonth, getDaysInMonth } from "./../utils/DateHelper"
import FiberManualRecord from "material-ui-icons/FiberManualRecord"
import { getWeekOfMonth } from "./../utils/DateHelper"
import { monthNames } from "./../utils/Strings"
import { pink } from "material-ui/colors"

const stylesheet = createStyleSheet("MobileMonthView", theme => ({
  dayRow: {
    height: "50px"
  },

  rowHeight: {
    height: "100px"
  },

  addMargin: {
    marginTop: "1.3em"
  },

  todayNumber: {
    marginLeft: "5px",
    marginTop: "5px",
    fontWeight: "600"
  },

  otherDayNumber: {
    marginTop: "5px",
    marginLeft: "5px"
  },

  eventIcon: {
    fill: pink[600],
    width: "15px",
    height: "15px",
    marginTop: "1.3em"
  },

  monthRow: {
    height: "100px"
  },

  root: {
    height: "100%"
  },

  pastMonthDay: {
    fontSize: "15px",
    border: "1px solid white",
    padding: "10px",
    backgroundColor: "#E0E0E0"
  },

  currentDay: {
    fontSize: "15px",
    fontWeight: "bold",
    color: "#000000",
    border: "1px solid white",
    backgroundColor: "rgba(86,162,234, 0.5)"
  },

  monthDay: {
    fontSize: "15px",
    border: "1px solid white"
  },

  event: {
    display: "flex",
    justifyContent: "center"
  },

  monthDiv: {
    height: "100%"
  },

  monthTitleBar: {
    position: "relative",
    height: "50px"
  },

  table: {
    width: "100%",
    borderTop: "hidden",
    borderLeft: "hidden",
    borderRight: "hidden",
    borderCollapse: "collapse",
    height: "100%"
  },

  tableHead: {
    border: "1px solid rgba(0, 0, 0, 0.075)",
    color: "#000000",
    opacity: 0.7,
    textAlign: "center",
    fontWeight: "bold",
    borderTop: "hidden",
    height: "20%"
  },

  tableBody: {
    backgroundColor: "rgb(255,243,233)",
    color: "#000000",
    textAlign: "left",
    verticalAlign: "top"
  }
}))

class MobileMonthView extends Component {
  constructor() {
    super()
    this.state = {
      width: window.outerWidth,
      currentDay: null,
      events: null
    }
    this.monthDayCounter = 1
  }
  // @flow
  handleEventClick = (year: string, month: string, day: string) => {
    let week = getWeekOfMonth(year, month, day)
    this.props.updateClicked(year, month, week, day)
  }

  handleKeyDown = (e: any, year: string, month: string, day: string) => {
    if (Object.is(e.keyCode, 13) || Object.is(e.keyCode, 32)) {
      e.preventDefault()
      let week = getWeekOfMonth(year, month, day)
      this.props.updateClicked(year, month, week, day)
    }
  }

  weekDays = () => {
    let weekDaysRow = []

    for (let i = 0; i < 7; ++i) {
      weekDaysRow.push(
        <td key={i + Math.random()} style={{ width: "100rem" }}>
          <Typography type="body1" component="div" style={{ fontWeight: 600 }}>
            {shortDayNames[i]}
          </Typography>
        </td>
      )
    }
    return weekDaysRow
  }

  getMonthRows = () => {
    const classes = this.props.classes
    let first = new Date(
      this.props.currentDateRange.year,
      this.props.currentDateRange.month,
      1
    )
    let wks = getWeeksOfMonth(first)
    let rows = []

    for (let i = 0; i < wks; i++) {
      rows.push(
        <tr className={classes.rowHeight} key={i + Math.random()}>
          {this.getDays(i)}
        </tr>
      )
    }
    this.monthDayCounter = 1
    return rows
  }

  // @flow
  getDays = (wk: number) => {
    const classes = this.props.classes
    let days = []
    let numDays = getDaysInMonth(
      this.props.currentDateRange.year,
      this.props.currentDateRange.month
    ).getDate()

    let first = new Date(
      this.props.currentDateRange.year,
      this.props.currentDateRange.month,
      1
    )

    let today = new Date()
    for (let i = 0; i < 7; i++) {
      if (this.monthDayCounter > numDays) {
        days.push(
          <td key={i + Math.random()} className={classes.pastMonthDay} />
        )
      } else if (
        this.monthDayCounter === 1 &&
        wk === 0 &&
        first.getDay() !== i
      ) {
        days.push(
          <td key={i + Math.random()} className={classes.pastMonthDay} />
        )
      } else {
        if (
          Object.is(this.props.currentDateRange.year, today.getFullYear()) &&
          Object.is(this.props.currentDateRange.month, today.getMonth()) &&
          Object.is(this.monthDayCounter, today.getDate())
        ) {
          if (
            !Object.is(
              this.props.events[this.props.currentDateRange.month],
              undefined
            ) &&
            !Object.is(
              this.props.events[this.props.currentDateRange.month][
                this.monthDayCounter
              ],
              undefined
            )
          ) {
            let scopedDayNumber = this.monthDayCounter
            days.push(
              <td
                tabIndex="0"
                aria-label={
                  "View events for " +
                    monthNames[this.props.currentDateRange.month] +
                    " " +
                    scopedDayNumber +
                    " " +
                    this.props.currentDateRange.year +
                    " in the schedule view."
                }
                onClick={(day, month, year) =>
                  this.handleEventClick(
                    this.props.currentDateRange.year,
                    this.props.currentDateRange.month,
                    scopedDayNumber
                  )}
                onKeyDown={(e, day, month, year) =>
                  this.handleKeyDown(
                    e,
                    this.props.currentDateRange.year,
                    this.props.currentDateRange.month,
                    scopedDayNumber
                  )}
                key={i + Math.random() + this.monthDayCounter}
                className={classes.currentDay}
              >
                <Typography
                  type="body1"
                  component="div"
                  className={classes.todayNumber}
                >
                  {this.monthDayCounter}
                </Typography>
                <div className={classes.event}>
                  <FiberManualRecord className={classes.eventIcon} />
                </div>
              </td>
            )
          } else {
            days.push(
              <td
                key={i + Math.random() + this.monthDayCounter}
                className={classes.currentDay}
              >
                <Typography
                  type="body1"
                  component="div"
                  className={classes.todayNumber}
                >
                  {this.monthDayCounter}
                </Typography>
                <div className={classes.addMargin} />
              </td>
            )
          }
        } else {
          if (
            !Object.is(
              this.props.events[this.props.currentDateRange.month],
              undefined
            ) &&
            !Object.is(
              this.props.events[this.props.currentDateRange.month][
                this.monthDayCounter
              ],
              undefined
            )
          ) {
            let scopedDayNumber = this.monthDayCounter
            days.push(
              <td
                tabIndex="0"
                aria-label={
                  "View events for " +
                    monthNames[this.props.currentDateRange.month] +
                    " " +
                    scopedDayNumber +
                    " " +
                    this.props.currentDateRange.year +
                    " in the schedule view."
                }
                onClick={(day, month, year) =>
                  this.handleEventClick(
                    this.props.currentDateRange.year,
                    this.props.currentDateRange.month,
                    scopedDayNumber
                  )}
                onKeyDown={(e, day, month, year) =>
                  this.handleKeyDown(
                    e,
                    this.props.currentDateRange.year,
                    this.props.currentDateRange.month,
                    scopedDayNumber
                  )}
                key={i + Math.random() + this.monthDayCounter}
                className={classes.monthDay}
              >
                <Typography
                  type="body1"
                  component="div"
                  className={classes.otherDayNumber}
                >
                  {this.monthDayCounter}
                </Typography>
                <div className={classes.event}>
                  <FiberManualRecord className={classes.eventIcon} />
                </div>
              </td>
            )
          } else {
            days.push(
              <td
                key={i + Math.random() + this.monthDayCounter}
                className={classes.monthDay}
              >
                <Typography
                  type="body1"
                  component="div"
                  className={classes.otherDayNumber}
                >
                  {this.monthDayCounter}
                </Typography>
                <div className={classes.addMargin} />
              </td>
            )
          }
        }
        this.monthDayCounter++
      }
    }
    return days
  }

  render() {
    const classes = this.props.classes
    return (
      <Paper className={classes.root}>
        <div className={classes.monthDiv}>
          <table className={classes.table}>
            <thead className={classes.tableHead}>
              <tr className={classes.dayRow}>
                {this.weekDays()}
              </tr>
            </thead>
            <tbody className={classes.tableBody}>
              {this.getMonthRows()}
            </tbody>
          </table>
        </div>
      </Paper>
    )
  }
}

MobileMonthView.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(stylesheet)(MobileMonthView)
