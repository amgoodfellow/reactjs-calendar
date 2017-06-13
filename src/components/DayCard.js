import React, { Component } from "react"
import List, { ListItem } from "material-ui/List"
import Card, { CardContent, CardHeader } from "material-ui/Card"
import Typography from "material-ui/Typography"
import { withStyles, createStyleSheet } from "material-ui/styles"
import Divider from "material-ui/Divider"

const styleSheet = createStyleSheet("DayCard", theme => ({
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

class DayCard extends Component {
  render() {
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
          <Card>
            <CardHeader
              style={{ backgroundColor: "#004987", textAlign: "center" }}
              title={this.props.studentDetails[5][13][0].coursetitle}
            />
            <CardContent
              style={{
                textAlign: "center",
                backgroundColor: "rgb(255,243,233)"
              }}
            >
              <Typography type="body2" style={{ color: "#004987" }}>
                Meet times
              </Typography>
              <Typography type="body2">
                {this.props.studentDetails[5][13][0].starttime}{" - "}
                {this.props.studentDetails[5][13][0].endtime}
              </Typography>
              <Divider />
              <Typography type="body2" style={{ color: "#004987" }}>
                Building room
              </Typography>
              <Typography type="body1">
                {this.props.studentDetails[5][13][0].buildingroom}
              </Typography>
            </CardContent>
          </Card>
        </ListItem>
        <ListItem>
          <Card>
            <CardContent
              style={{
                textAlign: "center",
                backgroundColor: "rgb(255,243,233)"
              }}
            >
              <Typography type="title" style={{ color: "#004987" }}>
                {this.props.studentDetails[5][13][0].coursetitle}
              </Typography>

              <Divider />
              <Typography type="body2" style={{ color: "#004987" }}>
                Meet times
              </Typography>
              <Typography type="body2">
                {this.props.studentDetails[5][13][0].starttime}{" - "}
                {this.props.studentDetails[5][13][0].endtime}
              </Typography>
              <Divider />
              <Typography type="body2" style={{ color: "#004987" }}>
                Building room
              </Typography>
              <Typography type="body1">
                {this.props.studentDetails[5][13][0].buildingroom}
              </Typography>
            </CardContent>
          </Card>
        </ListItem>
        <ListItem>
          <Card>
            <CardContent
              style={{
                textAlign: "center",
                backgroundColor: "rgb(255,243,233)"
              }}
            >
              <Typography type="title" style={{ color: "#004987" }}>
                {this.props.studentDetails[5][13][0].coursetitle}
              </Typography>

              <Divider />
              <Typography type="body2" style={{ color: "#004987" }}>
                Meet times
              </Typography>
              <Typography type="body2">
                {this.props.studentDetails[5][13][0].starttime}{" - "}
                {this.props.studentDetails[5][13][0].endtime}
              </Typography>
              <Divider />
              <Typography type="body2" style={{ color: "#004987" }}>
                Building room
              </Typography>
              <Typography type="body1">
                {this.props.studentDetails[5][13][0].buildingroom}
              </Typography>
            </CardContent>
          </Card>
        </ListItem>
      </List>
    )
  }
}

export default withStyles(styleSheet)(DayCard)
