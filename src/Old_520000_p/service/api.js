import base from 'utils/baseURL';

const callback = 'http://fsjf.czt.guizhou.gov.cn/pay/success'; //传给后台的回调地址
// const callback = 'https://520000.epayservice.cn/webpay_520000/success'; //传给后台的回调地址

const region = '520000'; //区划号

const regular = /^52\d{18}$/; //非税缴款正则表达式

const regularText = '缴款码必须等于20位且52开头'; //非税缴款正则表达式提示信息

const api = {
  callback: callback, //传给后台的回调地址
  region: region, //区划号
  regular: regular, //非税缴款正则表达式
  regularText: regularText, //非税缴款正则表达式提示信息
  common: base + '/common/', //首页接口
  getCo: base + '/common/getCo', //验证码接口
  queryPayInfo: base + '/common/queryPayInfo.do', //缴款书提交接口
  queryPenaltyDecisionInfo: base + '/common/queryPayInfoNotVaildPayer.do', //交罚缴款提交接口
  createCharge: base + '/common/createCharge', //缴费接口
  success: base + '/callback/frontnotice', //成功回调接口
};

export { api };
