import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../App.css'
import logo from '../liquid-logo.png'
import menu from '../hamburguer-menu-40.svg'
import AuthServices from '../services/auth.services'


class Navbar extends Component {
  constructor(props) {
    super(props)
    this.AuthServices = new AuthServices()

  }
  componentDidMount() {
    document.querySelector('.toggle-menu').onclick = e => {
      e.preventDefault()
      document.querySelector('nav').classList.toggle('abierto')

    }
  }

  logout = () => {
    this.AuthServices.logout()
      .then(x => {
        this.props.setUser(null)
      })
      .catch(err => console.log(err))
  }

  render() {
    if (this.props.userInSession) {
      return (
        <header className="header-menu">
          <button className='nav-button toggle-menu' onClick={this.props.toggleClickMenu}><img src={menu} alt='hamburguer-menu' /></button>
          <Link to="/">
            <img src={logo} alt='liquid-logo' />
          </Link>

          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/addinvestment">Invest</Link>
              </li>
              <li>
                <Link to="/finances">Finance boards</Link>
              </li>
              <li>
                <Link to={`/investments/${this.props.userInSession.data._id}`}>Your Assets</Link>
              </li>
              <li>
                <button className='nav-button' onClick={this.logout}>Logout</button>
              </li>
              <li>
                <small>Good to see you here, {this.props.userInSession.data.username}</small>
              </li>
            </ul>
          </nav>

        </header>
      )

    } else {
      return (
        <header className="header-menu">
          <button className='nav-button toggle-menu' onClick={this.props.toggleClickMenu} ><img src={menu} alt='hamburguer-menu' /></button>
          <Link to="/">
            <img src={logo} alt='liquid-logo' />
          </Link>

          <nav>
            <ul>
              <li>
                <Link to="/">Main</Link>
              </li>
              <li>
                <Link to="/signup">Register</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <small>Welcome to Liquid</small>
              </li>
            </ul>
          </nav>

        </header>
      )
    }
  }

}
export default Navbar