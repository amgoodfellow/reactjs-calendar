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
  constructor(props) {
    super(props)

    this.state = {
     expand: false,     
   },
   this.handleExpandClick=this.handleExpandClick.bind(this)
  }  
  handleExpandClick() {    
    this.setState(state => ({expand: !state.expand}))
  }
Card(){
  const classes = this.props.classes;
  const card=[]
  this.props.classesArray.forEach(function(classItem,index) {
    card.push(<div>
 <ListItem>
     <Card 
        key={card[index]}
        style={{
          width: "100%"
        }}
        className={classes.card}>
          <div className={classes.flexGrow}>
          <CardHeader
            title={ classItem.coursetitle
                      }
            subheader={`${classItem.starttime} - 
                     ${classItem.starttime}`}
          />          
          <CardActions disableActionSpacing> 
            <IconButton
              className={classnames(classes.expand,[card[index]], { 
                [classes.expandOpen]: this.state.expand, 
              }, [classes.collapse])}
              onClick={() =>  (this.handleExpandClick())}
              aria-expanded={this.state.expand ? " Expanded": "Not Expanded"}
              
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          </div>
          <Collapse className={classes.collapse} in={this.state.expand} transitionDuration="auto" unmountOnExit>
            <CardContent >
              <Typography paragraph type="body2">Location:</Typography>
              <Typography paragraph type="caption">
               { classItem.buildingroom
                      }
              </Typography>
             <Typography paragraph type="body2">Course Name:</Typography>              
              <Typography paragraph type="caption">
                {classItem.courseman
                      }
              </Typography>              
            </CardContent>
          </Collapse>
        </Card>
         </ListItem>
      </div> )
    console.log(classItem)
  
}, this)
return card
}

 render(){
   const classes = this.props.classes;
  
  
    if (this.props.calendar === undefined ||
    this.props.calendar[this.props.month] === undefined ||
     this.props.calendar[this.props.month][this.props.day] === undefined){
          return (
            <div/>
          )
        }else{
       return(
         <List> 
          { this.Card()}
          </List>
       )
  
            
      }
      }
    }

ExpandedCards.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styleSheet)(ExpandedCards)


