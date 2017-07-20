import React, { Component } from "react"
import Weekview from "./components/Weekview"
import ScheduleView from "./components/ScheduleView"
import Titlebar from "./components/Titlebar"
import MonthView from "./components/MonthView"
import MobileMonthView from "./components/MobileMonthView"
import { getEvents } from "./api/api"
import { getWeekOfMonth } from "./utils/DateHelper"
import { changeURL } from "./utils/i18n.js"

class App extends Component {
  state = {
    events: null,
    termBounds: null,
    currentDateRange: null,
    calendarType: "weekview",
    theme: "oakland",
    url: null,
    width: document.getElementById(this.props.rootID).clientWidth,
    mobile: false
  }

  updateMonthViewClicked = (year, month, week, day) => {
    let newDateRange = {
      year: year,
      month: month,
      week: week,
      day: day
    }
    this.setState({
      currentDateRange: newDateRange,
      calendarType: "scheduleview"
    })
  }

  updateWidth = () => {
    this.setState({
      width: document.getElementById(this.props.rootID).clientWidth
    })
    if (this.state.width < 796) {
      this.setState({ mobile: true })
    } else {
      this.setState({ mobile: false })
    }
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateWidth)

    changeURL(this.props.translateURL)

    if (document.getElementById(this.props.rootID).clientWidth < 796) {
      this.setState({ mobile: true })
    }

    getEvents(this.props.eventsURLObj).then(events => {
      this.setState({ events })
    })

    this.setState({ termBounds: this.props.termBounds })

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
            meetings={this.state.events}
            currentDateRange={this.state.currentDateRange}
            changeDateRange={this.changeDateRange}
          />
        )
      case "monthview":
        if (this.state.mobile) {
          return (
            <MobileMonthView
              events={this.state.events}
              currentDateRange={this.state.currentDateRange}
              changeDateRange={this.changeDateRange}
              updateClicked={(day, month, view, year) =>
                this.updateMonthViewClicked(day, month, view, year)}
            />
          )
        } else {
          return (
            <MonthView
              calendar={this.state.events}
              currentDateRange={this.state.currentDateRange}
              changeDateRange={this.changeDateRange}
            />
          )
        }
      case "scheduleview":
        return (
          <ScheduleView
            events={this.state.events}
            currentDateRange={this.state.currentDateRange}
          />
        )
      default:
        return (
          <Weekview
            meetings={this.state.calendar}
            currentDateRange={this.state.currentDateRange}
          />
        )
    }
  }

  render() {
    if (this.state.events === null || this.state.events === undefined) {
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
