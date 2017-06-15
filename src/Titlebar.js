import React, { Component } from "react"
import IconButton from "material-ui/IconButton"
import NavigateBefore from "material-ui-icons/NavigateBefore"
import NavigateNext from "material-ui-icons/NavigateNext"
import MoreVert from "material-ui-icons/MoreVert"
import Menu, { MenuItem } from "material-ui/Menu"
import { withStyles, createStyleSheet } from "material-ui/styles"
import PropTypes from "prop-types"
import AppBar from "material-ui/AppBar"
import Toolbar from "material-ui/Toolbar"
import Typography from "material-ui/Typography"
import { monthNames } from "./utils/Strings"
import {
  getWeekDateRange,
  getWeekOfMonth,
  getWeeksOfMonth
} from "./utils/DateHelper"

const styleSheet = createStyleSheet("SimpleAppBar", theme => ({
  root: {
    position: "relative",
    marginTop: 30,
    width: "100%"
  },
  appBar: {
    position: "relative"
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between"
  },
  paginator: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: 'white'
  },
  icons: {
    color: "white"
  },
  dateRange: {
    color: 'inherit',
    width: 120
  }
}))

class Titlebar extends Component {
  state = {
    anchorEl: undefined,
    open: false,
    selected: ""
  }

  handleClick = event => {
    this.setState({ open: true, anchorEl: event.currentTarget })
  }

  handleRequestClose = () => {
    this.setState({ open: false })
  }

  paginateForward = () => {
    let termEnd = new Date(this.props.termBounds[1])
    console.log(termEnd)

    const endMonth = termEnd.getMonth()
    const endYear = termEnd.getFullYear()
    const endDay = termEnd.getDate()
    const endWeek = getWeekOfMonth(endYear, endMonth, endDay)
    let dateObj = this.props.currentDateRange

    switch (this.props.calendarType) {
      case "monthview":
        if (dateObj.month === endMonth) {
          alert("end of term reached")
          return
        }
        if (dateObj.month === 11) {
          console.log("It is December")
          dateObj.year++
          dateObj.month = 0
          this.props.changeDateRange(dateObj)
        } else {
          console.log("paginate normally")
          dateObj.month++
          this.props.changeDateRange(dateObj)
        }

        break

      case "weekview":
      case "scheduleview":
      default:
        if (dateObj.month === endMonth && dateObj.week === endWeek) {
          console.log(dateObj)
          console.log(termEnd)
          alert("end of term reached")
        } else {
          let dayOfMonth = new Date(dateObj.year, dateObj.month, dateObj.day)
          if (getWeeksOfMonth(dayOfMonth) === dateObj.week) {
            dateObj.month++
            dateObj.week = 1
            this.props.changeDateRange(dateObj)
          } else {
            dateObj.week++
            this.props.changeDateRange(dateObj)
          }

          break
        }
    }
  }

  paginateBackward = () => {
    let termStart = new Date(this.props.termBounds[0])

    const startMonth = termStart.getMonth()
    const startYear = termStart.getFullYear()
    const startDay = termStart.getDate()
    const startWeek = getWeekOfMonth(startYear, startMonth, startDay)
    let dateObj = this.props.currentDateRange

    switch (this.props.calendarType) {
      case "monthview":
        if (dateObj.month === startMonth) {
          alert("start of term reached")
          return
        }
        if (dateObj.year === 0) {
          console.log("It is January")
          dateObj.year--
          dateObj.month = 11
          this.props.changeDateRange(dateObj)
        } else {
          console.log("paginate normally")
          dateObj.month--
          this.props.changeDateRange(dateObj)
        }

        break

      case "weekview":
      case "scheduleview":
      default:
        if (dateObj.month === startMonth && dateObj.week === startWeek) {
          alert("start of term reached")
        } else {
          let dayOfMonth = new Date(dateObj.year, dateObj.month, dateObj.day)
          if (dateObj.week === 1) {
            dateObj.month--
            dayOfMonth = new Date(dateObj.year, dateObj.month, 1)
            dateObj.week = getWeeksOfMonth(dayOfMonth)
            this.props.changeDateRange(dateObj)
          } else {
            dateObj.week--
            this.props.changeDateRange(dateObj)
          }

          break
        }
    }
  }

  getDateRange = () => {
    let text
    const classes = this.props.classes
    const dateObj = this.props.currentDateRange
    if (this.props.calendarType === "weekview") {
      text =
        monthNames[dateObj.month] +
        " " +
        getWeekDateRange(dateObj.month, dateObj.year, dateObj.week)
    } else if (this.props.calendarType === "monthview") {
      text = monthNames[dateObj.month]
    }

    return (
      <Typography type="title" className={classes.dateRange}>
        {text}
      </Typography>
    )
  }

  handleMenuItemClick = index => {
    this.props.changeCalendarView(index)
    this.setState({ open: false })
  }

  render() {
    console.log(this.props.termBounds)
    const classes = this.props.classes
    return (
      <AppBar className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <div className={classes.paginator}>
            <IconButton
              aria-label="Paginate Backward"
              onClick={this.paginateBackward}
            >
              <NavigateBefore className={classes.icons} />
            </IconButton>
            {this.getDateRange()}
            <IconButton
              aria-label="Paginate Forward"
              onClick={this.paginateForward}
            >
              <NavigateNext className={classes.icons} />
            </IconButton>
          </div>
          <IconButton
            aria-label="More options and views"
            onClick={this.handleClick}
          >
            <MoreVert style={{ color: "white" }} />
          </IconButton>

          <Menu
            anchorEl={this.state.anchorEl}
            open={this.state.open}
            onRequestClose={this.handleRequestClose}
          >
            <MenuItem onClick={() => this.handleMenuItemClick("monthview")}>
              Month View
            </MenuItem>
            <MenuItem onClick={() => this.handleMenuItemClick("weekview")}>
              Week View
            </MenuItem>
            <MenuItem onClick={() => this.handleMenuItemClick("dayview")}>
              Day View
            </MenuItem>
            <MenuItem onClick={() => this.handleMenuItemClick("scheduleview")}>
              Schedule View
            </MenuItem>
            <MenuItem onClick={this.handleRequestClose}>Download ICal</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    )
  }
}

Titlebar.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styleSheet)(Titlebar)
