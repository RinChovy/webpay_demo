/**
 * baseURL 映射
 */

let baseURL = '';

if (process.env.NODE_ENV === 'development') {
  baseURL = 'https://debug.epayservice.cn/webpay_new';
  // baseURL = 'http://192.168.1.120:8092/webpay_new'; //测试tomcat
  // baseURL = 'http://192.168.62.13:8701/webpay_new'; //任雪健
  // baseURL = 'http://192.168.5.103:8701/webpay_new'; //刘少璞后台地址
  // baseURL = 'http://192.168.62.15:8701/webpay_new'; //刘源后台地址
  // baseURL = 'https://www.gstyggzf.gov.cn/webpay_new'; //甘肃现场地址
  // baseURL = 'http://192.168.6.64:8701/webpay_new'; //任雪健后台地址
  // baseURL = 'http://192.168.0.120:8090/webpay_new'; //吉林现场地址
} else if (process.env.NODE_ENV === 'production') {
  // baseURL = 'https://debug.epayservice.cn/webpay_new';
  // baseURL = 'https://api.epayservice.cn/webpay_new';
  // baseURL = 'https://370200.epayservice.cn/webpay_new'; //青岛现场地址
  // baseURL = 'http://192.168.1.120:8091/webpay_new'; //任雪健后台
  // baseURL = 'http://fsjf.czt.guizhou.gov.cn/webpay_new'; //贵州现场地址
  // baseURL = 'https://www.gstyggzf.gov.cn/webpay_new'; //甘肃现场地址
  baseURL = 'http://222.75.67.163:10086/webpay_new'; //宁夏tomcat现场地址
  // baseURL = 'http://640000.epayservice.cn:10087/webpay_new'; //宁夏现场地域名版本址
  // baseURL = 'https://fssj.czt.jl.gov.cn/webpay_new'; //吉林现场地址



}

export default baseURL;
