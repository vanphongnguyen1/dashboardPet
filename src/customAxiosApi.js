import axios from 'axios'

export const customAxiosApi = axios.create({
  baseURL: 'http://localhost/myProject/public/api/v1/'
})
