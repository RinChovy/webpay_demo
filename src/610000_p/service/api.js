import base from 'utils/baseURL';

// const callback = "https://660000.epayservice.cn/success"; //传给后台的回调地址
const callback = 'https://demo.epayservice.cn/610000/success'; //传给后台的回调地址

const region = '610000'; //区划号

const regular = /^61\d{18}$/; //非税缴款正则表达式

const regularText = '缴款码必须等于20位且61开头'; //非税缴款正则表达式提示信息

const api = {
  callback: callback, //传给后台的回调地址s
  region: region, //区划号
  regular: regular, //非税缴款正则表达式
  regularText: regularText, //非税缴款正则表达式提示信息
  common: base + '/common/', //首页接口
  getCo: base + '/common/getCoCenter', //验证码接口
  queryPayInfo: base + '/common/queryPayInfo.do', //缴款书提交接口
  createCharge: base + '/common/createCharge', //缴费接口
  success: base + '/callback/frontnotice', //成功回调接口
  queryEinvoiceUrl: base + '/610000/queryEinvoiceUrl', //直接查电子票地址
  createCashier: base + '/common/createCashier', //收银台接口
  userIssues: base + '/common/userIssues.do', // 客服接口
};

export { api };
