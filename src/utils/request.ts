// import { BASE_URL } from '@c/constant';
import axios from 'axios';

// 环境
// const env = process.env.NDOE_ENV || 'development';

// 默认基础请求地址
// axios.defaults.baseURL = (BASE_URL as { [key: string]: string })[env];
axios.defaults.baseURL = '/api';
// 请求是否带上cookie
axios.defaults.withCredentials = false;

// 请求拦截
// axios.interceptors.request.use((request) => {
//   // 添加token、应用信息等
//   request.headers = {
//     ...request.headers,
//     token: sessionStorage.getItem('x-viteApp-token') || '',
//   };
//   return request;
// });

// 对返回的结果做处理
axios.interceptors.response.use((response) => {
  // const code = response?.data?.code ?? 200;
  // 没有权限，登录超时，登出，跳转登录
  // if (code === 3) {
  //   message.error("登录超时，请重新登录");
  //   sessionStorage.removeItem("userinfo");
  //   return history.replace('/')
  // }
  return response.data;
});

export default axios;
