
import React, { Component } from 'react'
import './App.css'
import { Switch, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import AuthServices from './services/auth.services.js'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Video from './components/Video'
import Finances from './components/auth/Finances'
import ForexExchange from './components/auth/statPages/ForexExRates'
import ForexIntraday from './components/auth/statPages/ForexIntraday'
import ProtectedRoute from './components/auth/routes/ProtectedRoute'
import StockDaily from './components/auth/statPages/StockTsDaily'
import SectorsPerformance from './components/auth/statPages/Sector Perform/SectorPerformance'
import SectorOne from './components/auth/statPages/Sector Perform/SectorOne'
import SectorFive from './components/auth/statPages/Sector Perform/SectorFive'
import SectorMonth from './components/auth/statPages/Sector Perform/SectorMonth'
import Sector3Months from './components/auth/statPages/Sector Perform/Sector3Months'
import SectorYTD from './components/auth/statPages/Sector Perform/SectorYTD'
import Investment from './components/auth/NewInvestment'
import MyInvestments from './components/auth/MyInvestments'


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showMenu: false,
      loggedInUser: null
    }
    this.AuthServices = new AuthServices()

  }

  // En vez de hacer setState y cambiarle el valor por el opuesto directamente, he usado el modo función de setState, le
  // he pasado como argumento el previousState y le he asignado el valor opuesto en el retorno

  toggleClickMenu = () => {
    console.log('state updated')
    this.setState({
      showMenu: !this.state.showMenu,

    })
  }

  setTheUser = user => {
    this.setState({ loggedInUser: user })
    console.log("Un componente ha cambiado el usuario en App:", this.state.loggedInUser)
  }

  fetchUser = () => {
    if (this.state.loggedInUser === null) {
      this.AuthServices.loggedin()
        .then(response => this.setState({ loggedInUser: response }))
        .catch(x => this.setState({ loggedInUser: false }))
    }
  }

  render() {

    this.fetchUser()
    if (this.state.loggedInUser) {
      return (
        <>
          <Navbar setUser={this.setTheUser} toggleClickMenu={this.toggleClickMenu} userInSession={this.state.loggedInUser} />

          <Switch>
            <Route exact path="/" component={Video} />
            <ProtectedRoute exact path="/finances" user={this.state.loggedInUser} component={Finances} />
            <ProtectedRoute exact path="/addinvestment" user={this.state.loggedInUser} component={Investment} />
            <ProtectedRoute path="/investments/:id" user={this.state.loggedInUser} component={MyInvestments} />
            <ProtectedRoute exact path="/finances/forexrates" user={this.state.loggedInUser} component={ForexExchange} />
            <ProtectedRoute exact path="/finances/forexintraday" user={this.state.loggedInUser} component={ForexIntraday} />
            <ProtectedRoute exact path="/finances/stocktimeseries" user={this.state.loggedInUser} component={StockDaily} />
            <ProtectedRoute exact path="/finances/sectors/realtime" user={this.state.loggedInUser} component={SectorsPerformance} />
            <ProtectedRoute exact path="/finances/sectors/one" user={this.state.loggedInUser} component={SectorOne} />
            <ProtectedRoute exact path="/finances/sectors/five" user={this.state.loggedInUser} component={SectorFive} />
            <ProtectedRoute exact path="/finances/sectors/month" user={this.state.loggedInUser} component={SectorMonth} />
            <ProtectedRoute exact path="/finances/sectors/threemonths" user={this.state.loggedInUser} component={Sector3Months} />
            <ProtectedRoute exact path="/finances/sectors/yeartodate" user={this.state.loggedInUser} component={SectorYTD} />
          </Switch>
        </>
      )
    } else {
      return (
        <>
          <Navbar setUser={this.setTheUser} toggleClickMenu={this.toggleClickMenu} />

          <Switch>
            <Route exact path="/" component={Video} />
            <Route exact path="/login" render={match => <Login {...match} setUser={this.setTheUser} />} />
            <Route exact path="/signup" render={match => <Signup {...match} setUser={this.setTheUser} />} />
          </Switch>
        </>
      )

    }
  }
}

export default App
