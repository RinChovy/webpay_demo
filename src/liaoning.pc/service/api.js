const base = "http://192.168.5.15:8600/webpay_new/";

const api = {
  common: base + "common/", //首页接口
  getCo: base + "common/getCo", //验证码接口
  queryPayInfo: base+ "common/queryPayInfo.do", //缴款书提交接口
};

export { api };
