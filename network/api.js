import exp from 'constants'
import {
	Request
} from './request.js'
// 用户登陆
export function login(data) {
	return Request({
		url: 'app/appLogin',
		method: 'post',
		data: data
	})
}
//用户注册
export function register(data) {
	return Request({
		url: 'app/appRegister',
		method: 'post',
		data: data
	})
}
//获取设备页面信息
export function getDeviceAllInfo() {
	return Request({
		url: 'app/getDeviceAllInfo',
		method: 'get',
	})
}

// 发送用户反馈
export function submitFeedbackInfo(username, userId, describe) {
	return Request({
		url: 'manager/submitFeedbackInfo',
		method: 'post',
		data: {
			userId: userId,
			userName: username,
			problemDescribe: describe
		}
	})
}

export function getFeedbackAllInfo(userId) {
	return Request({
		url: 'app/getFeedbackAllInfo/' + userId,
		method: 'get'
	})
}

//获取气体名称和最新数据
export function getGasNameAndNewData() {
	return Request({
		url: 'app/getGasNameAndNewData',
		method: 'get'
	})
}

//获取统计图表初始数据
export function getStatisticInitData(name) {
	return Request({
		url: 'app/getStatisticInitData',
		method: 'post',
		data: {
			name: name
		},
	})
}

export function queryAllAlarmCriticalInfo() {
	return Request({
		url: 'alarm/queryAllAlarmCriticalInfo',
		method: 'get'
	})
}