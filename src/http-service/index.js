import NProgress from 'nprogress'
import axios from 'axios'
let Api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

Api.defaults.headers.common['AppKEY'] = 'FuspNCZnP7BjALtrez3rF9cNZ5sidfY=';
Api.defaults.headers.common[ 'AppID' ] = 'BucksTrybe';

/* -----------------------  Add a request interceptor ---------------------- */
Api.interceptors.request.use(
  function(config)
  {
    NProgress.start()
    // console.log(config)
    return config
  },
  function(error)
  {
    // console.error(error)
    NProgress.done()
    return Promise.reject(error)
  },
)

/* ----------------------- Add a response interceptor ----------------------- */
Api.interceptors.response.use(
  function(response)
  {
    // console.log(response)
    NProgress.done()
    return response
  },
  function(error)
  {
    NProgress.done()
    return Promise.reject(error)
  },
)

export default Api
