import xFetch from '../../utils/xFetch';
import { stringify } from 'qs';
import Api from './api.js';

// 非税缴费提交
export async function queryPayInfo(params) {
  return xFetch(Api.queryPayInfo, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      regionCode: Api.region,
      codeUId: params.uuid,
    },
    data: stringify(params),
  });
}
// 成功回调接口
export async function success(params) {
  return xFetch(Api.success, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      regionCode: Api.region,
    },
    data: stringify(params),
  });
}
// 查询城市、小程序支付是否成功
export async function queryRealTime(params) {
  return xFetch(Api.queryRealTime, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      regionCode: Api.region,
    },
    data: stringify(params),
  });
}

// 验证码
export async function code(params) {
  return xFetch(Api.code, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      regionCode: Api.region,
    },
    data: stringify(params),
  });
}
//收银台接口
export async function createCashier(params) {
  return xFetch(Api.createCashier, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      regionCode: Api.region,
    },
    data: stringify(params),
  });
}

// 身份证订单查询
export async function queryPayInfoByIdentityCard(params) {
  return xFetch(Api.queryPayInfoByIdentityCard, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      regionCode: Api.region,
      codeUId: params.uuid,
    },
    data: stringify(params),
  });
}
// 身份证传递接口
export async function queryPayInfoNoCode(params) {
  return xFetch(Api.queryPayInfoNoCode, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      regionCode: Api.region,

    },
    data: stringify(params),
  });
}
//客服接口
export async function userIssues(params) {
  return xFetch(Api.userIssues, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      regionCode: Api.region,
    },
    data: stringify(params),
  });
}
// 内部查询接口
export async function queryOrderRecord(params) {
  return xFetch(Api.queryOrderRecord, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      regionCode: Api.region,
    },
    data: stringify(params),
  });
}
// 隐私授权接口
export async function getPrivacyAuthInfo(params) {
  return xFetch(Api.getPrivacyAuthInfo, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      regionCode: Api.region,
    },
    data: stringify(params),
  });
}

// 玉溪不动产添加电子票查询
export async function qeryBill(params) {
  return xFetch(Api.qeryBill, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      regionCode: Api.region,
    },
    params: params,
  });
}