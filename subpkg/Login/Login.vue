<!-- 登录界面 -->
<template>
	<view
		style="position: absolute; top: -50px; z-index: 9999; width: 100%; height: 50px; -webkit-app-region: drag; margin-left: 50px;" />
	<view class="title">
		欢迎登录
	</view>

	<view class="login-input">
		<input class="login-input-detail" type="text" placeholder="账号" v-model="id">
		<view class="line" />
		<input class="login-input-detail" type="text" placeholder="密码" v-model="password" password>
		<view class="line" />
	</view>

	<view class="btn">
		<button class="btn-detail-1" type="default" v-if="this.id === '' || this.password === ''">登录</button>
		<button class="btn-detail-2" type="default" @click="Login()" v-else>登录</button>
	</view>

	<view class="other">
		<view class="other-left" @click="goToRegister()">
			注册
		</view>
		|
		<view class="other-right">
			说明
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
			...mapState('m_sp', ['isLoad', 'user', 'Sys', 'data', 'baseUrl']),
		},

		data() {
			return {
				height: 800,
				id: "",
				password: "",
			}
		},


		methods: {
			...mapMutations('m_sp', ['updateUser', 'updateIsLoad', 'updateData']),


			Login() {
				let that = this
				uni.request({
					url: that.baseUrl +
						"Login",
					data: {
						user_id: this.id,
						user_password: this.password
					},
					success(res) {
						if (res.data.success === false) return uni.showToast({
							title: "云服务器请求次数超限制",
							duration: 2000,
							icon: 'none'
						});

						if (res.data === "err") {
							uni.showToast({
								title: '账号密码错误',
								duration: 2000,
								icon: 'none'
							});
						} else {
							that.updateIsLoad("1")

							that.updateUser({
								'_id': res.data._id,
								'user_id': res.data.user_id,
								'user_password': res.data.user_password,
								'user_name': res.data.user_name
							})

							uni.showToast({
								title: '登录成功',
								duration: 2000,
								icon: 'none'
							});

							uni.showModal({
								title: '同步设置',
								content: '本地: 本地同步云端的数据\n云端: 云端同步本地的数据',
								confirmText: '本地',
								cancelText: '云端',
								success: function(isChangeData) {
									if (isChangeData.confirm) {
										for (let d in res.data.data) {
											that.data[d] = res.data.data[d]
										}

										let c = 0
										for (let d in that.data) {
											for (let t in that.data[d]['tasks']) {
												if (that.data[d]['tasks'][t] === null) {
													c += 1
													delete that.data[d]['tasks'][t]
												}
											}
											if (that.data[d]['tasks']) {
												that.data[d]['tasks'].length -= c
											}
											c = 0
										}

										that.updateData(that.data)

										that.updateData(res.data.data)
										uni.showToast({
											title: '本地同步云端的数据成功',
											duration: 2000,
											icon: 'none'
										});
									} else if (isChangeData.cancel) {
										that.freshData_air()
									}
								},
								complete() {
									uni.navigateBack()
								}
							});


						}
					},
					fail(err) {
						console.log(err)
					}
				})
				this.updateData(this.data)

			},

			goToRegister() {
				uni.navigateTo({
					url: "../../subpkg/register/register"
				})
			},

			freshData_air() {
				let that = this
				uni.request({
					url: that.baseUrl + "Update",
					data: {
						_id: this.user._id,
						data: JSON.stringify(this.data)
					},
					success(res) {
						uni.showToast({
							title: '云端同步本地的数据成功',
							duration: 2000,
							icon: 'none'
						});
					},
					fail(err) {}
				})
			}
		},

		onLoad() {
			uni.setNavigationBarColor({
				frontColor: '#000000',
				backgroundColor: '#f5f5f5'
			})
			if (this.Sys.statusBarHeight === 0) {
				this.height = this.Sys.screenHeight - 50
			} else {
				this.height = this.Sys.safeArea.height - this.Sys.statusBarHeight
			}
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

	.bg {
		background-color: #f5f5f5;
	}

	.title {
		display: flex;
		justify-content: center;
		font-size: 40rpx;
		font-weight: bold;
	}


	.login-input {
		margin: 50rpx;

		.login-input-detail {
			padding: 25rpx;
		}
	}

	.btn {
		padding: 25rpx;

		.btn-detail-1 {
			background-color: #eeeff2;
			color: #c0c5c8;
		}

		.btn-detail-2 {
			background-color: #3b86e8;
			color: white;
		}
	}

	.other {
		display: flex;
		padding: 25rpx;
		justify-content: center;
		color: #aeb2b4;

		.other-left {
			padding-right: 25rpx
		}

		.other-right {
			padding-left: 25rpx
		}
	}

	.line::after {
		content: '';
		width: 100%;
		height: 1px;
		display: block;
		margin: 0 auto;
		border-bottom: 1px solid #cccccc;
		padding: 1px;
	}
</style>