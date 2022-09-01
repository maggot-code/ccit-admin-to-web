import request from '@/utils/request'

// 获取文章列表
export function getArticleList(data) {
  return request({
    url: '/api/visualdev/article',
    method: 'GET',
    data
  })
}
// 获取文章信息
export function getArticleInfo(id) {
  return request({
    url: `/api/visualdev/article/${id}`,
    method: 'GET'
  })
}

// 添加文章
export function createArticle(data) {
  return request({
    url: '/api/visualdev/article',
    method: 'POST',
    data
  })
}

// 编辑文章
export function updateArticle(data) {
  return request({
    url: `/api/visualdev/article/${data.id}`,
    method: 'PUT',
    data
  })
}
// 删除文章
export function delArticle(id) {
  return request({
    url: `/api/visualdev/article/${id}`,
    method: 'DELETE',
  })
}

// 启用文章
export function enableArticle(id) {
  return request({
    url: `/api/visualdev/article/enable/${id}`,
    method: 'PUT'
  })
}

// 停用文章
export function disableArticle(id) {
  return request({
    url: `/api/visualdev/article/disable/${id}`,
    method: 'PUT'
  })
}

// 获取推荐位文章
export function getRecommended(id) {
  return request({
    url: `/api/visualdev/article/getRecommendedArticle/${id}`,
    method: 'GET'
  })
}

// 获取轮播图
export function getCarousel(id) {
  return request({
    url: `/api/visualdev/article/getRotationMapArticle/${id}`,
    method: 'GET'
  })
}