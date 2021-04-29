import baseapi from 'utils/baseURL';

const callback = 'https://630100.epayservice.cn/success'; //传给后台的回调地址
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
  queryPayInfo: `${baseapi}/common/queryPayInfo.do`,
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
};
