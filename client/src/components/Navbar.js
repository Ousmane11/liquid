import React, { Component } from 'react'
import '../App.css'
import logo from '../liquid-logo.png'
import menu from '../hamburguer-menu-40.svg'


class Navbar extends Component {
  constructor(props) {
    super(props)

  }
  componentDidMount() {
    document.querySelector('.toggle-menu').onclick = e => {
      e.preventDefault()
      document.querySelector('nav').classList.toggle('abierto')

    }
  }


  render() {

    return (
      <header className="header-menu">
        <button onClick={this.props.toggleClickMenu} className="toggle-menu"><img src={menu} alt='hamburguer-menu' /></button>
        <a href="#">
          <img src={logo} alt='liquid-logo' />
        </a>

        <nav>
          <ul>
            <li>
              <a href="#">Inicio</a>
            </li>
            <li>
              <a href="#">Tu Perfil</a>
            </li>
            <li>
              <a href="#">Registro</a>
            </li>
            <li>
              <a href="#">Login</a>
            </li>
            <li>
              <a href="#">Contacto</a>
            </li>
          </ul>
        </nav>

      </header>
    )
  }

}
export default Navbar