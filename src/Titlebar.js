import React, { Component } from "react";
import IconButton from "material-ui/IconButton";
import NavigateBefore from "material-ui-icons/NavigateBefore";
import NavigateNext from "material-ui-icons/NavigateNext";
import MoreVert from "material-ui-icons/MoreVert";
import Menu, { MenuItem } from 'material-ui/Menu';

const titlebarStyle = {};

class Titlebar extends Component {

  state = {
    anchorEl: undefined,
    open: false,
  };


  handleClick = (event) => {
    this.setState({ open: true, anchorEl: event.currentTarget });
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };



  render() {
    return (
      <div
        style={{
          backgroundColor: "#877148",
          color: "white",
          padding: 8,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center"
          }}
        >
          <IconButton  aria-label="Paginate Backward">
            <NavigateBefore style={{ color: "white" }} />
          </IconButton>

          <h1 style={{width: 175}}>Sept 22-30</h1>

          <IconButton aria-label="Paginate Forward">
            <NavigateNext style={{ color: "white" }} />
          </IconButton>
        </div>

        <IconButton aria-label="More options and views" onClick={this.handleClick}>
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
      </div>
    );
  }
}

export default Titlebar;
