import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { signUp, signIn } from '../../api/auth'
import messages from '../AutoDismissAlert/messages'

import Form from 'react-bootstrap/Form'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/card'
import Link from '@material-ui/core/Link'

class SignUp extends Component {
  constructor (props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      passwordConfirmation: '',
      primaryTeam: ''
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onSignUp = event => {
    event.preventDefault()

    const { msgAlert, history, setUser } = this.props

    signUp(this.state)
      .then(() => signIn(this.state))
      .then(res => setUser(res.data.user))
      .then(() => msgAlert({
        heading: 'Sign Up Success',
        message: messages.signUpSuccess,
        variant: 'success'
      }))
      .then(() => history.push('/'))
      .catch(error => {
        this.setState({ email: '', password: '', passwordConfirmation: '' })
        msgAlert({
          heading: 'Sign Up Failed with error: ' + error.message,
          message: messages.signUpFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    const { email, password, passwordConfirmation } = this.state

    return (
      <div className="row">
        <div className="col-sm-10 col-md-6 mx-auto mt-5">
          <Card>
            <Typography variant="h5">Sign Up</Typography>
            <Form onSubmit={this.onSignUp}>
              <Form.Group controlId="email">
                <Form.Control
                  required
                  type="email"
                  name="email"
                  value={email}
                  placeholder="Enter email"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Control
                  required
                  name="password"
                  value={password}
                  type="password"
                  placeholder="Password"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group controlId="passwordConfirmation">
                <Form.Control
                  required
                  name="passwordConfirmation"
                  value={passwordConfirmation}
                  type="password"
                  placeholder="Confirm Password"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Button
                color="primary"
                variant="contained"
                type="submit"
                fullWidth
                style={{
                  marginTop: '40px',
                  marginBottom: '30px'
                }}
              >
                Sign Up
              </Button>
            </Form>
            <Link href="#sign-in"
              style={{
                marginLeft: '6rem'
              }}>
              Already a Member? Sign In!
            </Link>
          </Card>
        </div>
      </div>
    )
  }
}

export default withRouter(SignUp)
