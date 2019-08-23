import React, { Component } from 'react'
import Services from '../../../services/alpha.services'
import * as am4core from "@amcharts/amcharts4/core"
import * as am4charts from "@amcharts/amcharts4/charts"
import am4themes_animated from "@amcharts/amcharts4/themes/animated"

am4core.useTheme(am4themes_animated)


class ForexIntraday extends Component {
  constructor() {
    super()
    this.services = new Services()
    this.state = { forexIntraday: [] }
  }

  componentDidMount() {
    this.services.getForexIntraday()
      .then(response => {
        this.setState({ forexIntraday: response.data }, () => {

          //Manipulación del JSON que me retorna la {Api} para conseguir un formato más manejable
          // Primero he asignado a una variable el time series
          // en otras dos varibles he extraído el date y las demás propiedades de forex
          // Con object deconstructing he modificado el nombre de las propiedades
          // Finalmente he mapeado el objeto con datos de forex para añadirle la fecha como propiedad.

          // console.log(this.state.forexIntraday["Time Series FX (30min)"])
          const data = this.state.forexIntraday["Time Series FX (30min)"]
          //console.log(data)
          //console.log(Object.keys(data))
          const dates = Object.keys(data)

          // console.log(Object.values(data))
          let forexdata = Object.values(data)
          //console.log(dates, forexdata)
          forexdata = forexdata.map((elm, idx) => {
            elm = {
              open: elm["1. open"],
              high: elm["2. high"],
              low: elm["3. low"],
              close: elm["4. close"],
            }
            return elm = { date: dates[idx], ...elm }
          })
          forexdata = forexdata.reverse()
          console.log(forexdata)
          this.setState({
            forexIntraday: forexdata
          }, () => {



            //Creating chart instance
            let chart = am4core.create("myChart", am4charts.XYChart);
            chart.paddingRight = 20;

            chart.dateFormatter.inputDateFormat = "yyyy-MM-dd HH:mm:ss";

            let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
            dateAxis.renderer.grid.template.location = 0;
            dateAxis.dateFormatter.dateFormat = "MM-dd HH:mm:ss";

            let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
            valueAxis.tooltip.disabled = true;

            let series = chart.series.push(new am4charts.CandlestickSeries());
            series.dataFields.dateX = "date";
            series.dataFields.valueY = "close";
            series.dataFields.openValueY = "open";
            series.dataFields.lowValueY = "low";
            series.dataFields.highValueY = "high";
            series.simplifiedProcessing = true;
            series.tooltipText = "Open:${openValueY.value}\nLow:${lowValueY.value}\nHigh:${highValueY.value}\nClose:${valueY.value}";

            chart.cursor = new am4charts.XYCursor();

            // a separate series for scrollbar
            let lineSeries = chart.series.push(new am4charts.LineSeries());
            lineSeries.dataFields.dateX = "date";
            lineSeries.dataFields.valueY = "close";
            // need to set on default state, as initially series is "show"
            lineSeries.defaultState.properties.visible = false;

            // hide from legend too (in case there is one)
            lineSeries.hiddenInLegend = true;
            lineSeries.fillOpacity = 0.5;
            lineSeries.strokeOpacity = 0.5;

            let scrollbarX = new am4charts.XYChartScrollbar();
            scrollbarX.series.push(lineSeries);
            chart.scrollbarX = scrollbarX;

            chart.data = this.state.forexIntraday
            console.log(chart.data)
          })
        })
      })
      .catch(err => console.log(err))

  }



  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose()
    }
  }


  render() {

    return (
      <div className='chart-container'>
        <h5>Forex Intraday</h5>
        <div id="myChart" style={{ width: "100%", height: "500px" }}></div>
      </div>
    )
  }
}

export default ForexIntraday