import request from '@/utils/request'

// 获取应用列表
export const getAppList = (data) => {
    return request({
        url: '/api/system/Base/Client',
        method: 'GET',
        data
    })
}

// 获取应用信息
export const getAppInfo = (id) => {
    return request({
        url: `/api/system/Base/Client/${id}`,
        method: 'GET',
    })
}

// 新建应用
export const createApp = (data) => {
    return request({
        url: '/api/system/Base/Client/registerClient',
        method: 'POST',
        data
    })
}

// 更新应用
export const updateApp = (data) => {
    return request({
        url: `/api/system/Base/Client/${data.id}`,
        method: 'PUT',
        data
    })
}

// 删除应用
export const delApp = (id) => {
    return request({
        url: `/api/system/Base/Client/${id}`,
        method: 'DELETE'
    })
}

// 获取应用信息
export const getAppTree = () => {
    return request({
        url: `/api/system/Base/Client/Tree`,
        method: 'GET',
    })
}
