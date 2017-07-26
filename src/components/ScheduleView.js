import React, { Component } from "react"
import Typography from "material-ui/Typography"
import Paper from "material-ui/Paper"
import { getWeekArray } from "./../utils/DateHelper"
import ScheduleEvent from "./ScheduleEvent"
import { withStyles, createStyleSheet } from "material-ui/styles"
import PropTypes from "prop-types"
import { monthNames } from "./../utils/Strings"
import { translate } from "react-i18next"

const styleSheet = createStyleSheet("ScheduleView", theme => ({
  dayPaper: {
    display: "flex",
    padding: "15px",
    marginBottom: "5px"
  },

  date: {
    width: "100px"
  }
}))

class ScheduleView extends Component {
  generateWeek = () => {
    const { t } = this.props
    const classes = this.props.classes
    let currentDate = this.props.currentDateRange
    let week = getWeekArray(
      currentDate.month,
      currentDate.year,
      currentDate.week
    )
    let view = []
    for (let i = 0; i < week.length; i++) {
      if (Object.is(week[i].day, this.props.currentDateRange.day)) {
        view.push(
          <Paper
            key={"dayPaper" + i + Math.random()}
            elevation={0}
            className={classes.dayPaper}
          >
            <div
              className={classes.date}
              tabIndex="0"
              aria-label={week[i].day + " " + week[i].dayNameFull}
            >
              <Typography type="display2" aria-hidden="true">
                {week[i].day}
              </Typography>
              <Typography type="display1" aria-hidden="true">
                {t(week[i].dayName, {})}
              </Typography>
            </div>
            <div style={{ flex: "1" }}>
              {
                <ScheduleEvent
                  day={week[i].day}
                  month={week[i].month}
                  events={this.props.events}
                />
              }
            </div>
          </Paper>
        )
      } else {
        view.push(
          <Paper
            key={"dayPaper" + i + Math.random()}
            elevation={0}
            className={classes.dayPaper}
          >
            <div
              className={classes.date}
              tabIndex="0"
              aria-label={
                t(week[i].dayNameFull, {}) +
                  " " +
                  t(monthNames[this.props.currentDateRange.month], {}) +
                  " " +
                  week[i].day +
                  " " +
                  this.props.currentDateRange.year
              }
            >
              <Typography type="display2" aria-hidden="true">
                {week[i].day}
              </Typography>
              <Typography type="display1" aria-hidden="true">
                {t(week[i].dayName, {})}
              </Typography>
            </div>
            <div style={{ flex: "1" }}>
              {
                <ScheduleEvent
                  day={week[i].day}
                  month={week[i].month}
                  events={this.props.events}
                />
              }
            </div>
          </Paper>
        )
      }
    }
    return view
  }

  render() {
    return (
      <div>
        {this.generateWeek()}
      </div>
    )
  }
}

ScheduleView.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styleSheet)(
  translate("view", { wait: true })(ScheduleView)
)
