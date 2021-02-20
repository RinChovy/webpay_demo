// 金额转换大写
const Arabia_to_Chinese = Num => {
  for (var i = Num.length - 1; i >= 0; i--) {
    Num = Num.replace(',', ''); //替换tomoney()中的“,”
    Num = Num.replace(' ', ''); //替换tomoney()中的空格
  }
  if (isNaN(Num)) {
    //验证输入的字符是否为数字
    alert('请检查小写金额是否正确');
    return;
  }
  //---字符处理完毕，开始转换，转换采用前后两部分分别转换---//
  var part = String(Num).split('.');
  var newchar = '';
  //小数点前进行转化
  for (i = part[0].length - 1; i >= 0; i--) {
    if (part[0].length > 10) {
      alert('位数过大，无法计算');
      return '';
    } //若数量超过拾亿单位，提示
    var tmpnewchar = '';
    var perchar = part[0].charAt(i);
    switch (perchar) {
      case '0':
        tmpnewchar = '零' + tmpnewchar;
        break;
      case '1':
        tmpnewchar = '壹' + tmpnewchar;
        break;
      case '2':
        tmpnewchar = '贰' + tmpnewchar;
        break;
      case '3':
        tmpnewchar = '叁' + tmpnewchar;
        break;
      case '4':
        tmpnewchar = '肆' + tmpnewchar;
        break;
      case '5':
        tmpnewchar = '伍' + tmpnewchar;
        break;
      case '6':
        tmpnewchar = '陆' + tmpnewchar;
        break;
      case '7':
        tmpnewchar = '柒' + tmpnewchar;
        break;
      case '8':
        tmpnewchar = '捌' + tmpnewchar;
        break;
      case '9':
        tmpnewchar = '玖' + tmpnewchar;
        break;
    }
    switch (part[0].length - i - 1) {
      case 0:
        tmpnewchar = tmpnewchar + '元';
        break;
      case 1:
        if (perchar != 0) tmpnewchar = tmpnewchar + '拾';
        break;
      case 2:
        if (perchar != 0) tmpnewchar = tmpnewchar + '佰';
        break;
      case 3:
        if (perchar != 0) tmpnewchar = tmpnewchar + '仟';
        break;
      case 4:
        tmpnewchar = tmpnewchar + '万';
        break;
      case 5:
        if (perchar != 0) tmpnewchar = tmpnewchar + '拾';
        break;
      case 6:
        if (perchar != 0) tmpnewchar = tmpnewchar + '佰';
        break;
      case 7:
        if (perchar != 0) tmpnewchar = tmpnewchar + '仟';
        break;
      case 8:
        tmpnewchar = tmpnewchar + '亿';
        break;
      case 9:
        tmpnewchar = tmpnewchar + '拾';
        break;
    }
    newchar = tmpnewchar + newchar;
  }
  //小数点之后进行转化
  if (String(Num).indexOf('.') != -1) {
    if (part[1].length > 2) {
      alert('小数点之后只能保留两位,系统将自动截段');
      part[1] = part[1].substr(0, 2);
    }
    for (i = 0; i < part[1].length; i++) {
      tmpnewchar = '';
      perchar = part[1].charAt(i);
      switch (perchar) {
        case '0':
          tmpnewchar = '零' + tmpnewchar;
          break;
        case '1':
          tmpnewchar = '壹' + tmpnewchar;
          break;
        case '2':
          tmpnewchar = '贰' + tmpnewchar;
          break;
        case '3':
          tmpnewchar = '叁' + tmpnewchar;
          break;
        case '4':
          tmpnewchar = '肆' + tmpnewchar;
          break;
        case '5':
          tmpnewchar = '伍' + tmpnewchar;
          break;
        case '6':
          tmpnewchar = '陆' + tmpnewchar;
          break;
        case '7':
          tmpnewchar = '柒' + tmpnewchar;
          break;
        case '8':
          tmpnewchar = '捌' + tmpnewchar;
          break;
        case '9':
          tmpnewchar = '玖' + tmpnewchar;
          break;
      }
      if (i == 0) tmpnewchar = tmpnewchar + '角';
      if (i == 1) tmpnewchar = tmpnewchar + '分';
      newchar = newchar + tmpnewchar;
    }
  }
  //替换所有无用汉字
  while (newchar.search('零零') != -1) newchar = newchar.replace('零零', '零');
  newchar = newchar.replace('零亿', '亿');
  newchar = newchar.replace('亿万', '亿');
  newchar = newchar.replace('零万', '万');
  newchar = newchar.replace('零元', '元');
  newchar = newchar.replace('零角', '');
  newchar = newchar.replace('零分', '');

  if (newchar.charAt(newchar.length - 1) == '元' || newchar.charAt(newchar.length - 1) == '角')
    newchar = newchar + '整';
  return newchar;
};

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
  if (ua.match(/(ipod|iphone os|midp|ucweb|android|windows ce|windows mobile)/i)) {
    window.location.href = thisUrl.replace('_p', '_m');
  }
  window.location.href = thisUrl.replace('_m', '_p');
};

export { Arabia_to_Chinese, guid, urlredirect };
