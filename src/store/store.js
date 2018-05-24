import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
	state:{
		workdays:[],
		openingHours: {},
		dayRange:{}
	},
	mutations:{
		getWorkDays(state, days){
			state.workdays = days;
		},
		getOpeningHours(state, hours){
			state.openingHours= hours;
		},
		getDayRange(state, days){
			state.dayRange= days;
		}
	}
})