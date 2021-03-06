import React, { Component } from 'react'

import AuthServices from '../../services/auth.services'

class Signup extends Component {

  constructor(props) {
    super(props)
    this.state = {
      username: "",
      password: ""
    }
    this.AuthServices = new AuthServices()
  }

  handleInputChange = e => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  handleFormSubmit = e => {
    e.preventDefault()
    const { username, password } = this.state
    this.AuthServices.signup(username, password)
      .then(theNewUser => {
        this.setState({
          username: '',
          password: ''
        })
        this.props.setUser(theNewUser)
        this.props.history.push('/')
      })
      .catch(err => console.log(err.response.data.message))
  }


  render() {

    return (
      <main>
        <h1 className='auth-title'>Registro</h1>
        <div className='auth-form'>

          <form onSubmit={this.handleFormSubmit}>
            <div className="form-group">
              <label htmlFor="username">Usuario</label>
              <input name="username" type="text" className="form-control" value={this.state.username} onChange={this.handleInputChange} aria-describedby="user" placeholder="Enter a username" />
              <small id="emailHelp" className="form-text text-muted">We'll never share it with anyone else.</small>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input name="password" type="password" className="form-control" value={this.state.password} onChange={this.handleInputChange} placeholder="Password" />
            </div>
            <button type="submit" className="btn btn-outline-info">Submit</button>
          </form>

        </div>
      </main>
    )


  }



}

export default Signup