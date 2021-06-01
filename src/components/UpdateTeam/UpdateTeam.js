import React, { Component } from 'react'

import messages from '../AutoDismissAlert/messages'

import axios from 'axios'
import apiUrl from './../../apiConfig'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
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

      <div className="col-sm-10 col-md-8 mx-auto mt-5">
        <Button onClick={this.changeModal}> Update Team </Button>
        <Modal show={this.state.show}>
          <Modal.Header>Update Post</Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="name"
                  value={this.state.team.name}
                  placeholder="Name"
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
                  placeholder="Members"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
              >
                Submit
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.changeModal}> Close</Button>
          </Modal.Footer>
        </Modal>

      </div>
    )
  }
}
export default UpdateTeam
