import React, { Component } from "react"
import { withStyles, createStyleSheet } from "material-ui/styles"
import Collapse from "material-ui/transitions/Collapse"
import IconButton from "material-ui/IconButton"
import ExpandMoreIcon from "material-ui-icons/ExpandMore"
import PropTypes from "prop-types"
import classnames from "classnames"
import List, {
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction
} from "material-ui/List"
import LooksOne from "material-ui-icons/LooksOne"
import LooksTwo from "material-ui-icons/LooksTwo"
import Looks3 from "material-ui-icons/Looks3"
import Looks4 from "material-ui-icons/Looks4"
import Looks5 from "material-ui-icons/Looks5"
import Looks6 from "material-ui-icons/Looks6"
import Lens from "material-ui-icons/Lens"
const styleSheet = createStyleSheet("ExpandedCard", theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    background: theme.palette.background.paper
  },
  expand: {
    transform: "rotate(0deg)",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  }
}))
class DayCard extends Component {
  state = {
    expanded: false
  }

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }))
  }

  getIcon = pos => {
    switch (pos) {
      case 1:
        return <LooksOne />
      case 2:
        return <LooksTwo />
      case 3:
        return <Looks3 />
      case 4:
        return <Looks4 />
      case 5:
        return <Looks5 />
      case 6:
        return <Looks6 />
      default:
        return <Lens />
    }
  }

  render() {
    const classes = this.props.classes
    const meeting = this.props.meeting
    if (
      Object.is(this.props.meeting, null) ||
      Object.is(this.props.meeting, undefined)
    ) {
      return <div />
    } else {
      return (
        <List className={classes.root}>
          <ListItem>
            <ListItemIcon>
              {this.getIcon(this.props.pos)}
            </ListItemIcon>
            <ListItemText inset primary={meeting.coursetitle} />
            <ListItemSecondaryAction>
              <IconButton
                className={classnames(classes.expand, {
                  [classes.expandOpen]: this.state.expanded
                })}
                onClick={this.handleExpandClick}
                aria-expanded={this.state.expanded}
                aria-label="Show more"
              >
                <ExpandMoreIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          <Collapse
            in={this.state.expanded}
            transitionDuration="auto"
            unmountOnExit
          >
            <ListItem>
              <ListItemText
                inset
                primary={`${meeting.starttime} - 
                     ${meeting.endtime}`}
              />
            </ListItem>
            <ListItem>
              <ListItemText inset primary={meeting.buildingroom} />
            </ListItem>
            <ListItem>
              <ListItemText inset primary={meeting.coursename} />
            </ListItem>
          </Collapse>
        </List>
      )
    }
  }
}

DayCard.propTypes = {
  classes: PropTypes.object.isRequired
}
export default withStyles(styleSheet)(DayCard)
