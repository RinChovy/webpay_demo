import xFetch from "../../utils/xFetch";
import { stringify } from "qs";
import Api from "./api.js";

// 非税缴费提交
export async function queryPayInfo(params) {
  return xFetch(Api.queryPayInfo, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      regionCode: Api.region,
    },
    data: stringify(params),
  });
}
// 成功回调接口
export async function success(params) {
  return xFetch(Api.success, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      regionCode: Api.region,
    },
    data: stringify(params),
  });
}
// 支付宝接口1
export async function getAliUserId(params) {
  return xFetch(Api.getAliUserId, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      regionCode: Api.region,
    },
    data: stringify(params),
  });
}
// 支付宝接口2
export async function getOpenPlatformUserid(params) {
  return xFetch(Api.getOpenPlatformUserid, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      regionCode: Api.region,
    },
    data: stringify(params),
  });
}
// 微信接口
export async function getOpenid(params) {
  return xFetch(Api.getOpenid, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      regionCode: Api.region,
    },
    data: stringify(params),
  });
}
// 内部查询接口
export async function queryOrderRecord(params) {
  return xFetch(Api.queryOrderRecord, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      regionCode: Api.region,
    },
    data: stringify(params),
  });
}
