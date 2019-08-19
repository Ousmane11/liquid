import React, { Component } from 'react'
import './App.css'
import { Switch, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import AuthServices from './services/auth.services.js'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Video from './components/Video'




class App extends Component {
  constructor(props) {
    super(props)
    this.state = { showMenu: false }
    this.AuthServices = new AuthServices()

  }

  setTheUser = user => {
    this.setState({ loggedInUser: user })
    console.log("Un componente ha cambiado el usuario en App:", this.state.loggedInUser)
  }

  fetchUser = () => {
    if (this.state.loggedInUser === null) {
      this.authServices.loggedin()
        .then(response => this.setState({ loggedInUser: response }))
        .catch(x => this.setState({ loggedInUser: false }))
    }
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

export default App
