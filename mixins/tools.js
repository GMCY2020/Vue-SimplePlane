import { mapState, mapMutations } from 'vuex'

export default {
	computed: {
		...mapState('m_sp', ['isLoad', 'Sys', 'user', 'local', 'data']),
	},
	
	data() {
		return {
			colors: []
		}
	},
	
	watch: {
		
	},
	
	
	onShow() {
		
	},
	
	methods: {
		...mapMutations('m_sp', ['updateIsLoad', 'updateSys', 'updateUser', 'updateLocal', 'updateData']),
		
		init() {
			console.log('init')
			console.log(this.Sys)
			if (!this.Sys) {
				this.updateSys(uni.getSystemInfoSync())
			}
			
			if (this.loacl === null) {
				this.updateLocal({'registerCounts': 3})
			}
			
			if (this.data === null) {
				this.updateData({
					'日常': {
						'color': 'rgba(204, 204, 204, 0.8)',
						'repetition': ['no'],
						'tasks': [
							['1678714807792', '日常计划1', false],
							['1678714929072', '日常计划2', true],
							['1678715000000', '日常计划3', true],
							['1678717807792', '日常计划4', false],
							['1678719807792', '日常计划5', false],
						]
					},
					'每日': {
						'color': 'rgba(86, 74, 244, 0.8)',
						'repetition': ['everyDay'],
						'tasks': [
							['1678714807792', '每日计划1', true],
							['1678714929072', '每日计划2', false],
							['1678715000000', '每日计划3', true],
							['1678717807792', '每日计划4', false],
							['1678719807792', '每日计划5', true],
						]
					}
				})
			}
		},
		
		changeTask(parts_index, part_index, task) {
			this.data[parts_index][part_index] = task
			this.updateData(this.data)
		},
		
		
	},
}