<template>
	<view class="content">
		<view class="avatorWrapper">
			<view class="avator">
				<image class="img" src="../../static/qq.png" mode="widthFix"></image>
			</view>
		</view>
		<view class="form">
			<view class="inputWrapper">
				<input class="input" type="text" v-model="username" placeholder="请输入用户名" />
			</view>
			<view class="inputWrapper">
				<input class="input" type="password" v-model="password" placeholder="请输入密码" />
				<view>
					<button class="loginBtn" v-show="isLogin" @click="login">登录</button>
				</view>
				<view>
					<button class="loginBtn" v-show="!isLogin" @click="register">注册</button>
				</view>
				<view class="forgotBtn" @click="change" v-show="isLogin">
					<text style="color: #409EFF;">注册</text>
				</view>
				<view class="forgotBtn" @click="change" v-show="!isLogin">
					<text style="color: #409EFF;">登陆</text>
				</view>
			</view>
		</view>
	</view>

</template>

<script>
	import {
		login,
		register
	} from '../../network/api.js'
	export default {
		data() {
			return {
				title: 'Hello',
				username: '',
				password: '',
				isLogin: true,
				isRegister: false,
			}
		},
		onLoad() {
			// uni.request({
			// 	url: 'http://localhost:8083/user/test',
			// 	method: 'GET',
			// 	data: {},
			// 	success: res => {},
			// 	fail: () => {},
			// 	complete: () => {}
			// });
		},
		methods: {
			login() {
				if (this.username && this.password) {
					uni.showLoading({
						title: '登陆中',
						icon: 'loading',
					})
					login({
						username: this.username,
						password: this.password,
					}).then(res => {
						uni.hideLoading();
						const code = res.data.code;
						const msg = res.data.msg;
						if (code === 0) {
							uni.showToast({
								title: msg,
								duration: 1500,
								icon: 'error',
							})
						} else if (code === 1) {
							uni.showToast({
								title: msg,
								duration: 1000,
								success() {
									// 页面跳转
									uni.redirectTo({
										url: '../index/main',
									})
								}
							})
						} else {
							uni.showToast({
								title: '未知错误!',
								icon: 'error'
							})
						}

					})
				} else {
					uni.showToast({
						title: '请输入完整信息',
						duration: 1500,
						icon: 'error',
					})
				}
			},
			register() {
				if (this.username && this.password) {
					uni.showLoading({
						title: '注册中',
						icon: 'loading',
					})
					register({
						username: this.username,
						password: this.password,
					}).then(res => {
						uni.hideLoading();
						const code = res.data.code;
						const msg = res.data.msg;
						if (code === 0) {
							uni.showToast({
								title: msg,
								duration: 1500,
								icon: 'error',
							})
						} else if (code === 1) {
							uni.showToast({
								title: msg,
								duration: 1000,
							})
							this.isLogin = true;
						} else {
							uni.showToast({
								title: '未知错误!',
								icon: 'error'
							})
						}

					})
				} else {
					uni.showToast({
						title: '请输入完整信息',
						duration: 1500,
						icon: 'error',
					})
				}
			},
			change() {
				this.password = '';
				this.username = '';
				this.isLogin = !this.isLogin;
			}

		},

	}
</script>

<style>
	.content {
		background: #e0e6ec;
		width: 100vw;
		height: 100vh;
	}

	.avatorWrapper {
		height: 300px;
		width: 100vw;
		display: flex;
		justify-content: center;
		align-items: flex-end;
	}

	.avator {
		width: 500upx;
		height: 400upx;
		overflow: hidden;
	}

	.avator .img {
		width: 100%;
		height: 500px;
	}

	.form {
		padding: 0 100upx;
		margin-top: 30px;
	}

	.inputWrapper {
		width: 100%;
		height: 80upx;
		background: white;
		border-radius: 20px;
		box-sizing: border-box;
		padding: 0 20px;
		margin-top: 25px;
	}

	.inputWrapper .input {
		width: 100%;
		height: 100%;
		text-align: center;
		font-size: 15px;
	}

	.loginBtn {
		width: 100%;
		height: 80upx;
		background: #409EFF;
		border-radius: 50upx;
		margin-top: 50px;
		display: flex;
		justify-content: center;
		align-items: center;

	}

	.forgotBtn {
		text-align: center;
		color: #EAF6F9;
		font-size: 15px;
		margin-top: 20px;
	}
</style>