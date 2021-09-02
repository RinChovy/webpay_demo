import baseapi from 'utils/baseURL';

const callback = "https://demo.epayservice.cn/420000_m/success"; //传给后台的回调地址
// const callback = 'https://120000.epayservice.cn/success'; //传给后台的回调地址
const region = '420000'; //区划号
const regular = /^42\d{18}$/; //非税缴款正则表达式
const regularText = '缴款码必须等于20位且42开头'; //非税缴款正则表达式提示信息

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
  //成功回调接口
  success: `${baseapi}/callback/frontnotice`,
  //直接访问电子票接口
  queryEinvoiceUrl: `${baseapi}/420000/queryEinvoiceUrl`,
  //收银台接口
  createCashier: `${baseapi}/common/createCashier`,
};
