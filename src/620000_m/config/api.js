import baseapi from 'utils/baseURL';

const callback = 'https://www.gstyggzf.gov.cn/success'; //传给后台的回调地址
const region = '620000'; //区划号
const regular = /^62\d{18}$/; //非税缴款正则表达式
const regularText = '缴款码必须等于20位且62开头'; //非税缴款正则表达式提示信息

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
  queryPayInfo: `${baseapi}/620000/queryPayInfo.do`,
  // 缴费接口
  createCharge: `${baseapi}/common/createCharge`,
  //成功回调接口
  success: `${baseapi}/callback/frontnotice`,
  //获取政策查询依据接口
  searchItemInfo: `${baseapi}/620000/searchItemInfo.do`,
  //查询政策文件
  searchPolicyDocument: `${baseapi}/620000/searchPolicyDocument.do`,
  //下载政策文件
  downLoadPolicyDocument: `${baseapi}/620000/downLoadPolicyDocument.do`,
  //直接查电子票地址
  queryEinvoiceUrl: `${baseapi}/620000/queryEinvoiceUrl`,
  //公告接口
  notice: `${baseapi}/620000/getNoticeInfo`,

  /////////////////////////以下是城市服务////////////////////////
  //支付宝接口1
  getAliUserId: `${baseapi}/common/getAliUserId`,
  //支付宝接口2
  getOpenPlatformUserid: `${baseapi}/common/getOpenPlatformUserid`,
  //微信接口
  getOpenid: `${baseapi}/common/getOpenid`,
  //内部查询订单接口
  queryOrderRecord: `${baseapi}/common/queryOrderRecord`,
  //成功页回调接口_wx
  queryRealTime: `${baseapi}/common/queryRealTime.do`,
};
