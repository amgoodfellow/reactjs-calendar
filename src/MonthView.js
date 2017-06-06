import React, { Component } from "react"
import Weekview from "./Weekview"
import Scheduleview from "./Scheduleview"
import { monthNames, dayNames } from "./utils/Strings"
import { withStyles, createStyleSheet } from "material-ui/styles"
import Typography from "material-ui/Typography"
import List, { ListItemText, ListItem, ListContent } from "material-ui/List"
import PropTypes from "prop-types"
import Titlebar from "./Titlebar"
import Paper from "material-ui/Paper"
import Divider from "material-ui/Divider"
import Toolbar from "material-ui/Toolbar"
import Card, { CardContent, CardHeader } from "material-ui/Card"
import { getWeeksOfMonth, getDaysInMonth } from "./utils/DateHelper"

const styleSheet = createStyleSheet("MonthView", theme => ({
  root: {
    display: "flex",
    position: "relative",
    height: "550px"
  },
  dayDiv: {
    position: "relative",
    width: "20%"
  },
  dayTitleBar: {
    position: "relative",
    height: "50px",
    backgroundColor: "#004987",
    color: "#FFFFFF",
    fontWeight: "bold"
  },
  list: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between, space-around",

    height: "500px"
  },
  monthDiv: {
    width: "80%"
  },
  monthTitleBar: {
    position: "relative",
    height: "50px"
  },
  table: {
    width: "100%",
    borderTop: "hidden",
    borderLeft: "hidden",
    borderRight: "hidden",
    borderCollapse: "collapse"
  },
  tableHead: {
    border: "1px solid rgba(0, 0, 0, 0.075)",
    backgroundColor: "#004987",
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "bold",
    borderTop: "hidden"
  },
  tableBody: {
    backgroundColor: "rgba(41,137,228, 0.1)",
    color: "#004987",
    textAlign: "left",
    verticalAlign: "top"
  }
}))

class MonthView extends Component {
  constructor() {
    super()
    this.state = {
      studentDetails: null
    }
    let dayNumber = 1
  }

  componentDidMount() {
    fetch("http://localhost:8082/api/calendar")
      .then(response => {
        return response.json()
      })
      .then(data => {
        console.log(data)
        this.setState({ studentDetails: data })
      })
  }

  weekDays() {
    let week = []
    for (let i = 0; i < 7; ++i) {
      week.push(
        <td key={week[i]} syle={{ width: "100px" }}> {dayNames[i]} </td>
      )
    }
    return week
  }

  dayBoxes() {
    let dayBox = []
    let d = new Date(
      this.state.studentDetails[5][13][0].year,
      this.state.studentDetails[5][13][0].month
    ) //
    let td = d.getDate() // returns 1
    let wd = d.getDay() // returns 4 = thursday
    let totalDays = getDaysInMonth(
      this.state.studentDetails[5][13][0].year,
      this.state.studentDetails[5][13][0].month
    ) //returns total number of days
    console.log(wd)
    let date = []
    let counter = 0
    for (let d = 1; d <= totalDays; ++d) {
      date.push(d)
    }
    for (let j = 0; j < 5; ++j) {
      dayBox.push(<tr> </tr>)
      for (let i = 0; i < 7; i++) {
        dayBox.push(
          <td
            key={dayBox[j][i]}
            style={{
              fontSize: "15px",
              width: "100px",
              height: "79px",
              border: "1px solid white",
              padding: "10px"
            }}
          >
            {date[counter]}

          </td>
        )

        if (date[counter] == this.state.studentDetails[5][13][0].day) {
          dayBox.pop(<td />)
          dayBox.push(
            <td
              key={dayBox[j][i]}
              style={{
                fontSize: "15px",
                width: "100px",
                height: "79px",
                border: "1px solid white",
                padding: "10px"
              }}
            >
              {" "}{date[counter]}
              <List
                style={{
                  padding: 0,
                  height: "auto",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-around"
                }}
              >
                <Card syle={{ width: "50px", padding: 0, margin: 0 }}>
                  <CardContent
                    style={{
                      padding: 0,
                      textAlign: "center",
                      backgroundColor: "#004987",
                      shadow: 0
                    }}
                  >
                    <Typography type="body2" style={{ color: "white" }}>
                      {this.state.studentDetails[5][13][0].coursetitle}
                    </Typography>
                  </CardContent>
                </Card>
                <Divider />
                <Card syle={{ width: "50px", padding: 0, margin: 0 }}>
                  <CardContent
                    style={{
                      padding: 0,
                      textAlign: "center",
                      backgroundColor: "#004987",
                      shadow: 0
                    }}
                  >
                    <Typography type="body2" style={{ color: "white" }}>
                      {this.state.studentDetails[5][13][0].coursetitle}
                    </Typography>
                  </CardContent>
                </Card>
                <Divider />

              </List>
            </td>
          )
        }
        ++counter
      }
    }

    return dayBox
  }

  render() {
    if (this.state.studentDetails === null) return <div />
    else {
      const classes = this.props.classes
      return (
        <Paper className={classes.root}>
          <div className={classes.dayDiv}>
            <Toolbar className={classes.dayTitleBar}>
              <Typography type="title" colorInherit>
                {" "}{"Thursday "}
                {this.state.studentDetails[5][13][0].day}

              </Typography>
            </Toolbar>
            <List className={classes.list}>
              <ListItem>
                <Card syle={{ width: "50%" }}>
                  <CardContent
                    style={{
                      textAlign: "center",
                      backgroundColor: "rgba(41,137,228, 0.1)"
                    }}
                  >
                    <Typography type="title" style={{ color: "#004987" }}>
                      {this.state.studentDetails[5][13][0].coursetitle}
                    </Typography>

                    <Divider />
                    <Typography type="body2" style={{ color: "#004987" }}>
                      Meet times
                    </Typography>
                    <Typography type="body2">
                      {this.state.studentDetails[5][13][0].starttime}{" - "}
                      {this.state.studentDetails[5][13][0].endtime}
                    </Typography>
                    <Divider />
                    <Typography type="body2" style={{ color: "#004987" }}>
                      Building room
                    </Typography>
                    <Typography type="body1">
                      {this.state.studentDetails[5][13][0].buildingroom}
                    </Typography>
                  </CardContent>
                </Card>
              </ListItem>
            </List>

          </div>

          <div className={classes.monthDiv}>
            <table className={classes.table}>
              <thead className={classes.tableHead}>
                <tr style={{ height: "50px" }}>
                  {this.weekDays()}
                </tr>
              </thead>

              <tbody className={classes.tableBody}>

                {this.dayBoxes()}

              </tbody>

            </table>
          </div>
        </Paper>
      )
    }
  }
}

MonthView.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styleSheet)(MonthView)
