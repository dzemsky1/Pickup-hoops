import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'
import axios from 'axios'
import apiUrl from './../../apiConfig'
// import messages from '../AutoDismissAlert/messages'
import UpdateTeam from '../UpdateTeam/UpdateTeam'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
// import { Grid } from '@material-ui/core/'
import Card from '@material-ui/core/card'
import Chip from '@material-ui/core/chip'
import CardContent from '@material-ui/core/cardcontent'
import CardActions from '@material-ui/core/cardactions'
// import UpdatePost from './../UpdatePost/Update'
// import { FaTrash } from 'react-icons/fa'

class IndexTeams extends Component {
  constructor (props) {
    // this is a best practice
    // this sets `this.props` in the constructor
    super(props)
    // keep track of all the movies we want to show, they will initially be null
    this.state = {
      teams: null
    }
  }

  setTeam = (event) => {
    axios({
      method: 'PATCH',
      url: `${apiUrl}/users`,
      data: { user: {
        primaryTeam: event.currentTarget.value } },

      headers: {
        Authorization: 'Bearer ' + this.props.user.token
      }
    })
      .then(() => axios({
        method: 'GET',
        url: `${apiUrl}/users/${this.props.user._id}`,
        headers: {
          Authorization: 'Bearer ' + this.props.user.token
        }
      }))
      .then(res => this.props.setUser(res.data.user))
  }

  destroyTeam = (event) => {
    axios({
      method: 'DELETE',
      url: `${apiUrl}/teams/${event.currentTarget.value}`,
      headers: {
        Authorization: 'Bearer ' + this.props.user.token
      }
    })

      .then(() => axios({
        method: 'GET',
        url: `${apiUrl}/teams`,
        headers: {
          Authorization: 'Bearer ' + this.props.user.token
        }
      }))
      .then((res) => {
        this.setState({ teams: res.data.teams })
      })
      .then(() => this.props.msgAlert({
        heading: 'Team Deleted',
        message: '',
        variant: 'success'
      }))
      .catch(error => this.props.msgAlert({
        heading: 'Failed with error: ' + error.message,
        message: '',
        variant: 'danger'
      }))
  }

  // do this whenever MovieIndex is first shown on the page (mounted)
  componentDidMount () {
    console.log('the props ', this.props)
    // this function runs at the end of the Mounting stage
    // Here we will make any HTTP requests
    axios({
      method: 'GET',
      url: `${apiUrl}/teams`,
      headers: {
        Authorization: 'Bearer ' + this.props.user.token
      }
    })
      .then((res) => {
        this.setState({ teams: res.data.teams })
      })
      .catch(console.error)
  }
  // {this.props.user.primaryTeam === team._id && <Button }
  render () {
    const { teams } = this.state
    console.log('the teams', teams)
    console.log('the active user', this.props.user)

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
          <Button size="small" value={team._id} onClick={this.destroyTeam}>Remove Team</Button>
          <UpdateTeam className="update" teamname={team.name} members={team.members} value={team._id} name={this.props}/>
          <Button size="small" value={team._id} onClick={this.setTeam}>Set as Primary</Button>
        </CardActions>
      </Card>
    )
    )
    return (
      <div className="col-sm-10 col-md-8 mx-auto mt-5">

        <Typography variant="h5">Existing Teams</Typography>
        {teamsJsx}
      </div>
    )
  }
}

export default IndexTeams
