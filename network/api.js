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