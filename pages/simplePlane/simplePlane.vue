<template>
	<view
		style="position: absolute; top: -50px; z-index: 9999; width: 100%; height: 50px; -webkit-app-region: drag; margin-left: 50px;" />

	<block v-if="true">
		<uni-collapse ref="collapse">
			<uni-collapse-item class="item" title="未完成" title-border="false" open @click="freshHeight()"
				v-if="this.countClick !== this.countAll">
				<block v-for="(parts, parts_index) in this.data" :key="parts_index">
					<block v-for="(part, part_index) in parts['tasks']" :key="part_index">
						<my-check :myText="part[1]" :isCheck="part[2]" :checkColor="parts.color"
							:isShowCheck="this.show" @onClick="onClick(parts_index, part_index)" v-if="!part[2]" />
					</block>
				</block>
			</uni-collapse-item>
			<uni-collapse-item class="item" title="已完成" title-border="false" @click="freshHeight()"
				v-if="this.countClick !== 0">
				<block v-for="(parts, parts_index) in this.data" :key="parts_index">
					<block v-for="(part, part_index) in parts['tasks']" :key="part_index">
						<my-check :myText="part[1]" :isCheck="part[2]" :checkColor="parts.color"
							:isShowCheck="this.show" @onClick="onClick(parts_index, part_index)" v-if="part[2]" />
					</block>
				</block>
			</uni-collapse-item>
		</uni-collapse>
	</block>
	<block v-else>
		<view style="display: flex; justify-content: center; align-items: center; font-size: 60rpx;">
			<text>程序停用中</text>
		</view>
	</block>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'

	export default {
		computed: {
			...mapState('m_sp', ['isLoad', 'Sys', 'user', 'data', 'local', 'baseUrl']),

			countClick() {
				let count = 0
				for (let parts in this.data) {
					for (let part in this.data[parts]['tasks']) {
						if (this.data[parts]['tasks'][part][2]) {
							count += 1
						}
					}
				}

				return count
			},

			countAll() {
				let count = 0
				for (let parts in this.data) {
					for (let part in this.data[parts]['tasks']) {
						count += 1
					}
				}

				return count
			}
		},


		data() {
			return {
				height: 0,
				show: true,
			}
		},

		methods: {
			...mapMutations('m_sp', ['updateUser', 'updateIsLoad', 'updateData', 'updateLocal']),

			onClick(parts_index, part_index) {
				this.data[parts_index]['tasks'][part_index][2] = !this.data[parts_index]['tasks'][part_index][2]
				this.data.changeTime = Date.now()
				this.updateData(this.data)

				this.freshHeight()
			},

			freshHeight() {
				if (this.local.isAppAlive) {
					this.$nextTick(() => {
						this.$refs.collapse.resize();
					});
				}

			},

			freshData_local() {
				let that = this
				uni.request({
					url: that.baseUrl + "Login",
					data: {
						user_id: this.user.user_id,
						user_password: this.user.user_password
					},
					success(res) {
						if (res.data.success === false) return uni.showToast({
							title: "云服务器请求次数超限制",
							duration: 2000,
							icon: 'none'
						});
						let localTime = that.data.changeTime
						let airTime = res.data.data.changeTime

						if (airTime > localTime) {
							that.updateData(res.data.data)
							uni.showToast({
								title: "更新本地成功",
								duration: 2000,
								icon: 'none'
							});
						} else if (airTime === localTime) {} else {
							that.freshData_air()
						}
						uni.stopPullDownRefresh();


					},
					fail(err) {}
				})
			},

			async freshData_air() {
				let that = this
				await uni.request({
					url: that.baseUrl + "SetData",
					data: {
						_id: that.user._id,
						user_id: that.user.user_id,
						user_name: that.user.user_name,
						user_password: that.user.user_password,
						data: JSON.stringify(that.data)
					},
					success(res) {
						uni.showToast({
							title: "更新云端成功",
							duration: 2000,
							icon: 'none'
						});
					},
					fail(err) {}
				})

			},

			getDetailDay(date) {
				let time = new Date(date)
				let s = time.getSeconds()

				if (s.toString().split('').length === 1) {
					s = '0' + s
				}

				let res = time.getFullYear().toString() + '年' + (time.getMonth() + 1) + '月' + time.getDate() + '日 ' + time
					.getHours() + ':' + time.getMinutes() + ':' + s

				return res
			},

			freshTimeTest() {
				let weeks = ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
				let date = new Date()
				let year = date.getFullYear()
				let month = date.getMonth() + 1
				let day = date.getDate()
				let hours = date.getHours()
				let minutes = date.getMinutes()
				let seconds = date.getSeconds()
				let week_index = date.getDay()
				let week = weeks[week_index]
				// console.log(week_index)

				let changeTimes = {
					"everyDay": null,
					"everyWeek": null,
					"everyTwoWeek:": null,
					"everyMonth": null
				}
			},

			freshTime() {
				let nowTime = Date.now()

				for (let parts_index in this.data) {
					if (parts_index !== 'changeTime') {
						let show = false;
						if (this.data[parts_index]['repetition'] === '每天' && nowTime > this.data['changeTimes'][
								'everyDay'
							]) {
							for (let part_index in this.data[parts_index]['tasks']) {
								this.data[parts_index]['tasks'][part_index][2] = false
							}

							var newEveryDay = this.data['changeTimes']['everyDay']
							while (newEveryDay < nowTime) {
								newEveryDay += 86400000
							}

							this.data['changeTimes']['everyDay'] = newEveryDay
							show = true
						} else if (this.data[parts_index]['repetition'] === '每周' && nowTime > this.data['changeTimes'][
								'everyWeek'
							]) {
							for (let part_index in this.data[parts_index]['tasks']) {
								this.data[parts_index]['tasks'][part_index][2] = false
							}

							var newEveryWeek = this.data['changeTimes']['everyWeek']
							while (newEveryWeek < nowTime) {
								newEveryWeek += (86400000 * 7)
							}
							this.data['changeTimes']['everyWeek'] = newEveryWeek
							show = true

						} else if (this.data[parts_index]['repetition'] === '每月' && nowTime > this.data['changeTimes'][
								'everyMonth'
							]) {
							for (let part_index in this.data[parts_index]['tasks']) {
								this.data[parts_index]['tasks'][part_index][2] = false
							}

							var newEveryDay = this.data['changeTimes']['everyMonth']

							let date = new Date();
							date.setMonth(date.getMonth() + 1); // 先设置为下个月
							date.setDate(0); // 再置0，变成当前月最后一天
							let num = date.getDate();

							while (newEveryDay < nowTime) {
								newEveryDay += (86400000 * num)
							}
							this.data['changeTimes']['everyMonth'] = newEveryDay
							show = true
						}
						if (show) {
							uni.showToast({
								title: "重置成功",
								duration: 2000,
								icon: 'none'
							});
						}
					}
				}
			}
		},

		async onShow() {
			let res = await uni.getNetworkType()

			if (res.networkType === 'none') return uni.showToast({
				title: "请连接网络",
				duration: 2000,
				icon: 'none'
			});

			if (this.isLoad === '1') {
				this.freshData_local()
				this.freshTime()
				this.freshData_local()
			} else {
				this.freshTime()
			}

			this.freshHeight()
		},

		onLoad() {
			uni.setNavigationBarTitle({
				title: '简计'
			});

			uni.setNavigationBarColor({
				frontColor: '#000000',
				backgroundColor: '#f5f5f5'
			})


			if (this.Sys.statusBarHeight === 0) {
				this.height = this.Sys.screenHeight - 115
			} else {
				this.height = this.Sys.safeArea.height - this.Sys.statusBarHeight - 35
			}
			this.freshHeight()
		},

		async onPullDownRefresh() {
			let res = await uni.getNetworkType()

			if (res.networkType === 'none') return uni.showToast({
				title: "请连接网络",
				duration: 2000,
				icon: 'none'
			});

			if (this.isLoad === '1') {
				this.freshData_local()
				this.freshTime()
				this.freshData_local()
			} else {
				uni.stopPullDownRefresh();
				return uni.showToast({
					title: "请先登录",
					duration: 2000,
					icon: 'none'
				});
			}

			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 2000);
		}
	}
</script>

<style lang="scss">
	body {}

	page {}

	page ::v-deep .uni-page-head {}

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
		padding: 25rpx;
		background-color: #f5f5f5;
	}

	// 折叠面板样式
	.item ::v-deep .uni-collapse-item__title-box {
		background-color: #f5f5f5;
	}

	.item ::v-deep .uni-collapse-item__wrap {
		background-color: #f5f5f5;
	}

	.item ::v-deep .uni-collapse-item__title {
		background-color: #f5f5f5;
	}

	.item ::v-deep .uni-collapse-item__title-text {
		font-size: 35rpx;
	}
</style>