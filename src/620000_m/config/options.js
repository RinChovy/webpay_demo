export function getParaString(str) {
  let string = str.split("?")[1].split("&")
  let obj = {}
  for (var i = 0; i < string.length; i++) {
    let temp = string[i].split("=")
    obj[temp[0]] = temp[1]
  }
  return obj;
}