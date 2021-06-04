import React, { useEffect, useState, Fragment } from 'react'
// import { Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import messages from '../AutoDismissAlert/messages'
import Spinner from 'react-bootstrap/Spinner'
// import AutoDismissAlert from './components/AutoDismissAlert/AutoDismissAlert'
import Button from '@material-ui/core/Button'

const CreateChallenge = (props) => {
  const [challenge, setChallenge] = useState({
    hometeam: '',
    awayteam: '',
    winner: null,
    location: '',
    accepted: false,
    finished: false
  })
  const [teams, setTeams] = useState({
    teams: null
  })
  useEffect(() => {
    axios({
      method: 'GET',
      url: `${apiUrl}/teams`,
      headers: {
        Authorization: 'Bearer ' + props.user.token
      }
    })
      .then((res) => {
        setTeams({ teams: res.data.teams })
      })
      .catch(console.error)
  }, [])
  // const [setCreatedTeamId] = useState(null)
  // const [createdBookId, setCreatedBookId] = useState(null)
  // const handleChange = event => {
  //   event.persist()
  //   setTeam(prevTeam => {
  //     const updatedField = { [event.target.name]: event.target.value }
  //     const teamToCreate = Object.assign({}, prevTeam, updatedField)
  //     return teamToCreate
  //   })
  // }
  const createChallenge = event => {
    setChallenge(challenge.hometeam = props.user.primaryTeam)
    setChallenge(challenge.awayteam = props.awayteam)
    console.log('this is the state', challenge)
    axios({
      url: `${apiUrl}/challenges`,
      method: 'POST',
      data: { challenge },
      headers: {
        Authorization: 'Bearer ' + props.user.token
      }
    })
      .then(() => props.msgAlert({
        heading: 'Challenge Created',

        message: messages.createPostSuccess,

        variant: 'success'
      }))
      // .then(res => this.setState({ createdBookId: res.data.book._id }))
      // .then(res => setCreatedTeamId(res.data.team._id))
      .catch(console.error)
  }
  // const { handleChange, handleSubmit } = this
  // const { createdBookId, book } = this.state
  // if (createdTeamId) {
  //   return <Redirect to={`/teams/${createdTeamId}`} />
  // }
  if (!teams) {
    // show a loading spinner
    return (
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    )
  }

  return (
    <Fragment>
      <Button
        color="primary"
        variant="contained"
        type="submit"
        onClick={createChallenge}
        fullWidth
      >
          Challenge Team
      </Button>
    </Fragment>
  )
}
export default CreateChallenge
