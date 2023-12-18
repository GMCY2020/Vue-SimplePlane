<template>
	<view class="box" :style="'background-color: ' + this.bgColor">
		<view class="box-left" @click="onClick()" :style="'background-color: ' + this.checkColor + '; border: 2px solid ' + this.checkColor" v-if="this.isCheck && this.isShowCheck">
			<uni-icons class="box-icon" type="checkmarkempty" size="25" color="white"/>
		</view>
		
		<view class="box-left" @click="onClick()" :style="'border: 2px solid ' + this.checkColor" v-if="!this.isCheck && this.isShowCheck">
			<uni-icons class="box-icon" type="checkmarkempty" size="25" color="rgba(0, 0, 0, 0)"/>
		</view>
		
		<text class="box-text1" @click="onText()" :style="'color:' + this.textColor" v-if="this.isCheck">{{this.myText}}</text>
		<text class="box-text2" @click="onText()" :style="'color:' + this.textColor" v-if="!this.isCheck">{{this.myText}}</text>
	</view>
</template>

<script>
	export default {
		name:"my-check",
		
		props: {
			// 复选框文本
			myText: {
				type: String,
				default: ''
			},
			
			// 是否勾选
			isCheck: { 
				type: Boolean,
				default: false
			},
			
			// 是否显示勾选框
			isShowCheck: {
				type: Boolean,
				default: false
			},
			
			// 背景色
			bgColor: {
				type: String,
				default: 'white'
				// default: 'rgba(0, 0, 255, 0.1)'
			},
			
			// 被勾选颜色
			checkColor: {
				type: String,
				default: 'blue'
			},
			
			// 复选框文本颜色
			textColor: {
				type: String,
				default: ''
			}
		},
		
		data() {
			return {
				
			};
		},
		
		methods: {
			// 绑定复选框点击事件
			onClick() {
				this.$emit('onClick')
			},
			
			onText() {
				this.$emit('onText')
			},
		}
	}
</script>

<style lang="scss">
	.box {
		border-radius: 25rpx;
		margin: 20rpx;
		padding: 15rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		
		.box-left {
			border-radius: 50%;
			display: flex;
			justify-content: center;
			align-items: center;
			margin-right: 25rpx;
		}
		
		.box-text1, .box-text2 {
			// width: 88%;
			width: 100%;
			font-size: 35rpx;
			
			// 文本显示 2 行，超出改省略号
			text-overflow: ellipsis;
			 
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
			
			display: -moz-box;
			-moz-line-clamp: 2;
			-moz-box-orient: vertical;
			
			overflow-wrap: break-word;
			word-break: break-all;
			white-space: normal;
			overflow: hidden;
		}
		
		.box-text1 {
			text-decoration: line-through;
		}
	}
</style>