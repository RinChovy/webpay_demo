import base from 'utils/baseURL';

const callback = 'https://www.gstyggzf.gov.cn/620000/success'; //传给后台的回调地址

const region = '620000'; //区划号

const regular = /^62\d{18}$/; //非税缴款正则表达式

const regularText = '缴款码必须等于20位且62开头'; //非税缴款正则表达式提示信息

const api = {
  callback: callback, //传给后台的回调地址
  region: region, //区划号
  regular: regular, //非税缴款正则表达式
  regularText: regularText, //非税缴款正则表达式提示信息
  common: base + '/common/', //首页接口
  getCo: base + '/common/getCo', //验证码接口
  queryPayInfo: base + '/common/queryPayInfo.do', //缴款书提交接口
  createCharge: base + '/common/createCharge', //缴费接口
  success: base + '/callback/frontnotice', //成功回调接口
  searchItemInfo: base + '/620000/searchItemInfo.do', //获取政策查询依据接口
  searchPolicyDocument: base + '/620000/searchPolicyDocument.do', //查询政策文件
  downLoadPolicyDocument: base + '/620000/downLoadPolicyDocument.do', //下载政策文件
  queryEinvoiceUrl: base + '/common/queryEinvoiceUrl', //直接查电子票地址
};

export { api };
