import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

import AuthenticatedRoute from './components/AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from './components/AutoDismissAlert/AutoDismissAlert'
import Header from './components/Header/Header'
import CreateTeam from './components/CreateTeam/CreateTeam'
import IndexChallenges from './components/IndexChallenges/IndexChallenges'
import IndexTeams from './components/IndexTeams/IndexTeams'
import OtherTeams from './components/OtherTeams/OtherTeams'
import SignUp from './components/SignUp/SignUp'
import SignIn from './components/SignIn/SignIn'
import SignOut from './components/SignOut/SignOut'
import ChangePassword from './components/ChangePassword/ChangePassword'
// import Button from '@material-ui/core/Button'
// import Checkbox from '@material-ui/core/Checkbox'
// import FormControlLabel from '@material-ui/core/FormControlLabel'
// import TextField from '@material-ui/core/TextField'
// import AppBar from '@material-ui/core/AppBar'
// import ToolBar from '@material-ui/core/ToolBar'
// import IconButton from '@material-ui/core/IconButton'
// import MenuIcon from '@material-ui/core/Menu'
import { Grid, Paper } from '@material-ui/core/'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'

// import { orange } from '@material-ui/core/colors'

// const useStyles = makeStyles({
//   root: {
//     background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
//     border: 0,
//     borderRadius: 30,
//     boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
//     color: 'white',
//     height: 48,
//     padding: '0 30px'
//
//   }
// })

// function ButtonStyled () {
//   const classes = useStyles()
//   return <Button className={classes.root}>Test Styled Button</Button>
// }

// function CheckboxExample () {
//   const [checked, setChecked] = React.useState(true)
//   return (
//     <FormControlLabel
//       control={<Checkbox
//         checked={checked}
//         onChange={(e) => setChecked(e.target.checked)}
//         color="primary"
//         inputProps={{
//           'aria=label': 'secondary checkbox'
//         }}
//       />}
//       label="Testing Check"
//     />
//   )
// }

const theme = createMuiTheme({
  palette: {
    type: 'dark'
  }
})

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: null,
      msgAlerts: [],
      darkmode: false,
      primaryTeam: null
    }
  }

setTeam = () => {
  this.setState({
    primaryTeam: ''
  })
}

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  // setDarkMode = darkmode => this.setState({ darkmode })

  deleteAlert = (id) => {
    this.setState((state) => {
      return { msgAlerts: state.msgAlerts.filter(msg => msg.id !== id) }
    })
  }

  msgAlert = ({ heading, message, variant }) => {
    const id = uuid()
    this.setState((state) => {
      return { msgAlerts: [...state.msgAlerts, { heading, message, variant, id }] }
    })
  }
  // <Button
  //   variant="contained"
  //   size="large"
  //   style={{
  //     fontSize: 24,
  //     margin: 30
  //   }}
  //   color="secondary">
  //   Hello World
  // </Button>
  // <Typography variant="h3">
  //   Hello
  // </Typography>
  // <Button color="primary" variant="contained">
  //   Sample Button
  // </Button >
  // <CheckboxExample />
  // <TextField
  //   variant="filled"
  //   color="primary"
  //   type="email"
  //   label="The Time"
  // />
  render () {
    const { msgAlerts, user } = this.state
    console.log(user)

    return (
      <ThemeProvider theme={theme}>
        <Paper style={{ height: '500vh' }}>
          <Grid container direction="column">
            <Header user={user} />
            {msgAlerts.map(msgAlert => (
              <AutoDismissAlert
                key={msgAlert.id}
                heading={msgAlert.heading}
                variant={msgAlert.variant}
                message={msgAlert.message}
                id={msgAlert.id}
                deleteAlert={this.deleteAlert}
              />
            ))}
            <main className="container">
              <Route path='/sign-up' render={() => (
                <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
              )} />
              <Route path='/sign-in' render={() => (
                <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
              )} />
              <AuthenticatedRoute user={user} path='/sign-out' render={() => (
                <SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
              )} />
              <AuthenticatedRoute user={user} path='/change-password' render={() => (
                <ChangePassword msgAlert={this.msgAlert} user={user} />
              )} />
              <AuthenticatedRoute user={user} path='/opponents' render={() => (
                <OtherTeams msgAlert={this.msgAlert} user={user} />
              )} />
              <AuthenticatedRoute user={user} path='/challenges' render={() => (
                <IndexChallenges primaryTeam={this.primaryTeam} msgAlert={this.msgAlert} user={user} />
              )} />
              <AuthenticatedRoute user={user} path='/my-teams' render={() => (
                <Fragment>
                  <CreateTeam msgAlert={this.msgAlert} user={user} />
                  <IndexTeams msgAlert={this.msgAlert} setUser={this.setUser} user={user} />
                </Fragment>
              )} />
            </main>
          </Grid>
        </Paper >
      </ThemeProvider >
    )
  }
}

export default App
