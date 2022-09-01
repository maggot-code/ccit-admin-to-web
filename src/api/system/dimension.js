import request from '@/utils/request'


// 查询维度列表
export function getDimension(data) {
  return request({
    url: '/api/iam/Permission/Dimension',
    method: 'GET',
    data
  })
}

// 查询维度列表
export function getDimensionInfo(id) {
  return request({
    url: `/api/iam/Permission/Dimension/${id}`,
    method: 'GET'
  })
}


// 新建维度
export const createDimension = (data) => {
  return request({
    url: '/api/iam/Permission/Dimension',
    method: 'POST',
    data
  })
}

// 更新维度
export const updateDimension = (data) => {
  return request({
    url: `/api/iam/Permission/Dimension/${data.id}`,
    method: 'PUT',
    data
  })
}

// 删除维度
export const delDimension = (id) => {
  return request({
    url: `/api/iam/Permission/Dimension/${id}`,
    method: 'DELETE'
  })
}