// const baseapi = "//debug.epayservice.cn";
const baseapi = "http://192.168.5.15:8701/webpay_new";
export default {
   // 导出
  exportInfo: `${baseapi}/record/exportInfo`,
   // 验证码
  code: `${baseapi}/common/getCo`,
   // 提交缴款书
  queryPayInfo: `${baseapi}/common/queryPayInfo.do`,
};
