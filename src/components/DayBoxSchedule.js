import React, { Component } from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  event: {
    padding: '2px',
    margin: 0,
    marginBottom: '1px',
    width: '100%',
    boxSizing: 'border-box',
    float: 'left',
    backgroundColor: 'rgba(0, 16, 83, 0.6)',
    fontWeight: 'bold',
    borderRadius: '4px'
  },
  eventText: {
    marginLeft: 10,
    fontWeight: 'bold',
    color: 'white'
  },

  moreClassesText: {
    color: '#FFFFFF',
    fontWeight: 'bolder',
    marginLeft: '0.8em'
  },

  eventMoreClasses: {
    padding: '2px',
    margin: 0,
    marginBottom: '1px',
    width: '100%',
    boxSizing: 'border-box',
    float: 'left',
    backgroundColor: '#616161',
    fontWeight: 'bold',
    borderRadius: '4px'
  }
})

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
      card.push(<div key={'noclasses' + divKey} aria-label="No classes" />)
    } else {
      let meetingsLength = calmeetin[this.props.month][this.props.day].length
      if (meetingsLength > 2) {
        let moreClasses = meetingsLength - 2
        for (let i = 0; i < 2; i++) {
          //Push the cards that have more than 2 classes
          card.push(
            <ListItem
              key={'classSchedule' + i}
              className={classes.event}
              style={{
                backgroundColor:
                  calmeetin[this.props.month][this.props.day][i].color
              }}
            >
              <Typography type="body2" className={classes.eventText}>
                {calmeetin[this.props.month][this.props.day][i].coursetitle}
              </Typography>
            </ListItem>
          )
        }
        //Then push the little circle thing saying there are more hidden classes
        card.push(
          <ListItem key={'moreClasses'} className={classes.eventMoreClasses}>
            <Typography
              aria-label={'Plus ' + moreClasses + ' more classes'}
              className={classes.moreClassesText}
            >
              {`+${moreClasses}`}
            </Typography>
          </ListItem>
        )
        //For cards with less than two classes
      } else {
        for (
          let i = 0;
          i < calmeetin[this.props.month][this.props.day].length;
          i++
        ) {
          card.push(
            <ListItem
              key={'classesSchedule' + i}
              component="div"
              className={classes.event}
              style={{
                backgroundColor:
                  calmeetin[this.props.month][this.props.day][i].color
              }}
            >
              <Typography type="body2" className={classes.eventText}>
                {calmeetin[this.props.month][this.props.day][i].coursetitle}
              </Typography>
            </ListItem>
          )
        }
      }
    }
    return card
  }
  render() {
    return <List style={{ padding: 0 }}>{this.displayClasses()}</List>
  }
}

DayBoxSchedule.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles, { name: 'DayBoxSchedule' })(DayBoxSchedule)
