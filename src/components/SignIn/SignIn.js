import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { signIn } from '../../api/auth'
import messages from '../AutoDismissAlert/messages'

import Form from 'react-bootstrap/Form'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import Link from '@material-ui/core/Link'

class SignIn extends Component {
  constructor (props) {
    super(props)

    this.state = {
      email: '',
      password: ''
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onSignIn = event => {
    event.preventDefault()

    const { msgAlert, history, setUser } = this.props

    signIn(this.state)
      .then(res => setUser(res.data.user))
      .then(() => msgAlert({
        heading: 'Sign In Success',
        message: messages.signInSuccess,
        variant: 'success'
      }))
      .then(() => history.push('/opponents'))
      .catch(error => {
        this.setState({ email: '', password: '' })
        msgAlert({
          heading: 'Sign In Failed with error: ' + error.message,
          message: messages.signInFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    const { email, password } = this.state

    return (
      <div className="row">
        <div className="col-sm-10 col-md-6 mx-auto mt-5">
          <Card>
            <Typography variant="h5">Sign In</Typography>
            <Form onSubmit={this.onSignIn}>
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
              <Button
                color="primary"
                variant="contained"
                type="submit"
                fullWidth
                style={{
                  marginTop: '102px',
                  marginBottom: '30px'
                }}
              >
                Sign In
              </Button>
            </Form>
            <Link href="#/"
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

export default withRouter(SignIn)
