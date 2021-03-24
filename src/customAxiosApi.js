import axios from 'axios'

export const customAxiosApi = axios.create({
  baseURL: 'http://localhost/myproject/public/api/v1/'
})
