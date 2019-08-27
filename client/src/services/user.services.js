import axios from 'axios'

export default class Services {
  constructor() {
    this.service = axios.create({
      baseURL: 'http://localhost:5000/api/investments/',
      withCredentials: true
    })
  }
  invest = (response) => this.service.post('', response)
  getInvestments = id => this.service.get(`${id}`)
}

