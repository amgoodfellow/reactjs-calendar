import React, { Component } from "react"
import List, { ListItem, ListItemText } from "material-ui/List"
import Card, { CardContent, CardHeader } from "material-ui/Card"
import Typography from "material-ui/Typography"
import { withStyles, createStyleSheet } from "material-ui/styles"
import Divider from "material-ui/Divider"

class DayCard extends Component {
  displayCard() {
    let card = []
    if (this.props.calendarMeeting[this.props.month] === undefined) {
      card.push(
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
      )
    } else {
      if (
        this.props.calendarMeeting[this.props.month][this.props.day] ===
        undefined
      ) {
        card.push(
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
        )
      } else {
        if (
          this.props.calendarMeeting[this.props.month][this.props.day] !==
          undefined
        ) {
          for (
            let i = 0;
            i <
            this.props.calendarMeeting[this.props.month][this.props.day].length;
            i++
          ) {
            console.log(
              this.props.calendarMeeting[this.props.month][this.props.day][i]
                .coursetitle
            )
            card.push(
              <div>
                <ListItem
                  divider="true"
                  component="div"
                  style={{
                    marginBottom: "5px",
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "rgba(0, 116, 183, 0.2)",
                    color: "#004987",
                    width: "100%",
                    boxShadow: " inset 5px 0 0 rgba(0, 0, 0, 0.2)"
                  }}
                >
                  <Typography
                    noWrap="true"
                    align="left"
                    color="rgba(0, 116, 183, 0.7)"
                  >

                    <ListItemText
                      primary={
                        this.props.calendarMeeting[this.props.month][
                          this.props.day
                        ][i].coursetitle
                      }
                    />
                    <Divider />
                    <ListItemText
                      primary="Course name"
                      secondary={
                        this.props.calendarMeeting[this.props.month][
                          this.props.day
                        ][i].courseman
                      }
                    />
                    <ListItemText
                      primary="Meeting Times"
                      secondary={`${this.props.calendarMeeting[this.props.month][this.props.day][i].starttime} - 
                     ${this.props.calendarMeeting[this.props.month][this.props.day][i].starttime}`}
                    />
                    <ListItemText
                      primary="Location"
                      secondary={
                        this.props.calendarMeeting[this.props.month][
                          this.props.day
                        ][i].buildingroom
                      }
                    />
                  </Typography>
                </ListItem>
              </div>
            )
          }
        }
      }
    }
    return card
  }

  render() {
    return (
      <List
        style={{
          display: "flex",
          flexDirection: "column",
          justifycontent: "center",
          textAlign: "left",
          overflowX: "hidden",
          overflowY: "scroll",
          height: "499px",
          paddingTop: 0,
          paddingBottom: 0
        }}
      >

        {this.displayCard()}
      </List>
    )
  }
}

export default DayCard
