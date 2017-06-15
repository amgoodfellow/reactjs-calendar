import React, { Component } from "react"
import Weekview from "./Weekview"
import Scheduleview from "./Scheduleview"
import Titlebar from "./Titlebar"
import { getWeekOfMonth } from "./utils/DateHelper"

class App extends Component {
  state = {
    meetings: null,
    termBounds: null,
    currentDateRange: null,
    calendarType: "weekview",
    theme: "oakland",
    url: null,
    width: document.getElementById("root").clientWidth,
    mobile: false
  }

  updateWidth = () => {
    this.setState({ width: document.getElementById("root").clientWidth })
    if (this.state.width < 768) {
      this.setState({ mobile: true })
    } else {
      this.setState({ mobile: false })
    }
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateWidth)
    fetch("http://localhost:8082/api/terms")
      .then(response => {
        return response.json()
      })
      .then(data => {
        this.setState({ termBounds: [data.terms[0].start, data.terms[0].end] })
      })

    fetch("http://localhost:8082/api/calendar")
      .then(response => {
        return response.json()
      })
      .then(data => {
        this.setState({ meetings: data })
      })

    let d = new Date()
    let obj = {
      year: d.getFullYear(),
      month: d.getMonth(),
      week: getWeekOfMonth(d.getFullYear(), d.getMonth(), d.getDate()),
      day: d.getDate()
    }
    this.setState({ currentDateRange: obj })
  }

  componentWillUnmount() {
    console.log("removed")
    window.removeEventListener("resize", this.updateWidth)
  }

  changeCalendarView = view => {
    this.setState({ calendarType: view })
  }

  changeDateRange = obj => {
    this.setState({
      currentDateRange: {
        year: obj.year,
        month: obj.month,
        week: obj.week,
        day: obj.day
      }
    })
  }

  chooseCalendarType = () => {
    switch (this.state.calendarType) {
      case "weekview":
        return (
          <Weekview
            meetings={this.state.meetings}
            currentDateRange={this.state.currentDateRange}
          />
        )
      case "monthview":
        return <div />
      case "scheduleview":
        return <Scheduleview />
      default:
        return <Weekview currentDateRange={this.state.currentDateRange} />
    }
  }

  render() {
    if (this.state.meetings === null || this.state.meetings === undefined) {
      return <div>boom</div>
    }
    return (
      <div>
        <Titlebar
          currentDateRange={this.state.currentDateRange}
          termBounds={this.state.termBounds}
          courses={this.state.courses}
          calendarType={this.state.calendarType}
          changeCalendarView={this.changeCalendarView}
          changeDateRange={this.changeDateRange}
        />
        {this.chooseCalendarType()}
      </div>
    )
  }
}

export default App
