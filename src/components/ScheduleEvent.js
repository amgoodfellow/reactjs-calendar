import React, { Component } from "react"
import Typography from "material-ui/Typography"
import Paper from "material-ui/Paper"
import { withStyles, createStyleSheet } from "material-ui/styles"
import PropTypes from "prop-types"

const styleSheet = createStyleSheet("ScheduleEvent", theme => ({
  eventPaper: {
    marginBottom: "10px"
  },

  courseTitle: {
    padding: "5px",
    marginLeft: "10px"
  },

  eventBody: {
    display: "flex",
    padding: "5px",
    marginLeft: "10px"
  }
}))

class ScheduleEvent extends Component {
  getEvents = () => {
    console.log(this.props.events)
    const classes = this.props.classes
    let meetings = []
    try {
      let month = this.props.month
      let day = this.props.day
      if (this.props.events[month][day] !== undefined) {
        for (let i = 0; i < this.props.events[month][day].length; i++) {
          meetings.push(
            <Paper elevation={1} className={classes.eventPaper}>
              <Typography type="title" className={classes.courseTitle}>
                {this.props.events[month][day][i].courseman}
              </Typography>
              <Typography type="body1" className={classes.eventBody}>
                {this.props.events[month][day][i].starttime +
                  " -  " +
                  this.props.events[month][day][i].endtime}
              </Typography>
              <Typography type="body1" className={classes.eventBody}>
                {this.props.events[month][day][i].coursetitle}
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
