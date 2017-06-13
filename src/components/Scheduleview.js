import React, { Component } from "react"
import Card, { CardHeader, CardContent } from "material-ui/Card"
import Typography from "material-ui/Typography"
import { dayNames } from "./../utils/Strings"
import List, { ListItem } from "material-ui/List"

class Scheduleview extends Component {
  generateDayCards() {
    let cardArray = []
    for (let i = 0; i < 7; i++) {
      cardArray.push(<DayCard dayName={dayNames[i]} key={i} />)
    }
    return cardArray
  }

  render() {
    return (
      <div>
        {this.generateDayCards()}
      </div>
    )
  }
}

class DayCard extends Component {
  render() {
    return (
      <div>
        <Card style={{ marginTop: 9, backgroundColor: "#fafafa" }}>
          <CardHeader
            title={this.props.dayName}
            style={{ backgroundColor: "#b89f74" }}
          />
          <CardContent style={{ paddingBottom: 0, paddingTop: 0 }}>
            <Typography component="div">
              <List>
                <ListItem style={{ padding: 0 }}>
                  <ListContent
                    title="CSE 280"
                    name="Sophomore Project"
                    startTime="10:20"
                    endTime="12:30"
                    buildingRoom="EC 321"
                  />
                </ListItem>
              </List>
            </Typography>
          </CardContent>
        </Card>
      </div>
    )
  }
}

const ListContent = ({ title, name, startTime, endTime, buildingRoom }) => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        fontSize: 16
      }}
    >
      <div>
        <div style={{ fontSize: ".83em", fontWeight: "bold" }}>Course Code</div>
        <p>{title}</p>
      </div>
      <div style={{ border: "1px solid lightgray" }} />
      <div>
        <div style={{ fontSize: ".83em", fontWeight: "bold" }}>Course Name</div>
        <p>{name}</p>
      </div>
      <div style={{ border: "1px solid lightgray" }} />
      <div>
        <div style={{ fontSize: ".83em", fontWeight: "bold" }}>
          Meeting Time
        </div>
        <p>{`${startTime} - ${endTime}`}</p>
      </div>
      <div style={{ border: "1px solid lightgray" }} />
      <div>
        <div style={{ fontSize: ".83em", fontWeight: "bold" }}>Location</div>
        <p>{buildingRoom}</p>
      </div>
    </div>
  )
}

export default Scheduleview
