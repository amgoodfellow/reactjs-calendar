import React, { Component } from "react";
import List, { ListItem, ListItemText } from "material-ui/List";
import Typography from "material-ui/Typography";
import Card, { CardHeader, CardContent, CardMedia } from "material-ui/Card";
import { withStyles, createStyleSheet } from "material-ui/styles";
import PropTypes from "prop-types";
import grizzHead from "/home/dorisgjata/react-calendar-2.0/src/utils/grizzHead.png"

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
    borderLeftColor: "#d32f2f",
  
  },
    media: {
    padding: "10px",
    display: "flex",
    alignSelf: "center",
    marginLeft: "10px"

    //backgroundColor: "#0074b7"
  }
  
}));
class ErrorMessages extends Component {
  render() {
    const classes = this.props.classes;
    return (
      <div className={classes.root}>
        <Card className={classes.card}>
           <div style={{display: "flex", flexDirection: "row"}}>
          <CardMedia className={classes.media}>
            <img src={grizzHead} width="123.6px" height="95.6px" alt="Grizz Head Image" aria-hidden="true"/>
        </CardMedia>
       <div  style={{display: "flex", flexFlow: "column wrap"}}>
          <CardHeader title="We were unable to fetch data at this time" />

          <CardContent>
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
