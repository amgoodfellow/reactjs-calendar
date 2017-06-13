import React, { Component } from "react"
import Weekview from "./components/Weekview"
import Scheduleview from "./components/Scheduleview"
import Titlebar from "./components/Titlebar"
import MonthView from "./components/MonthView"
import { getWeekOfMonth } from "./utils/DateHelper"

class App extends Component {
  state = {
    calendar: null,
    termBounds: null,
    currentDateRange: null,
    calendarType: "weekview",
    theme: "oakland",
    url: null,
    width: document.getElementById('root').clientWidth,
    mobile: false,
  }
  
  updateWidth = () => {
    this.setState({width: document.getElementById('root').clientWidth})
    if (this.state.width < 768){
      this.setState({mobile: true})
    }else{
      this.setState({mobile: false})
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
        this.setState({ calendar: data })
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
        return <Weekview />
      case "monthview":
        return (
          <MonthView
            calendar={this.state.calendar}
            currentDateRange={this.state.currentDateRange}
          />
        )
      case "scheduleview":
        return <Scheduleview />
      default:
        return <Weekview />
    }
  }

  render() {
    if (this.state.calendar === null || this.state.calendar === undefined) {
      return <div>boom</div>
    }
    return (
      <div>
        <Titlebar
          currentDateRange={this.state.currentDateRange}
          termBounds={this.state.termBounds}
          calendar={this.state.calendar}
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
