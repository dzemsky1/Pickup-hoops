import React, { Component, Fragment } from 'react'

import messages from '../AutoDismissAlert/messages'

import axios from 'axios'
import apiUrl from './../../apiConfig'

import Form from 'react-bootstrap/Form'
import Button from '@material-ui/core/Button'
import Modal from 'react-bootstrap/Modal'
// import { FaEdit } from 'react-icons/fa'

class UpdateTeam extends Component {
  constructor () {
    super()
    this.state = {
      team: {
        name: '',
        members: ''
      },
      updated: false,
      show: false
    }
  }

  handleChange = (event) => {
    console.log(this.props)
    event.persist()
    this.setState((prevState) => {
      const name = event.target.name
      const value = event.target.value
      const updatedValue = { [name]: value }
      return { team: { ...prevState.team, ...updatedValue } }
    })
  }

  changeModal = () => {
    this.setState({ show: !this.state.show })
  }

  handleSubmit = (event) => {
    event.preventDefault()

    axios({
      method: 'PATCH',
      url: `${apiUrl}/teams/${this.props.value}`,
      data: { team: this.state.team },
      headers: {
        Authorization: 'Bearer ' + this.props.name.user.token
      }
    })
      .then(() => this.props.name.msgAlert({
        heading: 'Team Updated',

        message: messages.updatePostSuccess,

        variant: 'success'
      }))
      .then(() => {
        this.setState({ team: {
          name: '',
          members: ''
        }
        })
      })
      .then(() => axios({
        method: 'GET',
        url: `${apiUrl}/teams`,
        headers: {
          Authorization: 'Bearer ' + this.props.name.user.token
        }
      }))
      .catch(error => this.props.name.msgAlert({
        heading: 'Failed with error: ' + error.message,

        message: messages.updatePostFailure,
        variant: 'danger'
      })
      )
  }
  render () {
    // if (this.state.created) {
    //   return <Redirect to={`/posts/${this.state.createdId}`} />
    // }

    return (
      <Fragment>
        <Button onClick={this.changeModal}> Update Team </Button>
        <Modal show={this.state.show}>
          <Form onSubmit={this.handleSubmit}>
            <Modal.Header>Update Post</Modal.Header>
            <Modal.Body>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="name"
                  value={this.state.team.name}
                  placeholder={this.props.teamname}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group controlId="members">
                <Form.Label>Members</Form.Label>
                <Form.Control
                  required
                  name="members"
                  value={this.state.team.members}
                  type="text"
                  placeholder={this.props.members}
                  onChange={this.handleChange}
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button color="primary" onClick={this.changeModal}> Cancel </Button>
              <Button type="submit" variant="contained" color="primary" onClick={this.changeModal}> Submit </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </Fragment>

    )
  }
}
export default UpdateTeam
