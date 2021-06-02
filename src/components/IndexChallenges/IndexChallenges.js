import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'
import axios from 'axios'
import apiUrl from './../../apiConfig'
// import messages from '../AutoDismissAlert/messages'
// import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
// import { Grid } from '@material-ui/core/'
// import Card from '@material-ui/core/card'
// // import Chip from '@material-ui/core/chip'
// import CardContent from '@material-ui/core/cardcontent'
// import CardActions from '@material-ui/core/cardactions'
// import UpdatePost from './../UpdatePost/Update'
// import { FaTrash } from 'react-icons/fa'

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
    console.log('the props ', this.props)
    // this function runs at the end of the Mounting stage
    // Here we will make any HTTP requests
    axios({
      method: 'GET',
      url: `${apiUrl}/challenges`,
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
    console.log('the challenges', challenges)
    // console.log('hm props', this.props)

    // if we haven't loaded any movies
    if (!challenges) {
      // show a loading spinner
      return (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )
    }

    const challengesJsx = challenges.map(challenge => (
      <div key={challenge._id} className="row">
        <li>
          <h4>{challenge.awayteam.name}</h4>
        </li>
      </div>
    )
    )
    return (
      <div className="col-sm-10 col-md-8 mx-auto mt-5">

        <Typography variant="h5">Challenges</Typography>
        {challengesJsx}
      </div>
    )
  }
}

export default IndexChallenges
