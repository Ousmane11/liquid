import React, { Component } from 'react'
import Services from '../../services/user.services'


class MyInvestments extends Component {
  constructor(props) {
    super(props)
    this.state = {
      investments: ""
    }
    this.services = new Services()
  }



  componentDidMount() {
    this.services.getInvestments(this.props.loggedInUser.data._id)
      .then(response => {
        console.log(response)
        this.setState({ investments: response.data.investments })
      })
      .catch(err => console.log(err))
  }



  render() {
    //console.log(this.props.loggedInUser.data._id)

    return (
      <div className='finances-page'>
        <h1>MY INVESTMENTS</h1>
        {this.state.investments ? this.state.investments.map((elm, idx) => <div className='show-center'><p>{elm.investment}:{elm.amount}€</p></div>) : "Waiting for the data"}

      </div>
    )
  }


}

export default MyInvestments

