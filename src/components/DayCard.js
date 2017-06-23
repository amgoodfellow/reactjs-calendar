import React, { Component } from "react"
import List, { ListItem, ListItemText } from "material-ui/List"
import Typography from "material-ui/Typography"
import { withStyles, createStyleSheet } from "material-ui/styles"
import Divider from "material-ui/Divider"
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import Collapse from 'material-ui/transitions/Collapse';
import IconButton from 'material-ui/IconButton';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import PropTypes from 'prop-types';
import classnames from 'classnames';
const styleSheet = createStyleSheet('DayCard', theme => ({
  card:{
    transition: theme.transitions.create('transform', {
    easing: theme.transitions.easing.easeInOut
}),
  },
  expand: {
    transform: 'rotate(0deg)',
      duration: theme.transitions.duration.shorter,   
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  flexGrow: { 
    display: "flex",
    justifyContent: "space-around",
    flexFlow: "row nowrap" },
})) 
class DayCard extends Component {
   
   state = {
     expand: false,
     
   };
  handleExpandClick() {
    this.setState({expand: !this.state.expand})
  }

  NoClassesCard() {
    let card = []
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
      return card
    }
  
  HaveClassesCard(){
    let card = []
    for (   let i = 0;
            i <
            this.props.calendarMeeting[this.props.month][this.props.day].length;
            i++
          ) {
            card.push(
              <div key={card[i]}>
      <CardHeader
            title={ this.props.calendarMeeting[this.props.month][
                          this.props.day
                        ][i].coursetitle
                      }
            subheader={`${this.props.calendarMeeting[this.props.month][this.props.day][i].starttime} - 
                     ${this.props.calendarMeeting[this.props.month][this.props.day][i].starttime}`}
            /> 
            </div>
             )
            return card  

  }}
  ExpandedCard(){   
    let card=[]    
          for (
            let i = 0;
            i <
            this.props.calendarMeeting[this.props.month][this.props.day].length;
            i++
          ) {
            card.push(
               <div  key={card[i]}
>
                  <Typography paragraph type="body2">Location:</Typography>
              <Typography paragraph type="caption">
               { this.props.calendarMeeting[this.props.month][
                          this.props.day
                        ][i].buildingroom
                      }
              </Typography>
             <Typography paragraph type="body2">Course Name:</Typography>              
              <Typography paragraph type="caption">
                {this.props.calendarMeeting[this.props.month][
                          this.props.day
                        ][i].courseman
                      }
              </Typography> 
              </div> 
            )
          }
    
    return card
  }

  render() {
    const classes = this.props.classes;

    let card = []
    if (this.props.calendarMeeting[this.props.month] === undefined ||
    this.props.calendarMeeting[this.props.month][this.props.day] ===
        undefined) {
          return(
            this.NoClassesCard()
          )
          }else{
      if (
          this.props.calendarMeeting[this.props.month][this.props.day] !==
          undefined
        ) {
    return (
      <List>
        <div
  
        className={classes.card}>
          <div className={classes.flexGrow}>
            {this.HaveClassesCard()}
        <IconButton
              className={classnames(classes.expand, { 
                [classes.expandOpen]: this.state.expand, 
              })}
              onClick={() =>  (this.handleExpandClick())}
              aria-expanded={this.state.expanded}
              aria-label="Expand"
            >
              <ExpandMoreIcon />
            </IconButton>
  
          </div>
          <Collapse in={this.state.expand} transitionDuration="auto" unmountOnExit>
            <CardContent >
                      {this.ExpandedCard()}  
            </CardContent>
          </Collapse>
      </div>
</List>
    )
  }}}
}
DayCard.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styleSheet)(DayCard)
