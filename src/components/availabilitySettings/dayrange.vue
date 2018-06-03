<template>
  <v-container>
    <v-card flat tile style="max-width: 60%; margin: auto;">

   <!--  starting date -->
    <v-layout>
      <v-flex xs11 sm5>
      <v-dialog ref="dialog1" v-model="modal1" :return-value.sync="startdate" lazy full-width width="290px">
          <v-text-field slot="activator" v-model="formatedStartdate"  label="Début de période" prepend-icon="event" readonly ></v-text-field>
          <v-date-picker locale="fr" first-day-of-week="1" v-model="startdate" actions>
            <v-spacer></v-spacer>
            <v-btn flat color="primary" @click="modal1=false">Annuler</v-btn>
            <v-btn flat color="primary" @click="$refs.dialog1.save(startdate)">OK</v-btn>
          </v-date-picker>
        </v-dialog>
    </v-flex>
  </v-layout>
    </v-layout>

    <!-- ending date -->
    <v-layout>
      <v-flex xs11 sm5>
        <v-dialog ref="dialog2" v-model="modal2" :return-value.sync="enddate" persistent lazy full-width width="290px">
          <v-text-field slot="activator" v-model="formatedEnddate" label="Fin de période" prepend-icon="event" readonly ></v-text-field>
          <v-date-picker locale="fr" first-day-of-week="1" v-model="enddate" actions>
            <v-spacer></v-spacer>
            <v-btn flat color="primary" @click="modal2 = false">Annuler</v-btn>
            <v-btn flat color="primary" @click="$refs.dialog2.save(enddate)">OK</v-btn>
          </v-date-picker>
        </v-dialog>
      </v-flex>
    </v-layout>
    
    </v-card>
  </v-container>
</template>

<script>

import { store } from './../../store/store'
import http from './../../helpers/http'
import * as time from './../../helpers/time'
import moment from 'moment'
import 'moment/locale/fr'

export default {
  name: 'DayRange',
  data () {
    return {
      msg: 'Welcome to dayRange',
      startdate: null,
      enddate: null,
      menu1:false,
      modal1:false,
      menu2: false,
      modal2: false,
      nextStep:1
      }
    },
    computed:{
      formatedStartdate:{
        get(){
          let start = this.startdate;
          console.log('test get start');
          this.$store.commit('getStartRange', start);
          return moment(start).format('DD/MM/YYYY');
        }
      },
      formatedEnddate:{
        get(){
          let end = this.enddate;
          console.log('test get end');
          this.$store.commit('getEndRange', end);
          return moment(end).format('DD/MM/YYYY');
        },
      }
    },
    methods:{
    },
    filters:{
    dateFormatDayName: function(date) {
      return moment(date).format('dddd');
    },
    dateFormatDayNumberAndMonth: function(date) {
      return moment(date).format('D MMM');
    },
    dateFormatFullDayHour: function(date){
      return moment(date).format('LLLL');
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