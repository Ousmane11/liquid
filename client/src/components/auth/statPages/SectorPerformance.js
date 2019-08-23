import React, { Component } from 'react'
import Services from '../../../services/alpha.services'
import * as am4core from "@amcharts/amcharts4/core"
import * as am4charts from "@amcharts/amcharts4/charts"
import am4themes_animated from "@amcharts/amcharts4/themes/animated"

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
      <div className='chart-container'>
        <div id='myChart'>

        </div>
      </div>
    )
  }
}

export default SectorsPerformance