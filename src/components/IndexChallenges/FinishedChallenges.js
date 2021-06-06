import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
// import Spinner from 'react-bootstrap/Spinner'
import axios from 'axios'
import apiUrl from './../../apiConfig'
// import messages from '../AutoDismissAlert/messages'
// import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/card'
import CardContent from '@material-ui/core/cardcontent'
import CardActions from '@material-ui/core/cardactions'

class AcceptedChallenges extends Component {
  constructor (props) {
    // this is a best practice
    // this sets `this.props` in the constructor
    super(props)
    // keep track of all the movies we want to show, they will initially be null
    this.state = {
      challenges: null
    }
  }

  // do this whenever MovieIndex is first shown on the page (mounted)
  componentDidMount () {
    // this function runs at the end of the Mounting stage
    // Here we will make any HTTP requests
    axios({
      method: 'GET',
      url: `${apiUrl}/finished-challenges`,
      headers: {
        Authorization: 'Bearer ' + this.props.user.token
      }
    })
      .then((res) => {
        this.setState({ challenges: res.data.challenges })
      })
      .catch(console.error)
  }

  render () {
    const { challenges } = this.state
    // console.log('hm props', this.props)

    // if we haven't loaded any movies
    if (!challenges) {
      // show a loading spinner
      return (
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          <Typography variant="h5">You still need to complete a challenge!</Typography>
        </div>
      )
    }

    const finishedJsx = challenges.map(challenge => (
      <Card key={challenge._id} variant="outlined" style={{
        margin: 24
      }}>
        <CardContent>
          <Typography variant="h6" style={{
            marginBottom: 32
          }}>
            {challenge.hometeam.name} vs. {challenge.awayteam.name}
          </Typography>
          <Typography variant="body1">
            {`${challenge.winner.name} Win!`}
          </Typography>
        </CardContent>
        <CardActions>
        </CardActions>
      </Card>
    )
    )

    return (
      <div className="col-sm-10 col-md-8 mx-auto mt-5">

        <Typography variant="h5">Completed Challenges</Typography>
        {finishedJsx}
      </div>
    )
  }
}

export default AcceptedChallenges
