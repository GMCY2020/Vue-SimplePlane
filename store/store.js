import {
	createStore
} from 'vuex'
import moduleSimplePlane from '@/store/SimplePlan.js'

const store = createStore({
	namespaced: true,
	state: {},
	mutations: {},
	actions: {},
	modules: {
		'm_sp': moduleSimplePlane,
	}
})

export default store