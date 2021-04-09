import base from 'utils/baseURL';

// const callback = "https://120000.epayservice.cn/120000_p/index.html#/success"; //传给后台的回调地址
const callback = 'https://210000.epayservice.cn/#/success'; //传给后台的回调地址

const region = '210000'; //区划号

const regular = /^21\d{18}$/; //非税缴款正则表达式

const regularText = '缴款码必须等于20位且21开头'; //非税缴款正则表达式提示信息

const api = {
  callback: callback, //传给后台的回调地址
  region: region, //区划号
  regular: regular, //非税缴款正则表达式
  regularText: regularText, //非税缴款正则表达式提示信息
  common: base + '/common/homeConfigInfo', //首页接口
  getCo: base + '/common/getCo', //验证码接口
  queryPayInfo: base + '/common/queryPayInfo.do', //缴款书提交接口
  createCharge: base + '/common/createCharge', //缴费接口
  education: base + '/common/getCityData', //选择地区接口
  school: base + '/common/school.do', //选择学校接口
  getSchoolInfo: base + '/common/getSchoolInfo', //选择学校后提交接口
  success: base + '/callback/frontnotice', //成功回调接口
  getSchoolInfo: base + '/210000/getSchoolInfo', //get访问接口
  nontaxPage: base + '/210000/nontaxPage', //get访问接口
};

export { api };
