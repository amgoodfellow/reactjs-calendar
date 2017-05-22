import React, { Component } from "react";
import Weekview from "./Weekview";
import Titlebar from "./Titlebar";
import "typeface-oxygen";
import "./Calendar.css";

class App extends Component {
  render() {
    return (
      <div style={{ fontFamily: "Oxygen" }}>
        <Titlebar />
        <Weekview />
      </div>
    );
  }
}

export default App;
