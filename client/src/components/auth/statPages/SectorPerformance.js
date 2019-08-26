import React, { Component } from 'react'
import Services from '../../../services/alpha.services'
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated"


class SectorsPerformance extends Component {
  constructor() {

    super()
    this.services = new Services()
    this.state = { SectorsPerformance: [] }
  }



  componentDidMount() {
    this.services.getSectorPerformance()
      .then(response => this.setState({ sectorsPerformance: response.data }, () => {
        const performanceA = this.state.sectorsPerformance["Rank A: Real-Time Performance"]
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



        // let chart = am4core.create("myChart", am4charts.XYChart);
        // chart.hiddenState.properties.opacity = 0; // this makes initial fade in effect
        // chart.responsive.enabled = true;

        // chart.data = chartperf


        // let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        // categoryAxis.renderer.grid.template.location = 0;
        // categoryAxis.dataFields.category = "industry";
        // categoryAxis.renderer.minGridDistance = 40;

        // let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

        // let series = chart.series.push(new am4charts.CurvedColumnSeries());
        // series.dataFields.categoryX = "industry";
        // series.dataFields.valueY = "value";
        // series.tooltipText = "{valueY.value}"
        // series.columns.template.strokeOpacity = 0;

        // series.columns.template.fillOpacity = 0.75;

        // let hoverState = series.columns.template.states.create("hover");
        // hoverState.properties.fillOpacity = 1;
        // hoverState.properties.tension = 0.4;

        // chart.cursor = new am4charts.XYCursor();

        // // Add distinctive colors for each column using adapter
        // series.columns.template.adapter.add("fill", function (fill, target) {
        //   return chart.colors.getIndex(target.dataItem.index);
        // });

        // chart.scrollbarX = new am4core.Scrollbar();





      }))
      .catch(err => console.log(err))
  }


  render() {

    return (
      <div className='finances-page'>
        <div id='chart-container'>
          <div id='myChart'>
          </div>
        </div>
      </div>
    )
  }
}

export default SectorsPerformance