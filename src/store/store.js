import Vue from 'vue'
import Vuex from 'vuex'
// import * as time from './../helpers/time'

Vue.use(Vuex)

export const store = new Vuex.Store({
	state:{
		settings:{
			workdays:[],
			openingHours: {},
			dayRange:{
				start:'',
				end:'',
				daylist:''
			},
			dayRangeAvailable:[],
			stepperStep:''
		},
		slots: [],
		clients:[]
	},
	getters: {
		settings(state){
			return state.settings;
		},
		clients(state){
			return state.clients;
		}
	},
	mutations:{
		getWorkDays(state, days){
			state.settings.workdays = days;
		},
		getStartHour(state, start){
			state.settings.openingHours.start = start;
		},
		getEndHour(state, end){
			state.settings.openingHours.end = end;
		},
		getOpeningHours(state, hours){
			state.settings.openingHours = hours;
		},
		getStartRange(state, start){
			state.settings.dayRange.start = start;
		},
		getEndRange(state, end){
			state.settings.dayRange.end = end;
		},
		getDayRange(state, days){
			state.settings.dayRange = days;
		},
		getWorkingDays(state, days){
			state.settings.workdays = days;
		},
		getAvailableDays(state, days){
			state.settings.dayRangeAvailable = days
		},
		getStepperStep(state,step){
			state.settings.stepperStep = step
		},
		storeSlots(state, slots){
			state.slots = slots;
		},
		storeClients(state, clients){
			state.clients = clients;
		},
	},
	actions:{
		//here we will make a call http to get clients.
	}
})