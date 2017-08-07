import React, { Component } from "react"
import IconButton from "material-ui/IconButton"
import NavigateBefore from "material-ui-icons/NavigateBefore"
import NavigateNext from "material-ui-icons/NavigateNext"
import CloseIcon from "material-ui-icons/Close"
import MoreVert from "material-ui-icons/MoreVert"
import Button from "material-ui/Button"
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle
} from "material-ui/Dialog"
import Radio, { RadioGroup } from "material-ui/Radio"
import { FormControlLabel } from "material-ui/Form"
import { withStyles, createStyleSheet } from "material-ui/styles"
import PropTypes from "prop-types"
import AppBar from "material-ui/AppBar"
import Snackbar from "material-ui/Snackbar"
import Toolbar from "material-ui/Toolbar"
import Typography from "material-ui/Typography"
import { shortMonthNames, monthNames } from "../utils/Strings"
import {
  getWeekArray,
  getWeekOfMonth,
  getWeeksOfMonth
} from "./../utils/DateHelper"
import Slide from "material-ui/transitions/Slide"
import { translate } from "react-i18next"

const styleSheet = createStyleSheet("SimpleAppBar", theme => ({
  appBar: {
    zIndex: "999",
    position: "relative"
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between"
  },
  paginator: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white"
  },
  icons: {
    color: "white"
  },
  dateRange: {
    color: "inherit",
    width: 140,
    textAlign: "center"
  }
}))

class ConfirmationDialog extends Component {
  state = {
    selectedValue: undefined
  }

  componentWillMount() {
    this.setState({ selectedValue: this.props.selectedValue })
  }

  componentWillUpdate(nextProps) {
    if (nextProps.selectedValue !== this.props.selectedValue) {
      // eslint-disable-next-line react/no-will-update-set-state
      this.setState({ selectedValue: nextProps.selectedValue })
    }
  }

  radioGroup = null

  handleEntering = () => {
    this.radioGroup.focus()
  }

  handleCancel = () => {
    this.props.onRequestClose(this.props.selectedValue)
  }

  handleOk = () => {
    this.props.onRequestClose(this.state.selectedValue)
  }

  handleChange = (event, value) => {
    this.setState({ selectedValue: value })
  }
  render() {
    const { selectedValue, t, ...other } = this.props
    return (
      <Dialog
        role="dialog"
        id="dialogbox-calendar"
        aria-label="View selection"
        tabIndex="0"
        open={this.props.open}
        onRequestClose={this.handleClose}
        transition={<Slide direction="down" />}
        ignoreBackdropClick
        ignoreEscapeKeyUp
        maxWidth="xs"
        onEntering={this.handleEntering}
        {...other}
      >
        <DialogTitle>
          {"Change view?"}
        </DialogTitle>
        <DialogContent>
          <RadioGroup
            innerRef={node => {
              this.radioGroup = node
            }}
            aria-label="viewSelector"
            name="viewSelector"
            selectedValue={this.state.selectedValue}
            onChange={this.handleChange}
          >
            <FormControlLabel
              value="monthview"
              key="monthView"
              control={<Radio />}
              label="Month View"
            />
            <FormControlLabel
              value="weekview"
              key="weekView"
              control={<Radio />}
              label="Week View"
            />
            <FormControlLabel
              value="scheduleview"
              key="scheduleView"
              control={<Radio />}
              label="Schedule View"
            />
          </RadioGroup>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={this.handleOk}
            aria-label="Confirm selection"
            color="accent"
          >
            {t("ok", {})}
          </Button>
          <Button
            onClick={this.handleCancel}
            aria-label="Cancel selection"
            color="accent"
          >
            {t("cancel", {})}
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

ConfirmationDialog.propTypes = {
  onRequestClose: PropTypes.func,
  selectedValue: PropTypes.string
}

class Titlebar extends Component {
  state = {
    anchorEl: undefined,
    snackbar: false,
    snackbarMessage: "",
    open: false,
    selected: "",
    selectedValue: "weekview"
  }

  handleClick = () => {
    this.setState({ open: true })
  }

  handleRequestClose = value => {
    this.setState({ open: false, selected: value, selectedValue: value })
    this.props.changeCalendarView(value)
  }

  openSnackbar = message => {
    this.setState({ snackbar: true, snackbarMessage: message })
    if (Object.is(document.getElementById("calendar-alert-snackbar"), null)) {
      setTimeout(() => {
        document.getElementById("calendar-alert-snackbar").focus()
      }, 50)
    } else {
      document.getElementById("calendar-alert-snackbar").focus()
    }
  }

  closeSnackbar = () => {
    this.setState({ snackbar: false })
  }

  paginateForward = () => {
    if (
      Object.is(this.props.termBounds, null) ||
      Object.is(this.props.termBounds, undefined)
    ) {
      return
    }
    
    let termEnd = new Date(this.props.termBounds[1])

    const endMonth = termEnd.getMonth()
    const endYear = termEnd.getFullYear()
    const endDay = termEnd.getDate()
    const endWeek = getWeekOfMonth(endYear, endMonth, endDay)
    let dateObj = this.props.currentDateRange

    switch (this.props.calendarType) {
      case "monthview":
        if (dateObj.month === endMonth) {
          this.openSnackbar("End of term reached")
          return
        }
        if (dateObj.month === 11) {
          dateObj.year++
          dateObj.month = 0
          dateObj.day = 1
          this.props.changeDateRange(dateObj)
        } else {
          dateObj.month++
          this.props.changeDateRange(dateObj)
        }

        break

      case "weekview":
      case "scheduleview":
      default:
        if (dateObj.month === endMonth && dateObj.week === endWeek) {
          this.openSnackbar("End of term reached")
        } else {
          const weekArr = getWeekArray(
            dateObj.month,
            dateObj.year,
            dateObj.week
          )
          const len = weekArr.length
          const d = new Date(dateObj.year, dateObj.month + 1, 0)
          const endDayOfMonth = d.getDate()
          if (dateObj.month === 11) {
            if (weekArr[0].month === 11 && weekArr[len - 1].month === 0) {
              dateObj.month = 0
              dateObj.week = 2
            }
          } else if (weekArr[len - 1].month > dateObj.month ) {
            dateObj.month++
            dateObj.week = 2
          }else if(weekArr[len-1].day === endDayOfMonth){
            dateObj.month++
            dateObj.week = 1
          } else {
            dateObj.week++
          }

          this.props.changeDateRange(dateObj)

          break
        }
    }
  }

  paginateBackward = () => {
    if (
      Object.is(this.props.termBounds, null) ||
      Object.is(this.props.termBounds, undefined)
    ) {
      return
    }
    let termStart = new Date(this.props.termBounds[0])

    const startMonth = termStart.getMonth()
    const startYear = termStart.getFullYear()
    const startDay = termStart.getDate()
    const startWeek = getWeekOfMonth(startYear, startMonth, startDay)
    let dateObj = this.props.currentDateRange

    switch (this.props.calendarType) {
      case "monthview":
        if (dateObj.month === startMonth) {
          this.openSnackbar("Start of term reached")
          return
        }
        if (dateObj.year === 0) {
          dateObj.year--
          dateObj.day = 1
          dateObj.month = 11
          this.props.changeDateRange(dateObj)
        } else {
          dateObj.month--
          dateObj.day = 1
          this.props.changeDateRange(dateObj)
        }

        break

      case "weekview":
      case "scheduleview":
      default:
        if (dateObj.month === startMonth && dateObj.week === startWeek) {
          this.openSnackbar("Start of term reached")
        } else {
          const weekArr = getWeekArray(
            dateObj.month,
            dateObj.year,
            dateObj.week
          )
          if (dateObj.month === 0) {
            if (weekArr[0].month === 0 && weekArr[0].day < 7) {
              dateObj.month = 11
              const d = new Date(dateObj.year, 11, 4)
              dateObj.week = getWeeksOfMonth(d)
            }
          } else if (dateObj.week === 1) {
            if (weekArr[0].day < 7){
              const d = new Date(dateObj.year, dateObj.month - 1, 4)
              dateObj.month--
              dateObj.week = getWeeksOfMonth(d)
            }else{
              const d = new Date(dateObj.year, dateObj.month - 2, 4)
              dateObj.month-- 
              dateObj.week = getWeeksOfMonth(d)
            }
          } else {
            dateObj.week--
          }

          this.props.changeDateRange(dateObj)

          break
        }
    }
  }

  getDateRange = () => {
    const { t } = this.props
    const classes = this.props.classes
    const dateObj = this.props.currentDateRange
    const weekDateArray = getWeekArray(
      dateObj.month,
      dateObj.year,
      dateObj.week
    )
    const len = weekDateArray.length
    const longMonth = monthNames[weekDateArray[0].month]
    const longEndMonth = monthNames[weekDateArray[len - 1].month]

    let text
    let ariaLabel

    if (
      this.props.calendarType === "weekview" ||
      this.props.calendarType === "scheduleview"
    ) {
      if (weekDateArray[len - 1].month > weekDateArray[0].month || (weekDateArray[0].month === 11 && weekDateArray[len - 1].month === 0)) {
        const endMonth = weekDateArray[len - 1].month
        text = `${t(shortMonthNames[weekDateArray[0].month], {})} ${weekDateArray[0]
          .day} - ${t(shortMonthNames[endMonth], {})} ${weekDateArray[len - 1]
          .day}`
        ariaLabel = `${t(longMonth, {})} ${weekDateArray[0].day} to ${t(
          longEndMonth,
          {}
        )} ${weekDateArray[len - 1].day}`
      } else {
        text = `${t(shortMonthNames[weekDateArray[0].month], {})} ${weekDateArray[0]
          .day} - ${weekDateArray[weekDateArray.length - 1].day}`
        ariaLabel = `${t(longMonth, {})} ${weekDateArray[0].day} to ${t(
          longEndMonth,
          {}
        )} ${weekDateArray[len - 1].day}`
      }
    } else if (this.props.calendarType === "monthview") {
      text = t(shortMonthNames[dateObj.month], {})
      ariaLabel = longMonth
    }

    return (
      <Typography
        type="title"
        className={classes.dateRange}
        style={{ width: 140 }}
        aria-label={ariaLabel}
        tabIndex="0"
      >
        {text}
      </Typography>
    )
  }

  render() {
    // if (Object.is(document.getElementById("calendar-alert-snackbar"), null)){
    // }else{
    //   document.getElementById("calendar-alert-snackbar").focus();
    // }

    const classes = this.props.classes
    const { t } = this.props
    return (
      <AppBar className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <div className={classes.paginator}>
            <IconButton
              aria-label="Paginate Backward"
              onClick={this.paginateBackward}
            >
              <NavigateBefore className={classes.icons} />
            </IconButton>
            {this.getDateRange()}
            <IconButton
              aria-label="Paginate Forward"
              onClick={this.paginateForward}
            >
              <NavigateNext className={classes.icons} />
            </IconButton>
          </div>
          <IconButton
            aria-label="More options and views"
            onClick={this.handleClick}
          >
            <MoreVert style={{ color: "white" }} />
          </IconButton>
        </Toolbar>
        <ConfirmationDialog
          open={this.state.open}
          onRequestClose={this.handleRequestClose}
          selectedValue={this.state.selectedValue}
          t={t}
        />
        <Snackbar
          id="calendar-alert-snackbar"
          tabIndex="0"
          anchorOrigin={{
            vertical: "top",
            horizontal: "center"
          }}
          open={this.state.snackbar}
          autoHideDuration={6e3}
          onRequestClose={this.closeSnackbar}
          message={
            <span id="message-id">
              {this.state.snackbarMessage}
            </span>
          }
          action={
            <IconButton
              tabIndex="0"
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.closeSnackbar}
            >
              <CloseIcon />
            </IconButton>
          }
        />
      </AppBar>
    )
  }
}

Titlebar.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styleSheet)(
  translate("view", { wait: true })(Titlebar)
)
