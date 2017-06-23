import React, { Component } from "react"
import Typography from "material-ui/Typography"
import Paper from "material-ui/Paper"
import { withStyles, createStyleSheet } from "material-ui/styles"
import PropTypes from "prop-types"

const styleSheet = createStyleSheet("ScheduleEvent", theme => ({
  eventPaper: {
    marginBottom: "10px",
    backgroundColor: "#0074b7",
    color: "#000000",
    boxShadow: "0 0.125rem 0.3125rem 0 rgba(0, 0, 0, 0.16)",
    height: "90px",
    transition: "box-shadow ease-in 300ms 10ms",
    "&:hover": {
      boxShadow: "0 0.25rem 0.9375rem 0 rgba(0, 0, 0, 0.5)"
    }
  },

  courseTitle: {
    padding: "5px",
    marginLeft: "10px",
    color: "#FFFFFF"
  },

  eventBody: {
    display: "flex",
    padding: "5px",
    marginLeft: "10px",
    color: "#FFFFFF"
  }
}))

class ScheduleEvent extends Component {
  getEvents = () => {
    const classes = this.props.classes
    let meetings = []
    try {
      let month = this.props.month
      let day = this.props.day
      if (this.props.events[month][day] !== undefined) {
        for (let i = 0; i < this.props.events[month][day].length; i++) {
          meetings.push(
            <Paper
              key={"scheduleEvent" + i}
              elevation={1}
              className={classes.eventPaper}
              tabIndex="0"
            >
              <Typography type="title" className={classes.courseTitle}>
                {this.props.events[month][day][i].coursename}
              </Typography>
              <Typography type="body1" className={classes.eventBody}>
                {this.props.events[month][day][i].coursetitle}
              </Typography>
              <Typography type="body1" className={classes.eventBody}>
                {this.props.events[month][day][i].starttime +
                  " -  " +
                  this.props.events[month][day][i].endtime}
              </Typography>
            </Paper>
          )
        }
      }
    } catch (err) {
      meetings.push("")
    }
    return meetings
  }
  render() {
    return (
      <div>
        {this.getEvents()}
      </div>
    )
  }
}

ScheduleEvent.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styleSheet)(ScheduleEvent)
