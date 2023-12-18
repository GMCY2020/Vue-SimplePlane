<template>
	<view
		style="position: absolute; top: -50px; z-index: 9999; width: 100%; height: 50px; -webkit-app-region: drag; margin-left: 50px;" />
	<block v-if="true">
		<uni-collapse ref="collapse">
			<block v-for="(parts, parts_index) in this.data" :key="parts_index">
				<view style="display: flex;" v-if="this.data[parts_index] && getPartsCount(parts_index) !== 0">
					<view :style="'background-color: ' + parts['color'] + '; color: ' + parts['color']">.</view>
					<uni-collapse-item class="item" titleBorder="false" open :title="parts_index"
						@click="freshHeight()">
						<block v-for="(part, part_index) in parts['tasks']" :key="part_index">
							<my-check :myText="part[1]" :checkColor="parts.color"
								@onText="onText(parts_index, part_index)" v-if="part" />
						</block>
					</uni-collapse-item>
				</view>
			</block>
		</uni-collapse>

		<uni-fab ref="fab" :pattern="this.pattern" horizontal="right" @fabClick="fabClick" />
	</block>
	<block v-else>
		<view style="display: flex; justify-content: center; align-items: center; font-size: 60rpx;">
			<text>程序停用中</text>
		</view>
	</block>

	<uni-popup ref="showChageTask" @change="changeT">
		<view class="changeTask">
			<view class="top">
				<view class="parts-1" style="background-color: white" @click="changeClassShow()">
					{{this.index.parts_index}}
					<uni-icons class="parts-icons" type="bottom"></uni-icons>
				</view>
				<view class="task-time">
					{{this.index.time}}
				</view>
			</view>

			<view class="task-detail">
				<textarea class="task-detail-text" auto-height v-model="this.task_detail"></textarea>
			</view>

			<view class="btn">
				<view class="btn-cancel" type="default" @click="changeTaskCancel()">取消</view>
				<view class="btn-del" type="default" @click="changeTaskDel()" v-if="this.TaskChange !== null">删除</view>
				<view class="btn-confirm" type="default" @click="changeTaskConfirm()">确认</view>
			</view>
		</view>
	</uni-popup>

	<uni-popup class="t1" ref="showChageClass" mask-background-color="rgba(255, 255, 255, 0)">
		<view class="chageClass">
			<block v-for="(parts, parts_index) in this.data" :key="parts_index">
				<view class="class-item" @click="changeClass(parts_index)" @longpress="newClass(parts_index)"
					v-if="parts && parts_index !== 'changeTime' && parts_index !== 'changeTimes'">
					<view class="class-color" :style="'background-color: ' + parts['color']"></view>
					<view class="class-btn" style="color: blue" v-if="parts_index === this.index.parts_index">
						<view>
							{{parts_index}}
						</view>
					</view>
					<view class="class-btn" v-else>
						<view>
							{{parts_index}}
						</view>
					</view>
				</view>
			</block>
			<view class="class-item">
				<view class="class-color"></view>
				<view class="class-btn" @click="newClass('new')">
					新建
				</view>
			</view>
		</view>
	</uni-popup>

	<uni-popup ref="newClass">
		<view class="newClass">
			<view class="title" v-if="this.ClassChange === 'new' || this.ClassChange === null">
				新建类别
			</view>
			<view class="title" v-else>
				类别编辑
			</view>
			<view class="choice-color">
				<block v-for="(item, i) in this.newColorList" :key="i">
					<view class="color-detail" :style="'background-color: ' + item" @click="changeColor(item)">
						<view class="newColor" v-if="item === this.newClassColor"></view>
					</view>
				</block>
			</view>

			<view class="choice-time">
				<block v-for="(item, index) in this.newClassRepetitions" :key="index">
					<view class="time-detail-1" @click="changeClassTime(item)" v-if="item === this.newClassRepetition">
						{{item}}
					</view>
					<view class="time-detail-2" @click="changeClassTime(item)" v-else>
						{{item}}
					</view>
				</block>
			</view>


			<view class="class-detail">
				<textarea class="class-detail-text" placeholder="新类别名称" auto-height
					v-model="this.newClassName"></textarea>
			</view>
			<view class="class-btn">
				<view class="btn-cancel" @click="newClassCancel()">
					取消
				</view>
				<view class="btn-del" @click="delClass(this.ClassChange)" v-if="this.ClassChange !== 'new'">
					删除
				</view>
				<view class="btn-confirm" @click="newClassSave()">
					确认
				</view>
			</view>
		</view>
	</uni-popup>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'

	export default {
		computed: {
			...mapState('m_sp', ['isLoad', 'Sys', 'user', 'data', 'local']),
		},

		data() {
			return {
				height: 0,
				show: false,

				// 悬浮按钮配置项
				pattern: {
					color: '#7A7E83', // 文字默认颜色
					backgroundColor: '#fff', // 文字选中时的颜色
					selectedColor: '#007AFF', // 背景色
					buttonColor: '#007AFF', // 按钮背景色
					iconColor: '#fff'
				},

				index: {
					part_index: null,
					parts_index: null,
					time: null
				},
				task_detail: null,
				TaskChange: null,
				class_detail: null,
				newColorList: [
					'rgba(86, 74, 244, 1)',
					'rgba(255, 0, 255, 1.0)',
					'rgba(170, 255, 255, 1.0)',
					'rgba(0, 255, 255, 1.0)',
					'rgba(85, 0, 127, 1.0)'
				],
				newClassColor: 'rgba(255, 0, 255, 1.0)',
				newClassName: null,
				newClassRepetitions: ['无', '每天', '每周', '每月'],
				newClassRepetition: '无',
				ClassChange: null,
			}
		},

		methods: {
			...mapMutations('m_sp', ['updateUser', 'updateIsLoad', 'updateData']),

			freshHeight() {
				if (this.local.isAppAlive) {
					this.$nextTick(() => {
						this.$refs.collapse.resize();
					});
				}
			},

			fabClick() {
				this.task_detail = ''

				this.index = {
					parts_index: '日常',
					part_index: this.getPartsCount('日常'),
					time: this.getDetailDay(Date.now())
				}

				this.$refs.showChageTask.open('top')
			},

			changeClassShow() {
				this.class_detail = this.index.parts_index
				this.$refs.showChageClass.open('top')
			},

			changeClassCancel() {
				this.$refs.showChageClass.close()
			},

			changeClass(parts_index) {
				this.index.parts_index = parts_index
				this.index.part_index = this.getPartsCount(this.index.parts_index)
				this.changeClassCancel()
			},

			onText(parts_index, part_index) {
				this.TaskChange = {
					parts_index: parts_index,
					part_index: part_index
				}
				this.task_detail = this.data[parts_index]['tasks'][part_index][1]

				this.index = {
					parts_index: parts_index,
					part_index: part_index,
					time: this.getDetailDay(this.data[parts_index]['tasks'][part_index][0]),
				}

				this.$refs.showChageTask.open('top')

			},

			changeT(e) {
				if (!e.show) {
					this.TaskChange = null
				}
			},

			changeTaskCancel() {
				this.$refs.showChageTask.close()
			},

			changeTaskDel() {
				let newArr = []

				let newI = 0

				for (let i = 0; i < this.data[this.index.parts_index]['tasks'].length; i += 1) {
					if (this.index.part_index !== i) {
						newArr[newI] = this.data[this.index.parts_index]['tasks'][i]
						newI += 1
					}
				}

				this.data[this.index.parts_index]['tasks'] = newArr
				this.data.changeTime = Date.now()

				this.updateData(this.data)

				uni.showToast({
					title: '删除成功',
					duration: 2000,
					icon: 'none'
				});


				this.freshHeight()
				this.$refs.showChageTask.close()
			},

			changeTaskConfirm() {
				if (this.task_detail === null || this.task_detail === '') {
					return uni.showToast({
						title: '新任务不能为空',
						duration: 2000,
						icon: 'none'
					})
				}

				let textShow = ''

				if (!this.TaskChange) {
					this.data[this.index.parts_index]['tasks'][this.index.part_index] = [
						Date.now(),
						this.task_detail,
						false
					]
					textShow = '添加新任务成功'
				} else if (this.TaskChange.parts_index === this.index.parts_index) {
					if (this.task_detail === this.data[this.index.parts_index]['tasks'][this.index.part_index][1]) {
						textShow = '类别未变'
					} else {
						this.data[this.index.parts_index]['tasks'][this.index.part_index] = [
							Date.now(),
							this.task_detail,
							false
						]
						textShow = '更改任务成功'
					}
				} else {
					// 要变的
					this.data[this.index.parts_index]['tasks'][this.index.part_index] = [
						Date.now(),
						this.task_detail,
						false
					]

					let lt = []
					let i = 0
					for (let item in this.data[this.TaskChange.parts_index]['tasks']) {
						if (parseInt(item) !== this.TaskChange.part_index) {
							lt[i] = this.data[this.TaskChange.parts_index]['tasks'][item]
							i += 1
						}
					}
					delete this.data[this.TaskChange.parts_index]['tasks'][this.TaskChange.part_index]
					this.data[this.TaskChange.parts_index]['tasks'] = lt
					textShow = '更改任务类别成功'

				}

				this.data.changeTime = Date.now()

				this.updateData(this.data)

				uni.showToast({
					title: textShow,
					duration: 2000,
					icon: 'none'
				});
				this.freshHeight()
				this.$refs.showChageTask.close()
			},

			getPartsCount(parts_index) {
				let count = 0
				for (let part in this.data[parts_index]['tasks']) {
					count += 1
				}
				return count
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

			newClass(parts_index) {
				if (parts_index === '日常') {
					return uni.showToast({
						title: '不能编辑基础类别',
						duration: 2000,
						icon: 'none'
					});
				} else if (parts_index === 'new') {
					this.newClassColor = 'rgba(255, 0, 255, 1.0)'
					this.newClassName = null
					this.newClassRepetition = '无'
				} else {
					this.newClassColor = this.data[parts_index]['color']
					this.newClassName = parts_index
					this.newClassRepetition = this.data[parts_index]['repetition']
				}

				this.ClassChange = parts_index
				this.$refs.newClass.open()
			},

			changeColor(newClassColor) {
				this.newClassColor = newClassColor
			},

			newClassCancel() {
				this.$refs.newClass.close()
			},


			newClassSave() {
				// 新建
				if (this.ClassChange === 'new' || this.ClassChange === null) {
					if (this.newClassName === '日常') {
						return uni.showToast({
							title: '不能为基础类别名称',
							duration: 2000,
							icon: 'none'
						});
					}
					let partName = this.newClassName

					let newPart = {
						color: this.newClassColor,
						repetition: this.newClassRepetition,
						tasks: []
					}

					this.data['changeTime'] = Date.now()
					this.data[partName] = newPart

					uni.showToast({
						title: '新建类别成功',
						duration: 2000,
						icon: 'none'
					});
					this.updateData(this.data)
					this.$refs.newClass.close()
				}
				// 非新建
				else {
					// 名称未更改
					if (this.ClassChange === this.newClassName) {
						this.data['changeTime'] = Date.now()
						this.data[this.newClassName]['color'] = this.newClassColor
						this.data[this.newClassName]['repetition'] = this.newClassRepetition
						this.updateData(this.data)
						this.$refs.newClass.close()
					} else {
						this.data['changeTime'] = Date.now()

						this.data[this.newClassName] = {
							'color': this.newClassColor,
							'repetition': this.newClassRepetition,
							'tasks': this.data[this.ClassChange]['tasks']
						}

						delete this.data[this.ClassChange]
						this.updateData(this.data)
						this.$refs.newClass.close()
					}
				}
			},

			delClass(className) {
				if (className === '日常') {
					return uni.showToast({
						title: '该类别不能删除',
						duration: 2000,
						icon: 'none'
					});
				}

				let that = this
				uni.showModal({
					title: '提示',
					content: '该类别下的任务会添加到日常\n确认删除?',
					success: function(res) {
						if (res.confirm) {
							that.index.parts_index = '日常'
							that.index.part_index = that.getPartsCount('日常')
							that.index.time = that.getDetailDay(Date.now())


							for (let task in that.data[className]['tasks']) {
								that.data['日常']['tasks'][that.getPartsCount('日常')] = that.data[className][
									'tasks'
								][task]
							}

							delete that.data[className]
							that.data['changeTime'] = Date.now()
							that.updateData(that.data)
							that.$refs.newClass.close()
							// console.log(that.data)
						}
					}
				});
			},

			showData() {
				console.log(this.data)
				let c = 0
				for (let d in this.data) {
					for (let t in this.data[d]['tasks']) {
						// console.log(this.data[d]['tasks'][t])
						if (this.data[d]['tasks'][t] === null) {
							c += 1
							delete this.data[d]['tasks'][t]
						}
					}
					if (this.data[d]['tasks']) {
						this.data[d]['tasks'].length -= c
					}
					c = 0
				}

				console.log(this.data)
			},

			changeClassTime(item) {
				if (this.newClassRepetition !== item) {
					this.newClassRepetition = item
				}
			}
		},

		onShow() {
			this.freshHeight()
		},

		onLoad() {
			uni.setNavigationBarTitle({
				title: '分类'
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
		display: none;
	}

	::-webkit-scrollbar {
		width: 0;
		height: 0;
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

	.item {
		width: 100%;
	}

	.t1 {
		position: absolute;
	}

	.chageClass {
		width: min-content;
		background-color: white;
		color: rgba(0, 0, 0, 1.0);
		margin: 30rpx;
		border-radius: 25rpx;
		padding: 10rpx;


		.class-item {
			display: flex;
			align-items: center;
			border-radius: 15rpx;
			margin-top: 15rpx;
			margin-bottom: 15rpx;
			margin-right: 10rpx;
			font-weight: bold;

			.class-btn {
				width: max-content;
			}

			.class-color {
				width: 40rpx;
				height: 40rpx;
				border-radius: 15rpx;
				margin-left: 10rpx;
				margin-right: 25rpx;
			}
		}

		.class-btn {
			padding: 10rpx;
		}
	}

	.changeTask {
		.top {
			margin: 25rpx;
			display: flex;
			justify-content: space-between;

			.parts-1 {
				padding: 10rpx;
				padding-left: 25rpx;
				padding-right: 25rpx;
				margin: 25rpx;
				margin-bottom: 0rpx;
				margin-left: 5rpx;
				border-radius: 25rpx;

				opacity: 0.8;

				display: flex;
				align-items: center;

				.parts-icons {
					margin-left: 25rpx;
				}
			}

			.task-time {
				padding: 10rpx;
				padding-left: 25rpx;
				padding-right: 25rpx;
				margin: 25rpx;
				margin-bottom: 0rpx;
				margin-right: 5rpx;
				border-radius: 25rpx;
				background-color: white;
			}
		}

		.task-detail {
			background-color: white;
			margin: 25rpx;
			padding: 25rpx;
			border-radius: 25rpx;

			.task-detail-text {
				font-size: 35rpx;
			}
		}

		.btn {
			display: flex;
			margin: 20rpx;
			justify-content: space-between;

			.btn-cancel,
			.btn-del,
			.btn-confirm {
				width: 25%;
				color: black;
				padding: 25rpx;
				padding-top: 15rpx;
				padding-bottom: 15rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				border-radius: 15rpx;
				font-size: 40rpx;
			}

			.btn-cancel {
				background-color: #bdbdbd;
			}

			.btn-del {
				background-color: #ff0000;
			}

			.btn-confirm {
				background-color: #0055ff;
			}
		}
	}

	.newClass {
		background-color: white;
		border-radius: 25rpx;
		padding: 15rpx;

		.choice-color {
			display: flex;

			.color-detail {
				display: flex;
				justify-content: center;
				align-items: center;
				width: 70rpx;
				height: 70rpx;
				border-radius: 50%;
				margin: 25rpx;

				.newColor {
					width: 40rpx;
					height: 40rpx;
					border-radius: 50%;
					background-color: black;
				}
			}
		}

		.choice-time {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			margin: 25rpx;

			.time-detail-1 {
				padding: 25rpx;
				margin-bottom: 10rpx;
				background-color: #0055ff;
				border-radius: 25rpx;
			}

			.time-detail-2 {
				padding: 25rpx;
				margin-bottom: 10rpx;
				background-color: #cccccc;
				border-radius: 25rpx;
			}
		}

		.class-detail {
			padding: 10rpx;
			margin: 15rpx;
			border: 1rpx solid rgba(204, 204, 204, 0.7);
			border-radius: 5rpx;

			.class-detail-text {
				font-size: 35rpx;
			}
		}

		.class-btn {
			display: flex;
			justify-content: space-between;
			padding: 25rpx;

			.btn-cancel,
			.btn-del,
			.btn-confirm {
				padding: 25rpx;
				padding-left: 50rpx;
				padding-right: 50rpx;
				border-radius: 25rpx;
				font-size: 35rpx;
			}

			.btn-cancel {
				background-color: #bdbdbd;
			}

			.btn-del {
				background-color: #ff0000;
			}

			.btn-confirm {
				background-color: #0055ff;
			}
		}
	}

	.line::after {
		content: '';
		width: 90%;
		height: 1px;
		display: block;
		margin: 0 auto;
		border-bottom: 1px solid #cccccc;
		padding: 1px;
	}
</style>