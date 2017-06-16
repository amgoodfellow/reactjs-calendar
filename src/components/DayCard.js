import React, { Component } from "react"
import List, { ListItem, ListItemText } from "material-ui/List"
import Card, { CardContent, CardHeader } from "material-ui/Card"
import Typography from "material-ui/Typography"
import { withStyles, createStyleSheet } from "material-ui/styles"
import Divider from "material-ui/Divider"

class DayCard extends Component {

  render() {
    console.log("HI")
    console.log(this.props.calendarMeeting[this.props.month][this.props.day] )                   

    if(this.props.calendarMeeting[this.props.month] === undefined){
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
    
      } else{
      if (this.props.calendarMeeting[this.props.month][this.props.day]===undefined){
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
    
      }
  else{
let card =[]
  for( let i = 0; i < 9; ++i ){
  if(this.props.calendarMeeting[this.props.month][this.props.day]!== undefined){
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
       <Typography> {this.props.calendarMeeting[this.props.month][this.props.day][i].coursetitle}</Typography>
            
        </ListItem>
      </List>)

  }
  }}
  }
  }
}



export default (DayCard)
