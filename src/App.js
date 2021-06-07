import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

import AuthenticatedRoute from './components/AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from './components/AutoDismissAlert/AutoDismissAlert'
import Header from './components/Header/Header'
import CreateTeam from './components/CreateTeam/CreateTeam'

import IndexChallenges from './components/IndexChallenges/IndexChallenges'
import AcceptedChallenges from './components/IndexChallenges/AcceptedChallenges'
import IncomingChallenges from './components/IndexChallenges/IncomingChallenges'
import FinishedChallenges from './components/IndexChallenges/FinishedChallenges'

import IndexTeams from './components/IndexTeams/IndexTeams'
import OtherTeams from './components/OtherTeams/OtherTeams'
// import ResponsiveDrawer from './components/Drawer/ResponsiveDrawer'
import SignUp from './components/SignUp/SignUp'
import SignIn from './components/SignIn/SignIn'
import SignOut from './components/SignOut/SignOut'
import ChangePassword from './components/ChangePassword/ChangePassword'
import Nav from 'react-bootstrap/Nav'
// import Button from '@material-ui/core/Button'
// import Link from '@material-ui/core/Link'

// import Checkbox from '@material-ui/core/Checkbox'
// import FormControlLabel from '@material-ui/core/FormControlLabel'
// import TextField from '@material-ui/core/TextField'
// import ToolBar from '@material-ui/core/ToolBar'
// import IconButton from '@material-ui/core/IconButton'
// import MenuIcon from '@material-ui/core/Menu'
import { Grid, Paper } from '@material-ui/core/'
import Drawer from '@material-ui/core/Drawer'
import Typography from '@material-ui/core/Typography'
import { ThemeProvider, createMuiTheme, makeStyles } from '@material-ui/core/styles'

// import { orange } from '@material-ui/core/colors'

const useStyles = makeStyles({
  // root: {
  //   background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  //   border: 0,
  //   borderRadius: 30,
  //   boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  //   color: 'white',
  //   height: 48,
  //   padding: '0 30px'
  // }
  drawer: {
    width: 240,
    marginTop: 40
  },
  drawerPaper: {
    width: 240
  }
})

function StyledDrawer () {
  const classes = useStyles()
  return <Drawer
    className={classes.drawer}
    variant="permanent"
    anchor="left"
    classes={{ paper: classes.drawerPaper }}
    style={{
      paddingTop: '90px'
    }}
  >
    <Typography variant="h6" style={{
      marginTop: '100px',
      marginLeft: '24px'

    }}> Challenges </Typography>
    <Nav.Link href="#accepted" style={{
      marginLeft: '24px',
      marginTop: '16px',
      color: '#ffa502',
      fontWeight: 400
    }}>Accepted</Nav.Link>
    <Nav.Link href="#pending" style={{
      marginLeft: '24px',
      marginTop: '16px',
      color: '#ffa502',
      fontWeight: 400
    }}>Pending</Nav.Link>
    <Nav.Link href="#incoming" style={{
      marginLeft: '24px',
      marginTop: '16px',
      color: '#ffa502',
      fontWeight: 400
    }}>Incoming</Nav.Link>
    <Nav.Link href="#finished" style={{
      marginLeft: '24px',
      marginTop: '16px',
      color: '#ffa502',
      fontWeight: 400
    }}>Finished</Nav.Link>
  </Drawer>
}

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: null,
      msgAlerts: [],
      theme: 'light',
      primaryTeam: null
    }
  }

  darkTheme = createMuiTheme({
    palette: {
      type: 'dark',
      primary: {
        main: '#ffa502'
      },
      secondary: {
        main: '#1ecbe1'
      }
    },
    overrides: {
      MuiButton: {
        root: {
          borderRadius: '100px',
          border: '2px solid #333333'
        },
        contained: {
          boxShadow: '3px 3px 0 #1ecbe1',
          '&:hover': {
            boxShadow: '1px 1px 0 #1ecbe1'
          }
        }
      },
      MuiCard: {
        root: {
          padding: '32px',
          boxShadow: '12px 12px 16px 0 rgba(0, 0, 0, 0.16), -8px -8px 12px 0 rgba(94, 92, 92, 0.12)',
          backgroundColor: 'rgb(52, 54, 54)',
          borderRadius: '20px'
        }
      },
      MuiPaper: {
        root: {
          backgroundColor: 'rgb(52, 54, 54)'
        }
      },
      MuiAppBar: {
        root: {
          backgroundColor: 'rgb(52, 54, 54)'
        }
      }
    },
    display: 'flex'
  })
  lightTheme = createMuiTheme({
    palette: {
      type: 'light',
      primary: {
        main: '#ffa502'
      },
      secondary: {
        main: '#1ecbe1'
      }
    },
    overrides: {
      MuiButton: {
        root: {
          borderRadius: '100px',
          border: '2px solid #333333'
        },
        contained: {
          boxShadow: '3px 3px 0 #1ecbe1',
          '&:hover': {
            boxShadow: '1px 1px 0 #1ecbe1'
          }
        }
      },
      MuiCard: {
        root: {
          padding: '32px',
          boxShadow: '12px 12px 16px 0 rgba(0, 0, 0, 0.16), -8px -8px 12px 0 rgba(94, 92, 92, 0.12)',
          backgroundColor: 'rgb(245, 245, 245)',
          borderRadius: '20px'
        }
      },
      MuiPaper: {
        root: {
          backgroundColor: 'rgb(230, 230, 230)'
        }
      },
      MuiAppBar: {
        root: {
          backgroundColor: 'rgb(51, 195, 214)'
        }
      }
    },
    display: 'flex'
  })
  weirdTheme = createMuiTheme({
    palette: {
      type: 'light',
      primary: {
        main: '#659DBD'
      },
      secondary: {
        main: '#1ecbe1'
      }
    },
    overrides: {
      MuiButton: {
        root: {
          borderRadius: '4px',
          border: '12px solid #FBEEC1'
        },
        contained: {
          '&:hover': {
            boxShadow: '1px 1px 0 #1ecbe1'
          }
        }
      },
      MuiCard: {
        root: {
          padding: '32px',
          boxShadow: '12px 12px 16px 0 rgba(0, 0, 0, 0.16), -8px -8px 12px 0 rgba(94, 92, 92, 0.12)',
          backgroundColor: '#BC986A',
          borderRadius: '4px',
          border: '6px solid #FBEEC1',
          minWidth: '70vw',
          marginLeft: '-400px'
        }
      },
      MuiPaper: {
        root: {
          backgroundColor: '#659DBD'
        }
      },
      MuiAppBar: {
        root: {
          backgroundColor: 'rgb(51, 195, 214)'
        }
      }
    },
    display: 'flex'
  })
  gradientTheme = createMuiTheme({
    palette: {
      type: 'dark',
      primary: {
        main: '#ffa502'
      },
      secondary: {
        main: '#1ecbe1'
      }
    },
    overrides: {
      MuiButton: {
        root: {
          borderRadius: '100px',
          border: '2px solid #333333',
          backgroundImage: 'linear-gradient(to right, #f5ce62, #e43603, #fa7199, #e85a19)'
        },
        contained: {
          boxShadow: '3px 3px 0 #1ecbe1',
          '&:hover': {
            boxShadow: '1px 1px 0 #1ecbe1'
          }
        }
      },
      MuiCard: {
        root: {
          padding: '32px',
          boxShadow: '12px 12px 16px 0 rgba(0, 0, 0, 0.16), -8px -8px 12px 0 rgba(94, 92, 92, 0.12)',
          backgroundColor: 'rgb(52, 54, 54)',
          borderRadius: '20px'
        }
      },
      MuiPaper: {
        root: {
          backgroundImage: 'linear-gradient(to right, #25aae1, #40e495, #30dd8a, #2bb673)'
        }
      },
      MuiAppBar: {
        root: {
          backgroundColor: 'rgb(52, 54, 54)'
        }
      }
    },
    display: 'flex'
  })

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  setDark = () => {
    this.setState({ theme: 'dark' })
  }

  setLight = () => {
    this.setState({ theme: 'light' })
  }

  setWeird = () => {
    this.setState({ theme: 'weird' })
  }

  setGradient = () => {
    this.setState({ theme: 'gradient' })
  }

  setPrimaryTeam = (team) => {
    this.setState({ primaryTeam: team })
  }

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

  render () {
    const { msgAlerts, user, theme, primaryTeam } = this.state

    return (
      <ThemeProvider theme=
        {theme === 'dark' ? this.darkTheme
          : theme === 'light' ? this.lightTheme
            : theme === 'weird' ? this.weirdTheme
              : this.gradientTheme}>
        <Paper style={{
          height: '500vh'
        }}>
          <Grid container direction="column">
            <Header user={user} primaryTeam={primaryTeam} darkTheme={this.setDark} lightTheme={this.setLight} gradientTheme={this.setGradient} weirdTheme={this.setWeird}/>
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
              <Route exact path='/' render={() => (
                <Fragment>
                  <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
                </Fragment>
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
              <AuthenticatedRoute user={user} path='/accepted' render={() => (
                <Fragment>
                  <AcceptedChallenges primaryTeam={this.primaryTeam} msgAlert={this.msgAlert} user={user} />
                  <StyledDrawer/>
                </Fragment>
              )} />
              <AuthenticatedRoute user={user} path='/pending' render={() => (
                <Fragment>
                  <IndexChallenges msgAlert={this.msgAlert} user={user} />
                  <StyledDrawer/>
                </Fragment>
              )} />
              <AuthenticatedRoute user={user} path='/incoming' render={() => (
                <Fragment>
                  <IncomingChallenges msgAlert={this.msgAlert} user={user} />
                  <StyledDrawer/>
                </Fragment>
              )} />
              <AuthenticatedRoute user={user} path='/finished' render={() => (
                <Fragment>
                  <FinishedChallenges msgAlert={this.msgAlert} user={user} />
                  <StyledDrawer/>
                </Fragment>
              )} />
              <AuthenticatedRoute user={user} path='/my-teams' render={() => (
                <Fragment>
                  <CreateTeam msgAlert={this.msgAlert} user={user} />
                  <IndexTeams setPrimaryTeam={this.setPrimaryTeam} msgAlert={this.msgAlert} setUser={this.setUser} user={user} />
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
