<template>
  <v-container>
    <v-card flat tile style="max-width: 60%; margin: auto;">
    <v-layout>
      <v-flex flexbox>
        <v-switch label="Lundi" value="lundi" v-model="workingDays"></v-switch>
        <v-switch label="Mardi" value="mardi" v-model="workingDays"></v-switch>
        <v-switch label="Mercredi" value="mercredi" v-model="workingDays"></v-switch>
        <v-switch label="Jeudi" value="jeudi" v-model="workingDays"></v-switch>
        <v-switch label="Vendredi" value="vendredi" v-model="workingDays"></v-switch>
        <v-switch label="Samedi" value="samedi" v-model="workingDays"></v-switch>
        <v-switch label="Dimanche" value="dimanche" v-model="workingDays"></v-switch>
      </v-flex>
    </v-layout>
      <v-card-actions>
        <v-btn v-on:click="setWorkDays(workingDays)" color="primary">Confirmez</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>

import { store } from './../../store/store'
import { mapGetters } from 'vuex'
import http from './../../helpers/http'
import * as time from './../../helpers/time'
import moment from 'moment';
import 'moment/locale/fr';

export default {
  name: 'Workdays',
  data () {
    return {
      msg: 'Welcome to Workdays',
      workingDays: []
    }
  },
  computed:{
    ...mapGetters([
      'dayRangeFromStore'
    ])
  },
  methods:{
    setWorkDays(days){
      if(days){
        this.$store.commit('getWorkDays', days);
        if(this.dayRangeFromStore){
          this.$store.commit('getAvailableDays', this.availableDays(days, this.dayRangeFromStore.daylist));
        }
      }
    },
    availableDays(workdays, daylist){
      let availableDays = [];
     //filter the dayRange so that it contains only the available days
     //for that i will compare the name of the days of workdays
     // and the name of the days of the dayRange
     for (let i=0; i<daylist.length; i++){
       for (let j=0; j<workdays.length; j++){
        if (time.getNameOfDay(daylist[i]) == workdays[j]){
          availableDays.push(daylist[i]);
        }
       }
     }
     console.log('availableDays:',availableDays)
     return availableDays;
   }
  }
};
</script>


<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>