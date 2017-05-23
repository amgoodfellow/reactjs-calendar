import React, { Component } from "react";
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import {dayNames} from "./utils/Strings"
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';



class Scheduleview extends Component {

  generateDayCards(){
    let cardArray = []
    for (let i = 0; i < 7; i++){
      cardArray.push(<DayCard dayName={dayNames[i]} key={i}/>)
    }
    return cardArray;
  }

  render(){
    return(
      <div>
        {this.generateDayCards()}
      </div>
    )
  }
}


class DayCard extends Component {
  render(){
    return (
      <div>
        <Card>
          <CardContent>
            <Typography type="headline" component="h2">
              {this.props.dayName} 
            </Typography>
            <Typography component="div">
              <List>
                <ListItem button>
                  <ListItemText primary="Inbox" />
                </ListItem>
                <ListItem button>
                  <ListItemText primary="Drafts" />
                </ListItem>
              </List>
            </Typography>
          </CardContent>
        </Card>
      </div>
    );
  }
}



export default Scheduleview;
