import axios from 'axios'

export default class Finances {
  constructor() {
    this.service = axios.create({
      baseURL: 'https://www.alphavantage.co/',
    })

  }
  getSectorPerformance = () => this.service.get(`query?function=SECTOR&apikey=${process.env.APIKEY}`)
  getExchangeRate = (first, second) => this.service.get(`query?function=CURRENCY_EXCHANGE_RATE&from_currency=${first}&to_currency=${second}&apikey=${process.env.APIKEY}`)
  getForexIntraday = (first, second) => this.service.get(`query?function=FX_INTRADAY&from_symbol=${first}&to_symbol=${second}&interval=30min&apikey=${process.env.APIKEY}`)
  getStockTimeSeriesDaily = company => this.service.get(`query?function=TIME_SERIES_DAILY&symbol=${company}&apikey=${process.env.APIKEY}`)


}



