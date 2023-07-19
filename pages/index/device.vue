<template>
	<view class="content">

		<scroll-view :style="{height:screenHeight + 'px'}" :scroll-top="scrollTop" scroll-y="true"
			@scrolltoupper="upper" @scrolltolower="lower" @scroll="scroll">
			<uni-grid :column="3" :show-border="true" :square="false">
				<uni-grid-item v-for="(item ,index) in list" :index="index" :key="index">
					<view class="grid-item-box">
						<text class="text">{{item.text}}</text>
						<view v-if="item.badge" class="grid-dot">
							<uni-badge size="normal" :text="item.badge" :type="item.type" />
						</view>
					</view>
				</uni-grid-item>
			</uni-grid>
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
				destroyFontColor: '#989898',
				screenHeight: '',
				list: []

			}
		},
		onLoad() {
			this.screenHeight = uni.getSystemInfoSync().windowHeight;
		},
		mounted() {

			this.getDeviceAllInfo();
		},


		beforeDestroy() {

		},
		methods: {
			getDeviceAllInfo() {
				getDeviceAllInfo().then(res => {
					const data = res.data.data;
					const code = res.data.code;
					var count = 0
					for (let i = 0; i < data.length; i++) {
						if (data[i].status == false) {
							count++;
						}
					}
					console.log(count)
					this.list = [{
							text: '设备总数',
							badge: data.length,
							type: "primary"
						},
						{

							text: '在线设备',
							badge: data.length - count,
							type: "success"
						},
						{
							text: '掉线设备',
							badge: count,
							type: "warning"
						}
					]
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

	.text {
		font-size: 14px;
		margin-top: 5px;
	}

	.grid-item-box {
		flex: auto;
		// position: relative;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 5px;

	}

	.content {
		background: #e0e6ec;
		width: 100vw;
		height: 100vh;

	}

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
		bottom: 0px;
		position: absolute;
	}

	.selectOption {
		width: 34%;
		text-align: center;
		line-height: 100rpx;

	}
</style>