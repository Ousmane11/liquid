import React, { Component } from 'react'
import Services from '../../services/alpha.services'

class StockDaily extends Component {
  constructor() {
    super()
    this.services = new Services()
    this.state = { stockTimeSeriesDaily: [] }
  }

  componentDidMount() {
    this.services.getStockTimeSeriesDaily()
      .then(response => this.setState({ stockTimeSeriesDaily: response.data }))
      .catch(err => console.log(err))
  }

  render() {

    return (
      <>
      </>
    )
  }
}

export default StockDaily