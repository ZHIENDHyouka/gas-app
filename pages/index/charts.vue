<template>

	<view class="content">
		<view>
			<button style="background-color: #ACD6FF" @click="change">切换</button>
		</view>
		<!-- <view class="titleBar">实时数据</view> -->
		<scroll-view :style="{height:screenHeight + 'px'}" :scroll-top="scrollTop" scroll-y="true"
			@scrolltoupper="upper" @scrolltolower="lower" @scroll="scroll">
			<view v-show="changeInfo">
				<view class="realTimePart" v-for="(item,index) in realTimeDataList" :key="index">
					<view class="gasText">
						<view style="font-size: 45rpx;">
							<text>实时数据</text>
						</view>
						<text v-if="colorchange" class="color2">{{item.name}}</text>
						<text v-if="!colorchange" class="color1">{{item.name}}</text>
					</view>
					<view class="gasText">
						<text :class="color" class="gasValue">{{item.data}} {{symbol[item.name]}}</text>
					</view>
				</view>
			</view>
			<l-echart v-show="!changeInfo" class="chartPart" ref="chart1"></l-echart>
			<view class="gasSelect" v-show="!changeInfo" v-for="(item,index) in gasNameList" :key="index">
				<button @click="getGasData(item,1)">{{item}}</button>
			</view>

		</scroll-view>


	</view>
</template>

<script>
	import * as echarts from '@/uni_modules/lime-echart/static/echarts.min'
	import {
		getGasNameAndNewData,
		getStatisticInitData,
		queryAllAlarmCriticalInfo
	} from '../../network/api.js'
	export default {
		data() {
			return {
				color: "",
				colorchange: true,
				alarmCriticalInfo: [],
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				gasNameList: [],

				deviceList: [{
						value: '设备1',
						text: "设备1"
					},
					{
						value: '设备2',
						text: "设备2"
					},
					{
						value: '设备3',
						text: "设备3"
					}
				],
				symbol: {
					"温度": '℃',
					"湿度": '%',
					'PM10': 'μg/m^3',
					'PM2.5': 'μg/m^3',
					'O3': 'PPB',
					'CO': 'PPM',
					'SO2': 'PPM',
					'NO2': 'PPM',
				},
				// socket: null,
				deviceId: '',
				chartLine1: null,
				chartLine2: null,
				screenHeight: '',
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				changeInfo: true,
				realTimeDataList: [],
				gasName: '',
			}
		},
		onLoad() {
			this.screenHeight = uni.getSystemInfoSync().windowHeight;
			this.queryInitData();
			this.queryAlarmCriticalInfo();
		},
		beforeDestroy() {
			// console.log(1);
			// uni.closeSocket();
		},
		methods: {
			queryAlarmCriticalInfo() {
				queryAllAlarmCriticalInfo().then(res => {
					console.log(res.data.data)
					this.alarmCriticalInfo = res.data.data;
					console.log(this.alarmCriticalInfo);
				})
			},
			lower: function(e) {

			},
			scroll: function(e) {

				this.old.scrollTop = e.detail.scrollTop
			},
			upper: function(e) {

			},
			queryInitData() {
				getGasNameAndNewData().then(res => {
					const list = res.data.data;
					this.realTimeDataList = list;
					for (let s of list) {
						this.gasNameList.push(s.name);
						if (s.name === '湿度')
							s.data *= 100;
					}
					this.socket = this.initWebSocket();
				})
			},
			initWebSocket() {
				const url = "ws://127.0.0.1:8083/webSocket";
				const _this = this;
				//创建连接
				this.socket = uni.connectSocket({
					url: url,
					header: {
						'content-type': 'application/json'
					},
					method: 'GET',
					complete() {

					}
				});
				uni.onSocketOpen(function(res) {
					const id = setInterval(function() {
						_this.sendSocketMessage("4", _this.gasName);
						// console.log("发送消息!");
					}, 1000);

				})
				uni.onSocketMessage(function(res) {
					const result = JSON.parse(res.data);
					// console.log(result);
					_this.realTimeDataList.splice(0, _this.realTimeDataList.length);
					_this.realTimeDataList = result.realTimeData;
					// console.log(_this.realTimeDataList[1].data)
					// console.log(_this.realTimeDataList[1].name)
					_this.changeColor(_this.realTimeDataList, _this.alarmCriticalInfo, _this);
					if (result.realTimeStatistic) {
						const x = _this.chartLine1.getOption().xAxis[0].data;
						const y = _this.chartLine1.getOption().series[0].data;
						x.shift();
						y.shift();
						x.push(result.realTimeStatistic.date);
						y.push(result.realTimeStatistic.data);
						_this.chartLine1.setOption({
							title: {
								text: `12小时内${_this.gasName}面积图`,
								top: '10px',
								left: 'center',
							},
							xAxis: {
								type: 'category',
								data: x,
								axisLabel: {
									show: false
								},
							},
							series: [{
								data: y,
								type: 'line',
								smooth: true,
								areaStyle: {}
							}]

						})
					}
				});
				uni.onSocketError(function(res) {
					console.log('WebSocket连接打开失败，请检查！');
				});
				uni.onSocketClose(function(res) {
					console.log('WebSocket 已关闭！');
				});
			},

			changeColor(realTimeDataList, alarmCriticalList, _this) {

				// console.log(realTimeDataList.length)
				// console.log(realTimeDataList[1].data)
				// console.log(realTimeDataList[1].name)
				// console.log(alarmCriticalList)
				// console.log(_this.$refs)
				// for (let s in this.alarmCriticalList) {
				// 	if (s.name === item.name) {
				// 		if (item.data > s.upperLimit || item.data < s.lowerLimit) {
				// 			console.log(1)
				// 			return true;
				// 		} 
				// 	}
				// 	console.log(2)
				// 	return false;
				// }
				for (let s in this.alarmCriticalList) {
					for (let r in this.realTimeDataList) {
						// for (let real = 0; real < realTimeDataList.lsength; real++) {
						if (r.name == s.name) {
							// console.log(realTimeDataList[real].data)
							if (r.data > s.upperLimit || r.data < s.lowerLimit) {
								// console.log(1111)
								_this.colorchange = false
							} else {
								_this.colorchange = true;
							}
						}
					}
				}
				// console.log(this.color)

			},

			sendSocketMessage(msg, data) {
				uni.sendSocketMessage({
					data: JSON.stringify({
						code: msg,
						data: data,
					}),
				});

			},
			scroll: function(e) {

				this.old.scrollTop = e.detail.scrollTop
			},
			change() {
				this.changeInfo = !this.changeInfo;
				if (this.changeInfo === false) {
					this.getGasData("温度");
				}
			},
			async drawLineInit(dataList, dateList, name) {
				const option = {
					title: {
						text: `12小时内${name}面积图`,
						top: '10px',
						left: 'center',
					},
					tooltip: {
						trigger: 'axis'
					},
					xAxis: {
						type: 'category',
						// data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
						data: dateList,
						axisLabel: {
							show: false
						},
					},
					yAxis: {
						type: 'value'
					},

					grid: {
						x: 25,
						y: 45,
						x2: 5,
						y2: 20,
						// with: 1000,
					},
					dataZoom: [{
							type: 'inside',
							start: 0,
							end: 100,
						},

					],
					series: [{
						// data: [20, 30, 40, 50, 60, 70, 80],
						data: dataList,
						type: 'line',
						smooth: true,
						areaStyle: {}
					}]
				};
				this.chartLine1 = await this.$refs.chart1.init(echarts);
				// this.chartLine1.style.width = window.innerWidth + 'px' // 再增加这一行
				// console.log(111);
				this.chartLine1.setOption(option)
			},
			getGasData(name, flag) {
				this.gasName = name;
				getStatisticInitData(this.gasName).then(res => {
					if (res && res.data) {
						const dataList = [];
						const dateList = [];
						const list = res.data.data;
						for (let s of list) {
							dateList.push(s.date);
							dataList.push(s.data);
						}
						this.drawLineInit(dataList, dateList, this.gasName);
					}
				})
			},
		}
	}
</script>

<style>
	.color1 {
		color: red;
	}

	.color2 {
		color: white;
	}

	.content {
		background: #e0e6ec;
		width: 100vw;
		height: 100vh;
		background-image: url('../../static/background2.jpeg')
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

	.titleBar {
		/* 圆角 */
		border-radius: 18rpx;

		/* 边 */
		border: 1rpx solid #E0E3DA;
		/* 阴影 */
		box-shadow: 2rpx 6rpx 0rpx #e5e8df;

		background-color: #ffffff;
		border-color: #409EFF;
		background-color: #ffffff;
		background-clip: padding-box;
		height: 90rpx;
		width: 80%;
		margin: auto;
	}

	.realTimePart {
		/* 圆角 */
		border-radius: 18rpx;

		/* 边 */
		border: 1rpx solid #E0E3DA;
		/* 阴影 */
		box-shadow: 2rpx 6rpx 0rpx #e5e8df;

		/* background-color: #ffffff;
		border-color: #409EFF; */
		"backgroundColor": "transparent"

			background-clip: padding-box;
		height: 240rpx;
		width: 45%;
		/* margin: auto; */
		margin-top: 20rpx;
		margin-left: 20rpx;
		float: left;
		/* background-color: #1f5ef1; */
		/* background-color: #409EFF; */

	}

	.gasText {
		color: #ffffff;
		font-family: "Microsoft YaHei";
		font-size: 55rpx;
		margin-left: 15rpx;
		margin-top: 10rpx;
	}

	.gasValue {
		font-size: 45rpx;
		margin-top: 10rpx;
	}


	.chartPart {
		margin-top: 30rpx;
		margin-bottom: 20rpx;
		border-radius: 15px;
		background-clip: padding-box;
		background-color: rgba(85, 0, 0, 0);
		border: 1px solid rgba(79, 83, 85, 0.0);
		box-shadow: 0 0 25px #eadac6ff;
		border-color: lavenderblush;
		height: 650rpx;
		width: 90%;
		float: left;
		margin-left: 18rpx;
		padding-bottom: 5rpx;

		background-color: #ffffff;

	}

	.gasSelect {
		/* 圆角 */
		border-radius: 18rpx;
		width: 20%;
		margin-top: 20rpx;
		margin-left: 20rpx;
		float: left;
		border-right: 1px solid #E0E3DA;
	}
</style>