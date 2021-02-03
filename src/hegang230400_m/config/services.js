import xFetch from "../../utils/xFetch";
import { stringify } from "qs";
import Api from "./api.js";

// 非税缴费提交
export async function queryPayInfo(params) {
  return xFetch(Api.queryPayInfo, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      regionCode: 210000,
    },
    data: stringify(params),
  });
}
// 成功回调接口
export async function success(params) {
  return xFetch(Api.success, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      regionCode: 210000,
    },
    data: stringify(params),
  });
}
