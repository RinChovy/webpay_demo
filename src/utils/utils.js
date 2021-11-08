import CryptoJS from 'crypto-js';

const guid = () => {
  let chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  let res = '';
  for (var i = 0; i < 3; i++) {
    let id = Math.ceil(Math.random() * 9);
    res += chars[id];
  }
  let now = new Date();
  let year = now.getFullYear().toString().substring(2, 4);
  let month = now.getMonth() + 1; //月
  let day = now.getDate(); //日
  let hh = now.getHours(); //时
  let mm = now.getMinutes(); //分
  let ss = now.getSeconds(); //秒
  let hm = now.getMilliseconds(); //毫秒
  let clock = year + '';
  if (month < 10) clock += '0';
  clock += month + '';
  if (day < 10) clock += '0';
  clock += day + '';
  if (hh < 10) clock += '0';
  clock += hh + '';
  if (mm < 10) clock += '0';
  clock += mm + '';
  if (ss < 10) clock += '0';
  clock += ss + '';

  if (hm < 10) {
    clock += '00';
  } else if (hm < 100) {
    clock += '0';
  }
  clock += hm + '';
  return clock + res;
};

const urlredirect = () => {
  const ua = navigator.userAgent.toLowerCase();
  let thisUrl = window.location.href;
  if (
    ua.match(/(ipod|iphone os|midp|ucweb|android|windows ce|windows mobile)/i)
  ) {
    window.location.href = thisUrl.replace('_p', '_m');
  }
  window.location.href = thisUrl.replace('_m', '_p');
};

const Arabia_to_Chinese = money => {
  //汉字的数字
  var cnNums = new Array(
    '零',
    '壹',
    '贰',
    '叁',
    '肆',
    '伍',
    '陆',
    '柒',
    '捌',
    '玖'
  );
  //基本单位
  var cnIntRadice = new Array('', '拾', '佰', '仟');
  //对应整数部分扩展单位
  var cnIntUnits = new Array('', '万', '亿', '兆');
  //对应小数部分单位
  var cnDecUnits = new Array('角', '分', '毫', '厘');
  //整数金额时后面跟的字符
  var cnInteger = '整';
  //整型完以后的单位
  var cnIntLast = '元';
  //最大处理的数字
  var maxNum = 999999999999999.9999;
  //金额整数部分
  var integerNum;
  //金额小数部分
  var decimalNum;
  //输出的中文金额字符串
  var chineseStr = '';
  //分离金额后用的数组，预定义
  var parts;
  if (money == '') {
    return '';
  }
  money = parseFloat(money);
  if (money >= maxNum) {
    //超出最大处理数字
    return '';
  }
  if (money == 0) {
    chineseStr = cnNums[0] + cnIntLast + cnInteger;
    return chineseStr;
  }
  //转换为字符串
  money = money.toString();
  if (money.indexOf('.') == -1) {
    integerNum = money;
    decimalNum = '';
  } else {
    parts = money.split('.');
    integerNum = parts[0];
    decimalNum = parts[1].substr(0, 4);
  }
  //获取整型部分转换
  if (parseInt(integerNum, 10) > 0) {
    var zeroCount = 0;
    var IntLen = integerNum.length;
    for (var i = 0; i < IntLen; i++) {
      var n = integerNum.substr(i, 1);
      var p = IntLen - i - 1;
      var q = p / 4;
      var m = p % 4;
      if (n == '0') {
        zeroCount++;
      } else {
        if (zeroCount > 0) {
          chineseStr += cnNums[0];
        }
        //归零
        zeroCount = 0;
        chineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
      }
      if (m == 0 && zeroCount < 4) {
        chineseStr += cnIntUnits[q];
      }
    }
    chineseStr += cnIntLast;
  }
  //小数部分
  if (decimalNum != '') {
    var decLen = decimalNum.length;
    for (var i = 0; i < decLen; i++) {
      var n = decimalNum.substr(i, 1);
      if (n != '0') {
        chineseStr += cnNums[Number(n)] + cnDecUnits[i];
      }
    }
  }
  if (chineseStr == '') {
    chineseStr += cnNums[0] + cnIntLast + cnInteger;
  } else if (decimalNum == '') {
    chineseStr += cnInteger;
  }
  return chineseStr;
};

/**
 * 前后端加密
 * 秘钥 key, iv 16位需保持一致
 */

const key = CryptoJS.enc.Utf8.parse('Itsniceofyou_Key');
const iv = CryptoJS.enc.Utf8.parse('Itsniceofyou_KTV');
// 加密
const encrypt = pass => {
  const password = CryptoJS.enc.Utf8.parse(pass);
  return CryptoJS.AES.encrypt(password, key, {
    mode: CryptoJS.mode.CBC,
    iv: iv,
    padding: CryptoJS.pad.Pkcs7,
  }).toString();
};
// 解密
const decrypt = pass => {
  return CryptoJS.AES.decrypt(pass, key, {
    mode: CryptoJS.mode.CBC,
    iv: iv,
    padding: CryptoJS.pad.Pkcs7,
  }).toString(CryptoJS.enc.Utf8);
};

export { Arabia_to_Chinese, guid, urlredirect, encrypt, decrypt };
