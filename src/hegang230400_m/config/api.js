// const baseapi = "//debug.epayservice.cn";
// const baseapi = 'http://192.168.5.15:8701/webpay_new';
const baseapi = '//debug.epayservice.cn/webpay_new';
export default {
  // 导出
  exportInfo: `${baseapi}/record/exportInfo`,
  // 验证码
  code: `${baseapi}/common/getCo`,
  // 提交缴款书
  queryPayInfo: `${baseapi}/common/queryPayInfo.do`,
  // 缴费接口
  createCharge: `${baseapi}/common/createCharge`,
  //成功回调接口
  success: `${baseapi}/callback/frontnotice`,
};
