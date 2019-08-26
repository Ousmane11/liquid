import React, { Component } from 'react'
import Services from '../../../services/alpha.services'



class ForexExchange extends Component {
  constructor() {
    super()
    this.services = new Services()
    this.state = { exchangeRate: [] }
  }

  handleInputChange = e => {
    let { name, value } = e.target
    this.setState({
      [name]: value
    })
  }

  handleFormSubmit = e => {
    e.preventDefault()
    this.services.getExchangeRate(this.state.firstCurrency, this.state.secondCurrency)
      .then(response => this.setState({ exchangeRate: response.data }, () => {

        const data = this.state.exchangeRate["Realtime Currency Exchange Rate"]
        //console.log(data)
        this.setState({ exchangeRate: data })
      }))
      .catch(err => console.log(err))
  }


  render() {

    return (
      <div className='finances-page'>
        <form className='forex-form' onSubmit={this.handleFormSubmit}>
          <label>From: </label>
          <select className='currencies' name='firstCurrency' onChange={this.handleInputChange}>
            <option></option>
            <option value='USD'>US Dollar</option>
            <option value='JPY'>Japanese Yen</option>
            <option value='EUR'>Euro</option>
            <option value='GBP'>British Pound</option>
            <option value='CNY'>Chinese Yuan</option>
            {/* <option value='BTC'>Bitcoin</option>
            <option value='ETH'>Ethereum</option> */}
          </select>
          <br></br>
          <br></br>
          <label>To   :</label>
          <select className='currencies' name='secondCurrency' onChange={this.handleInputChange}>
            <option></option>
            <option value='USD'>US Dollar</option>
            <option value='JPY'>Japanese Yen</option>
            <option value='EUR'>Euro</option>
            <option value='GBP'>British Pound</option>
            <option value='CNY'>Chinese Yuan</option>
            {/* <option value='BTC'>Bitcoin</option>
            <option value='ETH'>Ethereum</option> */}
          </select>
          <button className='btn btn-outline-info'>Show conversion</button>
        </form>
        <article className='data-article'>
          <h3>{this.state.exchangeRate["1. From_Currency Code"]} - {this.state.exchangeRate["3. To_Currency Code"]}</h3>
          <p>The conversion rate from {this.state.exchangeRate["2. From_Currency Name"]} to {this.state.exchangeRate["4. To_Currency Name"]} is:</p>
          <h5>{this.state.exchangeRate["5. Exchange Rate"]}</h5>
          <hr></hr>
          <p>Bid price: {this.state.exchangeRate['8. Bid Price']}</p>
          <p>Ask price: {this.state.exchangeRate['9. Ask Price']}</p>
          <p>Last refresh: {this.state.exchangeRate['6. Last Refreshed']}</p>
          <p>Time zone: {this.state.exchangeRate['7. Time Zone']}</p>
        </article>
      </div>

    )
  }
}

export default ForexExchange