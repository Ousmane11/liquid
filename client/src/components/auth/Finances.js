import React, { Component } from 'react'
import Services from '../../services/alpha.services'

class Finances extends Component {
  constructor() {
    super()
    this.services = new Services()
    this.state = {
      sectorsPerformance: [],
      exchangeRate: [],
      forexIntraday: [],
      stockTimeSeriesDaily: []
    }
  }




  componentDidMount() {
    this.services.getSectorPerformance()
      .then(response => this.setState({ sectorsPerformance: response.data }))
      .catch(err => console.log(err))
    this.services.getExchangeRate()
      .then(response => this.setState({ exchangeRate: response.data }))
      .catch(err => console.log(err))
    this.services.getForexIntraday()
      .then(response => this.setState({ forexIntraday: response.data }))
      .catch(err => console.log(err))
    this.services.getStockTimeSeriesDaily()
      .then(response => this.setState({ stockTimeSeriesDaily: response.data }))
      .catch(err => console.log(err))
  }


  render() {

    return (

      <div className='finances-page'>
        <h1>Mercados</h1>
        <div className="tetra-box">


          <div className="column">
            <h4>Sector Performance</h4>
            <p>sdjnbevbadkjfvbakejverkvbdfvbvbfvbd</p>
            <button className="btn btn-outline-info">Sector Perf</button>
          </div>
          <div className="column">
            <h4>Stock Time Series Daily</h4>
            <p>sdjnbevbadkjfvbakejverkvbdfvbvbfvbd</p>
            <button className="btn btn-outline-info">Exchange Rate</button>
          </div>

          <div className="column">
            <h4>Forex Exchange Rates</h4>
            <p>sdjnbevbadkjfvbakejverkvbdfvbvbfvb</p>
            <button className="btn btn-outline-info">Forex Intraday</button>
          </div>
          <div className="column">
            <h4>Forex Intraday</h4>
            <p>sdjnbevbadkjfvbakejverkvbdfvbvbfvbd</p>
            <button className="btn btn-outline-info">Stock Time series</button>
          </div>

        </div>


      </div>


    )

  }
}
export default Finances