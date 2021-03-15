import base from "utils/baseURL";

const callback = "https://120000.epayservice.cn/120000_p/index.html#/success"; //传给后台的回调地址

const region = "120000"; //区划号

const regular = /^12\d{18}$/; //非税缴款正则表达式

const regularText = "缴款码必须等于20位且37开头"; //非税缴款正则表达式提示信息

const api = {
  callback: callback, //传给后台的回调地址
  region: region, //区划号
  regular: regular, //非税缴款正则表达式
  regularText: regularText, //非税缴款正则表达式提示信息
  common: base + "/common/", //首页接口
  getCo: base + "/common/getCo", //验证码接口
  queryPayInfo: base + "/common/queryPayInfo.do", //缴款书提交接口
  createCharge: base + "/common/createCharge", //缴费接口
  success: base + "/callback/frontnotice", //成功回调接口
};

export { api };
