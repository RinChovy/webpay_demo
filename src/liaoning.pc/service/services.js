import xFetch from '../../utils/xFetch';
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
