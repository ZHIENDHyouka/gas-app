<template>
	<view class="content">
		<view>
			<scroll-view :scroll-top="scrollTop" scroll-y="true" @scrolltoupper="uppr" @scrolltolower="lower"
				@scroll="scroll" class="scroll-Y">
				<uni-list>
					<view v-for="(item,index) in deviceList" :key="index" class="view_tupian_wenzi">
						<view class="view_wenzi2">
							<text>设备编号</text>
							<text class="text_small">{{item.deviceName}}</text>
						</view>
						<view>
							<uni-badge v-show="item.alarmCount!==0" @click="onClick" class="uni-badge-left-margin"
								:text="item.alarmCount" absolute="rightTop" max-num:99 :offset="[-55, -35]" />
						</view>
						<view>
							<switch class="uni-badge-left-margin" :checked="item.status"
								@change="switchChange($event,index)" />
						</view>
					</view>
				</uni-list>
			</scroll-view>
		</view>
		<view class="bar">
			<navigator url="/pages/index/device" open-type="redirect" hover-class="navigator-hover"
				class="selectOption">
				<view id="1" ref="device">1</view>
			</navigator>
			<navigator url="/pages/index/charts" open-type="redirect" hover-class="navigator-hover"
				class="selectOption">
				<view id="2" ref="charts">1</view>
			</navigator>
			<navigator url="/pages/index/map" open-type="redirect" hover-class="navigator-hover" class="selectOption">
				<view id="3" ref="map">1</view>
			</navigator>
		</view>
	</view>
</template>

<script>
	import {
		getDeviceAllInfo
	} from '../../network/api.js'
	export default {
		data() {
			return {
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				deviceList: [{
						deviceName: "蟹老板",
						status: true,
						alarmCount: 10,
					},
					{
						deviceName: "派大星",
						status: false,
						alarmCount: 0,
					},
				],

				loadFontColor: '#409EFF',
				destroyFontColor: '#989898'
			}
		},
		mounted() {
			this.$refs.device.$el.style.color = this.loadFontColor;
			this.getDeviceAllInfo();
		},


		beforeDestroy() {
			this.$refs.device.$el.style.color = this.destroyFontColor;
		},
		methods: {
			getDeviceAllInfo() {
				getDeviceAllInfo().then(res => {
					const data = res.data.data;
					const code = res.data.code;
					if (data && data.length > 0) {
						this.deviceList = data;
					}
					if (code !== 1) {
						const msg = res.data.msg;
						uni.showToast({
							title: msg,
							icon: 'error',
							duration: 2000,
						})
					}
				})
			},
			switchChange(e, index) {
				console.log(e.detail.value, index);
			},
			onClick(e) {
				console.log('执行click事件')
			},
			lower: function(e) {

			},
			scroll: function(e) {

				this.old.scrollTop = e.detail.scrollTop
			},
			upper: function(e) {

			},
		},

	}
</script>

<style>
	.view_tupian_wenzi {
		height: 120rpx;
		display: flex;
		flex-direction: row;
		align-items: center;

		/* 圆角 */
		border-radius: 18rpx;

		/* 边 */
		border: 1rpx solid #E0E3DA;
		/* 阴影 */
		box-shadow: 2rpx 6rpx 0rpx #e5e8df;

		background-color: #ffffff;
		margin: 30rpx;

		/* padding使得文字和图片不至于贴着边框 */
		padding: 25rpx;

	}

	/* 包裹两行文字 */

	.view_wenzi2 {
		width: 100%;
		margin-left: 25rpx;
		display: flex;
		flex-direction: column;
	}

	/* 小字 */

	.text_small {
		font-size: 30rpx;
		word-break: break-all;
		color: #7a7878;
		margin-top: 10rpx;
		display: flex;
	}

	.mainScroll {
		height: 500rpx;
	}


	.bar {
		display: flex;
		width: 100%;
		height: 100rpx;
		background-color: aliceblue;
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