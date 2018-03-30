import React, { Component } from "react"
import Weekview from "./components/Weekview"
import ScheduleView from "./components/ScheduleView"
import Titlebar from "./components/Titlebar"
import MonthView from "./components/MonthView"
import MobileMonthView from "./components/MobileMonthView"
import { getEvents } from "./api/api"
import { getWeekOfMonth } from "./utils/DateHelper"
import ErrorMessages from "./components/ErrorMessages.js"
import { CircularProgress } from "material-ui/Progress"
import { changeURL } from "./utils/i18n.js"
import CssBaseline from 'material-ui/CssBaseline';

//Object.is() polyfill

// eslint-disable-next-line
if (!Object.is) {
  Object.is = function(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y
    } else {
      // Step 6.a: NaN == NaN
      // eslint-disable-next-line
      return x !== x && y !== y
    }
  }
}
// End of polyfill


class App extends Component {
  state = {
    loading: true,
    events: null,
    termBounds: null,
    currentDateRange: null,
    calendarType: "scheduleview",
    theme: "oakland",
    url: null,
    width: document.getElementById(this.props.rootID).clientWidth,
    mobile: false
  }

  updateMonthViewClicked = (year, month, week, day) => {
    console.log("updateMonthViewClicked")
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

    if (this.props.rootID === "root") {
      changeURL("http://localhost:8082/locales/{{lng}}/{{ns}}.json")
    } else {
      changeURL(this.props.translateURL)
    }

    if (document.getElementById(this.props.rootID).clientWidth < 796) {
      this.setState({ mobile: true })
    }

    getEvents(this.props.eventsURLObj).then(events => {
      if (!(events instanceof Error)) {
        this.setState({ events, loading: false })
      } else {
        this.setState({ loading: false })
      }
    })

    this.setState({ termBounds: this.props.termBounds })

    let obj
    const d = new Date()

    try {
      const termStart = new Date(this.props.termBounds[0])
      const termEnd = new Date(this.props.termBounds[1])

      if (termStart < d && d < termEnd) {
        obj = {
          year: d.getFullYear(),
          month: d.getMonth(),
          week: getWeekOfMonth(d.getFullYear(), d.getMonth(), d.getDate()),
          day: d.getDate()
        }
      } else {
        obj = {
          year: termStart.getFullYear(),
          month: termStart.getMonth(),
          week: getWeekOfMonth(
            termStart.getFullYear(),
            termStart.getMonth(),
            termStart.getDate()
          ),

          day: termStart.getDate()
        }
      }
    } catch (err) {
      const d = new Date()

      obj = {
        year: d.getFullYear(),
        month: d.getMonth(),
        week: getWeekOfMonth(d.getFullYear(), d.getMonth(), d.getDate()),
        day: d.getDate()
      }
    }

    this.setState({ currentDateRange: obj })
  }

  componentWillReceiveProps(nextProps) {
    if (Object.is(nextProps.termBounds, this.props.termBounds)) {
      return
    }
    let obj
    const d = new Date()
    try {
      getEvents(this.props.eventsURLObj).then(events => {
        if (!(events instanceof Error)) {
          this.setState({ events, loading: false })
        } else {
          this.setState({ loading: false })
        }
      })

      const termStart = new Date(nextProps.termBounds[0])
      const termEnd = new Date(nextProps.termBounds[1])

      if (termStart < d && d < termEnd) {
        obj = {
          year: d.getFullYear(),
          month: d.getMonth(),
          week: getWeekOfMonth(d.getFullYear(), d.getMonth(), d.getDate()),
          day: d.getDate()
        }
      } else {
        obj = {
          year: termStart.getFullYear(),
          month: termStart.getMonth(),
          week: getWeekOfMonth(
            termStart.getFullYear(),
            termStart.getMonth(),
            termStart.getDate()
          ),

          day: termStart.getDate()
        }
      }
    } catch (err) {
      const d = new Date()

      obj = {
        year: d.getFullYear(),
        month: d.getMonth(),
        week: getWeekOfMonth(d.getFullYear(), d.getMonth(), d.getDate()),
        day: d.getDate()
      }
    }
    this.setState({ currentDateRange: obj, termBounds: nextProps.termBounds })
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
          <ScheduleView
            events={this.state.events}
            currentDateRange={this.state.currentDateRange}
          />
        )
    }
  }

  render() {
    if (this.state.loading === true) {
      return <CircularProgress color="secondary" />
    } else if (this.state.events === null || this.state.events === undefined) {
      return (
        <div>
          <ErrorMessages />
        </div>
      )
    }
    return (
      <div>
        <CssBaseline />
        <Titlebar
          currentDateRange={this.state.currentDateRange}
          termBounds={this.state.termBounds}
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
