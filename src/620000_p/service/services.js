import xFetch from '../../utils/xFetch';
import request from '../../utils/requestStream';
import { encrypt } from '@ailjc/aes';
import { stringify } from 'qs';
import { api, base } from './api.js';

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
  return xFetch(base + '/620000/queryPayInfo.do', {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      regionCode: api.region,
    },
    data: stringify({ key: encrypt(JSON.stringify(params)) }),
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

//政策依据查询依据
export async function searchItemInfo(params) {
  return xFetch(api.searchItemInfo, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      regionCode: api.region,
    },
    data: stringify({ key: encrypt(JSON.stringify(params)) }),
  });
}
//查询政策文件
export async function searchPolicyDocument(params) {
  return xFetch(api.searchPolicyDocument, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      regionCode: api.region,
    },
    data: stringify({ key: encrypt(JSON.stringify(params)) }),
  });
}
//公告接口
export async function notice(params) {
  return xFetch(api.notice, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      regionCode: api.region,
    },
    data: stringify({ key: encrypt(JSON.stringify(params)) }),
  });
}
//直接查电子票地址
export async function queryEinvoiceUrl(params) {
  return xFetch(api.queryEinvoiceUrl, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      regionCode: api.region,
    },
    data: stringify({ key: encrypt(JSON.stringify(params)) }),
  });
}
//下载政策文件
export async function downLoadPolicyDocument(params) {
  return request(api.downLoadPolicyDocument, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      regionCode: api.region,
    },
    data: stringify(params),
  });
}
