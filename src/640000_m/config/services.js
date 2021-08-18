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
// 收银台接口
export async function createCashier(params) {
  return xFetch(Api.createCashier, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      regionCode: Api.region,
    },
    data: stringify(params),
  });
}
// 收银台接口
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
// out接口
export async function checkBankQRCode(params) {
  return xFetch(Api.checkBankQRCode, {
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
