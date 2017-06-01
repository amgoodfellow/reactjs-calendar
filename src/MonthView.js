import React, {
    Component
} from "react";
import Weekview from "./Weekview";
import Scheduleview from "./Scheduleview";
import {
    monthNames,
    dayNames
} from "./utils/Strings";
import {
    withStyles,
    createStyleSheet
} from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import List, { ListItemText, ListItem, ListContent } from 'material-ui/List';
import PropTypes from 'prop-types';
import Titlebar from "./Titlebar";
import Paper from 'material-ui/Paper'
import Divider from 'material-ui/Divider'
import Toolbar from 'material-ui/Toolbar'
import Card, {CardContent, CardHeader} from 'material-ui/Card'


const styleSheet = createStyleSheet('MonthView', theme => ({
     root: {          
     display:'flex',
     position: "relative",    
     fontFamily: "Roboto sans-serif",      
     height: "452px"
  },
  dayDiv: {
    position: "relative" , 
    width: "20%",
   
  },
  dayTitleBar: {
    position: "relative",
    height: "50px",
    backgroundColor: '#004987',
    color: '#FFFFFF',
    fontWeight: 'bold',    
  },
  list:{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between, space-around",  
    
    height: "380px"  
  },
  monthDiv: {
      width: "80%",
  },
  monthTitleBar:{
    position: "relative",
    height: "50px",
  },
table:{
    width:"100%",  
    borderTop: "hidden",
    borderLeft:"hidden",
    borderRight:"hidden",
    borderCollapse: "collapse",

},
tableHead:{   
    border: "1px solid rgba(0, 0, 0, 0.075)",      
    backgroundColor: '#004987',
    color: '#FFFFFF',
    textAlign: "center",
    fontWeight: 'bold', 
    borderTop: "hidden",      
},
tableBody:{  
    backgroundColor: 'rgba(41,137,228, 0.1)',
    color: '#004987',
    textAlign: 'left',
    verticalAlign: 'top', 
}
}))

class MonthView extends Component {   
  constructor(){
   super(); 
   this.state = {
    courses: null
  }
 }
 componentDidMount(){
      fetch("http://141.210.186.163:8082/api/calendar")
        .then(response => {
          return response.json()
        })
        .then(data => {
          console.log(data)
          this.setState({courses: data["04-Jun-2017"]})
        })
    }
 
 weekDays(){ 
    let week=[]
for(let i = 0; i < 7; ++i){
    week.push(<td style={{width: "14.2%",}}> {dayNames[i]} </td>)
}
return week
}

monthDates(){
    let dateNumbers=[]   
    for( let i = 0; i <7; i++) {            
            dateNumbers.push(<td style={{width: "100px", border: "1px solid white", padding:"10px"}}> {i} </td>)                        
        }   return dateNumbers 
}
monthWeeks(){
    let weekRows =[]
    for( let i = 1; i <= 4; i++) { 
        weekRows.push(<tr leftMargin="10px">  </tr>)
    }   return weekRows
}


    render() {  
              console.log(this.state.open)    
 if (this.state.courses===null)
 return <div/>;
  else {      
        const classes = this.props.classes       
        return ( 
       <Paper className={classes.root}>
         <div className={classes.dayDiv}>  
             <Toolbar className={classes.dayTitleBar}>
                 <Typography  type="h1">Thursday 7</Typography>
                </Toolbar>              
                <List className={classes.list}>
                    <ListItem > 
                     <Card syle={{width:"50%"}}>
                         <CardContent style={{textAlign: "center",backgroundColor: 'rgba(41,137,228, 0.1)'}}>
                             <Typography type="title" style={{color: '#004987'}}> CSE 230</Typography>
                            
                             <Divider style={{color: '#004987'}}/>
                             <Typography type="body1"></Typography>
                             <Typography type="body2">10:00-11:30</Typography>
                             <Divider/>
                             <Typography type="body1">building room</Typography>
                           </CardContent>
                    </Card>
                    </ListItem>
                  </List>                       
            
             </div>
            
             <div className={classes.monthDiv}>
                <table  className={classes.table}>
                <thead className={classes.tableHead}> 
                    <tr  style={{height:"50px", }}> 
                    {this.weekDays()}
                        </tr>
                     </thead>
                     
                <tbody className={classes.tableBody}>                                                        
                      <tr  style={{height:"100px", }}>
                          {this.monthDates()}
                          </tr>
                           <tr  style={{height:"100px", }}>
                          {this.monthDates()}
                          </tr>
                           <tr  style={{height:"100px", }}>
                          {this.monthDates()}
                          </tr>
                           <tr  style={{height:"100px", }}>
                          {this.monthDates()}
                          </tr>
                      
                    </tbody>
                    
                    </table>
                 </div>
         </Paper >
        )
    }
    
}
}

MonthView.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styleSheet)(MonthView);
