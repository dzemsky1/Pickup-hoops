import React, { useState } from 'react'
// import { Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import messages from '../AutoDismissAlert/messages'
// import AutoDismissAlert from './components/AutoDismissAlert/AutoDismissAlert'
import Form from 'react-bootstrap/Form'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/card'

const CreateTeam = (props) => {
  const [team, setTeam] = useState({
    name: '',
    members: '',
    level: '',
    wins: 0,
    losses: 0
  })
  // const [setCreatedTeamId] = useState(null)
  // const [createdBookId, setCreatedBookId] = useState(null)
  const handleChange = event => {
    event.persist()
    setTeam(prevTeam => {
      const updatedField = { [event.target.name]: event.target.value }
      const teamToCreate = Object.assign({}, prevTeam, updatedField)
      return teamToCreate
    })
  }
  const handleSubmit = event => {
    console.log('this is the data being sent', props)
    event.preventDefault()
    axios({
      url: `${apiUrl}/teams`,
      method: 'POST',
      data: { team },
      headers: {
        Authorization: 'Bearer ' + props.user.token
      }
    })
      .then(() => props.msgAlert({
        heading: 'Team Created',

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
  return (
    <div className="col-sm-10 col-md-6 mx-auto mt-5">
      <Card style={{
        padding: 32
      }}>
        <Typography variant="h5">Create a Team</Typography>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="name">
            <Form.Control
              required
              type="text"
              name="name"
              value={team.name}
              placeholder="Name"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="members">
            <Form.Control
              required
              name="members"
              type="text"
              value={team.members}
              placeholder="Members"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="level">
            <Form.Label>Experience Level</Form.Label>
            <Form.Control as="select"
              required
              name="level"
              type="select"
              value={team.level}
              placeholder="Level"
              onChange={handleChange}>
              <option disabled selected value>-- Choose Level --</option>
              <option>Beginner</option>
              <option>Highschool</option>
              <option>College</option>
            </Form.Control>
          </Form.Group>
          <Button
            color="primary"
            variant="contained"
            type="submit"
            fullWidth
          >
            Submit
          </Button>
        </Form>
      </Card>
    </div>
  )
}
export default CreateTeam
