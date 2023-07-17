<template>
	<view class="content">
		<view>
			<scroll-view :scroll-top="scrollTop" scroll-y="true" @scrolltoupper="uppr" @scrolltolower="lower"
				@scroll="scroll" class="scroll-Y">
				<template>
					<view>
						<view class="tarea"
							style="width: 100%; height: 300rpx;padding-right: 40rpx;box-sizing: border-box;">
							<textarea placeholder="请输入反馈信息"
								style="width: 100%;height: 100%;border: 1rpx solid #cccccc; border-radius: 5rpx;padding: 20rpx;auto-height"
								v-model="value"></textarea>
						</view>
						
						<button type="primary" @click="getFeedback()">提交反馈</button>
					</view>
				</template>
			</scroll-view>
		</view>


		<view class="bar">
			<navigator url="/pages/index/device" open-type="redirect" hover-class="navigator-hover"
				class="selectOption">
				<view id="1" ref="device" style="color: #989898;">1</view>
			</navigator>
			<navigator url="/pages/index/charts" open-type="redirect" hover-class="navigator-hover"
				class="selectOption">
				<view id="2" ref="charts" style="color: #989898;">1</view>
			</navigator>
			<navigator url="/pages/index/map" open-type="redirect" hover-class="navigator-hover" class="selectOption">
				<view id="3" ref="map" style="color: #409EFF;">1</view>
			</navigator>
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
				value: ''
			}
		},
		methods: {
			lower: function(e) {
				console.log(e)
			},
			scroll: function(e) {
				console.log(e)
				this.old.scrollTop = e.detail.scrollTop
			},
			upper: function(e) {
				console.log(e)
			},
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