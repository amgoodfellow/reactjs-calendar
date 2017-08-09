import React, { Component } from "react"
import ListItem from "material-ui/List"
import Typography from "material-ui/Typography"
import { withStyles, createStyleSheet } from "material-ui/styles"
import Card, { CardHeader, CardContent, CardActions } from "material-ui/Card"
import Collapse from "material-ui/transitions/Collapse"
import IconButton from "material-ui/IconButton"
import ExpandMoreIcon from "material-ui-icons/ExpandMore"
import PropTypes from "prop-types"
import classnames from "classnames"
const styleSheet = createStyleSheet("ExpandedCard", theme => ({
  card: {
    width: "100%",
    backgroundColor: "#fafafa ",
    transition: theme.transitions.create("transform", {
      easing: theme.transitions.easing.easeInOut
    })
  },
  expand: {
    transform: "rotate(0deg)",
    duration: theme.transitions.duration.shorter
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  list: {
    paddingTop: "1px",
    width: "100%",
    boxSizing: "border-box",
    float: "left",
    alignContent: "center"
  },
  CardHead: {
    display: "flex",
    justifyContent: "space-around",
    flexFlow: "row nowrap",
    fontWeight: "bold"
  },
  CardBody: {
    display: "flex",
    justifyContent: "space-around",
    flexFlow: "row nowrap"
  }
}))
class DayCard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      expand: false
    }
  }

  handleExpandClick = () => {
    this.setState(state => ({ expand: !state.expand }))
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
        <ListItem role="listitem" className={classes.list}>
          <Card tabIndex="0" className={classes.card}>
            <div className={classes.CardHead}>
              <CardHeader
                title={meeting.coursetitle}
                subheader={`${meeting.starttime} - 
                     ${meeting.starttime}`}
              />
              <CardActions disableActionSpacing>
                <IconButton
                  aria-label="More Course Information"
                  className={classnames(
                    classes.expand,
                    {
                      [classes.expandOpen]: this.state.expand
                    },
                    [classes.collapse]
                  )}
                  onClick={this.handleExpandClick}
                  aria-expanded={this.state.expand}
                >
                  <ExpandMoreIcon />
                </IconButton>
              </CardActions>
            </div>
            <Collapse
              className={classes.collapse}
              in={this.state.expand}
              transitionDuration="auto"
              unmountOnExit
            >
              <div className={classes.CardBody}>
                <CardContent tabIndex="0">
                  <Typography paragraph type="body2">
                    Location:
                  </Typography>
                  <Typography paragraph type="caption">
                    {meeting.buildingroom}
                  </Typography>
                  <Typography paragraph type="body2">
                    Course Name:
                  </Typography>
                  <Typography paragraph type="caption">
                    {meeting.coursename}
                  </Typography>
                </CardContent>
              </div>
            </Collapse>
          </Card>
        </ListItem>
      )
    }
  }
}

DayCard.propTypes = {
  classes: PropTypes.object.isRequired
}
export default withStyles(styleSheet)(DayCard)
