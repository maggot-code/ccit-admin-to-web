import request from '@/utils/request'

// 获取角色树形数据
export const getRoleTree = (dimensionCode) => {
  return request({
    url: `/api/iam/Permission/Role/tree/${dimensionCode}`,
    method: 'GET'
  })
}

// 获取角色列表
export const getRoleList = (data) => {
  return request({
    url: `/api/iam/Permission/Role`,
    method: 'GET',
    data
  })
}

// 获取角色下拉框列表
export const getRoleSelector = (hasSelf) => {
  return request({
    url: `/api/iam/Permission/Role/Selector?hasSelf=${hasSelf}`,
    method: 'GET'
  })
}

// 新建角色
export const createRole = (data) => {
  return request({
    url: '/api/iam/Permission/Role',
    method: 'POST',
    data
  })
}

// 修改角色
export const updateRole = (data) => {
  return request({
    url: `/api/iam/Permission/Role/${data.id}`,
    method: 'PUT',
    data
  })
}

// 获取角色信息
export const getRoleInfo = (id) => {
  return request({
    url: `/api/iam/Permission/Role/${id}`,
    method: 'GET'
  })
}

// 删除角色
export const delRole = (id) => {
  return request({
    url: `/api/iam/Permission/Role/${id}`,
    method: 'DELETE'
  })
}

// 更新角色状态
export const updateRoleState = (id) => {
  return request({
    url: `/api/iam/Permission/Role/${id}/Actions/State`,
    method: 'PUT'
  })
}

// 获取角色类型
export const getRoleTypeSelector = () => {
  return request({
    url: '/api/iam/Base/DictionaryData/4501f6f26a384757bce12d4c4b03342c/Data/Selector',
    method: 'GET'
  })
}

//获取用户角色
export const getUserRoleList = (id) => {
  return request({
    url: `/api/iam/Permission/Role/role/${id}`,
    method: 'GET'
  })
}

// 获取角色组
export const getRoleGroup = (dimensionCode) => {
  return request({
    url: `/api/iam/Permission/RoleGroup/Tree/${dimensionCode}`,
    method: 'GET'
  })
}

// 获取角色组信息
export const getGroupInfo = (id) => {
  return request({
    url: `/api/iam/Permission/RoleGroup/${id}`,
    method: 'GET'
  })
}

// 新建角色组
export const createRoleGroup = (data) => {
  return request({
    url: '/api/iam/Permission/RoleGroup',
    method: 'POST',
    data
  })
}

// 修改角色组
export const updateRoleGroup = (data) => {
  return request({
    url: `/api/iam/Permission/RoleGroup/${data.id}`,
    method: 'PUT',
    data
  })
}

// 删除角色组
export const delRoleGroup = (id) => {
  return request({
    url: `/api/iam/Permission/RoleGroup/${id}`,
    method: 'DELETE'
  })
}
