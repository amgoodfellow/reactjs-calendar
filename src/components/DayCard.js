import React, { Component } from "react"
import List, { ListItem, ListItemText } from "material-ui/List"
import Card, { CardContent, CardHeader } from "material-ui/Card"
import Typography from "material-ui/Typography"
import { withStyles, createStyleSheet } from "material-ui/styles"
import Divider from "material-ui/Divider"

class DayCard extends Component {

  render() {
    if(this.props.calendarMeeting !== undefined){
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
        <ListItem  
        style={{
                textAlign: "center",
                backgroundColor: "rgb(255,243,233)",
                color: "#004987" 
              }} >
          
            <ListItemText type="title"
              primary="You have no classes " 
            />
        </ListItem>        
      </List>
      )
    
  }else{
    for( let i = 0; i < this.props.calendarMeeting[this.props.month][this.props.day].length; ++i ){
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
        
        <ListItem
         style={{
                textAlign: "center",
                backgroundColor: "rgb(255,243,233)",
                color: "#004987" 
              }} >
       
            <ListItemText
              primary={this.props.calendarMeeting[this.props.month][this.props.day][i].coursetitle}
              secondary={this.props.calendarMeeting[this.props.month][this.props.day][i].buildingroom}
            />
        </ListItem>
      </List>
    )
  }
  }
}
  }


export default (DayCard)
