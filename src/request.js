import axios from 'axios'


const request = axios.create({
  baseURL:'/api',
  timeout:60000,
})


//请求拦截器
request.interceptors.request.use(config => {
 return config; 
},function (error){
  return Promise.reject(error);
})

//响应拦截器
request.interceptors.response.use(function (response){
  return response.data;
},function (error){
  return Promise.reject(error);
})

export default request