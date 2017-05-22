import React, { Component } from "react";
import IconButton from "material-ui/IconButton";
import NavigateBefore from "material-ui-icons/NavigateBefore";
import NavigateNext from "material-ui-icons/NavigateNext";
import MoreVert from "material-ui-icons/MoreVert";

const titlebarStyle = {};

class Titlebar extends Component {
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
          <IconButton>
            <NavigateBefore style={{ color: "white" }} />
          </IconButton>

          <h1>April 21-28</h1>

          <IconButton>
            <NavigateNext style={{ color: "white" }} />
          </IconButton>
        </div>

        <IconButton>
          <MoreVert style={{ color: "white" }} />
        </IconButton>
      </div>
    );
  }
}

export default Titlebar;
