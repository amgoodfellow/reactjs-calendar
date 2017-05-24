import React, { Component } from "react";
import {prettyHours} from "./utils/Strings"

const columnStyle = {
  width: "14%",
  height: "100%",
  textAlign: 'center',
};

const hourColStyle = {
  display: 'flex',
  flexDirection: 'column',
  width: '5%',
}

const hourCol = () => {
  let column = []
  for (let i = 0, size = prettyHours.length; i < size; i++){
     column.push(<p>{prettyHours[i]}</p>)
  }

  return column 
}

class Weekview extends Component {
  render() {
    return (
      <div style={{border: '1px solid black', height: 900, display: 'flex'}}>
        <div style={hourColStyle}>
          {hourCol()} 
        </div>
        <div style={columnStyle}>
          <p>
           Sunday 
          </p>
        </div>
        <div style={columnStyle}>
          <p>
            Monday
          </p>
        </div>
        <div style={columnStyle}>
          <p>
           Tuesday 
          </p>
        </div>
        <div style={columnStyle}>
          <p>
           Wednesday 
          </p>
        </div>
        <div style={columnStyle}>
          <p>
           Thursday 
          </p>
        </div>
        <div style={columnStyle}>
          <p>
           Friday 
          </p>
        </div>
        <div style={columnStyle}>
          <p>
           Saturday 
          </p>
        </div>
      </div>
    );
  }
}

export default Weekview;
