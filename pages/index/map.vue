<template>
	<view class="content">
		<view>
			<scroll-view :scroll-top="scrollTop" scroll-y="true" @scrolltoupper="uppr" @scrolltolower="lower"
				@scroll="scroll" :style="{height:screenHeight + 'px'}" >
				<template>
					<view style="padding: 20rpx;">
						<uni-easyinput type="textarea" autoHeight v-model="value" placeholder="请输入反馈信息"></uni-easyinput>
					</view>
					<view >
						<button type="primary" @click="getFeedback()">提交反馈</button>
					</view>
				</template>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import {submitFeedbackInfo} from '../../network/api.js'
	export default {
		data() {
			return {
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				dataList: [{
					id: "1",
					name: 'A'
				}, {
					id: "2",
					name: 'B'
				}, {
					id: "3",
					name: 'C'
				}],
				loadFontColor: '#409EFF',
				destroyFontColor: '#989898',
				value: '',
				screenHeight: ''
			}
		},
		onLoad() {
			this.screenHeight = uni.getSystemInfoSync().windowHeight
		},
		methods: {
			getFeedback:function(){
				const res = getApp().globalData.text;
				const username = res.data.username;
				const userId = res.data.managerId;
				const describe = this.value
				submitFeedbackInfo(username,userId,describe).then(res=>{
					console.log(res.data.code)
					if (res.data.code === 0) {
						this.value='';
						uni.showToast({
							title: "提交失败,请重试!",
							duration: 1500,
							icon: 'error',
						})
					} else if (res.data.code === 1) {
						this.value='';
						uni.showToast({
						    title: '提交成功',
						    icon: 'success',
						    duration: 2000
						})
					} 
				})
				
			}
		},

	}
</script>

<style>
	.mainScroll {
		height: 500rpx;
	}

	.bar {
		display: flex;
		width: 100%;
		height: 100rpx;
		background-color: aliceblue;
		bottom: 0px;
		position: absolute;
	}

	.selectOption {
		width: 34%;
		text-align: center;
		line-height: 100rpx;

	}

	.scroll-Y {
		height: 1045rpx;
	}
</style>