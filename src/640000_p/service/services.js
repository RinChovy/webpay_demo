import xFetch from '../../utils/xFetch';
import { stringify } from 'qs';
import { api } from './api.js';

// home request
export async function queryHomelist(params) {
  return xFetch(api.common, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      regionCode: api.region,
    },
    data: stringify(params),
  });
}

// 非税缴费提交
export async function queryPayInfo(params) {
  return xFetch(api.queryPayInfo, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      regionCode: api.region,
      codeUId: params.uuid,
    },
    data: stringify(params),
  });
}

//加载成功回调接口
export async function successs(params) {
  return xFetch(api.success, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      regionCode: api.region,
    },
    data: stringify(params),
  });
}
//加载成功回调接口
export async function createCashier(params) {
  return xFetch(api.createCashier, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      regionCode: api.region,
    },
    data: stringify(params),
  });
}
//教育缴费身份证接口
export async function queryPayInfoByIdentityCard(params) {
  return xFetch(api.queryPayInfoByIdentityCard, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      regionCode: api.region,
      codeUId: params.uuid,
    },
    data: stringify(params),
  });
}
//验证码接口接口
export async function getCo(params) {
  return xFetch(api.getCo, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      regionCode: api.region,
    },
    data: stringify(params),
  });
}

//教育缴费查看详情缴款
export async function queryPayInfoNoCode(params) {
  return xFetch(api.queryPayInfoNoCode, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      regionCode: api.region,
    },
    data: stringify(params),
  });
}

//客服接口
export async function userIssues(params) {
  return xFetch(api.userIssues, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      regionCode: api.region,
    },
    data: stringify(params),
  });
}

//隐私授权接口
export async function getPrivacyAuthInfo(params) {
  return xFetch(api.getPrivacyAuthInfo, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      regionCode: api.region,
    },
    data: stringify(params),
  });
}
