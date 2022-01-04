import xFetch from '../../utils/xFetch';
import request from '../../utils/requestStream';
import { encrypt } from 'utils/utils';
import { stringify } from 'qs';
import Api from './api.js';

// 非税缴费提交
export async function queryPayInfo(params) {
  return xFetch(Api.queryPayInfo, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      regionCode: Api.region,
    },
    data: stringify({ key: encrypt(JSON.stringify(params)) }),
  });
}
// 直接查电子票
export async function queryEinvoiceUrl(params) {
  return xFetch(Api.queryEinvoiceUrl, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      regionCode: Api.region,
    },
    data: stringify({ key: encrypt(JSON.stringify(params)) }),
  });
}
// 公告接口
export async function notice(params) {
  return xFetch(Api.notice, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      regionCode: Api.region,
    },
    data: stringify({ key: encrypt(JSON.stringify(params)) }),
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
// 获取政策查询依据接口
export async function searchItemInfo(params) {
  return xFetch(Api.searchItemInfo, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      regionCode: Api.region,
    },
    data: stringify({ key: encrypt(JSON.stringify(params)) }),
  });
}
// 查询政策文件
export async function searchPolicyDocument(params) {
  return xFetch(Api.searchPolicyDocument, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      regionCode: Api.region,
    },
    data: stringify({ key: encrypt(JSON.stringify(params)) }),
  });
}
// 下载政策文件
export async function downLoadPolicyDocument(params) {
  return request(Api.downLoadPolicyDocument, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      regionCode: Api.region,
    },
    data: stringify(params),
  });
}

////////////////////////////////////以下是城市服
// 支付宝接口1
export async function getAliUserId(params) {
  return xFetch(Api.getAliUserId, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      regionCode: Api.region,
    },
    data: stringify(params),
  });
}
// 支付宝接口2
export async function getOpenPlatformUserid(params) {
  return xFetch(Api.getOpenPlatformUserid, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      regionCode: Api.region,
    },
    data: stringify(params),
  });
}
// 微信接口
export async function getOpenid(params) {
  return xFetch(Api.getOpenid, {
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
// success_wx直接访问接口
export async function queryRealTime(params) {
  return xFetch(Api.queryRealTime, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      regionCode: Api.region,
    },
    data: stringify(params),
  });
}
