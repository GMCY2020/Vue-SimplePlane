<template>
	<view style="position: absolute; top: -50px; z-index: 9999; width: 100%; height: 50px; -webkit-app-region: drag; margin-left: 50px;"/>
	<view>
		<view class="me-all">
			<view class="me-item" style="font-size: 35rpx">
				<view class="me-message">
					<view class="me-title">
						程序作者/UI设计
					</view>
					
					<view style="display: flex; margin-bottom: 10rpx;">
						<text style="margin-right: 10rpx; color: white">-</text>
						<text>孤梦残影</text>	
					</view>
				</view>
			</view>
			<view class="me-item" style="font-size: 35rpx;">
				<view class="me-message">
					<view class="me-title">
						程序说明
					</view>
					<view style="display: flex; margin-bottom: 10rpx;">
						<text style="margin-right: 10rpx;">-</text>
						<text>本程序由孤梦残影独立开发，能力有限，可能会有Bug；</text>
					</view>
					<view style="display: flex; margin-bottom: 10rpx;">
						<text style="margin-right: 10rpx;">-</text>
						<text>本程序会在本地保存相关功能的数据，如任务数据等；</text>
					</view>
					<view style="display: flex; margin-bottom: 10rpx;">
						<text style="margin-right: 10rpx;">-</text>
						<text>用户使用同步功能时会把用户的任务数据等保存到云端，用来支持多端数据同步的功能；</text>
					</view>
					<view style="display: flex; margin-bottom: 10rpx;">
						<text style="margin-right: 10rpx;">-</text>
						<text>本程序不保存任何与所提供功能无关的数据；</text>
					</view>
					<view style="display: flex; margin-bottom: 10rpx;">
						<text style="margin-right: 10rpx;">-</text>
						<text>程序作者保留最终解释权。</text>
					</view>
					
					<text>\n</text>
					<view style="text-align: right;">
						<text>修改于2023年03月26日</text>
					</view>
				</view>
			</view>
		</view>
		
		
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	export default {
		computed: {
		},
		
		data() {
			return {
				
			};
		},
		
		onLoad() {
			uni.setNavigationBarTitle({
				title: '关于我'
			});
			
			uni.setNavigationBarColor({
				frontColor: '#000000',
				backgroundColor: '#f5f5f5'
			})
		}
	}
</script>

<style lang="scss">
	body {
		background-color: #f5f5f5;
	}
	
	page { 
		background-color: #f5f5f5;
	}
	
	scroll-view ::-webkit-scrollbar {
		width: 0;
		height: 0;
		color: transparent;
		color: transparent;
		display: none;
	}
	
	::-webkit-scrollbar {
		width: 0;
		height: 0;
		color: transparent;
		color: transparent;
		display: none;
	}
	
	.me-item {
		background-color: white;
		border-radius: 25rpx;
		margin: 25rpx;
		padding: 25rpx;
		.me-title {
			font-weight: bold;
			margin-bottom:15rpx;
		}
		.me-message {
			display: flex;
			flex-direction: column;
		}
	}
	
	
</style>
