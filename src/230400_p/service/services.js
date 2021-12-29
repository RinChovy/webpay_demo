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
//验证码
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
//收银台接口
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