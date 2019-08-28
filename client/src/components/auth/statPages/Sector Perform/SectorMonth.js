import React, { Component } from 'react'
import Services from '../../../../services/alpha.services'
import { Link } from 'react-router-dom'


import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";


class SectorMonth extends Component {
  constructor() {

    super()
    this.services = new Services()
    this.state = { sectorsPerformance: [] }
  }



  componentDidMount() {
    this.services.getSectorPerformance()
      .then(response => this.setState({ sectorsPerformance: response.data }, () => {
        const performanceA = this.state.sectorsPerformance["Rank D: 1 Month Performance"]
        let chartperf = []
        for (let data in performanceA) {
          chartperf.push({ "industry": data, "value": performanceA[data] })
        }

        console.log(chartperf)
        let chart = am4core.create("myChart", am4charts.SlicedChart);
        chart.hiddenState.properties.opacity = 0; // this makes initial fade in effect
        chart.responsive.enabled = true;

        chart.data = chartperf

        let series = chart.series.push(new am4charts.FunnelSeries());
        series.colors.step = 2;
        series.dataFields.value = "value";
        series.dataFields.category = "industry";
        series.alignLabels = true;

        series.labelsContainer.paddingLeft = 10;
        series.labelsContainer.width = 250;

        //series.orientation = "horizontal";
        //series.bottomRatio = 1;

        chart.legend = new am4charts.Legend();
        chart.legend.position = "left";
        chart.legend.valign = "bottom";
        chart.legend.margin(5, 5, 20, 5);


      }))
      .catch(err => console.log(err))
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  render() {

    return (
      <div className='finances-page'>
        <div id='chart-container'>

          <div id='myChart'>
          </div>
          <div className='perfComps'>
            <Link to='/finances/sectors/one'><button>1 Day</button></Link>
            <Link to='/finances/sectors/five'><button>5 Days</button></Link>
            <Link to='/finances/sectors/month'><button>1 Month</button></Link>
            <Link to='/finances/sectors/threemonths'><button>3 Month</button></Link>
            <Link to='/finances/sectors/yeartodate'><button>YTD</button></Link>

          </div>
        </div>
      </div>
    )
  }
}

export default SectorMonth