import React, { Component } from "react";
import List, { ListItem, ListItemText } from "material-ui/List";
import Card, { CardContent, CardHeader } from "material-ui/Card";
import Typography from "material-ui/Typography";
import { withStyles, createStyleSheet } from "material-ui/styles";
import Divider from "material-ui/Divider";
class DayBoxSchedule extends Component {
  displayClasses() {
    let card = [];
    if (
      this.props.calendarMeeting[this.props.month] === undefined ||
      this.props.calendarMeeting[this.props.month][this.props.day] === undefined
    ) {
      card.push(<div aria-label="No classes" />);
    } else {
      if (
        this.props.calendarMeeting[this.props.month][this.props.day] !==
        undefined
      ) {
        if (
          this.props.calendarMeeting[this.props.month][this.props.day].length >
          2
        ) {
          let moreClasses = 0;
          moreClasses =
            this.props.calendarMeeting[this.props.month][this.props.day]
              .length - 2;
          for (let i = 0; i < 2; i++) {
            card.push(
              <ListItem
                component="div"
                style={{
                  padding: "2px",
                  margin: 0,
                  marginBottom: "1px",
                  width: "100%",
                  boxSizing: "border-box",
                  float: "left",
                  //boxShadow: "inset -0.5px -3px 0 rgba(0, 0, 0, 0.2)",
                  backgroundColor: "rgba(0, 16, 83, 0.6)",
                  fontWeight: "bold",
                  borderRadius: "4px"
                }}
              >
                <Typography
                  type="body2"
                  style={{
                    marginLeft: 10,
                    fontWeight: "bold",
                    color: "white"
                  }}
                >
                  {
                    this.props.calendarMeeting[this.props.month][
                      this.props.day
                    ][i].coursetitle
                  }
                </Typography>
              </ListItem>
            );
          }
          card.push(
            <ListItem
              style={{
                backgroundColor: "rgba(0, 16, 83, 0.6)",
                borderRadius: "10px",
                padding: "1px",
                width: "20px",
                heigh: "20px"
              }}
            >
              <Typography
                aria-label={"Plus " + moreClasses + " more classes"}
                style={{ color: "#FFFFFF" }}
              >
                {" "}+{moreClasses}{" "}
              </Typography>
            </ListItem>
          );
        } else {
          for (
            let i = 0;
            i <
            this.props.calendarMeeting[this.props.month][this.props.day].length;
            i++
          ) {
            card.push(
              <ListItem
                component="div"
                style={{
                  padding: "2px",
                  margin: 0,
                  marginBottom: "1px",
                  width: "100%",
                  boxSizing: "border-box",
                  float: "left",
                  //boxShadow: "inset -0.5px -3px 0 rgba(0, 0, 0, 0.2)",
                  marginRight: "10px",
                  backgroundColor: "rgba(0, 16, 83, 0.6)",
                  fontWeight: "bold",
                  borderRadius: "4px"
                }}
              >
                <Typography
                  type="body2"
                  style={{
                    marginLeft: 10,
                    fontWeight: "bold",
                    color: "white"
                  }}
                >
                  {
                    this.props.calendarMeeting[this.props.month][
                      this.props.day
                    ][i].coursetitle
                  }
                </Typography>
              </ListItem>
            );
          }
        }
      }
    }
    return card;
  }
  render() {
    return (
      <List
        style={{
          padding: 0,
          margin: 0
        }}
      >
        {this.displayClasses()}
      </List>
    );
  }
}
export default DayBoxSchedule;
