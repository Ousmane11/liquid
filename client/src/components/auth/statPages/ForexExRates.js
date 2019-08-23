import React, { Component } from 'react'
import Services from '../../../services/alpha.services'



class ForexExchange extends Component {
  constructor() {
    super()
    this.services = new Services()
    this.state = { exchangeRate: [] }
  }

  componentDidMount() {
    this.services.getExchangeRate()
      .then(response => this.setState({ exchangeRate: response.data }, () => {

        const data = this.state.exchangeRate["Realtime Currency Exchange Rate"]
        console.log(data)
        this.setState({ exchangeRate: data })
      }))
      .catch(err => console.log(err))
  }


  render() {

    return (
      <div className='chart-container'>
        <div id='myChart'>
          <table>
            <thead>
              <tr>
                <th>Firstname</th>
                <th>Lastname</th>
                <th>Age</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Jill</td>
                <td>Smith</td>
                <td>50</td>
              </tr>
              <tr>
                <td>Eve</td>
                <td>Jackson</td>
                <td>94</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default ForexExchange