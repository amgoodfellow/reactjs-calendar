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
import ExpandedCards from "./ExpandedCards"

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
          for (let i =0; i< this.props.calendarMeeting[this.props.month][this.props.day].length; ++i ){            
            console.log(this.props.calendarMeeting[this.props.month][this.props.day][i])
    return (
      <List>
        <ExpandedCards        
                  calendar={this.props.calendarMeeting}
                  month={this.props.month}
                  day={this.props.day}                 
                  increment={i}
                /> 
</List>
    )
  }}}}
}
DayCard.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styleSheet)(DayCard)
