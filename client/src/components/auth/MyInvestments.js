import React, { Component } from 'react'
import Services from '../../services/user.services'


import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated"


// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end


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
        this.setState({ investments: response.data.investments }, () => {

          let chart = am4core.create("assets-chart", am4charts.PieChart);
          chart.hiddenState.properties.opacity = 0; // this creates initial fade-in
          chart.responsive.enabled = true;


          chart.data = this.state.investments;
          chart.radius = am4core.percent(70);
          chart.innerRadius = am4core.percent(40);
          chart.startAngle = 180;
          chart.endAngle = 360;

          let series = chart.series.push(new am4charts.PieSeries());
          series.dataFields.value = "amount";
          series.dataFields.category = "investment";

          series.slices.template.cornerRadius = 10;
          series.slices.template.innerCornerRadius = 7;
          series.slices.template.draggable = true;
          series.slices.template.inert = true;
          series.alignLabels = false;

          series.hiddenState.properties.startAngle = 90;
          series.hiddenState.properties.endAngle = 90;

          chart.legend = new am4charts.Legend();



        })
      })
      .catch(err => console.log(err))
  }



  render() {
    //console.log(this.props.loggedInUser.data._id)

    return (
      <div className='finances-page'>
        <h1>MY INVESTMENTS</h1>
        {/* {this.state.investments ? this.state.investments.map((elm, idx) => <div className='show-center'><p>{elm.investment}:{elm.amount}€</p></div>) : "Waiting for the data"} */}
        <div id='assets-chart'></div>
      </div>
    )
  }


}

export default MyInvestments

