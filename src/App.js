import React, { Component } from "react";
import Weekview from "./Weekview";
import Titlebar from "./Titlebar";
import "typeface-oxygen";
import "./Calendar.css";
import OaklandParser from "./utils/OaklandParser"
import Scheduleview from "./Scheduleview"

class App extends Component {

    state = {
      courses: null,
      theme: "oakland",
      url: null
    }

    componentDidMount(){
      fetch("http://141.210.186.163:8082/api/courses")
        .then(response => {
          return response.json()
        })
        .then(data => {
          this.setState({courses: data.courses})
        })
    }

  render() {
    let thing = new OaklandParser(this.state.courses)
    console.log(thing.parseCourse())
    return (
      <div style={{ fontFamily: "Oxygen" }}>
        {console.log(this.state.courses)}
        <Titlebar />
        <Scheduleview />
      </div>
    );
  }
}

export default App;
