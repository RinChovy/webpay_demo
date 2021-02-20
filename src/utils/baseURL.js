/**
 * baseURL 映射
 */
let baseURL = 'https://debug.epayservice.cn/webpay_new';

if (process.env.NODE_ENV === 'production') {
  baseURL = 'https://api.epayservice.cn/webpay_new';
}

export default baseURL;
