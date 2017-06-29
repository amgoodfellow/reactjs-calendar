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
const styleSheet = createStyleSheet('ExpandedCard', theme => ({
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
class ExpandedCards extends Component {   
   constructor(){
    super(),
 this.state= {
     expand: false,     
   }
}
 
  handleExpandClick() {
    this.setState({expand: !this.state.expand})
  }

 render(){
   const classes = this.props.classes;
   const card=[]
   console.log(this.props.calendar[this.props.month][this.props.day][this.props.increment]
)

            console.log(
              this.props.calendar[this.props.month][this.props.day]
            )
    if (this.props.calendar === undefined ||
    this.props.calendar[this.props.month] === undefined ||
     this.props.calendar[this.props.month][this.props.day] === undefined){
          return (
            <div/>
          )
        }else{
             const i = 0

   return(

<div>
 <ListItem>
     <Card 
        key={card[i]}
        className={classes.card}>
          <div className={classes.flexGrow}>
          <CardHeader
            title={ this.props.calendar[this.props.month][this.props.day][i].coursetitle
                      }
            subheader={`${this.props.calendar[this.props.month][this.props.day][i].starttime} - 
                     ${this.props.calendar[this.props.month][this.props.day][i].starttime}`}
          />          
          <CardActions disableActionSpacing> 
            <IconButton
              className={classnames(classes.expand,[card[i]], { 
                [classes.expandOpen]: this.state.expand, 
              }, [classes.collapse])}
              onClick={() =>  (this.handleExpandClick())}
              aria-expanded={this.state.expanded}
              aria-label="Expand"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          </div>
          <Collapse className={classes.collapse} in={this.state.expand} transitionDuration="auto" unmountOnExit>
            <CardContent >
              <Typography paragraph type="body2">Location:</Typography>
              <Typography paragraph type="caption">
               { this.props.calendar[this.props.month][
                          this.props.day
                        ][i].buildingroom
                      }
              </Typography>
             <Typography paragraph type="body2">Course Name:</Typography>              
              <Typography paragraph type="caption">
                {this.props.calendar[this.props.month][
                          this.props.day
                        ][i].courseman
                      }
              </Typography>              
            </CardContent>
          </Collapse>
        </Card>
         </ListItem>
      </div>
            
   )
        }
      }
    }

ExpandedCards.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styleSheet)(ExpandedCards)
