import React, { Component } from "react"
import IconButton from "material-ui/IconButton"
import NavigateBefore from "material-ui-icons/NavigateBefore"
import NavigateNext from "material-ui-icons/NavigateNext"
import MoreVert from "material-ui-icons/MoreVert"
import Menu, { MenuItem } from "material-ui/Menu"
import { withStyles, createStyleSheet } from "material-ui/styles"
import PropTypes from "prop-types"
import AppBar from "material-ui/AppBar"
import Toolbar from "material-ui/Toolbar"
import Typography from "material-ui/Typography"
import { monthNames } from "./utils/Strings"

const styleSheet = createStyleSheet("SimpleAppBar", theme => ({
  root: {
    position: "relative",
    marginTop: 30,
    width: "100%"
  },
  appBar: {
    position: "relative"
  }
}))

class Titlebar extends Component {
  state = {
    anchorEl: undefined,
    open: false
  }

  handleClick = event => {
    this.setState({ open: true, anchorEl: event.currentTarget })
  }

  handleRequestClose = () => {
    this.setState({ open: false })
  }

  paginateForward = () => {
    let termStart = this.props.termBounds[0]
    let termEnd = this.props.termBounds[1]
    if (this.props.calendarType === "Weekview") {
    }
  }

  render() {
    const classes = this.props.classes
    return (
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton aria-label="Paginate Backward">
            <NavigateBefore style={{ color: "white" }} />
          </IconButton>
          <Typography type="title" component="h1" colorInherit>
            {monthNames[this.props.currentDateRange.month] +
              " " +
              this.props.currentDateRange.day}
          </Typography>
          <IconButton
            aria-label="Paginate Forward"
            onClick={this.paginateForward}
          >
            <NavigateNext style={{ color: "white" }} />
          </IconButton>
          <IconButton
            aria-label="More options and views"
            onClick={this.handleClick}
          >
            <MoreVert style={{ color: "white" }} />
          </IconButton>

          <Menu
            anchorEl={this.state.anchorEl}
            open={this.state.open}
            onRequestClose={this.handleRequestClose}
          >
            <MenuItem onClick={this.handleRequestClose}>Month View</MenuItem>
            <MenuItem onClick={this.handleRequestClose}>Week View</MenuItem>
            <MenuItem onClick={this.handleRequestClose}>Day View</MenuItem>
            <MenuItem onClick={this.handleRequestClose}>Schedule View</MenuItem>
            <MenuItem onClick={this.handleRequestClose}>Download ICal</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    )
  }
}

Titlebar.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styleSheet)(Titlebar)
