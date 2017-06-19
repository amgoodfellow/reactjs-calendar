import React, { Component } from "react"
import { dayNames, shortDayNames } from "./../utils/Strings"
import { withStyles, createStyleSheet } from "material-ui/styles"
import Typography from "material-ui/Typography"
import PropTypes from "prop-types"
import Paper from "material-ui/Paper"
import Toolbar from "material-ui/Toolbar"
import { getWeeksOfMonth, getDaysInMonth } from "./../utils/DateHelper"
import DayCard from "./DayCard"
import DayBoxSchedule from "./DayBoxSchedule"
import { getEvents } from "./../api/api"

const styleSheet = createStyleSheet("MonthView", theme => ({
  root: {
    display: "flex",
    position: "relative",
    height: "550px"
  },
  dayDiv: {
    position: "relative",
    width: "20%"
  },
  dayTitleBar: {
    position: "relative",
    height: "50px",
    borderBottom: "1px solid transparent",
    color: "#FFFFFF"
  },
  monthDiv: {
    width: "80%",
    height: "100%",
    overflow: "hidden"
  },
  monthTitleBar: {
    position: "relative",
    height: "50px"
  },
  table: {
    width: "100%",
    borderTop: "hidden",
    borderLeft: "1px solid white",
    borderRight: "hidden",
    borderCollapse: "collapse",
    height: "100%"
  },
  tableHead: {
    border: "1px solid rgba(0, 0, 0, 0.075)",
    color: "#000000",
    opacity: 0.8,
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

class MonthView extends Component {
  constructor() {
    super()
    this.monthDayCounter = 1
  }

  displayWeekDay() {
    let day = new Date(
      this.props.currentDateRange.year,
      this.props.currentDateRange.month,
      this.props.currentDateRange.day
    )
    let date = day.getDate()
    let weekDay = day.getDay()
    for (let i = 0; i < 7; i++) {
      if (weekDay === i) {
        weekDay = dayNames[i]
      }
    }
    return weekDay + " " + date
  }

  getMonthRows = () => {
    let first = new Date(
      this.props.currentDateRange.year,
      this.props.currentDateRange.month,
      1
    )
    let wks = getWeeksOfMonth(first)
    let rows = []

    for (let i = 0; i < wks; i++) {
      rows.push(
        <tr
          style={{
            maxHeight: "99px",
            minHeight: "84px"
          }}
        >
          {this.getDays(i)}
        </tr>
      )
    }
    this.monthDayCounter = 1
    return rows
  }

  getDays = wk => {
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
          <td
            style={{
              fontSize: "15px",
              border: "1px solid white",
              padding: "10px",
              backgroundColor: "#E0E0E0",
              maxHeight: "99px",
              minHeight: "84px"
            }}
          />
        )
      } else if (
        this.monthDayCounter === 1 &&
        wk === 0 &&
        first.getDay() !== i
      ) {
        days.push(
          <td
            style={{
              fontSize: "15px",
              border: "1px solid white",
              padding: "10px",
              backgroundColor: "#E0E0E0",
              maxHeight: "99px",
              minHeight: "84px"
            }}
          />
        )
      } else {
        if (
          this.props.currentDateRange.year === today.getFullYear() &&
          this.props.currentDateRange.month === today.getMonth() &&
          this.monthDayCounter === today.getDate()
        ) {
          let dateObj = this.props.currentDateRange
          let localDay = this.monthDayCounter
          let newDateObj = {
            year: dateObj.year,
            month: dateObj.month,
            week: dateObj.week,
            day: localDay
          }
          days.push(
            <td
              key={this.monthDayCounter}
              tabIndex="0"
              onClick={() => this.props.changeDateRange(newDateObj)}
              style={{
                fontSize: "15px",
                fontWeight: "bold",
                color: "#000000",
                border: "1px solid white",
                padding: "10px",
                backgroundColor: "rgba(86,162,100, 0.4)",
                maxHeight: "99px",
                minHeight: "84px"
              }}
            >
              <Typography
                type="body1"
                component="div"
                style={{ fontWeight: "600" }}
              >
                {this.monthDayCounter}
                <DayBoxSchedule
                  calendarMeeting={this.props.calendar}
                  year={this.props.currentDateRange.year}
                  month={this.props.currentDateRange.month}
                  day={this.monthDayCounter}
                />
              </Typography>
            </td>
          )
        } else {
          let dateObj = this.props.currentDateRange
          let localDay = this.monthDayCounter
          let newDateObj = {
            year: dateObj.year,
            month: dateObj.month,
            week: dateObj.week,
            day: localDay
          }
          days.push(
            <td
              key={this.monthDayCounter}
              tabIndex="0"
              onClick={() => this.props.changeDateRange(newDateObj)}
              style={{
                fontSize: "15px",
                border: "1px solid white",
                padding: "10px",
                maxHeight: "99px",
                minHeight: "84px"
              }}
            >
              <Typography type="body1" component="div">
                {this.monthDayCounter}
                <DayBoxSchedule
                  calendarMeeting={this.props.calendar}
                  year={this.props.currentDateRange.year}
                  month={this.props.currentDateRange.month}
                  day={this.monthDayCounter}
                />
              </Typography>

            </td>
          )
        }
        this.monthDayCounter++
      }
    }
    return days
  }

  weekDays() {
    let weekDaysRow = []

    for (let i = 0; i < 7; ++i) {
      weekDaysRow.push(
        <td key={weekDaysRow[i]} style={{ width: "100rem" }}>
          <Typography type="body1" component="div" style={{ fontWeight: 600 }}>
            {shortDayNames[i]}
          </Typography>
        </td>
      )
    }
    return weekDaysRow
  }

  render() {
    const classes = this.props.classes
    return (
      <Paper
        tabIndex="0"
        aria-label={"Month View Calendar"}
        className={classes.root}
      >
        <div aria-label="Day schedule" className={classes.dayDiv}>
          <Toolbar className={classes.dayTitleBar}>
            <Typography
              type="title"
              style={{ fontWeight: "bold", opacity: 0.9 }}
            >
              {this.displayWeekDay()}
            </Typography>
          </Toolbar>
          <DayCard
            calendarMeeting={this.props.calendar}
            year={this.props.currentDateRange.year}
            month={this.props.currentDateRange.month}
            day={this.props.currentDateRange.day}
          />

        </div>
        <div className={classes.monthDiv}>
          <table className={classes.table}>
            <thead className={classes.tableHead}>
              <tr style={{ height: "50px" }}>
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

MonthView.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styleSheet)(MonthView)
