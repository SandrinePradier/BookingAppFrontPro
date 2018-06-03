<template>
  <v-container>
    <v-card flat tile style="max-width: 60%; margin: auto;">

    <!-- starting hour -->
    <v-layout>
      <v-flex xs11 sm5>
      <v-dialog ref="dialog1" v-model="modal1" :return-value.sync="starttime" persistent lazy full-width width="290px">
          <v-text-field slot="activator" v-model="openingHourStart" label="Heure d'ouverture" prepend-icon="access_time" readonly ></v-text-field>
          <v-time-picker v-model="starttime" format="24hr" actions>
            <v-spacer></v-spacer>
            <v-btn flat color="primary" @click="modal1 = false">Cancel</v-btn>
            <v-btn flat color="primary" @click="$refs.dialog1.save(starttime)">OK</v-btn>
          </v-time-picker>
        </v-dialog>
    </v-flex>
  </v-layout>
    </v-layout>

    <!-- closing hour -->
    <v-layout>
      <v-flex xs11 sm5>
        <v-dialog ref="dialog2" v-model="modal2" :return-value.sync="endtime" persistent lazy full-width width="290px">
          <v-text-field slot="activator" v-model="openingHourEnd" label="Heure de fermeture" prepend-icon="access_time" readonly ></v-text-field>
          <v-time-picker v-model="endtime" format="24hr" actions>
            <v-spacer></v-spacer>
            <v-btn flat color="primary" @click="modal2 = false">Cancel</v-btn>
            <v-btn flat color="primary" <v-btn @click="$refs.dialog2.save(endtime)">OK</v-btn>
          </v-time-picker>
        </v-dialog>
      </v-flex>
    </v-layout>

    </v-card>
  </v-container>
</template>

<script>

import { store } from './../../store/store'
import http from './../../helpers/http'
import moment from 'moment'
import 'moment/locale/fr'

export default {
  name: 'OpeningHours',
  data () {
    return {
      msg: 'Welcome to OpeningHours',
      starttime: null,
      endtime: null,
      menu1:false,
      modal1:false,
      menu2: false,
      modal2: false,
      nextStep:2
      }
    },
    computed:{
      openingHourStart:{
        get(){
          let start = this.starttime;
          console.log('test  OH get start');
          this.$store.commit('getStartHour', start);
          return start;
        }
      },
      openingHourEnd:{
        get(){
          let end = this.endtime;
          console.log('test  OH get end');
          this.$store.commit('getEndHour', end);
          return end;
        }
      }
    },
    methods:{
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