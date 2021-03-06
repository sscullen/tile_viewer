import 'react-dates/initialize'

import '../assets/css/App.scss'

import * as React from 'react'

import { History } from 'history'
import { RouteProps, RouteComponentProps } from 'react-router'

import { connect } from 'react-redux'
import { AppState } from '../store/'

import { MainSessionState, SessionSettings } from '../store/session/types'
import { updateMainSession } from '../store/session/actions'

interface Props {
  history: History
}

import { Switch } from 'react-router-dom'
import { Route, HashRouter } from 'react-router-dom'

import MainContainer from './MainContainer'
import Settings from './Settings'
import Updater from './Updater'

const renderHomeRoute = () => {
  if (window.location.pathname.includes('index.html')) {
    console.log('index.html found')
    return true
  } else return false
}

class App extends React.Component<any, any> {
  constructor(props: any) {
    super(props)
    // Check for saved settigns
  }

  public render() {
    return (
      <HashRouter>
        <Switch>
          <Route path="/settings" render={(props: RouteComponentProps) => <Settings {...props} />} />
          <Route path="/updater" render={(props: RouteComponentProps) => <Updater {...props} />} />
          <Route exact path="/" render={(props: RouteComponentProps) => <MainContainer {...props} />} />
        </Switch>
      </HashRouter>
    )
  }
}

const mapStateToProps = (state: AppState) => ({
  session: state.session,
})

export default connect(
  mapStateToProps,
  {
    updateMainSession,
  },
)(App)
