const base = "http://192.168.5.15:8701/webpay_new/";
// const base = "http://debug.epayservice.cn/webpay_new/"

const api = {
  common: base + "common/", //首页接口
  getCo: base + "common/getCo", //验证码接口
  queryPayInfo: base+ "common/queryPayInfo.do", //缴款书提交接口
  createCharge: base+ "common/createCharge", //缴费接口
  success: base+"callback/frontnotice", //成功回调接口
};

export { api };
