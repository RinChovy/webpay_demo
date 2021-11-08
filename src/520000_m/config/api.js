import baseapi from 'utils/baseURL';

const callback = "http://fsjf.czt.guizhou.gov.cn/pay/success"; //传给后台的回调地址
// const callback = "https://520000.epayservice.cn/webpay_520000/success"; //传给后台的回调地址
const region = '520000'//"520000"; //区划号
const regular = /^52\d{18}$/// /^52\d{18}$/; //非税缴款正则表达式
const regularText = "缴款码必须等于20位且52开头"; //非税缴款正则表达式提示信息

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
  // 处罚决定书编号接口
  queryPenaltyDecisionInfo: `${baseapi}/common/queryPayInfoNotVaildPayer.do`,
  // 缴费接口
  createCharge: `${baseapi}/common/createCharge`,
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
