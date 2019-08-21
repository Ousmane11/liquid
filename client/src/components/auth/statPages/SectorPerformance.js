import React, { Component } from 'react'
import Services from '../../services/alpha.services'

class SectorsPerformance extends Component {
  constructor() {

    super()
    this.services = new Services()
    this.state = { SectorsPerformance: [] }
  }

  componentDidMount() {
    this.services.getSectorPerformance()
      .then(response => this.setState({ sectorsPerformance: response.data }))
      .catch(err => console.log(err))
  }


  render() {

    return (
      <>
      </>
    )
  }
}

export default SectorsPerformance