import React, { Component } from "react";

const borderStyle = {
  width: "13%",
  height: "5%",
  border: "1px solid black"
};

class Weekview extends Component {
  render() {
    return (
      <table style={{ height: 850, tableLayout: "fixed", width: "100%" }}>
        <caption>Week view of student's schedule</caption>
        <thead>
          <tr>
            <td style={{ width: "9%", height: "5%" }} />
            <th scope="col"><abbr title="Sunday">Sun</abbr></th>
            <th scope="col"><abbr title="Monday">Mon</abbr></th>
            <th scope="col"><abbr title="Tuesday">Tue</abbr></th>
            <th scope="col"><abbr title="Wednesday">Wed</abbr></th>
            <th scope="col"><abbr title="Thursday">Thu</abbr></th>
            <th scope="col"><abbr title="Friday">Fri</abbr></th>
            <th scope="col"><abbr title="Saturday">Sat</abbr></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">7:00</th>
            <td style={borderStyle}><button /></td>
            <td style={borderStyle} />
            <td style={borderStyle} />
            <td style={borderStyle} />
            <td style={borderStyle} />
            <td style={borderStyle} />
            <td style={borderStyle} />
          </tr>
          <tr>
            <th scope="row">8:00</th>
            <td style={borderStyle} />
            <td style={borderStyle} />
            <td style={borderStyle} />
            <td style={borderStyle} />
            <td style={borderStyle} />
            <td style={borderStyle} />
            <td style={borderStyle} />
          </tr>
          <tr>
            <th scope="row">9:00</th>
            <td style={borderStyle} />
            <td style={borderStyle} />
            <td style={borderStyle} />
            <td style={borderStyle} />
            <td style={borderStyle} />
            <td style={borderStyle} />
            <td style={borderStyle} />
          </tr>
          <tr>
            <th scope="row">10:00</th>
            <td style={borderStyle} />
            <td style={borderStyle} />
            <td style={borderStyle} />
            <td style={borderStyle} />
            <td style={borderStyle} />
            <td style={borderStyle} />
            <td style={borderStyle} />
          </tr>
          <tr>
            <th scope="row">11:00</th>
            <td style={borderStyle} />
            <td style={borderStyle} />
            <td style={borderStyle} />
            <td style={borderStyle} />
            <td style={borderStyle} />
            <td style={borderStyle} />
            <td style={borderStyle} />
          </tr>
          <tr>
            <th scope="row">12:00</th>
            <td style={borderStyle} />
            <td style={borderStyle} />
            <td style={borderStyle} />
            <td style={borderStyle} />
            <td style={borderStyle} />
            <td style={borderStyle} />
            <td style={borderStyle} />
          </tr>
          <tr>
            <th scope="row">1:00</th>
            <td style={borderStyle} />
            <td style={borderStyle} />
            <td style={borderStyle} />
            <td style={borderStyle} />
            <td style={borderStyle} />
            <td style={borderStyle} />
            <td style={borderStyle} />
          </tr>
          <tr>
            <th scope="row">2:00</th>
            <td style={borderStyle} />
            <td style={borderStyle} />
            <td style={borderStyle} />
            <td style={borderStyle} />
            <td style={borderStyle} />
            <td style={borderStyle} />
            <td style={borderStyle} />
          </tr>
          <tr>
            <th scope="row">3:00</th>
            <td style={borderStyle} />
            <td style={borderStyle} />
            <td style={borderStyle} />
            <td style={borderStyle} />
            <td style={borderStyle} />
            <td style={borderStyle} />
            <td style={borderStyle} />
          </tr>
          <tr>
            <th scope="row">4:00</th>
            <td style={borderStyle} />
            <td style={borderStyle} />
            <td style={borderStyle} />
            <td style={borderStyle} />
            <td style={borderStyle} />
            <td style={borderStyle} />
            <td style={borderStyle} />
          </tr>
          <tr>
            <th scope="row">5:00</th>
            <td style={borderStyle} />
            <td style={borderStyle} />
            <td style={borderStyle} />
            <td style={borderStyle} />
            <td style={borderStyle} />
            <td style={borderStyle} />
            <td style={borderStyle} />
          </tr>
          <tr>
            <th scope="row">6:00</th>
            <td style={borderStyle} />
            <td style={borderStyle} />
            <td style={borderStyle} />
            <td style={borderStyle} />
            <td style={borderStyle} />
            <td style={borderStyle} />
            <td style={borderStyle} />
          </tr>
          <tr>
            <th scope="row">7:00</th>
            <td style={borderStyle} />
            <td style={borderStyle} />
            <td style={borderStyle} />
            <td style={borderStyle} />
            <td style={borderStyle} />
            <td style={borderStyle} />
            <td style={borderStyle} />
          </tr>
          <tr>
            <th scope="row">8:00</th>
            <td style={borderStyle} />
            <td style={borderStyle} />
            <td style={borderStyle} />
            <td style={borderStyle} />
            <td style={borderStyle} />
            <td style={borderStyle} />
            <td style={borderStyle} />
          </tr>
          <tr>
            <th scope="row">9:00</th>
            <td style={borderStyle} />
            <td style={borderStyle} />
            <td style={borderStyle} />
            <td style={borderStyle} />
            <td style={borderStyle} />
            <td style={borderStyle} />
            <td style={borderStyle} />
          </tr>
          <tr>
            <th scope="row">10:00</th>
            <td style={borderStyle} />
            <td style={borderStyle} />
            <td style={borderStyle} />
            <td style={borderStyle} />
            <td style={borderStyle} />
            <td style={borderStyle} />
            <td style={borderStyle} />
          </tr>
          <tr>
            <th scope="row">11:00</th>
            <td style={borderStyle} />
            <td style={borderStyle} />
            <td style={borderStyle} />
            <td style={borderStyle} />
            <td style={borderStyle} />
            <td style={borderStyle} />
            <td style={borderStyle} />
          </tr>
        </tbody>
      </table>
    );
  }
}

export default Weekview;
