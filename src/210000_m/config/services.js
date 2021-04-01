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

// 查询城市借口手机端
export async function getCityData(params) {
  return xFetch(Api.getCityData, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      regionCode: Api.region,
    },
    data: stringify(params),
  });
}
// 查询城市菜单接口
export async function homeConfigInfo(params) {
  return xFetch(Api.homeConfigInfo, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      regionCode: Api.region,
    },
    data: stringify(params),
  });
}

// 查询城市菜单接口
export async function queryRealTime(params) {
  return xFetch(Api.queryRealTime, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      regionCode: Api.region,
    },
    data: stringify(params),
  });
}

// 学校接口
export async function school(params) {
  return xFetch(Api.school, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      regionCode: Api.region,
    },
    data: stringify(params),
  });
}
