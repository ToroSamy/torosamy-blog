import axios from 'axios'
// import { ElMessage } from 'element-plus'

const baseURL = 'https://server.torosamy.net:11699'
const instance = axios.create({
  baseURL,
  timeout: 10000 // 检测多长时间没有回应会超时
})

instance.interceptors.request.use(
  // (config) => {
  //   const userStore = useUserStore()
  //   if (userStore.user!.token && !isTokenExpired(userStore.user!.token)) {
  //     config.headers.Authorization = userStore.user!.token
  //   }
  //   return config
  // },
  // (err) => Promise.reject(err)
)

instance.interceptors.response.use(
  (res) => {
    if (res.data.code === 1) return res
    //ElMessage({ message: res.data.msg || '服务异常', type: 'error' })
    return Promise.reject(res.data)
  },
  (err) => {
    //ElMessage({ message: err.response.data.msg || '服务异常', type: 'error' })
    console.log(err)
    // if (err.response?.status === 401) {
    //   router.push('/login')
    // }
    return Promise.reject(err)
  }
)

export default instance
export { baseURL }
