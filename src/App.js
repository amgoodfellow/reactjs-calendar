import React, { Component } from "react";
import Weekview from "./Weekview";
import Scheduleview from "./Scheduleview";
import Titlebar from "./Titlebar";

class App extends Component {
  state = {
    courses: null,
    termBounds: null,
    currentDateRange: null,
    calendarType: "weekview",
    theme: "oakland",
    url: null
  };

  componentDidMount() {
    fetch("http://localhost:8082/api/terms")
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({ termBounds: [data.terms[0].start, data.terms[0].end] });
      });

    fetch("http://localhost:8082/api/courses")
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({ courses: data.courses });
      });

    let d = new Date();
    let obj = {
      year: d.getFullYear(),
      month: d.getMonth(),
      day: d.getDate()
    };
    this.setState({ currentDateRange: obj });
  }

  changeCalendarView = view => {
    this.setState({ calendarType: view });
  };

  render() {
    if (this.state.courses === null || this.state.courses === undefined) {
      return <div>boom</div>;
    }
    return (
      <div>
        <Titlebar
          currentDateRange={this.state.currentDateRange}
          termBounds={this.state.termBounds}
          courses={this.state.courses}
          calendarType={this.state.calendarType}
          changeCalendarView={this.changeCalendarView}
        />
        <Weekview />
      </div>
    );
  }
}

export default App;
