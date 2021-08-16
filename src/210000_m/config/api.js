import baseapi from 'utils/baseURL';

const callback = 'https://210000.epayservice.cn/success'; //传给后台的回调地址
// const callback = 'https://demo.epayservice.cn/210000_m/success'; //传给后台的回调地址
const region = '210000'; //区划号
const regular = /^21\d{18}$/; //非税缴款正则表达式
const regularText = '缴款码必须等于20位且21开头'; //非税缴款正则表达式提示信息

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
  //收银台接口
  createCashier: `${baseapi}/common/createCashier`,
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

  /////////////////////////////////////
  //查询城市借口
  getCityData: `${baseapi}/common/getCityData`,
  //城市查询菜单接口
  homeConfigInfo: `${baseapi}/common/homeConfigInfo`,
  //成功页回调接口_wx
  queryRealTime: `${baseapi}/common/queryRealTime.do`,
  //学校列表接口
  school: `${baseapi}//common/school.do`,
  //get获取学校信息
  getSchoolInfo: `${baseapi}/210000/getSchoolInfo`,
  //get获取非税信息
  nontaxPage: `${baseapi}/210000/nontaxPage`,
};
