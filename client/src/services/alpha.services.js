import axios from 'axios'



export default class Finances {
  constructor() {
    this.service = axios.create({
      baseURL: 'https://www.alphavantage.co/',
    })

  }
  getSectorPerformance = () => this.service.get(`query?function=SECTOR&apikey=${process.env.APIKEY}`)
  getExchangeRate = () => this.service.get(`query?function=CURRENCY_EXCHANGE_RATE&from_currency=USD&to_currency=JPY&apikey=${process.env.APIKEY}`)
  getForexIntraday = () => this.service.get(`query?function=FX_INTRADAY&from_symbol=EUR&to_symbol=USD&interval=30min&apikey=${process.env.APIKEY}`)
  getStockTimeSeriesDaily = () => this.service.get(`query?function=TIME_SERIES_DAILY&symbol=MSFT&apikey=${process.env.APIKEY}`)
}



