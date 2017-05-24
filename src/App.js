import React, { Component } from "react";
import Weekview from "./Weekview";
import Titlebar from "./Titlebar";
import "typeface-oxygen";
import "./Calendar.css";
import Scheduleview from "./Scheduleview"

class App extends Component {

    state = {
      courses: null,
      termBounds: null,
      currentDateRange: null,
      calendarType: "weekview",
      theme: "oakland",
      url: null
    }

    componentDidMount(){
      fetch("http://141.210.186.163:8082/api/terms")
        .then(response => {
          return response.json()
        })
        .then(data => {
          this.setState({termBounds: [data.terms[0].start, data.terms[0].end]})
        })

      fetch("http://141.210.186.163:8082/api/calendar")
        .then(response => {
          return response.json()
        })
        .then(data => {
          this.setState({courses: data.studentDetails})
        })

      let d = new Date()
      let obj = {
        year: d.getFullYear(),
        month: d.getMonth(),
        day: d.getDate()
      }
      this.setState({currentDateRange: obj})
    }

  render() {
    if (this.state.courses === null || this.state.courses === undefined){
      return (<div>boom</div>)
    }
    return (
      <div style={{ fontFamily: "Oxygen" }}>
        <Titlebar currentDateRange={this.state.currentDateRange} termBounds={this.state.termBounds} courses={this.state.courses} calendarType={this.state.calendarType}/>
        <Scheduleview />
      </div>
    );
  }
}

export default App;
