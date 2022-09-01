import request from '@/utils/request'

// 获取角色成员列表
export const getUserRelationList = (objectId, departmentId) => {
  return request({
    url: `/api/iam/Permission/UserRelation/${objectId}`,
    method: 'GET',
    data: {departmentId}
  })
}


// 添加/更新岗位或角色成员
export const createUserRelation = (data) => {
  return request({
    url: `/api/iam/Permission/UserRelation/${data.objectId}`,
    method: 'POST',
    data
  })
}

// 获取角色成员列表
export const getRoleMember = (objectId, data) => {
  return request({
    url: `/api/iam/Permission/UserRelation/${objectId}/list`,
    method: 'GET',
    data
  })
}

export const addUserRelation = (data) => {
  return request({
    url: `/api/iam/Permission/UserRelation`,
    method: 'POST',
    data
  })
}

export const delUserRelation = (id) => {
  return request({
    url: `/api/iam/Permission/UserRelation/${id}`,
    method: 'DELETE'
  })
}