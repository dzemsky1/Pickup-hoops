import React, { useState } from 'react'
// import { Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const CreateTeam = props => {
  const [team, setTeam] = useState({
    name: '',
    members: '',
    level: '',
    games: ''
  })
  // const [setCreatedTeamId] = useState(null)
  // const [createdBookId, setCreatedBookId] = useState(null)
  const handleChange = event => {
    event.persist()
    setTeam(prevTeam => {
      const updatedField = { [event.target.name]: event.target.value }
      console.log('this is the field', updatedField)
      const teamToCreate = Object.assign({}, prevTeam, updatedField)
      return teamToCreate
    })
  }
  const handleSubmit = event => {
    console.log('this is the team', team)
    event.preventDefault()
    axios({
      url: `${apiUrl}/teams`,
      method: 'POST',
      data: { team },
      headers: {
        Authorization: 'Bearer ' + props.user.token
      }
    })
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
    <div className="row">
      <div className="col-sm-10 col-md-8 mx-auto mt-5">
        <h3>Create Team</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
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
            <Form.Label>Members</Form.Label>
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
            <Form.Label>Level</Form.Label>
            <Form.Control
              required
              name="level"
              type="text"
              value={team.level}
              placeholder="Level"
              onChange={handleChange}
            />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
          >
            Submit
          </Button>
        </Form>
      </div>
    </div>
  )
}
export default CreateTeam
