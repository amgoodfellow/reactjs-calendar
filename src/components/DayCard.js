import React, { Component } from 'react'
import Collapse from '@material-ui/core/Collapse'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import IconButton from '@material-ui/core/IconButton'
import Lens from '@material-ui/icons/Lens'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Looks3 from '@material-ui/icons/Looks3'
import Looks4 from '@material-ui/icons/Looks4'
import Looks5 from '@material-ui/icons/Looks5'
import Looks6 from '@material-ui/icons/Looks6'
import LooksOne from '@material-ui/icons/LooksOne'
import LooksTwo from '@material-ui/icons/LooksTwo'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    background: theme.palette.background.paper
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  }
})

class DayCard extends Component {
  state = {
    expanded: false
  }

  componentWillReceiveProps() {
    this.setState({ expanded: false })
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
            <ListItemIcon>{this.getIcon(this.props.pos)}</ListItemIcon>
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
          <Collapse in={this.state.expanded} unmountOnExit>
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
export default withStyles(styles, { name: 'DayCard' })(DayCard)
