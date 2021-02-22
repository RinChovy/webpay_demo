/**
 * baseURL 映射
 */
// let baseURL = 'https://debug.epayservice.cn/webpay_new';
let baseURL = "http://192.168.5.15:8701/webpay_new";

if (process.env.NODE_ENV === "production") {
  baseURL = "https://api.epayservice.cn/webpay_new";
}

export default baseURL;
