import base from 'utils/baseURL';

const callback = 'http:/222.172.224.34:18008/success'; //传给后台的回调地址

const region = '640000'; //区划号

const regular = /^53\d{18}$/; //非税缴款正则表达式

const regularText = '缴款码必须等于20位且53开头'; //非税缴款正则表达式提示信息

const api = {
  callback: callback, //传给后台的回调地址
  region: region, //区划号
  regular: regular, //非税缴款正则表达式
  regularText: regularText, //非税缴款正则表达式提示信息
  common: base + '/common/', //首页接口
  getCo: base + '/common/getCoCenter', //验证码接口
  queryPayInfo: base + '/common/queryPayInfo.do', //缴款书提交接口
  createCharge: base + '/common/createCharge', //缴费接口
  success: base + '/callback/frontnotice', //成功回调接口
  createCashier: base + '/common/createCashier', //收银台接口
  userIssues: base + '/common/userIssues.do', // 客服接口
  queryPayInfoByIdentityCard: base + '/common/queryPayInfoByIdentityCard.do', //身份证接口
  queryPayInfoNoCode: base + '/common/queryPayInfoNoCode.do', //身份证验证列表
};

export { api };
