import baseapi from 'utils/baseURL';

const callback = 'https://demo.epayservice.cn/500000/success'; //传给后台的回调地址
const region = '500000'; //区划号
const regular = /^50\d{18}$/; //非税缴款正则表达式
const regularText = '缴款码必须等于20位且50开头'; //非税缴款正则表达式提示信息

export default {
  //非税缴款正则表达式
  regular: `${regular}`,
  //非税缴款正则表达式提示信息
  regularText: `${regularText}`,
  //区划号
  region: `${region}`,
  //传给后台的回调地址
  callback: `${callback}`,
  // 导出
  exportInfo: `${baseapi}/record/exportInfo`,
  // 验证码
  code: `${baseapi}/common/getCo`,
  // 提交缴款书
  queryPayInfo: `${baseapi}/common/queryNontaxPortal`,
  // 缴费接口
  createCharge: `${baseapi}/common/createCharge`,
  //成功回调接口
  success: `${baseapi}/callback/frontnotice`,
  //收银台接口
  createCashier: `${baseapi}/common/createCashier`,
};
