<template>
	<view class="content">
		<view>
			<scroll-view :scroll-top="scrollTop" scroll-y="true" @scrolltoupper="uppr" @scrolltolower="lower"
				@scroll="scroll" class="scroll-Y">


			</scroll-view>
		</view>
		<view class="bar">
			<navigator url="/pages/index/device" open-type="redirect" hover-class="navigator-hover"
				class="selectOption">
				<view id="1" ref="device" style="color: #989898;">1</view>
			</navigator>
			<navigator url="/pages/index/charts" open-type="redirect" hover-class="navigator-hover"
				class="selectOption">
				<view id="2" ref="charts" style="color: #409EFF;">1</view>
			</navigator>
			<navigator url="/pages/index/map" open-type="redirect" hover-class="navigator-hover" class="selectOption">
				<view id="3" ref="map" style="color: #989898;">1</view>
			</navigator>
		</view>
	</view>
</template>

<script>
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
				destroyFontColor: '#989898'
			}
		},
		// onLoad() {
		// 	this.$refs.charts.$el.style.color = this.loadFontColor;
		// },
		updated() {
			this.$refs.charts.$el.style.color = this.loadFontColor;
		},

		beforeDestroy() {
			this.$refs.charts.$el.style.color = this.destroyFontColor;
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