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

class IndexChallenges extends Component {
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
    axios({
      method: 'GET',
      url: `${apiUrl}/pending-challenges`,
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
    console.log('challenges', challenges)

    if (!challenges) {
      // show a loading spinner
      return (
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          <Typography variant="h5">Nothing Pending</Typography>
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
          <Button size="small">Buzz Team to Accept</Button>
        </CardActions>
      </Card>
    )
    )

    return (
      <div className="col-sm-10 col-md-8 mx-auto mt-5">
        <Typography variant="h5">Waiting on your Opponents to Respond</Typography>
        {pendingJsx}
      </div>
    )
  }
}

export default IndexChallenges
