import React, { Component } from "react"
import Weekview from "./Weekview"
import App from "./App"
import { monthNames, dayNames, shortDayNames } from "./utils/Strings"
import { withStyles, createStyleSheet } from "material-ui/styles"
import Typography from "material-ui/Typography"
import List, { ListItemText, ListItem, ListContent } from "material-ui/List"
import PropTypes from "prop-types"
import Titlebar from "./Titlebar"
import Paper from "material-ui/Paper"
import Divider from "material-ui/Divider"
import Toolbar from "material-ui/Toolbar"
import Avatar from "material-ui/Avatar"
import Card, { CardContent, CardHeader } from "material-ui/Card"
import {
  getWeeksOfMonth,
  getWeekOfMonth,
  getDaysInMonth
} from "./utils/DateHelper"

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
  monthDiv: {
    width: "80%",
    height: "100%",
    overflow: "hidden"
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
    borderTop: "hidden",
    height: "20%"
  },
  tableBody: {
    backgroundColor: "rgb(255,243,233)",
    color: "#004987",
    textAlign: "left",
    verticalAlign: "top"
  }
}))

class MonthView extends Component {
  constructor() {
    super()
    this.state = {
      studentDetails: null,
      open: false,
      width: window.outerWidth
    }
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
  componentWillMount() {
    window.addEventListener("resize", this.changeView)
  }

  changeView = () => {
    this.setState({ width: window.outerWidth })
  }

  toWeekName() {
    let date = new Date("1 July 2017")
    let day = date.getDay()
    for (let i = 0; i < 7; ++i) {
      if (day === i) {
        if (this.state.width < 746) {
          day = shortDayNames[i]
        } else day = dayNames[i]
      }
    }
    return day
  }

  weekDays() {
    let weekDaysRow = []

    for (let i = 0; i < 7; ++i) {
      if (this.state.width < 746) {
        weekDaysRow.push(
          <td key={weekDaysRow[i]} syle={{ width: "100rem" }}>
            {" "}{shortDayNames[i]}{" "}
          </td>
        )
      } else {
        weekDaysRow.push(
          <td key={weekDaysRow[i]} syle={{ width: "100rem" }}>
            {" "}{dayNames[i]}{" "}
          </td>
        )
      }
    }
    return weekDaysRow
  }

  dayBoxes() {
    let d = new Date(2017, 5)

    let firstDay = d.getDate()
    let totalWeeksInMonth = getWeeksOfMonth(d)
    let numOfWeekInMonth = getWeekOfMonth(2017, 5, 1)
    let numOfDayInWeek = d.getDay()
    let numOfDays = getDaysInMonth(2017, 5).getDate()
    let dayBox = []
    let dayPostition = []
    let weekPosition = []
    let counter = 0
    let dayToString = d.toDateString()
    console.log("firstday", firstDay)
    console.log("total days", numOfDays)
    console.log("no of total weeks", totalWeeksInMonth)
    console.log("position no of week in month", numOfWeekInMonth)
    console.log("weekday number sun-sat 0-6", numOfDayInWeek)
    console.log("day", dayToString)

    for (let j = 0; j < 6; ++j) {
      dayBox.push(<tr> </tr>)
      weekPosition[j] = j

      for (let i = 0; i < 7; i++) {
        dayPostition[i] = i

        dayBox.push(
          <td
            key={dayBox[j][i]}
            style={{
              fontSize: "15px",
              width: "70px",
              height: "79px",
              border: "1px solid white",
              padding: "10px"
            }}
          >
            {dayPostition[i]}{" "}{weekPosition[j]}

          </td>
        )
        if (
          numOfDayInWeek === dayPostition[i] &&
          numOfWeekInMonth - 1 === weekPosition[j]
        ) {
          if (this.state.width < 746) {
            dayBox.pop(<td> </td>)
            dayBox.push(
              <td
                tabIndex="0"
                key={dayBox[j][i]}
                style={{
                  fontSize: "15px",
                  width: "70px",
                  height: "79px",
                  border: "1px solid white",
                  padding: "10px"
                }}
              >
                {dayPostition[i]}{" "}{weekPosition[j]}
                <List
                  style={{
                    display: "flex",
                    justifyContent: "space-around space-between",
                    alignContent: "center"
                  }}
                >
                  <Avatar
                    style={{
                      width: "25px",
                      height: "25px",
                      fontSize: "10px",
                      backgroundColor: "#004987",
                      color: "white"
                    }}
                  >
                    {" "}
                    CSE
                  </Avatar>
                  <Avatar
                    style={{
                      width: "25px",
                      height: "25px",
                      fontSize: "10px",
                      backgroundColor: "#004987",
                      color: "white"
                    }}
                  >
                    {" "}
                    MTH
                  </Avatar>
                </List>
              </td>
            )
          } else {
            dayBox.pop(<td> </td>)
            dayBox.push(
              <td
                tabIndex="0"
                onClick={() => this.setState({ open: true })}
                key={dayBox[j][i]}
                style={{
                  fontSize: "15px",
                  width: "70px",
                  height: "79px",
                  border: "1px solid white",
                  padding: "10px"
                }}
              >
                {dayPostition[i]}{" "}{weekPosition[j]}
                <List
                  style={{
                    padding: 0,
                    height: "auto",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-around",
                    overflow: "hidden"
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
        }
        ++counter
      }
    }

    return dayBox
  }

  displayDayCards() {
    if (this.state.open === true) {
      return (
        <List
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "500px",
            flexFlow: "wrap",
            overflowX: "hidden",
            overflowY: "scroll"
          }}
        >
          <ListItem>
            <Card syle={{ width: "50%" }}>
              <CardContent
                style={{
                  textAlign: "center",
                  backgroundColor: "rgb(255,243,233)"
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
          <ListItem>
            <Card syle={{ width: "50%" }}>
              <CardContent
                style={{
                  textAlign: "center",
                  backgroundColor: "rgb(255,243,233)"
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
          <ListItem>
            <Card syle={{ width: "50%" }}>
              <CardContent
                style={{
                  textAlign: "center",
                  backgroundColor: "rgb(255,243,233)"
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
      )
    }
  }
  render() {
    if (this.state.studentDetails === null) return <div />
    else {
      const classes = this.props.classes
      return (
        <Paper className={classes.root}>
          <div className={classes.dayDiv}>
            <Toolbar className={classes.dayTitleBar}>
              <Typography type="h1" colorInherit>
                {" "}{this.toWeekName()}{" "}

              </Typography>
            </Toolbar>
            {this.displayDayCards()}
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
