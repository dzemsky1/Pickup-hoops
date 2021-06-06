import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
// import Spinner from 'react-bootstrap/Spinner'
import axios from 'axios'
import apiUrl from './../../apiConfig'
// import messages from '../AutoDismissAlert/messages'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/card'
import CardContent from '@material-ui/core/cardcontent'
import CardActions from '@material-ui/core/cardactions'

class IncomingChallenges extends Component {
  constructor (props) {
    // this is a best practice
    // this sets `this.props` in the constructor
    super(props)
    // keep track of all the movies we want to show, they will initially be null
    this.state = {
      challenges: null
    }
  }

  acceptChallenge = (event) => {
    axios({
      method: 'PATCH',
      url: `${apiUrl}/challenges/${event.currentTarget.value}`,
      data: { challenge: { accepted: true } },
      headers: {
        Authorization: 'Bearer ' + this.props.user.token
      }
    })
      .then(() => this.props.msgAlert({
        heading: 'Game On!',

        message: '',

        variant: 'success'
      }))
      .catch(error => this.props.msgAlert({
        heading: 'Failed with error: ' + error.message,

        message: '',
        variant: 'danger'
      })
      )
  }

  // do this whenever MovieIndex is first shown on the page (mounted)
  componentDidMount () {
    axios({
      method: 'GET',
      url: `${apiUrl}/incoming-challenges`,
      headers: {
        Authorization: 'Bearer ' + this.props.user.token
      }
    })
      .then((res) => {
        console.log('response data', res.data)
        this.setState({ challenges: res.data.challenges })
      })
      .catch(console.error)
  }

  render () {
    const { challenges } = this.state
    console.log('challenges', challenges)

    if (!challenges) {
      // show a loading spinner
      return (
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          <Typography variant="h5">Nobodys Challenged You</Typography>
        </div>
      )
    }

    const pendingJsx = challenges.map(challenge => (
      <Card key={challenge._id} variant="outlined" style={{
        margin: 24
      }}>
        <CardContent>
          <Typography variant="h6" component="h2">
            {challenge.hometeam.name} vs. {challenge.awayteam.name}
          </Typography>
        </CardContent>
        <CardActions>
          <Button color="primary"
            variant="contained" fullWidth value={challenge._id} onClick={this.acceptChallenge}>Accept Challenge</Button>
        </CardActions>
      </Card>
    )
    )

    return (
      <div className="col-sm-10 col-md-8 mx-auto mt-5">
        <Typography variant="h5">Incoming Requests</Typography>
        {pendingJsx}
      </div>
    )
  }
}

export default IncomingChallenges
