import React, { Component } from 'react'
import DayBoxSchedule from './DayBoxSchedule'
import DayList from './DayList'
import Paper from '@material-ui/core/Paper'
import PropTypes from 'prop-types'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { dayNames, shortDayNames } from './../utils/Strings'
import { getWeeksOfMonth, getDaysInMonth } from './../utils/DateHelper'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  root: {
    display: 'flex',
    position: 'relative'
  },
  dayDiv: {
    position: 'relative',
    width: '25%'
  },
  dayTitleBar: {
    position: 'relative',
    height: '50px',
    borderBottom: '1px solid transparent',
    color: '#FFFFFF',
    whiteSpace: 'nowrap'
  },
  monthDiv: {
    width: '75%',
    height: '100%',
    overflow: 'hidden'
  },
  monthTitleBar: {
    position: 'relative',
    height: '50px'
  },
  table: {
    width: '100%',
    borderTop: 'hidden',
    borderLeft: '1px solid white',
    borderRight: 'hidden',
    borderCollapse: 'collapse'
  },
  tableHead: {
    border: '1px solid rgba(0, 0, 0, 0.075)',
    color: '#000000',
    opacity: 0.8,
    textAlign: 'center',
    fontWeight: 'bold',
    borderTop: 'hidden',
    height: '20%'
  },
  tableBody: {
    backgroundColor: '#ffffff',
    color: '#000000',
    textAlign: 'left',
    verticalAlign: 'top'
  },
  cellStyle: {
    overflow: 'hidden',
    fontSize: '15px',
    fontWeight: 'bold',
    color: '#000000',
    border: '1px solid lightgrey',
    padding: '10px',
    whiteSpace: 'nowarp'
  }
})

class MonthView extends Component {
  constructor() {
    super()
    this.monthDayCounter = 1
  }

  getFocus() {
    document.getElementById('focusElement').focus()
  }

  resetFocus() {
    document.getElementById(this.props.currentDateRange.day).focus()
  }

  displayWeekDay() {
    const dateObject = this.props.currentDateRange
    const day = new Date(dateObject.year, dateObject.month, dateObject.day)
    const title = `${dayNames[day.getDay()]} ${dateObject.day}`
    let weekDay = day.getDay()
    for (let i = 0; i < 7; i++) {
      if (weekDay === i) {
        weekDay = dayNames[i]
      }
    }
    return title
  }

  getMonthRows = () => {
    let dateObject = this.props.currentDateRange
    const first = new Date(dateObject.year, dateObject.month, 1)
    const wks = getWeeksOfMonth(first)
    let rows = []

    for (let i = 0; i < wks; i++) {
      rows.push(
        <tr
          key={'weeks' + i}
          style={{
            height: '100px'
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
    const classes = this.props.classes
    let days = []
    //I can change this so it actually gives you the days
    //That way you won't have to do `.getDate()` at the end
    //Just let me know
    let dateObject = this.props.currentDateRange
    const numDays = getDaysInMonth(dateObject.year, dateObject.month).getDate()
    const first = new Date(dateObject.year, dateObject.month, 1)
    let today = new Date()
    //Greyed out days at the end of monthview
    let grayedDays = 0
    for (let i = 0; i < 7; i++) {
      if (
        this.monthDayCounter > numDays ||
        (this.monthDayCounter === 1 && wk === 0 && first.getDay() !== i)
      ) {
        ++grayedDays
        days.push(
          <td
            key={'grayed' + grayedDays}
            className={classes.cellStyle}
            style={{
              backgroundColor: '#E0E0E0'
            }}
          />
        )
      } else {
        let localDay = this.monthDayCounter
        let newDateObj = {
          year: dateObject.year,
          month: dateObject.month,
          week: dateObject.week,
          day: localDay
        }
        let fontStyle
        let todaysColor
        let currentDate = new Date(
          dateObject.year,
          dateObject.month,
          this.monthDayCounter
        )

        if (
          dateObject.year === today.getFullYear() &&
          dateObject.month === today.getMonth() &&
          this.monthDayCounter === today.getDate()
        ) {
          todaysColor = { backgroundColor: 'rgba(86,162,100, 0.4)' }
          fontStyle = { fontWeight: '600' }
        }
        days.push(
          <td
            aria-label={currentDate.toDateString()}
            key={this.monthDayCounter}
            tabIndex="0"
            className={classes.cellStyle}
            style={todaysColor}
            id={this.monthDayCounter}
            role="button"
            onClick={() => {
              this.props.changeDateRange(newDateObj)
              this.getFocus()
            }}
            onKeyPress={event => {
              if (event.charCode === 13 || event.charCode === 32) {
                this.props.changeDateRange(newDateObj)
                this.getFocus()
              }
            }}
          >
            <Typography variant="body1" component="div" style={fontStyle}>
              {this.monthDayCounter}
              <div aria-hidden="true" id={this.monthDayCounter + 'class'}>
                <DayBoxSchedule
                  calendarMeeting={this.props.calendar}
                  year={this.props.currentDateRange.year}
                  month={this.props.currentDateRange.month}
                  day={this.monthDayCounter}
                />
              </div>
            </Typography>
          </td>
        )

        this.monthDayCounter++
      }
    }
    return days
  }

  weekDays() {
    let weekDaysRow = []

    for (let i = 0; i < 7; ++i) {
      weekDaysRow.push(
        <th scope="col" key={dayNames[i]} style={{ width: '100rem' }}>
          <Typography
            variant="body1"
            component="div"
            style={{ fontWeight: 600 }}
            aria-label={dayNames[i]}
          >
            {shortDayNames[i]}
          </Typography>
        </th>
      )
    }
    return weekDaysRow
  }

  render() {
    const classes = this.props.classes
    return (
      <Paper
        tabIndex="0"
        aria-label={'Month View Calendar'}
        className={classes.root}
      >
        <div
          tabIndex="0"
          aria-label="Day schedule"
          id="focusElement"
          className={classes.dayDiv}
        >
          <Toolbar className={classes.dayTitleBar}>
            <Typography
              tabIndex="0"
              variant="h6"
              style={{ fontWeight: 'bold', opacity: 0.9 }}
            >
              {this.displayWeekDay()}
            </Typography>
          </Toolbar>
          <DayList
            calendarMeeting={this.props.calendar}
            year={this.props.currentDateRange.year}
            month={this.props.currentDateRange.month}
            day={this.props.currentDateRange.day}
          />
          <div
            tabIndex="0"
            role="button"
            aria-label="Return to month schedule"
            onClick={() => {
              this.resetFocus()
            }}
            onKeyPress={event => {
              if (event.charCode === 13 || event.charCode === 32) {
                this.resetFocus()
              }
            }}
          />
        </div>
        <div aria-label="Month Schedule" className={classes.monthDiv}>
          <table className={classes.table}>
            <thead className={classes.tableHead}>
              <tr style={{ height: '50px' }}>{this.weekDays()}</tr>
            </thead>
            <tbody className={classes.tableBody}>{this.getMonthRows()}</tbody>
          </table>
        </div>
      </Paper>
    )
  }
}

MonthView.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles, { name: 'MonthView' })(MonthView)
