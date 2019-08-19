import React, { Component } from 'react'
import './App.css'

import Navbar from './components/Navbar'





class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showMenu: false
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

  render() {



    return (
      <>
        <Navbar toggleClickMenu={this.toggleClickMenu} />
        <div className='video-header'>

          <video loop muted autoPlay poster='./liquid-poster.png' className="vid">
            <source src={require('./slowmotion-liquid.mp4')} type='video/mp4' />
            <source src={require('./slowmotion-liquid.webm')} type='video/webm' />
          </video>
        </div>



      </>
    )
  }
}

export default App
