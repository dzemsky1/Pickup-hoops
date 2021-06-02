import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'
import axios from 'axios'
import apiUrl from './../../apiConfig'
// import messages from '../AutoDismissAlert/messages'
import CreateChallenge from '../CreateChallenge/CreateChallenge'
// import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
// import { Grid } from '@material-ui/core/'
import Card from '@material-ui/core/card'
import Chip from '@material-ui/core/chip'
import CardContent from '@material-ui/core/cardcontent'
import CardActions from '@material-ui/core/cardactions'
// import UpdatePost from './../UpdatePost/Update'
// import { FaTrash } from 'react-icons/fa'

class OtherTeams extends Component {
  constructor (props) {
    // this is a best practice
    // this sets `this.props` in the constructor
    super(props)
    // keep track of all the movies we want to show, they will initially be null
    this.state = {
      teams: null,
      hometeam: '',
      awayteam: '',
      winner: null,
      location: ''
    }
  }

  // challengeTeam = event => {
  //   axios({
  //     url: `${apiUrl}/challenges`,
  //     method: 'POST',
  //     data: { team },
  //     headers: {
  //       Authorization: 'Bearer ' + props.user.token
  //     }
  //   })
  //     .then(() => props.msgAlert({
  //       heading: 'Team Created',
  //
  //       message: messages.createPostSuccess,
  //
  //       variant: 'success'
  //     }))
  // .then(res => this.setState({ createdBookId: res.data.book._id }))
  // .then(res => setCreatedTeamId(res.data.team._id))
  //     .catch(console.error)
  // }
  // do this whenever MovieIndex is first shown on the page (mounted)
  componentDidMount () {
    console.log('the props ', this.props)
    // this function runs at the end of the Mounting stage
    // Here we will make any HTTP requests
    axios({
      method: 'GET',
      url: `${apiUrl}/otherteams`,
      headers: {
        Authorization: 'Bearer ' + this.props.user.token
      }
    })
      .then((res) => {
        this.setState({ teams: res.data.teams })
      })
      .catch(console.error)
  }

  render () {
    const { teams } = this.state
    console.log('hm props', this.props)

    // if we haven't loaded any movies
    if (!teams) {
      // show a loading spinner
      return (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )
    }

    const teamsJsx = teams.map(team => (

      <Card key={team._id} variant="outlined" style={{
        margin: 24
      }}>
        <CardContent>
          <Typography variant="h5" component="h2">
            {team.name}
          </Typography>
          <Chip label={team.level} color="secondary" size="medium"/>
          <Chip label={`${team.games} games played`} color="secondary" size="medium"/>
          <Typography variant="body1" component="p">
            {team.members}
          </Typography>
        </CardContent>
        <CardActions>
          <CreateChallenge msgAlert={this.props.msgAlert} user={this.props.user} hometeam={this.props.user._id} awayteam={team._id}>Challenge Team </CreateChallenge>
        </CardActions>
      </Card>
    )
    )
    return (
      <div className="col-sm-10 col-md-8 mx-auto mt-5">

        <Typography variant="h5">Check out the Competition</Typography>
        {teamsJsx}
      </div>
    )
  }
}

export default OtherTeams
