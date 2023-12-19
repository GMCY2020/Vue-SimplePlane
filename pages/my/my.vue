<template>
	<view
		style="position: absolute; top: -50px; z-index: 9999; width: 100%; height: 50px; -webkit-app-region: drag; margin-left: 50px;" />
	<block v-if="true">
		<!-- 顶部 -->
		<view class="top">
			<view class="user-portrait">
				<image class="user-portrait-img" src="../../static/RichDaily.png"></image>
			</view>
			<view class="user-message" @click="goToLogin()">
				<view class="user-name">
					<block v-if="this.isLoad === '1'">
						{{this.user['user_name']}}
					</block>
					<block v-else>
						点击登录
					</block>
				</view>
				<view class="user-id">
					<block v-if="this.isLoad === '1'">
						{{this.user['user_id']}}
					</block>
					<block v-else>
						登录解锁更多功能
					</block>
				</view>
			</view>
		</view>

		<!-- 缓存 -->
		<view class="pan">
			<view class="pan-title">
				缓存管理
			</view>
			<view class="pan-item" @click="isDel()">
				<view class="pan-item-left">
					清空本地缓存
				</view>
				<view class="pan-item-right">
					<uni-icons type="trash" class="img" size="45rpx"></uni-icons>
				</view>
			</view>
		</view>

		<!-- 程序信息 -->
		<view class="pan">
			<view class="pan-title">
				程序信息
			</view>
			<view class="pan-item">
				<view class="pan-item-left">
					版本号
				</view>
				<view class="pan-item-right">
					1.1.0
				</view>
			</view>
			<view class="pan-item" @click="goToAUH()">
				<view class="pan-item-left">
					更新记录
				</view>
				<view class="pan-item-right">
					<uni-icons type="forward" size="40rpx"></uni-icons>
				</view>
			</view>
			<view class="pan-item" @click="goToAM()">
				<view class="pan-item-left">
					关于我
				</view>
				<view class="pan-item-right">
					<uni-icons type="forward" size="40rpx"></uni-icons>
				</view>
			</view>
		</view>

		<!-- 账号 -->
		<view class="pan" @click="outLoginClick()" v-if="this.isLoad === '1'">
			<view class="pan-out">
				退出登录
			</view>
		</view>
	</block>
	<block v-else>
		<view style="display: flex; justify-content: center; align-items: center; font-size: 60rpx;">
			<text>程序停用中</text>
		</view>
	</block>

	<view class="progress-container" v-if="isShowProgress">
		<view class="progress-box">
			<view class="text">文件下载中，请稍后......</view>
			<progress :percent="progress" show-info stroke-width="3" />
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'

	export default {
		computed: {
			...mapState('m_sp', ['isLoad', 'Sys', 'user', 'local']),
		},

		data() {
			return {
				height: 0,
				isShowProgress: false,
				progress: 0,
			}
		},

		methods: {
			...mapMutations('m_sp', ['updateIsLoad', 'updateSys', 'updateUser', 'updateLocal', 'updateData']),

			// 跳转到 登录 界面
			async goToLogin() {
				let res = await uni.getNetworkType()
				// console.log(res)

				if (res.networkType === 'none') return uni.showToast({
					title: "请连接网络",
					duration: 2000,
					icon: 'none'
				});

				if (this.isLoad === '0') {
					uni.navigateTo({
						url: '../../subpkg/Login/Login'
					})
				}
			},


			// 按钮点击 退出登录
			outLoginClick() {
				let that = this
				uni.showModal({
					title: '提示',
					content: '确认退出?',
					success: function(res) {
						if (res.confirm) {
							that.updateIsLoad('0')
							that.updateUser({
								"dataTime": Date.now(),
							})
							uni.showToast({
								title: '退出登录',
								duration: 2000,
								icon: 'none'
							});
						}
					}
				});

			},


			del() {
				this.updateData({
						"changeTime": Date.now(),
						"changeTimes": {
							"everyDay": 1679601600000, // 2023-3-24 4:00:00
							"everyWeek": 1679256000000, // 2023-3-20 4:00:00
							"everyMonth": 1677614400000, // 2023-3-1 4:00:00
						},
						"日常": {
							"color": "rgba(86, 74, 244, 1)",
							"repetition": "无",
							"tasks": [
								[1678714807792, "点击任务勾选框后任务将会被勾选并移到“已完成”", false],
								[1678714929072, "点击已完成的任务勾选框后任务将会被取消勾选并移到“未完成”", false],
								[1678715000000, "点击“已完成”或“未完成”可以折叠和展开面板", false],
							]
						},
						"分类界面": {
							"color": "rgba(255, 0, 255, 1.0)",
							"repetition": "每天",
							"tasks": [
								[1678714807792, "点击悬浮按钮可新建代办任务", false],
								[1678714929072, "点击任务可以更改任务详情", false],
								[1678715000000, "在任务详情中点击类别名称可更改任务的类别", false],
								[1678715000001, "在任务详情中点击“新建”可添加新的类别", false],
								[1678715000002, "在任务详情中长按类别可更改类别详情", false],
							]
						},
						"我的界面": {
							"color": "rgba(170, 255, 255, 1.0)",
							"repetition": "每周",
							"tasks": [
								[1678714807792, "可在其它端下载中下载该程序的其它端口的文件", false],
								[1678714929072, "可“清除本地缓存”重新加载提示内容", false],
								[1678715000000, "可查询程序相关内容", false],
							]
						},
						"多端同步功能": {
							"color": "rgba(0, 255, 255, 1.0)",
							"repetition": "每月",
							"tasks": [
								[1678714807792, "先在“我的”界面点击登录去注册账号", false],
								[1678714929072, "注意保存获取的ID和自己设置的密码", false],
								[1678715000000, "注意每个设备只能注册3个账号", false],
							]
						}
					}),

					uni.showToast({
						title: '初始化成功',
						duration: 2000,
						icon: 'none'
					});
			},

			isDel() {
				let that = this
				uni.showModal({
					title: '提示',
					content: '是否清除数据?',
					success: function(isok) {
						if (isok.confirm) {
							that.del()
						}
					}
				});
			},

			goToAUH() {
				uni.navigateTo({
					url: '/subpkg/appUpdateHistory/appUpdateHistory',
				})
			},

			goToAM() {
				uni.navigateTo({
					url: '/subpkg/aboutMe/aboutMe',
				})
			},

			async downPhoneApk(tmp) {
				if (this.local.message.urlApk === 'none' || this.local.message.urlZip === 'none') {
					return uni.showToast({
						title: '暂时不可下载',
						duration: 2000,
						icon: 'none'
					});
				}



				let url
				let str
				if (tmp === 0) {
					url = this.local.message.urlApk
					str = "手机端-安卓安装包"
				} else {
					url = this.local.message.urlZip
					str = "电脑端-Windows压缩包"
				}




				let that = this;
				await uni.showModal({
					title: '提示',
					content: '下载-' + str,
					success: function(res) {
						if (res.confirm) {
							const downloadTask = uni.downloadFile({
								url: url,
								success: res => {
									console.log(res)
									if (res.statusCode === 200) {
										that.isShowProgress = false;
										console.log('下载成功');
									}
									console.log(res.tempFilePath)
									uni.saveFile({
										tempFilePath: res.tempFilePath,
										success: function(red) {
											that.isShowProgress = false;
											uni.showModal({
												title: '提示',
												content: '文件已保存：' + red
													.savedFilePath,
												cancelText: '我知道了',
												confirmText: '打开文件',
												success: function(res) {
													if (res.confirm) {
														uni.openDocument({
															filePath: red
																.savedFilePath,
															success: (
																sus
																) => {
																console
																	.log(
																		'成功打开'
																		);
															}
														})
													}
												}
											});
										}
									});
								}
							})

							downloadTask.onProgressUpdate((res) => {
								if (res.progress > 0) {
									that.isShowProgress = true;
								}
								that.progress = res.progress;
							})

						}
					}
				});

			},
		},

		onLoad() {
			uni.setNavigationBarColor({
				frontColor: '#000000',
				backgroundColor: '#f5f5f5'
			})

			if (this.Sys.statusBarHeight === 0) {
				this.height = this.Sys.screenHeight - 115
			} else {
				this.height = this.Sys.safeArea.height - this.Sys.statusBarHeight - 35
			}
		}
	}
</script>

<style lang="scss" scoped>
	body {
		background-color: #f5f5f5;
	}

	page {
		background-color: #f5f5f5;
	}


	.progress-container {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 99;
		background: rgba(0, 0, 0, .2);
		width: 750rpx;
		height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;

		.progress-box {
			background: #FFFFFF;
			border-radius: 20rpx;
			padding: 30rpx;

			.text {
				margin-bottom: 20rpx;
			}
		}
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

	.bg {
		background-color: #f5f5f5;
	}

	.top {
		margin: 25rpx;
		border-radius: 20rpx;
		background-color: rgba(26, 115, 232, 1.0);
		display: flex;
		align-items: center;

		.user-portrait {
			.user-portrait-img {
				height: 120rpx;
				width: 120rpx;
				margin: 25rpx;
				border-radius: 50%;
				border: 5rpx solid white;
			}
		}

		.user-message {
			padding: 25rpx;
			color: white;

			.user-name {
				font-weight: bold;
				font-size: 35rpx;

			}

			.user-id {
				padding-top: 10rpx;
			}
		}
	}

	.pan {
		margin: 25rpx;
		border-radius: 20rpx;
		background-color: white;

		.pan-title {
			padding: 25rpx;
			font-weight: bold;
			font-size: 35rpx;
		}

		.pan-item {
			padding: 25rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
		}

		.pan-out {
			padding: 25rpx;
			display: flex;
			justify-content: space-around;
			align-items: center;
			color: red;
		}
	}
</style>