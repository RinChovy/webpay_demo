import xFetch from 'utils/xFetch';
import { stringify } from 'qs';
import { api } from './api.js';

// home request
export async function queryHomelist(params) {
  return xFetch(api.common, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      regionCode: 210000,
    },
    data: stringify(params),
  });
}

// 非税缴费提交
export async function queryPayInfo(params) {
  return xFetch(api.queryPayInfo, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      regionCode: 210000,
    },
    data: stringify(params),
  });
}

// 教育缴费加载地区
export async function education(params) {
  return xFetch(api.education, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      regionCode: 210000,
    },
    data: stringify(params),
  });
}

// 教育缴费加载学校
export async function schools(params) {
  return xFetch(api.school, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      regionCode: 210000,
    },
    data: stringify(params),
  });
}

//加载成功回调接口
export async function successs(params) {
  return xFetch(api.success, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      regionCode: 210000,
    },
    data: stringify(params),
  });
}
