import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar'
import CloseIcon from '@material-ui/icons/Close'
import FormControl from '@material-ui/core/FormControl'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import IconButton from '@material-ui/core/IconButton'
import Input from '@material-ui/core/Input'
import NavigateBefore from '@material-ui/icons/NavigateBefore'
import NavigateNext from '@material-ui/icons/NavigateNext'
import PropTypes from 'prop-types'
import Snackbar from '@material-ui/core/Snackbar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import { shortMonthNames, monthNames } from '../utils/Strings'
import {
  getWeekArray,
  getWeekOfMonth,
  getWeeksOfMonth
} from './../utils/DateHelper'
import { translate } from 'react-i18next'

const styles = theme => ({
  appBar: {
    zIndex: '999',
    position: 'relative'
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  mobileToolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column'
  },
  paginator: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white'
  },
  icons: {
    color: 'white'
  },
  dateRange: {
    color: 'inherit',
    width: 140,
    textAlign: 'center'
  },
  inputRoot: {
    color: 'white',
    underline: {
      '&before': {
        backgroundColor: 'white'
      }
    }
  },
  select: {
    '&:focus': {
      color: 'white'
    }
  },
  underline: {
    '&:before': {
      borderBottomColor: 'white'
    },

    '&:after': {
      borderBottomColor: 'white'
    }
  },
  selectIcon: {
    color: 'white'
  }
})

class Titlebar extends Component {
  state = {
    anchorEl: undefined,
    snackbar: false,
    snackbarMessage: '',
    open: false,
    selected: '',
    selectedValue: 'scheduleview'
  }

  componentWillReceiveProps(nextProps) {
    if (!Object.is(nextProps.selectedValue, this.state.selectedValue)) {
      this.setState({ selectedValue: nextProps.calendarType })
    }
  }

  handleChange = event => {
    this.setState({ selectedValue: event.target.value })
    this.props.changeCalendarView(event.target.value)
  }

  handleClick = () => {
    this.setState({ open: true })
  }

  handleRequestClose = value => {
    if (value === null) {
      this.setState({ open: false })
    } else {
      this.setState({ open: false, selected: value, selectedValue: value })
      this.props.changeCalendarView(value)
    }
  }

  openSnackbar = message => {
    this.setState({ snackbar: true, snackbarMessage: message })
    if (Object.is(document.getElementById('calendar-alert-snackbar'), null)) {
      setTimeout(() => {
        document.getElementById('calendar-alert-snackbar').focus()
      }, 50)
    } else {
      document.getElementById('calendar-alert-snackbar').focus()
    }
  }

  closeSnackbar = () => {
    this.setState({ snackbar: false })
  }

  paginateForward = () => {
    if (
      Object.is(this.props.termBounds, null) ||
      Object.is(this.props.termBounds, undefined)
    ) {
      return
    }

    let termEnd = new Date(this.props.termBounds[1])

    const endMonth = termEnd.getMonth()
    const endYear = termEnd.getFullYear()
    const endDay = termEnd.getDate()
    const endWeek = getWeekOfMonth(endYear, endMonth, endDay)
    let dateObj = this.props.currentDateRange

    switch (this.props.calendarType) {
      case 'monthview':
        if (dateObj.month === endMonth && dateObj.year === endYear) {
          this.openSnackbar('End of term reached')
          return
        }
        if (dateObj.month === 11) {
          dateObj.year++
          dateObj.month = 0
          dateObj.day = 1
          this.props.changeDateRange(dateObj)
        } else {
          dateObj.month++
          this.props.changeDateRange(dateObj)
        }

        break

      case 'weekview':
      case 'scheduleview':
      default:
        if (
          dateObj.month === endMonth &&
          dateObj.week === endWeek &&
          dateObj.year === endYear
        ) {
          this.openSnackbar('End of term reached')
        } else {
          const weekArr = getWeekArray(
            dateObj.month,
            dateObj.year,
            dateObj.week
          )
          const len = weekArr.length
          const d = new Date(dateObj.year, dateObj.month + 1, 0)
          const endDayOfMonth = d.getDate()
          if (dateObj.month === 11) {
            if (weekArr[0].month === 11 && weekArr[len - 1].month === 0) {
              dateObj.month = 0
              dateObj.week = 2
              dateObj.year++
            } else {
              dateObj.week++
            }
          } else if (weekArr[len - 1].month > dateObj.month) {
            dateObj.month++
            dateObj.week = 2
          } else if (weekArr[len - 1].day === endDayOfMonth) {
            dateObj.month++
            dateObj.week = 1
          } else {
            dateObj.week++
          }

          this.props.changeDateRange(dateObj)

          break
        }
    }
  }

  paginateBackward = () => {
    if (
      Object.is(this.props.termBounds, null) ||
      Object.is(this.props.termBounds, undefined)
    ) {
      return
    }
    let termStart = new Date(this.props.termBounds[0])

    const startMonth = termStart.getMonth()
    const startYear = termStart.getFullYear()
    const startDay = termStart.getDate()
    const startWeek = getWeekOfMonth(startYear, startMonth, startDay)
    let dateObj = this.props.currentDateRange

    switch (this.props.calendarType) {
      case 'monthview':
        if (dateObj.month === startMonth) {
          this.openSnackbar('Start of term reached')
          return
        }
        if (dateObj.month === 0) {
          dateObj.year--
          dateObj.day = 1
          dateObj.month = 11
          this.props.changeDateRange(dateObj)
        } else {
          dateObj.month--
          dateObj.day = 1
          this.props.changeDateRange(dateObj)
        }

        break

      case 'weekview':
      case 'scheduleview':
      default:
        let rightNow = new Date(dateObj.year, dateObj.month, dateObj.day)
        let objEnd = new Date(startYear, startMonth, startDay)
        if (rightNow < objEnd) {
          this.openSnackbar('Start of term reached')
          return
        }
        if (
          dateObj.month <= startMonth &&
          dateObj.week <= startWeek &&
          dateObj.year <= startYear
        ) {
          this.openSnackbar('Start of term reached')
          return
        } else {
          const weekArr = getWeekArray(
            dateObj.month,
            dateObj.year,
            dateObj.week
          )
          if (dateObj.month === 0) {
            if (weekArr[0].month === 0 && weekArr[0].day < 7) {
              dateObj.month = 11
              const d = new Date(dateObj.year, 11, 4)
              dateObj.week = getWeeksOfMonth(d)
              dateObj.year--
            } else {
              dateObj.week--
            }
          } else if (
            weekArr[0].day > 7 &&
            weekArr[0].month < weekArr[weekArr.length - 1].month
          ) {
            dateObj.month = weekArr[0].month
            const d = new Date(dateObj.year, dateObj.month, 4)
            dateObj.week = getWeeksOfMonth(d) - 1
          } else if (weekArr[0].day < 7) {
            const d = new Date(dateObj.year, dateObj.month - 1, 4)
            dateObj.month--
            dateObj.week = getWeeksOfMonth(d)
          } else {
            dateObj.week--
          }

          this.props.changeDateRange(dateObj)

          break
        }
    }
  }

  getDateRange = () => {
    const { t } = this.props
    const classes = this.props.classes
    const dateObj = this.props.currentDateRange
    const weekDateArray = getWeekArray(
      dateObj.month,
      dateObj.year,
      dateObj.week
    )
    const len = weekDateArray.length
    const longMonth = monthNames[weekDateArray[0].month]
    const longEndMonth = monthNames[weekDateArray[len - 1].month]

    let text
    let ariaLabel

    if (
      this.props.calendarType === 'weekview' ||
      this.props.calendarType === 'scheduleview'
    ) {
      if (
        weekDateArray[len - 1].month > weekDateArray[0].month ||
        (weekDateArray[0].month === 11 && weekDateArray[len - 1].month === 0)
      ) {
        const endMonth = weekDateArray[len - 1].month
        text = `${t(shortMonthNames[weekDateArray[0].month], {})} ${
          weekDateArray[0].day
        } - ${t(shortMonthNames[endMonth], {})} ${weekDateArray[len - 1].day}`
        ariaLabel = `${t(longMonth, {})} ${weekDateArray[0].day} to ${t(
          longEndMonth,
          {}
        )} ${weekDateArray[len - 1].day}`
      } else {
        text = `${t(shortMonthNames[weekDateArray[0].month], {})} ${
          weekDateArray[0].day
        } - ${weekDateArray[weekDateArray.length - 1].day}`
        ariaLabel = `${t(longMonth, {})} ${weekDateArray[0].day} to ${t(
          longEndMonth,
          {}
        )} ${weekDateArray[len - 1].day}`
      }
    } else if (this.props.calendarType === 'monthview') {
      text = t(shortMonthNames[dateObj.month], {})
      ariaLabel = longMonth
    }

    return (
      <Typography
        variant="h6"
        className={classes.dateRange}
        style={{ width: 140 }}
        aria-label={ariaLabel}
        tabIndex="0"
      >
        {text}
      </Typography>
    )
  }

  render() {
    const classes = this.props.classes
    const { mobile } = this.props
    return (
      <AppBar className={classes.appBar}>
        <Toolbar className={mobile ? classes.mobileToolbar : classes.toolbar}>
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
          <form autoComplete="off">
            <FormControl>
              <Select
                value={this.state.selectedValue}
                onChange={this.handleChange}
                autoWidth={true}
                classes={{ select: classes.select, icon: classes.selectIcon }}
                input={
                  <Input
                    name="name"
                    classes={{
                      root: classes.inputRoot,
                      underline: classes.underline
                    }}
                    id="name-readonly"
                  />
                }
              >
                <MenuItem value="monthview">Month View</MenuItem>
                <MenuItem value="weekview">Week View</MenuItem>
                <MenuItem value="scheduleview">Schedule View</MenuItem>
              </Select>
            </FormControl>
          </form>
        </Toolbar>
        <Snackbar
          id="calendar-alert-snackbar"
          tabIndex="0"
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}
          open={this.state.snackbar}
          autoHideDuration={6e3}
          onClose={this.closeSnackbar}
          message={<span id="message-id">{this.state.snackbarMessage}</span>}
          action={
            <IconButton
              tabIndex="0"
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.closeSnackbar}
            >
              <CloseIcon />
            </IconButton>
          }
        />
      </AppBar>
    )
  }
}

Titlebar.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles, { name: 'Titlebar' })(
  translate('view', { wait: true })(Titlebar)
)
