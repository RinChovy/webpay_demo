// const baseapi = 'http://192.168.5.15:8701/webpay_new'; //
const baseapi = "https://debug.epayservice.cn/webpay_new"; //后台项目地址

const callback =
  "https://debug.epayservice.cn/webpay_new/hegang230400_m/index.html#/success"; //传给后台的回调地址

const region = 230400; //区划号

const regular = /^23\d{18}$/; //非税缴款正则表达式

const regularText = "缴款码必须等于20位且23开头"; //非税缴款正则表达式提示信息

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
  queryPayInfo: `${baseapi}/common/queryPayInfo.do`,
  // 缴费接口
  createCharge: `${baseapi}/common/createCharge`,
  //成功回调接口
  success: `${baseapi}/callback/frontnotice`,
};
