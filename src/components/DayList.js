import React, { Component } from 'react'
import DayCard from './DayCard'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

class DayList extends Component {
  render() {
    let classList
    let classNo = 0
    try {
      let cardArray = []
      const meetings = this.props.calendarMeeting[this.props.month][
        this.props.day
      ]
      for (let meeting of meetings) {
        ++classNo
        cardArray.push(
          <DayCard key={'DayCards' + classNo} meeting={meeting} pos={classNo} />
        )
      }

      classList = (
        <div
          tabIndex="0"
          style={{ overflowY: 'auto', height: '575px', padding: 0 }}
        >
          {cardArray}
        </div>
      )
    } catch (err) {
      //console.log("Attempted render of undefined");
      classList = (
        <List style={{ padding: 0 }}>
          <ListItem
            style={{
              margin: 0,
              width: '100%',
              boxSizing: 'border-box',
              boxShadow: ' inset 4px 0 0  rgba(0, 0, 0, 0.2)',
              backgroundColor: 'rgb(255,243,233)',
              color: '#004987'
            }}
          >
            <ListItemText type="title" primary="You have no classes " />
          </ListItem>
        </List>
      )
    }
    return classList
  }
}
export default DayList
