import Vue from 'vue'
import Vuex from 'vuex'
// import * as time from './../helpers/time'

Vue.use(Vuex)

export const store = new Vuex.Store({
	state:{
		settings:{
			workdays:[],
			openingHours: {},
			dayRange:{},
			dayRangeAvailable:[]
		},
		slots: []
	},
	getters: {
		dayRangeFromStore(state){
			return state.settings.dayRange;
		},
		settings(state){
			return state.settings;
		}
	},
	mutations:{
		getWorkDays(state, days){
			state.settings.workdays = days;
		},
		getOpeningHours(state, hours){
			state.settings.openingHours = hours;
		},
		getDayRange(state, days){
			state.settings.dayRange= days;
		},
		getAvailableDays(state, days){
			state.settings.dayRangeAvailable = days
		},
		storeSlots(state, slots){
			state.slots = slots;
		}
	}
})