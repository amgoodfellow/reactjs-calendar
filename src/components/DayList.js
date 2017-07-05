import React, { Component } from "react"
import List, { ListItem, ListItemText } from "material-ui/List"
import DayCard from "./DayCard"

class DayList extends Component {
  render() {
    let classList
    try {
      let cardArray = []
      const meetings = this.props.calendarMeeting[this.props.month][
        this.props.day
      ]

      //The new for...of loop is cleaner syntactically and more similar
      //to java's forEach than a JS forEach function
      for (let meeting of meetings) {
        cardArray.push(<DayCard meeting={meeting} />)
      }

      classList = (
        <List>
          {cardArray}
        </List>
      )
    } catch (err) {
      console.log("Attempted render of undefined")
      classList = (
        <List>
          <ListItem
            style={{
              padding: "10px",
              margin: 0,
              width: "100%",
              boxSizing: "border-box",
              float: "left",
              alignContent: "center",
              boxShadow: " inset 4px 0 0  rgba(0, 0, 0, 0.2)",
              marginRight: "10px",
              backgroundColor: "rgb(255,243,233)",
              color: "#004987"
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
