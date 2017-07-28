import React, { Component } from "react";
import List, { ListItem, ListItemText } from "material-ui/List";
import Typography from "material-ui/Typography";
import Card, { CardHeader, CardContent, CardMedia } from "material-ui/Card";
import { withStyles, createStyleSheet } from "material-ui/styles";
import PropTypes from "prop-types";

const styleSheet = createStyleSheet("ErrorMessages", theme => ({
  root: {
    position: "relative",
    width: "70%",
    textAlign: "ltr"
  },
  card: {
    backgroundColor: "#fafafa ",

    borderLeftStyle: "solid",
    borderLeftWidth: "12px",
    borderLeftColor: "#d32f2f"
  },
  media: {
    padding: "10px",
    display: "flex",
    alignSelf: "center",
    marginLeft: "10px"

    //backgroundColor: "#0074b7"
  },
  main: {
    display: "flex",
    flexDirection: "row"
  },
  head: {
    display: "flex",
    flexFlow: "column wrap"
  },
  content:{
    paddingTop: 0 
  }
}));
class ErrorMessages extends Component {
  render() {
    const classes = this.props.classes;
    return (
      <div className={classes.root}>
        <Card className={classes.card}>
          <div className={classes.main}>
            <CardMedia className={classes.media}>
               ¯\_(ツ)_/¯
            </CardMedia>
            <div className={classes.head}>
              <CardHeader title="We were unable to fetch data at this time" />

              <CardContent className={classes.content}>
                <Typography type="body1">Please try again later</Typography>
              </CardContent>
            </div>
          </div>
        </Card>
      </div>
    );
  }
}

ErrorMessages.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styleSheet)(ErrorMessages);
