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
      nextStep:3
    }
  },
  computed:{
    workingDays:{
      get(){
        return this.$store.state.settings.workdays;
      },
      set(value){
        console.log('value:', value);
        if (value){
          this.nextStep = 3;
          this.$store.commit('getWorkingDays', value);
          this.nextStep++;
          this.$store.commit('getStepperStep', this.nextStep);
          this.nextStep--;
        }
        else{
          this.nextStep = 3;
          this.$store.commit('getStepperStep', this.nextStep);
          console.log('vous devez sélectionner au moins un jour');
        }
      }
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