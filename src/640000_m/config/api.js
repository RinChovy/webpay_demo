import baseapi from 'utils/baseURL';

const callback = 'https://222.75.67.163:10087/success'; //传给后台的回调地址
const region = '640000'; //区划号
const regular = /^64\d{18}$/; //非税缴款正则表达式
const regularText = '缴款码必须等于20位且64开头'; //非税缴款正则表达式提示信息

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
  code: `${baseapi}/common/getCoCenter`,
  // 提交缴款书
  queryPayInfo: `${baseapi}/common/queryPayInfo.do`,
  // 缴费接口
  createCharge: `${baseapi}/common/createCharge`,
  //身份证查询信息
  queryPayInfoByIdentityCard: `${baseapi}/common/queryPayInfoByIdentityCard.do`,
  //成功回调接口
  success: `${baseapi}/callback/frontnotice`,
  //收银台接口
  createCashier: `${baseapi}/common/createCashier`,
  //身份证验证列表
  queryPayInfoNoCode: `${baseapi}/common/queryPayInfoNoCode.do`,
  //直接进的接口
  checkBankQRCode: `${baseapi}/640000/checkBankQRCode.do`,
};
