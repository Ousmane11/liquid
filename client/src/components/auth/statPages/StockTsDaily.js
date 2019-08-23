import React, { Component } from 'react'
import Services from '../../../services/alpha.services'
import * as am4core from "@amcharts/amcharts4/core"
import * as am4charts from "@amcharts/amcharts4/charts"
import am4themes_animated from "@amcharts/amcharts4/themes/animated"

am4core.useTheme(am4themes_animated)

class StockDaily extends Component {
  constructor() {
    super()
    this.services = new Services()
    this.state = { stockTimeSeriesDaily: [] }
  }

  componentDidMount() {
    this.services.getStockTimeSeriesDaily()
      .then(response => this.setState({ stockTimeSeriesDaily: response.data }, () => {

        const data = this.state.stockTimeSeriesDaily["Time Series (Daily)"]
        //console.log(data)
        //console.log(Object.keys(data))
        const dates = Object.keys(data)

        // console.log(Object.values(data))
        let stocksdata = Object.values(data)
        //console.log(dates, stocksdata)
        stocksdata = stocksdata.map((elm, idx) => {
          elm = {
            open: elm["1. open"],
            high: elm["2. high"],
            low: elm["3. low"],
            close: elm["4. close"]
            // volume: elm["5. volume"]
          }
          return elm = { date: dates[idx], ...elm }
        })
        stocksdata = stocksdata.reverse()
        console.log(stocksdata)
        this.setState({
          stockTimeSeriesDaily: stocksdata
        }, () => {



          //Creating chart instance
          let chart = am4core.create("myChart", am4charts.XYChart);
          chart.paddingRight = 20;

          chart.dateFormatter.inputDateFormat = "yyyy-MM-dd HH:mm:ss"

          let dateAxis = chart.xAxes.push(new am4charts.DateAxis())
          dateAxis.renderer.grid.template.location = 0;
          dateAxis.dateFormatter.dateFormat = "MM-dd HH:mm:ss"

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
          let lineSeries = chart.series.push(new am4charts.LineSeries())
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

          chart.data = this.state.stockTimeSeriesDaily
          console.log(chart.data)

        })
      }))
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
        <div id='myChart' style={{ width: "100%", height: "500px" }}>

        </div>
      </div>
    )
  }
}


export default StockDaily