<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'

	export default {
		computed: {
			...mapState('m_sp', ['isLoad', 'Sys', 'user', 'local', 'data', 'baseUrl']),
		},

		methods: {
			...mapMutations('m_sp', ['updateIsLoad', 'updateSys', 'updateUser', 'updateLocal', 'updateData']),

			init() {
				if (this.isLoad === null) {
					this.updateIsLoad('0')
				}

				if (this.Sys === null) {
					this.updateSys(uni.getSystemInfoSync())
				}

				if (this.user === null) {
					this.updateUser({
						'_id': null,
						'user_id': null,
						'user_password': null,
						'user_name': null
					})
				}

				if (this.local === null) {
					this.updateLocal({
						"registerCounts": 3,
						"isAppAlive": false,
						"message": null,
					})
				}

				if (this.data === null) {
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
					})

					uni.showToast({
						title: '初始化成功',
						duration: 2000,
						icon: 'none'
					});
				}
			},
		},

		onLaunch: function() {

		},

		onShow: function() {
			this.init()

			let that = this
			uni.request({
				url: that.baseUrl + "isAppAlive",
				success(res) {
					that.local.isAppAlive = res.data
					that.updateLocal(that.local)
				},
				fail(err) {
				}
			})

			uni.request({
				url: that.baseUrl + "getMessage",
				success(res) {
					that.local.message = res.data
					that.updateLocal(that.local)
				},
				fail(err) {}
			})
			console.log('App Show')
		},

		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	body,
	html {
		background-color: #f5f5f5;
	}
</style>