import React, { Component } from "react";
import List, { ListItem, ListItemText } from "material-ui/List";
import Typography from "material-ui/Typography";
import Card, { CardHeader, CardContent, CardMedia } from "material-ui/Card";
import { withStyles, createStyleSheet } from "material-ui/styles";
import PropTypes from "prop-types";
import Icon from "material-ui/Icon";

const styleSheet = createStyleSheet("ErrorMessages", theme => ({
  root: {
    position: "relative",
    width: "70%",
    textAlign: "center",
  },
  materialIcons: {      
    padding: "10px"
  }
}));
class ErrorMessages extends Component {
  render() {
    const classes = this.props.classes;
    return (
      <div className={classes.root}>
        <Card>
          <Icon className={classes.materialIcons}>
            <svg
              fill="#000000"
              height="24"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
            </svg>
          </Icon>
          <CardHeader title="We were unable to fetch data at this time" />

          <CardContent>
            <Typography type="body1">Please try again later</Typography>
          </CardContent>
        </Card>
      </div>
    );
  }
}

ErrorMessages.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styleSheet)(ErrorMessages);
