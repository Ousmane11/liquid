import React, { Component } from 'react'
import Services from '../../services/user.services'
import '../../App.css'

class Investment extends Component {
  constructor(props) {
    super(props)
    this.state = {
      investment: "",
      amount: ""
    }
    this.services = new Services()
  }


  handleInputChange = e => {
    let { name, value } = e.target
    this.setState({
      [name]: value
    })
  }

  handleFormSubmit = e => {
    e.preventDefault()
    this.services.invest({ state: this.state, id: this.props.loggedInUser.data._id })
      .then(() => {
        this.setState({ investment: "", amount: "" })
        console.log(this.props.loggedInUser.data._id

        )
      })
      .catch(err => console.log(err))
  }


  render() {



    return (
      <div className='finances-page'>
        <h1>INVESTMENT FORM</h1>

        <div className='form-container'>


          <div className="form-group">
            <form onSubmit={this.handleFormSubmit}>
              <label htmlFor="investment">Choose an asset</label>
              <select name='investment' onChange={this.handleInputChange} className="form-control" id="investment">
                <option></option>
                <option value='USD'>US Dollar</option>
                <option value='JPY'>Japanese Yen</option>
                <option value='EUR'>Euro</option>
                <option value='GBP'>British Pound</option>
                <option value='CNY'>Chinese Yuan</option>
                <option value='TSLA'>Tesla</option>
                <option value='GOOGL'>Google</option>
                <option value='FB'>Facebook</option>
                <option value='BBVA'>BBVA</option>
                <option value='AMZN'>Amazon</option>
              </select>
              <div className="form-group">
                <label htmlFor="amount">Amount</label>
                <input name='amount' className='form-control' type='number' id='amount' onChange={this.handleInputChange}></input>
              </div>



              <button type='submit' className='btn btn-outline-info'>Purchase</button>

            </form>
          </div>
        </div>
      </div>
    )
  }


}

export default Investment

