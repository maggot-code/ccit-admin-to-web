import request from '@/utils/request'
import axios from 'axios'
import { getToken } from '@/utils/auth'
// 获取日程安排列表
export function List(data) {
  return request({
    url: '/api/extend/Schedule',
    method: 'get',
    data
  })
}
// 新建日程安排
export function ScheduleCreate(data) {
  return request({
    url: '/api/extend/Schedule',
    method: 'post',
    data
  })
}
// 删除日程安排
export function ScheduleDelete(id) {
  return request({
    url: `/api/extend/Schedule/${id}`,
    method: 'DELETE',
  })
}
// 获取日程安排信息
export function ScheduleInfo(id) {
  return request({
    url: `/api/extend/Schedule/${id}`,
    method: 'get'
  })
}
// 更新日程安排
export function ScheduleUpdate(data) {
  return request({
    url: `/api/extend/Schedule/${data.id}`,
    method: 'PUT',
    data
  })
}
// app用
export function AppDayList() {
  return request({
    url: '/api/extend/Schedule/AppDayList',
    method: 'get',
  })
}
export function AppList() {
  return request({
    url: '/api/extend/Schedule/AppList',
    method: 'get',
  })
}

export function myDayList(date) {
  return request({
    url: `/api/extend/Schedule/Day?day=${date}`,
    method: 'get',
  })
}


export function outerList(data) {
  let token = getToken();
  let c = token.charAt(0).toUpperCase();
  token = c + token.slice(1);
  axios.defaults.headers['Authorization'] = token
  return axios({
    method: 'post',
    url: '/test/api/xcoa-mobile/v1/schedule-manager/schedules/list',
    data: {
      "columns":"item,startTime,endTime,place,important,scheduleAccount,scheduleName,itemType,pendingDay,region,regionName,attachment,theRepeat,scheduleRuleId,joinUserMember,isHaveAttachment,hasUpdate,hasDelete,itemDescription",
      "expressions": [{
        "dataType": "exps",
        "op": "or",
        "expressionsValue": [{
          "dataType": "exps",
          "op": "and",
          "expressionsValue": [{
            "dataType": "long",
            "name": "startTime",
            "op": "ge",
            "longValue": data.startTime
          }, {
            "dataType": "long",
            "name": "startTime",
            "op": "le",
            "longValue": data.endTime
          }]
        }, {
          "dataType": "exps",
          "op": "and",
          "expressionsValue": [{
            "dataType": "long",
            "name": "startTime",
            "op": "le",
            "longValue": data.startTime
          }, {
            "dataType": "long",
            "name": "endTime",
            "op": "ge",
            "longValue": data.endTime
          }]
        }, {
          "dataType": "exps",
          "op": "and",
          "expressionsValue": [{
            "dataType": "long",
            "name": "endTime",
            "op": "ge",
            "longValue": data.startTime
          }, {
            "dataType": "long",
            "name": "endTime",
            "op": "le",
            "longValue": data.endTime
          }]
        }]
      }],
      "formId": "oaSchedule",
      "maxResults": -1,
      "startPosition": -1,
      "orderBy": "startTime asc"
    }
  })
}

export function isVacation(data) {
  axios.defaults.params = data
  return axios({
    method: 'get',
    url: '/juhe/fapig/calendar/day.php'
  })
}

export function getHoliday(data) {
  return axios({
    method: 'get',
    url: `http://timor.tech/api/holiday/year/${data}`
  })
}
