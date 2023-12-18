<template>
	<view class="t"
		style="position: relative; top: -50px; z-index: 9999; width: 100%; height: 50px; -webkit-app-region: drag; margin-left: 50px;" />
	<view class="title">
		欢迎注册
	</view>

	<view class="input">
		<view class="input-item">
			<view class="str">
				用户名:
			</view>
			<view class="input-item-detail">
				<input type="text" v-model="name">
				<view class="line" />
			</view>
		</view>
		<view class="input-item">
			<view class="str">
				密码:
			</view>
			<view class="input-item-detail">
				<input type="text" v-model="password1" password maxlength="20">
				<view class="line" />
			</view>
		</view>

		<view class="input-item">
			<view class="str">
				确认密码:
			</view>
			<view class="input-item-detail">
				<input type="text" v-model="password2" password>
				<view class="line" />
			</view>
		</view>
	</view>

	<view class="btn">
		<button class="btn-detail-1" type="default"
			v-if="this.name === '' || this.password1 === '' || this.password2 === ''">注册</button>
		<button class="btn-detail-2" type="default" @click="Register()" v-else>注册</button>
	</view>

	<view class="showRegisterCounts">
		剩余可注册次数: {{this.local["registerCounts"]}}
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'

	export default {
		computed: {
			...mapState('m_sp', ['isLoad', 'user', 'Sys', 'local', 'data']),
		},

		data() {
			return {
				height: 0,
				name: "",
				password1: "",
				password2: "",
			}
		},

		methods: {
			...mapMutations('m_sp', ['updateLocal']),

			Register() {
				if (this.password1 !== this.password2) {
					uni.showToast({
						title: '密码不相同',
						duration: 2000,
						icon: 'none'
					});
				} else if (this.local["registerCounts"] <= 0) {
					uni.showToast({
						title: '可注册次数为0',
						duration: 2000,
						icon: 'none'
					});
				} else {
					this.rg()
				}
			},

			rg() {
				let that = this
				uni.request({
					url: that.baseUrl + "Register",
					data: {
						user_password: this.password1,
						user_name: this.name,
						data: JSON.stringify(this.data),
					},
					success(res) {
						if (res.data.success === false) return uni.showToast({
							title: "云服务器请求次数超限制",
							duration: 2000,
							icon: 'none'
						});

						if (res.data !== "err") {
							that.local["registerCounts"] = that.local["registerCounts"] - 1
							that.updateLocal(that.local)
							setTimeout(that.showId(res.data), 2000)

						}
					}
				})
			},

			showId(id) {
				uni.showModal({
					title: '注册成功',
					content: '请保存好\n唯一id:' + id,
					showCancel: false,
					success: function(isok) {
						if (isok.confirm) {
							uni.navigateBack()
						}
					}
				});
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
		},
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

		margin-top: 200rpx;
	}

	.input {
		margin: 50rpx;

		.input-item {
			display: flex;
			padding: 25rpx;
			justify-content: right;

			.input-item-detail {
				width: 70%;
				margin-left: 20rpx;

			}
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

	.showRegisterCounts {
		padding: 25rpx;
		color: #cccccc;
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