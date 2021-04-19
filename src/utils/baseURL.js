/**
 * baseURL 映射
 */

let baseURL = '';

if (process.env.NODE_ENV === 'development') {
  baseURL = 'https://debug.epayservice.cn/webpay_new';
  // baseURL = 'http://192.168.4.168:8701/webpay_new'; //刘少璞后台地址
} else if (process.env.NODE_ENV === 'production') {
  baseURL = 'https://api.epayservice.cn/webpay_new';
  // baseURL = "https://370200.epayservice.cn/webpay_new"; //青岛现场地址
}

export default baseURL;
