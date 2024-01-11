export default {
	namespaced: true,

	// 数据
	state: () => ({

		baseUrl: "",

		// 是否登录 0否 1是
		isLoad: uni.getStorageSync('isLoad') || null,

		// 用户本设备的基本信息
		Sys: JSON.parse(uni.getStorageSync('Sys') || null),

		// 用户基本信息
		user: JSON.parse(uni.getStorageSync('user') || null),

		// 本地数据
		local: JSON.parse(uni.getStorageSync('local') || null),

		// 简计数据
		data: JSON.parse(uni.getStorageSync('data') || null),
	}),


	// 方法
	mutations: {
		// 更新 isLoad
		updateIsLoad(state, isLoad) {
			state.isLoad = isLoad
			this.commit('m_sp/saveIsLoadToStorage')
		},

		// 持久化存储 isLoad
		saveIsLoadToStorage(state) {
			uni.setStorageSync('isLoad', state.isLoad)
		},

		// 更新 Sys
		updateSys(state, Sys) {
			state.Sys = Sys
			this.commit('m_sp/saveSysToStorage')
		},

		// 持久化存储 Sys
		saveSysToStorage(state) {
			uni.setStorageSync('Sys', JSON.stringify(state.Sys))
		},

		// 更新 user
		updateUser(state, user) {
			state.user = user
			this.commit('m_sp/saveUserToStorage')
		},

		// 持久化存储 user
		saveUserToStorage(state) {
			// console.log(state.user)
			uni.setStorageSync('user', JSON.stringify(state.user))
		},

		// 更新 local
		updateLocal(state, local) {
			state.local = local
			this.commit('m_sp/saveLocalToStorage')
		},

		// 持久化存储 local
		saveLocalToStorage(state) {
			uni.setStorageSync('local', JSON.stringify(state.local))
		},

		// 更新 data
		updateData(state, data) {
			state.data = data
			this.commit('m_sp/saveDataToStorage')
		},

		// 持久化存储 data
		saveDataToStorage(state) {
			uni.setStorageSync('data', JSON.stringify(state.data))
		},
	},

	// getter
	getters: {

	},
}