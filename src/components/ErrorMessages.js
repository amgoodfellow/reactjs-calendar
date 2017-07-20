import React, { Component } from "react";
import List, { ListItem, ListItemText } from "material-ui/List";
import Typography from "material-ui/Typography";
import Card, { CardHeader, CardContent, CardMedia } from "material-ui/Card";
import { withStyles, createStyleSheet } from "material-ui/styles";
import PropTypes from "prop-types";
import SvgIcon from "material-ui/SvgIcon";

const styleSheet = createStyleSheet("ErrorMessages", theme => ({
  root: {
    position: "relative",
    width: "70%",
    textAlign: "center"
  },
  card: {
    backgroundColor: "#fafafa "
    /**
    borderLeftStyle: "solid",
    borderLeftWidth: "10px",
    borderLeftColor: "rgba(0, 0, 0, 0.6)",
     */
  },
  materialIcons: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#0074b7"
  }
}));
class ErrorMessages extends Component {
  render() {
    const classes = this.props.classes;
    return (
      <div className={classes.root}>
        <Card className={classes.card}>
          <SvgIcon className={classes.materialIcons}>
            <svg
              fill="#FFFFFF"
              height="24"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
            </svg>
          </SvgIcon>
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
