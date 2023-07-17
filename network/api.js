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