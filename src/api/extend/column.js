import request from '@/utils/request'

// 获取栏目TREE列表带分页
export function listTree(data) {
  return request({
    url: '/api/visualdev/category/listTree',
    method: 'get',
    data
  })
}

// 添加栏目
export function createColumn(data) {
  return request({
    url: '/api/visualdev/category',
    method: 'POST',
    data
  })
}

// 编辑栏目
export function updateColumn(data) {
  return request({
    url: `/api/visualdev/category/${data.id}`,
    method: 'PUT',
    data
  })
}
// 删除栏目
export function delColumn(id) {
  return request({
    url: `/api/visualdev/category/${id}`,
    method: 'DELETE',
  })
}
// 获取栏目信息
export function getColumnInfo(id) {
  return request({
    url: `/api/visualdev/category/${id}`,
    method: 'GET'
  })
}

// 启用栏目
export function enableColumn(id) {
  return request({
    url: `/api/visualdev/category/enable/${id}`,
    method: 'PUT'
  })
}

// 停用栏目
export function disableColumn(id) {
  return request({
    url: `/api/visualdev/category/disable/${id}`,
    method: 'PUT'
  })
}

// 获取el样式栏目树
export function getElTree() {
  return request({
    url: '/api/visualdev/category/getTree',
    method: 'GET'
  })
}