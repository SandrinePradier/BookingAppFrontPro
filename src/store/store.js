import Vue from 'vue'
import Vuex from 'vuex'
import http from './../helpers/http'
import * as time from './../helpers/time'
import moment from 'moment'
import 'moment/locale/fr'

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
		clients:''
	},
	getters: {
		settings(state){
			return state.settings;
		},
		Clients(state){
			return state.clients;
		},
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
		storeClients(state, clients){
			let momentTimeList = []
			for ( let i=0; i<clients.length; i++){
				let momentTime = moment(clients[i].time).format('LLLL');
				momentTimeList.push(momentTime);
			}
			for (let j=0; j<clients.length; j++){
				clients[j].time = momentTimeList[j]
			}
			return state.clients = clients;
		},
	},
	actions:{
		loadClients(context){
			http.get('apt/clients')
		    .then(res => {
		      // console.log('res from get clients:', res);
		      console.log('clients:', res.data.content);
		      context.commit('storeClients', res.data.content)
		    })
		    .catch(error => {
		      console.log( 'error:', error);
		    })
		}
	}
})