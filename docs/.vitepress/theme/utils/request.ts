import axios from 'axios'

const instance = axios.create({
  baseURL: '/api',
  timeout: 60000
})

instance.interceptors.request.use(
  (config) => {
    return config
  },
  (err) => Promise.reject(err)
)

instance.interceptors.response.use(
  (res) => {
    return res.data;
  },
  (err) => {
    if (!err.response || !err.response.data) {
      return Promise.reject(err);
    }

    const { status, data } = err.response;

    return Promise.reject(err);

  }
)

export default instance