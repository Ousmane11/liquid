import React, { Component } from 'react'
import Services from '../../services/alpha.services'

class ForexIntraday extends Component {
  constructor() {
    super()
    this.services = new Services()
    this.state = { forexIntraday: [] }
  }

  componentDidMount() {
    this.services.getForexIntraday()
      .then(response => this.setState({ forexIntraday: response.data }))
      .catch(err => console.log(err))

  }
  render() {

    return (
      <>
      </>
    )
  }
}

export default ForexIntraday