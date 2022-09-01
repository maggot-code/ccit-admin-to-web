import request from '@/utils/request'
import define from '@/utils/define'

// 获取下载文件链接
export function getDownloadUrl(type, fileName) {
  return request({
    url: `/api/file/Download/${type}/${fileName}`,
    method: 'get'
  })
}

// 预览文件
export function preview(type, fileName) {
  getDownloadUrl(type, fileName).then(res => {
    let downloadUrl = `${define.APIURl}${res.data.url}&fullfilename=${res.data.name}`;
    let url = encodeURIComponent(require('js-base64').Base64.encode(downloadUrl));
    //window.open('http://127.0.0.1:30005/onlinePreview?url=' + url, '_blank');
    window.open(`${define.comUrl}/api/file/onlinePreview?url=${url}`, '_blank');
  })
}
