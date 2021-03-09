/**
 * baseURL 映射
 */

let baseURL = "";

if (process.env.NODE_ENV === "development") {
  baseURL = "https://debug.epayservice.cn/webpay_new";
} else if (process.env.NODE_ENV === "production") {
  baseURL = "https://api.epayservice.cn/webpay_new";
  // baseURL = 'https://370200.epayservice.cn/webpay_new';//青岛现场地址
}

export default baseURL;
