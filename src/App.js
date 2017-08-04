import React, { Component } from "react"
import Weekview from "./components/Weekview"
import ScheduleView from "./components/ScheduleView"
import Titlebar from "./components/Titlebar"
import MonthView from "./components/MonthView"
import MobileMonthView from "./components/MobileMonthView"
import { getEvents } from "./api/api"
import { getWeekOfMonth, getWeekArray } from "./utils/DateHelper"
import ErrorMessages from "./components/ErrorMessages.js"
import { CircularProgress } from 'material-ui/Progress';
import { changeURL } from "./utils/i18n.js"


class App extends Component {
  state = {
    loading: true,
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
      if (!(events instanceof Error)){
        this.setState({ events, loading: false })
      }else{
        this.setState({loading: false})
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
        week: getWeekOfMonth(
          d.getFullYear(),
          d.getMonth(),
          d.getDate()
        ),
        day: d.getDate()
      }
    }

    this.setState({ currentDateRange: obj })
  }

  componentWillReceiveProps(nextProps){
    if (Object.is(nextProps.termBounds, this.props.termBounds)){
      return
    }
    let obj
    const d = new Date()
    try {
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
        week: getWeekOfMonth(
          d.getFullYear(),
          d.getMonth(),
          d.getDate()
        ),
        day: d.getDate()
      }
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
    if (this.state.loading === true){
      return <CircularProgress color="accent"/>
    }else if (this.state.events === null || this.state.events === undefined) {
      return <div><ErrorMessages/></div>
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
