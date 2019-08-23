import React, { Component } from 'react'
import Services from '../../services/alpha.services'
import { Link } from 'react-router-dom'

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

        <div className="tetra-box">


          <div className="column">
            <h4>Sector Performance</h4>
            <p> realtime and historical sector performances calculated from S&P500 incumbents</p>
            <Link to="/finances/sectors"><button className="btn btn-outline-info">Get Performance</button></Link>
          </div>
          <div className="column">
            <h4>Stock Time Series Daily</h4>
            <p>sdjnbevbadkjfvbakejverkvbdfvbvbfvbd</p>
            <Link to="/finances/stocktimeseries"><button className="btn btn-outline-info">Get stock series</button></Link>
          </div>

          <div className="column">
            <h4>Forex Exchange Rates</h4>
            <p>Realtime exchange rate for any pair of digital currency <br></br>(e.g., Bitcoin) and physical currency</p>
            <Link to="/finances/forexrates"><button className="btn btn-outline-info">Get Exchange Rates</button></Link>
          </div>
          <div className="column">
            <h4>Forex Intraday</h4>
            <p>Conversion rate from one currency to other<br></br>
              of your choice.</p>

            <Link to="/finances/forexintraday"><button className="btn btn-outline-info">Get Intraday</button></Link>
          </div>

        </div>


      </div>


    )

  }
}
export default Finances