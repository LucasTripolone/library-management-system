import axios from 'axios'

const axiosInstance = axios.create()

axiosInstance.interceptors.request.use(
    (request) => {
        console.log('holiii'. request);
        return request;
    }
)

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.log('call the refresh token api here')
    }
    return Promise.reject(error)
  },
)

export default axiosInstance