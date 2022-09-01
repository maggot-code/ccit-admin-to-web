import request from '@/utils/request'


// 上传人脸图像
export function faceAdd(data, userId) {
  return request({
    url: `/api/system/Base/Face/${userId}`,
    method: 'POST',
    data
  })
}

// 查找人脸图像
export function faceSearch(data) {
  return request({
    url: `/api/system/Base/Face/faceSearch`,
    method: 'POST',
    data
  })
}

//人脸登录
export function faceLogin(data) {
  return request({
    url: `/api/system/Base/Face/faceLogin`,
    method: 'POST',
    data
  })
}
//获取录入的人脸
export function listFaces(userId) {
  return request({
    url: `/api/system/Base/Face/${userId}`,
    method: 'GET'
  })
}

//检测人脸
export function faceScan(data) {
  return request({
    url: `/api/system/Base/Face/faceScan`,
    method: 'POST',
    data
  })
}
