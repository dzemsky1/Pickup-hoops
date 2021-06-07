import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Button from '@material-ui/core/Button'

const authenticatedOptions = (
  <Fragment>
    <Nav.Link href="#accepted">Challenges</Nav.Link>
    <Nav.Link href="#opponents">Opponents</Nav.Link>
    <Nav.Link href="#my-teams">My Teams</Nav.Link>
    <Nav.Link href="#change-password">Change Password</Nav.Link>
    <Nav.Link href="#sign-out">Sign Out</Nav.Link>
  </Fragment>
)

const unauthenticatedOptions = (
  <Fragment>
  </Fragment>
)

const alwaysOptions = (
  <Fragment>
  </Fragment>
)

const Header = ({ user, lightTheme, darkTheme, gradientTheme, weirdTheme, primaryTeam }) => (
  <Navbar bg="dark" variant="dark" expand="md">
    <Navbar.Brand href="#">
      3-v-3 , {primaryTeam}
    </Navbar.Brand>
    <Button onClick={lightTheme}>Light</Button><Button onClick={darkTheme}>Dark</Button><Button onClick={weirdTheme}>Weird</Button>
    <Button onClick={gradientTheme}>Insane Gradient</Button>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto">
        { alwaysOptions }
        { user ? authenticatedOptions : unauthenticatedOptions }
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Header
