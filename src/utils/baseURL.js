/**
 * baseURL 映射
 */

let baseURL = '';

if (process.env.NODE_ENV === 'development') {
  baseURL = 'https://debug.epayservice.cn/webpay_new';
  // baseURL = 'http://192.168.5.103:8701/webpay_new'; //刘少璞后台地址
  // baseURL = 'http://192.168.62.15:8701/webpay_new'; //刘源后台地址
  // baseURL = 'https://www.gstyggzf.gov.cn/webpay_new'; //甘肃现场地址
  // baseURL = 'http://192.168.6.64:8701/webpay_new'; //任雪健后台地址
} else if (process.env.NODE_ENV === 'production') {
  // baseURL = 'https://debug.epayservice.cn/webpay_new';
  // baseURL = 'https://api.epayservice.cn/webpay_new';
  baseURL = 'https://370200.epayservice.cn/webpay_new'; //青岛现场地址
  // baseURL = 'https://520000.epayservice.cn/webpay_new'; //贵州现场地址
  // baseURL = 'http://fsjf.czt.guizhou.gov.cn/webpay_new'; //贵州现场地址
  // baseURL = 'https://www.gstyggzf.gov.cn/webpay_new'; //甘肃现场地址
}

export default baseURL;
