import { fetch } from 'whatwg-fetch';
import { notification } from 'antd';
import iconv from 'iconv-lite';

export default async function requestStream(url, options) {
  const defaultOptions = {
    credentials: 'include',
  };
  const newOptions = { ...defaultOptions, ...options };
  if (newOptions.method === 'POST' || newOptions.method === 'PUT') {
    newOptions.headers = {
      ...newOptions.headers,
    };
    newOptions.body = newOptions.data;
  }
  let fileName = '';
  try {
    const response = await fetch(url, newOptions);

    const contentDisposition = response.headers.get('content-disposition');

    if (contentDisposition) {
      fileName = contentDisposition
        .match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/)[1]
        .replace(/"/g, '');
    }

    iconv.skipDecodeWarning = true;
    fileName = iconv.decode(fileName, newOptions.decode || 'utf-8');
    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = `${fileName}`;
    a.click();
    window.URL.revokeObjectURL(blobUrl);
  } catch (error) {
    if (error.code) {
      notification.error({
        message: error.name,
        description: error.message,
      });
    }
    if ('stack' in error && 'message' in error) {
      notification.error({
        message: `请求错误: ${url}`,
        description: error.message,
      });
    }
    return error;
  }
}
