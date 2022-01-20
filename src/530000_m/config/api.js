import baseapi from 'utils/baseURL';

// const callback = 'http://222.172.224.34:18008/success'; //传给后台的回调地址
const callback = 'https://demo.epayservice.cn/530000_m/success'; //传给后台的回调地址
const region = '530000'; //区划号
const regular = /^53\d{18}$/; //非税缴款正则表达式
const regularText = '缴款码必须等于20位且53开头'; //非税缴款正则表达式提示信息

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
  //收银台接口
  createCashier: `${baseapi}/common/createCashier`,
  //客服接口
  userIssues: `${baseapi}/common/userIssues.do`,
  //身份证查询信息(列表)
  queryPayInfoByIdentityCard: `${baseapi}/common/queryPayInfoByIdentityCard.do`,
  //身份证验证(详情)
  queryPayInfoNoCode: `${baseapi}/common/queryPayInfoNoCode.do`,
  //内部查询订单接口
  queryOrderRecord: `${baseapi}/common/queryOrderRecord`,
  //成功页回调接口_wx
  queryRealTime: `${baseapi}/common/queryRealTime.do`,
  // 玉溪不动产添加电子票查询
  qeryBill: `https://ipp.epayservice.cn/api/v1/bill/qeryBill`,
};
