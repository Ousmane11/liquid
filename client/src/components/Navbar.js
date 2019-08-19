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

    return (
      <header className="header-menu">
        <button onClick={this.props.toggleClickMenu} className="toggle-menu"><img src={menu} alt='hamburguer-menu' /></button>
        <Link to="/">
          <img src={logo} alt='liquid-logo' />
        </Link>

        <nav>
          <ul>
            <li>
              <Link to="/">Inicio</Link>
            </li>
            <li>
              <a href="#">Tus Finanzas</a>
            </li>
            <li>
              <Link to="/signup">Registro</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <div onClick={this.logout}>Cerrar Sesión</div>
            </li>
          </ul>
        </nav>

      </header>
    )
  }

}
export default Navbar