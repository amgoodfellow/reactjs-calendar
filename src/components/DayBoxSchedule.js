import React, { Component } from "react"
import PropTypes from "prop-types"
import List, { ListItem } from "material-ui/List"
import { withStyles, createStyleSheet } from "material-ui/styles"
import Typography from "material-ui/Typography"

const styleSheet = createStyleSheet("DayBoxSchedule", theme => ({
  dayBox: {},
  event: {
    padding: "2px",
    margin: 0,
    marginBottom: "1px",
    width: "100%",
    boxSizing: "border-box",
    float: "left",
    backgroundColor: "rgba(0, 16, 83, 0.6)",
    fontWeight: "bold",
    borderRadius: "4px"
  },
  eventText: {
    marginLeft: 10,
    fontWeight: "bold",
    color: "white"
  },
  moreClasses: {
    backgroundColor: "rgba(0, 16, 83, 0.6)",
    borderRadius: "10px",
    padding: "1px",
    width: "20px",
    heigh: "20px",
    display: "flex",
    justifyContent: "center"
  }
}))

class DayBoxSchedule extends Component {
  displayClasses() {
    const classes = this.props.classes
    let card = []
    let divKey = 0
    const calmeetin = this.props.calendarMeeting
    if (
      Object.is(calmeetin[this.props.month], undefined) ||
      Object.is(calmeetin[this.props.month][this.props.day], undefined)
    ) {
      divKey++
      card.push(<div key={"noclasses" + divKey} aria-label="No classes" />)
    } else {
      let meetingsLength = calmeetin[this.props.month][this.props.day].length
      if (meetingsLength > 2) {
        let moreClasses = meetingsLength - 2
        for (let i = 0; i < 2; i++) {
          //Push the cards that have more than 2 classes
          card.push(
            <ListItem key={"classSchedule" + i} className={classes.event}>
              <Typography type="body2" className={classes.eventText}>
                {calmeetin[this.props.month][this.props.day][i].coursetitle}
              </Typography>
            </ListItem>
          )
        }
        //Then push the little circle thing saying there are more hidden classes
        card.push(
          <ListItem
            key={"moreClasses"}
            className={classes.moreClasses}
            style={{}}
          >
            <Typography
              aria-label={"Plus " + moreClasses + " more classes"}
              style={{ color: "#FFFFFF" }}
            >
              {`+${moreClasses}`}
            </Typography>
          </ListItem>
        )
        //For cards with less than two classes
      } else {
        for (
          let i = 0;
          i <
          this.props.calendarMeeting[this.props.month][this.props.day].length;
          i++
        ) {
          card.push(
            <ListItem
              key={"classesSchedule" + i}
              component="div"
              className={classes.event}
            >
              <Typography type="body2" className={classes.eventText}>
                {
                  this.props.calendarMeeting[this.props.month][this.props.day][
                    i
                  ].coursetitle
                }
              </Typography>
            </ListItem>
          )
        }
      }
    }
    return card
  }
  render() {
    return (
      <List style={{ padding: 0 }}>
        {this.displayClasses()}
      </List>
    )
  }
}

DayBoxSchedule.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styleSheet)(DayBoxSchedule)
