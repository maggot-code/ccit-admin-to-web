import request from '@/utils/request'

// 获取组织/公司列表
export const getOrganizeList = (data) => {
  return request({
    url: '/api/iam/Permission/Organize',
    method: 'GET',
    data
  })
}

// 获取组织/公司下拉框列表
export const getOrganizeSelector = (data) => {
  return request({
    url: '/api/iam/Permission/Organize/Selector',
    method: 'GET',
    data
  })
}

// 获取组织/公司树形
export const getOrganizeTree = (dimensionCode) => {
  return request({
    url: `/api/iam/Permission/Organize/Tree/${dimensionCode}`,
    method: 'GET'
  })
}

// 新建组织/公司
export const createOrganize = (data) => {
  return request({
    url: '/api/iam/Permission/Organize',
    method: 'POST',
    data
  })
}

// 修改组织/公司
export const updateOrganize = (data) =>{
  return request({
    url: `/api/iam/Permission/Organize/${data.id}`,
    method: 'PUT',
    data
  })
}

// 获取组织/公司信息
export const getOrganizeInfo = (id) => {
  return request({
    url: `/api/iam/Permission/Organize/${id}`,
    method: 'GET'
  })
}

// 删除组织/公司
export const delOrganize = (id) => {
  return request({
    url: `/api/iam/Permission/Organize/${id}`,
    method: 'DELETE'
  })
}

// 更新组织/公司状态
export const updateOrganizeState = (id) => {
  return request({
    url: `/api/iam/Permission/Organize/${id}/Actions/State`,
    method: 'PUT'
  })
}
