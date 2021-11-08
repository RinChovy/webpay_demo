import base from 'utils/baseURL';
import configX from '../public/xml/config.xml';

// 创建一个新的xhr对象;
let xhr = null;
if (window.XMLHttpRequest) {
  xhr = new XMLHttpRequest();
} else {
  // IE
  xhr = new ActiveXObject('Microsoft.XMLHTTP');
}
xhr.open('GET', configX, false);
xhr.overrideMimeType('text/html;charset=utf-8');
xhr.send(null);
const jsons = JSON.parse(xhr.responseText.replace(/\s*/g, ''));
//
const baseName = jsons.baseName; //baseName

const baseURL = jsons.baseURL; //接口连接地址
// const callback = "https://120000.epayservice.cn/120000_p/index.html#/success"; //传给后台的回调地址
const callback = jsons.callback; //传给后台的回调地址

const region = jsons.region; //区划号

const regular = /^21\d{18}$/; //非税缴款正则表达式

const regularText = jsons.regularText; //非税缴款正则表达式提示信息

const api = {
  baseName: baseName, //basename
  callback: callback, //传给后台的回调地址
  region: region, //区划号
  regular: regular, //非税缴款正则表达式
  regularText: regularText, //非税缴款正则表达式提示信息
  common: baseURL + '/common/homeConfigInfo', //首页接口
  getCo: baseURL + '/common/getCoCenter', //验证码接口
  queryPayInfo: baseURL + '/common/queryPayInfo.do', //缴款书提交接口
  createCharge: baseURL + '/common/createCharge', //缴费接口
  createCashier: baseURL + '/common/createCashier', //收银台接口
  education: baseURL + '/common/getCityData', //选择地区接口
  school: baseURL + '/common/school.do', //选择学校接口
  getSchoolInfo: baseURL + '/common/getSchoolInfo', //选择学校后提交接口
  success: baseURL + '/callback/frontnotice', //成功回调接口
  getSchoolInfo: baseURL + '/210000/getSchoolInfo', //get访问接口
  nontaxPage: baseURL + '/210000/nontaxPage', //get访问接口
};

export { api };
