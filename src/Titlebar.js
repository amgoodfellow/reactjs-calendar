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
          <IconButton  aria-label="Paginate Backward">
            <NavigateBefore style={{ color: "white" }} />
          </IconButton>

          <h1 style={{width: 175}}>Sept 22-30</h1>

          <IconButton aria-label="Paginate Forward">
            <NavigateNext style={{ color: "white" }} />
          </IconButton>
        </div>

        <IconButton>
          <MoreVert aria-label="More options and views" style={{ color: "white" }} />
        </IconButton>
      </div>
    );
  }
}

export default Titlebar;
