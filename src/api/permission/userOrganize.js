import request from '@/utils/request'

// 获取用户组织数据
export const getUserOrganize = (data) => {
  return request({
    url: '/api/iam/Permission/UserOrganize',
    method: 'GET',
    data
  })
}


// 添加/更新 用户组织关系
export const createUserOrganize = (data) => {
  return request({
    url: `/api/iam/Permission/UserOrganize`,
    method: 'POST',
    data
  })
}


export const getDepartmentMember = (objectId, data) => {
  return request({
    url: `/api/iam/Permission/UserOrganize/${objectId}/list`,
    method: 'GET',
    data
  })
}

// 获取岗位成员列表
export const getDepartmentUserIds = (objectId) => {
  return request({
    url: `/api/iam/Permission/UserOrganize/${objectId}`,
    method: 'GET'
  })
}

export const addMember = (data) => {
  return request({
    url: '/api/iam/Permission/UserOrganize/save',
    method: 'POST',
    data
  })
}

export const delMember = (id) => {
  return request({
    url: `/api/iam/Permission/UserOrganize/${id}`,
    method: 'DELETE'
  })
}