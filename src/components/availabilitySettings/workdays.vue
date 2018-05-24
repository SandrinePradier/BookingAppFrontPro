<template>
  <v-container>
    <v-card flat tile style="max-width: 60%; margin: auto;">
      <v-toolbar dark>
      <v-flex xs12 align-end flexbox>
       <!--  <span class="headline">Mes jours de travail</span> -->
        <v-toolbar-title class="white--text">Jours de travail</v-toolbar-title>
      </v-flex>
    </v-toolbar>
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
import http from './../../helpers/http'
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
  methods:{
    setWorkDays(days){
      if(days){
        console.log('Workdays:', days);
        this.$store.commit('getWorkDays', days);
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