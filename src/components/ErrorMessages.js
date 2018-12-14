import React, { Component } from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  root: {
    position: 'relative',
    textAlign: 'ltr'
  },
  card: {
    backgroundColor: '#fafafa ',

    borderLeftStyle: 'solid',
    borderLeftWidth: '12px',
    borderLeftColor: '#d32f2f'
  },
  media: {
    padding: '10px',
    display: 'flex',
    alignSelf: 'center',
    marginLeft: '10px'

    //backgroundColor: "#0074b7"
  },
  main: {
    display: 'flex',
    flexDirection: 'row'
  },
  head: {
    display: 'flex',
    flexFlow: 'column wrap'
  },
  content: {
    paddingTop: 0
  }
})

class ErrorMessages extends Component {
  render() {
    const { header, subheader } = this.props
    const classes = this.props.classes
    return (
      <div className={classes.root}>
        <Card className={classes.card}>
          <div className={classes.main}>
            <div className={classes.head}>
              <CardHeader title={header} />

              <CardContent className={classes.content}>
                <Typography variant="body1">{subheader}</Typography>
              </CardContent>
            </div>
          </div>
        </Card>
      </div>
    )
  }
}

ErrorMessages.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles, { name: 'ErrorMessages' })(ErrorMessages)
