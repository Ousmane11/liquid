import React, { Component } from 'react'
import Services from '../../services/alpha.services'

class ForexExchange extends Component {
  constructor() {
    super()
    this.services = new Services()
    this.state = { exchangeRate: [] }
  }

  componentDidMount() {
    this.services.getExchangeRate()
      .then(response => this.setState({ exchangeRate: response.data }))
      .catch(err => console.log(err))
  }
  render() {

    return (
      <>
      </>
    )
  }
}

export default ForexExchange