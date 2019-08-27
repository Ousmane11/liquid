import React, { Component } from 'react'
import Services from '../../services/alpha.services'
import { Link } from 'react-router-dom'

class Finances extends Component {
  constructor() {
    super()
    this.services = new Services()


  }



  render() {

    return (

      <div className='finances-page'>

        <div className="tetra-box">


          <div className="column">
            <h4>Sector Performance</h4>
            <p> Realtime and historical sector performances calculated<br></br> from S&P500 incumbents</p>
            <Link exact to="/finances/sectors/realtime"><button className="btn btn-outline-info">Get Performance</button></Link>
          </div>
          <div className="column">
            <h4>Stock Time Series Daily</h4>
            <p>Daily time series of the global equity specified for<br></br> the last 6 months</p>
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