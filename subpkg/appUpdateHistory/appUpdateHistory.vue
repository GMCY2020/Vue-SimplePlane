<template>
	<view style="position: absolute; top: -50px; z-index: 9999; width: 100%; height: 50px; -webkit-app-region: drag; margin-left: 50px;"/>
	<view>
		<view class="app-all">
			<view class="app-item">
				<view class="app-ver" style="font-size: 40rpx">
					版本-1.1.0
				</view>
				<view class="app-message" style="font-size: 35rpx">
					<text>2023年04月01日-程序改名为简计</text>
					<text>2023年04月01日-重新设计程序logo</text>
					<text>2023年04月01日-发布线上版本1.1.0</text>
					<text>\n</text>
					
					<text>更新相关内容</text>
					<text>1.首页-添加可关闭通知横幅</text>
					<text>2.首页-联网并登录状态下，“下拉刷新”和“onshow(展示)"将会同步云端和本地的数据</text>
					<text>3.首页-“onshow(展示)"将会根据设定的时间(每天3:00为节点)刷新任务的状态</text>
					<text>4.数据-重新设计，可进行“任务新建”，“任务删除”，“任务内容修改”，“任务类别切换”，“新建类别”，“更改类别详细”等操作</text>
					<text>5.分类-新增tabBar，对任务数据进行操作的界面</text>
					<text>6.我的-删除“字体大小设置”功能</text>
					<text>7.我的-删除“每日重复开关”功能，默认登录时开启</text>
					<text>8.我的-新增其它端口下载板块</text>
					<text>9.修复若干Bug等。</text>
				</view>
			</view>
			
			<view class="app-item">
				<view class="app-ver" style="font-size: 40rpx">
					版本-1.0.1
				</view>
				<view class="app-message"  style="font-size: 35rpx">
					<text>2023年01月17日-发布线上版本1.0.1</text>
					<text>\n</text>
					<text>发现的Bug-1.0.0</text>
					<text>1.任务文字过多时错位</text>
					<text>2.第一次打开小程序未完成的任务转为完成的任务后“已完成”面板不显示，需要重新进入小程序</text>
					<text>\n</text>
					
					<text>更新相关内容</text>
					<text>1.更换开发环境-程序重新编写</text>
					<text>2.加入tabBar，添加“首页”界面和“我的”界面</text>
					<text>3.背景色从白色(white)更换为白灰(#f5f5f5)</text>
					<text>4.“简计”移到“首页”</text>
					<text>5.简计-添加了悬浮按钮，点击可添加新的代办任务</text>
					<text>6.简计-实现任务文本显示的自适应</text>
					<text>7.简计-点击任务的文本区域可重新编辑任务</text>
					<text>8.简计-每日重复开关移到“我的”设置</text>
					<text>9.我的-展示程序基本信息</text>
					<text>10.我的-加入“设置”面板和“程序信息”面板</text>
					<text>11.我的-“设置”加入“简计”每日重复开关</text>
					<text>12.我的-“设置”加入全局“字体大小设置”功能</text>
					<text>13.我的-“设置”加入“清空缓存”功能</text>
					<text>14.我的-“程序信息”加入“版本号”，可查看每个版本相关开发信息，即本界面</text>
					<text>15.我的-“程序信息”加入“关于我”，可查看开发者的信息和开发者的牢骚( •̀ ω •́ )y</text>
					
					
				</view>
			</view>
			
			<view class="app-item">
				<view class="app-ver" style="font-size: 40rpx">
					版本-1.0.0
				</view>
				<view class="app-message" style="font-size: 35rpx">
					<text>2022年12月31日-注册“个人学习测试用”</text>
					<text>2023年01月07日-改名“充实每天”</text>
					<text>2023年01月12日-发布线上版本1.0.0</text>
					<text>\n</text>
					
					<text>完成简计功能初步开发</text>
					<text>1.简计界面-显示任务完成情况</text>
					<text>2.简计界面-任务各个情况面板可折叠</text>
					<text>3.简计设置界面-代办任务的添加</text>
					<text>4.简计设置界面-代办任务的删除</text>
					<text>5.简计设置界面-每日任务的重复开启</text>
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
				title: '更新记录'
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
	
	.app-all {
		.app-item {
			background-color: white;
			border-radius: 25rpx;
			margin: 25rpx;
			padding: 25rpx;
			.app-ver {
				font-weight: bold;
			}
			.app-message {
				margin-top: 25rpx;
				display: flex;
				flex-direction: column;
			}
		}
	}
	
</style>
