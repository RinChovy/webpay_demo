import baseapi from 'utils/baseURL';

const callback = 'http://192.168.0.120:8090/success'; //传给后台的回调地址
const region = '220000'; //区划号
const regular = /^22\d{18}$/; //非税缴款正则表达式
const regularText = '缴款码必须等于20位且22开头'; //非税缴款正则表达式提示信息

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
  createCharge: `${baseapi}/370200/createChargePhone`,
  //成功回调接口
  success: `${baseapi}/callback/frontnotice`,
  //支付宝接口1
  getAliUserId: `${baseapi}/common/getAliUserId`,
  //支付宝接口2
  getOpenPlatformUserid: `${baseapi}/common/getOpenPlatformUserid`,
  //微信接口
  getOpenid: `${baseapi}/common/getOpenid`,
  //内部查询订单接口
  queryOrderRecord: `${baseapi}/common/queryOrderRecord`,
  //收银台接口
  createCashier: `${baseapi}/common/createCashier`,
};
