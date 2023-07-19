<template>
	<view class="content">
		<scroll-view :scroll-top="scrollTop" scroll-y="true" @scrolltoupper="upper" @scrolltolower="lower"
			@scroll="scroll" :style="{height:screenHeight + 'px'}">
			<template>
				<view style="padding: 20rpx;height: 400rpx;">
					<uni-easyinput class="v-deep" type="textarea" v-model="value" placeholder="请输入反馈信息"></uni-easyinput>
				</view>
				<view>
					<button type="primary" @click="getFeedback()">提交反馈</button>
				</view>
			</template>
			<view style="padding: 20rpx;">
				<uni-list>
					<uni-list-item>
						<view slot="body" style="flex-direction: row;align-items: center;">
							<text class="slot-text">未处理的反馈</text>
							<uni-badge :text="total" type="primary" />
						</view>
					</uni-list-item>
					<uni-list-item v-for="(item,index) in feedbacks" :key="item.id" :title="item.problemDescribe"
						:show-badge="true" :badge-text="(index+1)" />

				</uni-list>
			</view>
		</scroll-view>
	</view>

</template>

<script>
	import {
		submitFeedbackInfo,
		getFeedbackAllInfo
	} from '../../network/api.js'
	export default {
		data() {
			return {
				scrollTop: 0,
				value: '',
				screenHeight: '',
				feedbacks: [],
				total: 0
			}
		},
		onLoad() {
			this.screenHeight = uni.getSystemInfoSync().windowHeight;
		},
		mounted() {
			this.feedbackList();
		},
		methods: {
			getFeedback: function() {
				const res = getApp().globalData.text;
				const username = res.data.username;
				const userId = res.data.managerId;
				const describe = this.value
				if (this.value === '') {
					uni.showToast({
						title: "提交内容为空!",
						duration: 1500,
						icon: 'error',
					})
					return
				}
				submitFeedbackInfo(username, userId, describe).then(res => {
					console.log(res.data.code)
					if (res.data.code === 0) {
						this.value = '';
						uni.showToast({
							title: "提交失败,请重试!",
							duration: 1500,
							icon: 'error',
						})
					} else if (res.data.code === 1) {
						this.value = '';
						uni.showToast({
							title: '提交成功',
							icon: 'success',
							duration: 2000
						})
						this.feedbackList();
					}
				})
			},
			feedbackList: function() {
				const res = getApp().globalData.text;
				const userId = res.data.managerId;
				getFeedbackAllInfo(userId).then(res => {
					console.log(res);
					this.total = res.data.data.length;
					this.feedbacks = res.data.data
				})
			}
		},

	}
</script>

<style>
	.content {
		background: #e0e6ec;
		width: 100vw;
		height: 100vh;
		background-image: url('../../static/background2.jpeg');
	}
	
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

	::v-deep .uni-easyinput__content-textarea {
		line-height: 2.0;
		font-size: 30rpx;
		height: 60rpx;
		min-height: 60rpx;
		/* #ifndef APP-NVUE */
		min-height: 370rpx;
		width: auto;
		/* #endif */
	}
</style>