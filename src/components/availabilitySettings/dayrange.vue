<template>
  <v-container>
    <v-card flat tile style="max-width: 60%; margin: auto;">

   <!--  starting date -->
    <v-layout>
      <v-flex xs11 sm5>
      <v-dialog ref="dialog1" v-model="modal1" :return-value.sync="startdate" persistent lazy full-width width="290px">
          <v-text-field slot="activator" v-model="startdate" label="Début de période" prepend-icon="event" readonly ></v-text-field>
          <v-date-picker locale="fr" first-day-of-week="1" v-model="startdate" actions>
            <v-spacer></v-spacer>
            <v-btn flat color="primary" @click="modal1 = false">Cancel</v-btn>
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
          <v-text-field slot="activator" v-model="enddate" label="Fin de période" prepend-icon="event" readonly ></v-text-field>
          <v-date-picker locale="fr" first-day-of-week="1" v-model="enddate" actions>
            <v-spacer></v-spacer>
            <v-btn flat color="primary" @click="modal2 = false">Cancel</v-btn>
            <v-btn flat color="primary" @click="$refs.dialog2.save(enddate)" v-on:click="setDayRange(startdate, enddate)">OK</v-btn>
          </v-date-picker>
        </v-dialog>
      </v-flex>
    </v-layout>

   <!--  confirmation of start and end hours -->
    </v-layout>
      <v-card-actions>
        <!-- <v-btn v-on:click="setDayRange(startdate, enddate)" color="primary">Confirmez</v-btn> -->
      </v-card-actions>
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
      }
    },
    methods:{
      setDayRange(start, end){
        console.log ('j applique mes disponibilités entre : ' + start + ' et ' + end );
        let dayRange = {
          start: start,
          end: end,
          daylist: time.getDaysOfTheTimeRange(start, end)
        };
        this.$store.commit('getDayRange', dayRange);
        console.log('je viens d envoyer la dayrange au store')
      }
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