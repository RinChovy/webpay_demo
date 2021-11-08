var guid = () => {
  var chars = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  var res = "";
  for (var i = 0; i < 3; i++) {
    var id = Math.ceil(Math.random() * 9);
    res += chars[id];
  }
  var now = new Date();
  var year = now.getFullYear().toString().substring(2, 4);
  var month = now.getMonth() + 1; //月
  var day = now.getDate(); //日
  var hh = now.getHours(); //时
  var mm = now.getMinutes(); //分
  var ss = now.getSeconds(); //秒
  var hm = now.getMilliseconds(); //毫秒
  var clock = year + "";
  if (month < 10) clock += "0";
  clock += month + "";
  if (day < 10) clock += "0";
  clock += day + "";
  if (hh < 10) clock += "0";
  clock += hh + "";
  if (mm < 10) clock += "0";
  clock += mm + "";
  if (ss < 10) clock += "0";
  clock += ss + "";

  if (hm < 10) {
    clock += "00";
  } else if (hm < 100) {
    clock += "0";
  }
  clock += hm + "";
  return clock + res;
};
export { //很关键
  guid
 };
