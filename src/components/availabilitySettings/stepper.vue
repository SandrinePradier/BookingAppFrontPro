<template>
  <v-stepper v-model="e6" vertical>
    <v-stepper-step :complete="e6 > 1" step="1">
      Période
      <small>Définissez ici la période à laquelle vous souhaitez appliquer votre paramétrage de disponibilités</small>
    </v-stepper-step>
    <v-stepper-content step="1">
      <dayRange></dayRange>
      <v-btn color="primary" @click.native="e6 = 2">Suivant</v-btn>
      <v-btn flat>Annuler</v-btn>
    </v-stepper-content>
    <v-stepper-step :complete="e6 > 2" step="2">
      Horaires d'ouvertures
      <small>Définissez ici les plages horaires habituelles de votre journée de travail</small>
    </v-stepper-step>
    <v-stepper-content step="2">
      <openingHours></openingHours>
      <v-btn color="primary" @click.native="e6 = 3">Suivant</v-btn>
      <v-btn flat>Annuler</v-btn>
    </v-stepper-content>
    <v-stepper-step :complete="e6 > 3" step="3">
     Jours de travail
     <small>Définissez ici les jours habituels de votre semaine de travail</small>
   </v-stepper-step>
   <v-stepper-content step="3">
    <workDays></workDays>
    <v-btn color="primary" @click.native="e6 = 4">Suivant</v-btn>
    <v-btn flat>Annuler</v-btn>
  </v-stepper-content>
  <v-stepper-step :complete="e6 > 4" step="4">
      Confirmation
      <small>Vous allez paramétrer les disponibilités suivantes:</small>
    </v-stepper-step>
    <v-stepper-content step="4">
      Les disponibiltés suivantes seront visibles auprès de vos clients: 
      <p>{{settings.workdays}}</p>
      <p>{{settings.openingHours}}</p>
      <p v-for="day in settings.dayRangeAvailable"
      >{{day | dateFormat}}</p>
      <v-btn color="primary" @click.native="sendSlotsToBack()">Suivant</v-btn>
      <v-btn flat>Annuler</v-btn>
    </v-stepper-content>



</v-stepper>
</template>


<script>

import openingHours from './openinghours'
import workDays from './workdays'
import dayRange from './dayrange'
import { store } from './../../store/store'
import { mapGetters } from 'vuex'
import moment from 'moment'
import 'moment/locale/fr'
import _ from 'underscore';
import http from './../../helpers/http'
import * as time from './../../helpers/time'


  export default {
    name: 'ASStepper',
    data () {
      return {
        e6: 1,
        duration:60,
        slotsAvailable: []
        // (duration is set by default to 1H)
      }
    },
    computed:{
    ...mapGetters([
      'settings'
    ])
  },
    components:{
      openingHours,
      workDays,
      dayRange
    },
    methods:{
      createAvailabilities(){
        console.log('je vais envoyer au back mes slots');

        // Creation of slots
        let daySlots = [];
        //we will use dayRangeAvailable and openingHours to create slots.
        // 1- we need to apply the opening hours to each day available
        for (let i=0; i<this.settings.dayRangeAvailable.length; i++){
            let opening = moment(this.settings.dayRangeAvailable[i]).startOf('day').add(time.convertTimeInMinutes(this.settings.openingHours.start), 'minutes');
            console.log('opening:', opening)
            let closing = moment(this.settings.dayRangeAvailable[i]).startOf('day').add(time.convertTimeInMinutes(this.settings.openingHours.end), 'minutes');
            console.log('closing:', closing);

            //2 - now we get an opening and closing time per day, we can turn it into a range, and dispatch it into slots.
            daySlots.push(time.setSlotsArray(opening, closing, this.duration, 'available'));
            console.log('daySlots:', daySlots);
        }
        this.slotsAvailable = _.flatten(daySlots);
      },
      sendSlotsToBack(){
        this.createAvailabilities();
        http.post('/availabilities', this.slotsAvailable)
          .then(res => {
            console.log('res from get ASstepper:', res);
          })
          .catch(error => {
            console.log( 'error:', error);
          })
      },
    },
    filters:{
      dateFormat: function(date) {
        return moment(date).format('LL');
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