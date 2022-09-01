import request from '@/utils/request'

// 获取用户列表
export const getUserList = (data) => {
  return request({
    url: '/api/iam/Permission/Users',
    method: 'GET',
    data
  })
}

// 获取所有用户列表
export const UserListAll = () => {
  return request({
    url: '/api/iam/Permission/Users/All',
    method: 'GET'
  })
}

// 获取用户下拉框列表(公司+部门+用户)
export const getUserSelector = () => {
  return request({
    url: '/api/iam/Permission/Users/Selector',
    method: 'GET'
  })
}

// 新建用户
export const createUser = (data) => {
  return request({
    url: '/api/iam/Permission/Users',
    method: 'POST',
    data
  })
}

// 修改用户
export const updateUser = (data) => {
  return request({
    url: `/api/iam/Permission/Users/${data.id}`,
    method: 'PUT',
    data
  })
}

// 获取用户信息
export const getUserInfo = (id) => {
  return request({
    url: `/api/iam/Permission/Users/${id}`,
    method: 'GET'
  })
}

// 删除用户
export const delUser = (id) => {
  return request({
    url: `/api/iam/Permission/Users/${id}`,
    method: 'DELETE'
  })
}

// 修改用户密码
export const resetUserPassword = (data) => {
  return request({
    url: `/api/iam/Permission/Users/${data.id}/Actions/ResetPassword`,
    method: 'POST',
    data
  })
}

// 更新用户状态
export const updateUserState = (id) => {
  return request({
    url: `/api/iam/Permission/Users/${id}/Actions/State`,
    method: 'PUT'
  })
}

export const TreeView = () => {
  return request({
    url: '/api/iam/Permission/User/TreeView',
    method: 'GET'
  })
}

// 设置当前角色
export function currentRole(ids) {
  return request({
    url: `/api/iam/Permission/Users/CurrentRole?roleIds=${ids}`,
    method: 'post',
  })
}

// 懒加载获取部门人员树
export function getUserSelectorLazy(data) {
  return request({
    url: `/api/iam/Permission/Organize/Department/Tree/${data.dimensionCode}/${data.parentId}`,
    method: 'get',
  })
}

// 远程过滤部门人员树
export function filterUserSelector(data) {
  return request({
    url: `/api/iam/Permission/Organize/Department/Tree/${data.dimensionCode}`,
    method: 'get',
    data
  })
}