import React, { Component } from "react";
import { dayNames, shortDayNames } from "./../utils/Strings";
import { withStyles, createStyleSheet } from "material-ui/styles";
import Typography from "material-ui/Typography";
import PropTypes from "prop-types";
import Paper from "material-ui/Paper";
import Toolbar from "material-ui/Toolbar";
import { getWeeksOfMonth, getDaysInMonth } from "./../utils/DateHelper";
import DayList from "./DayList";
import DayBoxSchedule from "./DayBoxSchedule";
import { getEvents } from "./../api/api";
import Button from "material-ui/Button";

const styleSheet = createStyleSheet("MonthView", theme => ({
  root: {
    display: "flex",
    position: "relative",
    height: "650px"
  },
  dayDiv: {
    position: "relative",
    width: "20%"
  },
  dayTitleBar: {
    position: "relative",
    height: "50px",
    borderBottom: "1px solid transparent",
    color: "#FFFFFF",
    whiteSpace: "nowrap"
  },
  monthDiv: {
    width: "80%",
    height: "100%",
    overflow: "hidden"
  },
  monthTitleBar: {
    position: "relative",
    height: "50px"
  },
  table: {
    width: "100%",
    borderTop: "hidden",
    borderLeft: "1px solid white",
    borderRight: "hidden",
    borderCollapse: "collapse"
  },
  tableHead: {
    border: "1px solid rgba(0, 0, 0, 0.075)",
    color: "#000000",
    opacity: 0.8,
    textAlign: "center",
    fontWeight: "bold",
    borderTop: "hidden",
    height: "20%"
  },
  tableBody: {
    backgroundColor: "rgb(255,243,233)",
    color: "#000000",
    textAlign: "left",
    verticalAlign: "top"
  },
  cellStyle: {
    overflow: "hidden",
    fontSize: "15px",
    fontWeight: "bold",
    color: "#000000",
    border: "1px solid white",
    padding: "10px",
    whiteSpace: "nowarp"
  }
}));

class MonthView extends Component {
  constructor() {
    super();
    this.monthDayCounter = 1;
  }

  getFocus() {
    document.getElementById("focusElement").focus();
  }

  resetFocus() {
    document.getElementById(this.props.currentDateRange.day).focus();
  }

  displayWeekDay() {
    const dateObject = this.props.currentDateRange;
    const day = new Date(dateObject.year, dateObject.month, dateObject.day);
    const title = `${dayNames[day.getDay()]} ${dateObject.day}`;
    let date = day.getDate();
    let weekDay = day.getDay();
    for (let i = 0; i < 7; i++) {
      if (weekDay === i) {
        weekDay = dayNames[i];
      }
    }
    return title;
  }

  getMonthRows = () => {
    let dateObject = this.props.currentDateRange;
    const first = new Date(dateObject.year, dateObject.month, 1);
    const wks = getWeeksOfMonth(first);
    let rows = [];

    for (let i = 0; i < wks; i++) {
      rows.push(
        <tr
          style={{
            height: "100px"
          }}
        >
          {this.getDays(i)}
        </tr>
      );
    }
    this.monthDayCounter = 1;
    return rows;
  };

  getDays = wk => {
    const classes = this.props.classes;
    let days = [];
    //I can change this so it actually gives you the days
    //That way you won't have to do `.getDate()` at the end
    //Just let me know
    let dateObject = this.props.currentDateRange;
    const numDays = getDaysInMonth(dateObject.year, dateObject.month).getDate();

    const first = new Date(dateObject.year, dateObject.month, 1);

    let today = new Date();
    //Greyed out days at the end of monthview
    for (let i = 0; i < 7; i++) {
      if (
        this.monthDayCounter > numDays ||
        (this.monthDayCounter === 1 && wk === 0 && first.getDay() !== i)
      ) {
        days.push(
          <td
            className={classes.cellStyle}
            style={{
              backgroundColor: "#E0E0E0"
            }}
          />
        );
      } else {
        let localDay = this.monthDayCounter;
        let newDateObj = {
          year: dateObject.year,
          month: dateObject.month,
          week: dateObject.week,
          day: localDay
        };
        let fontStyle;
        let todaysColor;
        let currentDate = new Date(
          dateObject.year,
          dateObject.month,
          this.monthDayCounter
        );

        if (
          dateObject.year === today.getFullYear() &&
          dateObject.month === today.getMonth() &&
          this.monthDayCounter === today.getDate()
        ) {
          todaysColor = { backgroundColor: "rgba(86,162,100, 0.4)" };
          fontStyle = { fontWeight: "600" };
        }
        days.push(
          <td
            aria-label={currentDate.toLocaleDateString(["en-US"], {
              day: "numeric",
              month: "long",
              formatMacher: "best fit",
              localeMatcher: "best fit"
            })}
            aria-activedescendant={this.monthDayCounter + "class"}
            key={this.monthDayCounter}
            tabIndex="0"
            id={this.monthDayCounter}
            onClick={() => {
              this.props.changeDateRange(newDateObj), this.getFocus();
            }}
            className={classes.cellStyle}
            style={todaysColor}
          >
            <Typography type="body1" component="div" style={fontStyle}>
              {this.monthDayCounter}
              <div id={this.monthDayCounter + "class"}>
                <DayBoxSchedule
                  calendarMeeting={this.props.calendar}
                  year={this.props.currentDateRange.year}
                  month={this.props.currentDateRange.month}
                  day={this.monthDayCounter}
                />
              </div>
            </Typography>
          </td>
        );

        this.monthDayCounter++;
      }
    }
    return days;
  };

  weekDays() {
    let weekDaysRow = [];

    for (let i = 0; i < 7; ++i) {
      weekDaysRow.push(
        <th scope="col" key={dayNames[i]} style={{ width: "100rem" }}>
          <Typography type="body1" component="div" style={{ fontWeight: 600 }}>
            {shortDayNames[i]}
          </Typography>
        </th>
      );
    }
    return weekDaysRow;
  }

  render() {
    const classes = this.props.classes;
    return (
      <Paper
        tabIndex="0"
        aria-label={"Month View Calendar"}
        className={classes.root}
      >
        <div
          tabIndex="0"
          aria-label="Day schedule"
          id="focusElement"
          className={classes.dayDiv}
        >
          <Toolbar className={classes.dayTitleBar}>
            <Typography
              tabIndex="0"
              type="title"
              style={{ fontWeight: "bold", opacity: 0.9 }}
            >
              {this.displayWeekDay()}
            </Typography>
          </Toolbar>
          <div tabIndex="0">
            <DayList
              calendarMeeting={this.props.calendar}
              year={this.props.currentDateRange.year}
              month={this.props.currentDateRange.month}
              day={this.props.currentDateRange.day}
            />
          </div>
          <span
            tabIndex="0"
            role="button"
            aria-label="Return to month schedule"
            onClick={() => {
              this.resetFocus();
            }}
          />
        </div>
        <div aria-label="Month Schedule" className={classes.monthDiv}>
          <table className={classes.table}>
            <thead className={classes.tableHead}>
              <tr style={{ height: "50px" }}>
                {this.weekDays()}
              </tr>
            </thead>
            <tbody className={classes.tableBody}>
              {this.getMonthRows()}
            </tbody>
          </table>
        </div>
      </Paper>
    );
  }
}

MonthView.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styleSheet)(MonthView);
