import request from '@/utils/request'

// 获取系统主题列表
export function getSystemTheme() {
  return request({
    url: '/api/visualdev/Theme',
    method: 'GET'
  })
}

// 添加系统主题
export function addSystemTheme(data) {
  return request({
    url: '/api/visualdev/Theme',
    method: 'POST',
    data
  })
}

// 更新系统主题
export function updateSystemTheme(data) {
  return request({
    url: `/api/visualdev/Theme/${data.id}`,
    method: 'PUT',
    data
  })
}

// 删除系统主题
export function delSystemTheme(id) {
  return request({
    url: `/api/visualdev/Theme/${id}`,
    method: 'DELETE'
  })
}

// 查询当前系统主题
export function getCurTheme() {
  return request({
    url: `/api/visualdev/Theme/nowTheme`,
    method: 'GET'
  })
}