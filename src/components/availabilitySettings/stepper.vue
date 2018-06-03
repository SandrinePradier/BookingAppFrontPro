<template>
  <v-container>
    <v-stepper v-model="e6" vertical>
      <v-stepper-step :complete="e6 > 1" step="1">
        Période
        <small>Définissez ici la période à laquelle vous souhaitez appliquer votre paramétrage de disponibilités</small>
      </v-stepper-step>
      <v-stepper-content step="1">
        <dayRange></dayRange>
        <v-btn color="primary" v-on:click="setDayRange(settings.dayRange.start, settings.dayRange.end)" @click.native="OkToNextStep(2)">Suivant</v-btn>
        <v-btn flat @click.native="openDialog()">Annuler</v-btn>
      </v-stepper-content>
      <v-stepper-step :complete="e6 > 2" step="2">
        Horaires d'ouvertures
        <small>Définissez ici les plages horaires habituelles de votre journée de travail</small>
      </v-stepper-step>
      <v-stepper-content step="2">
        <openingHours></openingHours>
        <v-btn color="primary" v-on:click="setOpeningHours(settings.openingHours.start,settings.openingHours.end)" @click.native="OkToNextStep(3)">Suivant</v-btn>
        <v-btn flat @click.native="goBackToFirstStep()">Annuler</v-btn>
      </v-stepper-content>
      <v-stepper-step :complete="e6 > 3" step="3">
       Jours de travail
       <small>Définissez ici les jours habituels de votre semaine de travail</small>
     </v-stepper-step>
     <v-stepper-content step="3">
      <workDays></workDays>
      <v-btn color="primary" v-on:click="setAvailableDays(settings.workdays,settings.dayRange.daylist)" @click.native="OkToNextStep(4)">Suivant</v-btn>
      <v-btn flat @click.native="goBackToFirstStep()">Annuler</v-btn>
    </v-stepper-content>
    <v-stepper-step :complete="e6 > 4" step="4">
      Confirmation
      <small>Vous allez paramétrer les disponibilités suivantes:</small>
    </v-stepper-step>
    <v-stepper-content step="4">
      <p>Les disponibiltés suivantes seront visibles auprès de vos clients:</p>
      <p v-for="day in settings.dayRangeAvailable"
      >{{day | dateFormatDay}} {{day | dateFormatDayNumberAndMonth}} de {{settings.openingHours.start}} à {{settings.openingHours.end}}</p>
      <v-btn color="primary" @click.native="sendSlotsToBack()">Suivant</v-btn>
      <v-btn flat @click.native="goBackToFirstStep()">Annuler</v-btn>
    </v-stepper-content>
  </v-stepper>

  <v-dialog v-model="dialog1" max-width="500px">
    <v-card>
        <v-card-title>
              <span>Souhaitez vous quitter le paramétrage des disponibiltés?</span>
        </v-card-title>
        <v-card-actions>
            <v-btn color="primary" @click.stop="quitAvailabilitySetting()">Quitter</v-btn>
            <v-btn color="primary" flat @click.stop="dialog1=false">Annuler</v-btn>
        </v-card-actions>
    </v-card>
  </v-dialog>

</v-container>
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
        slotsAvailable: [],
        // (duration is set by default to 1H)
        dialog1:false,
        availableDays:[],
        nextStep:1,

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
      OkToNextStep(step){
        console.log('this.settings.stepperStep:', this.settings.stepperStep);
        console.log('step', step);
        if (this.settings.stepperStep == step){
          this.e6 = this.settings.stepperStep;
          console.log('e6:', this.e6);
        }
      },
      setDayRange(start, end){
        this.nextStep = 1;
        if (moment(start).isAfter(moment()) && moment(end).isAfter(moment(start))){
          let dayRange = {
            // start: start,
            // end: end,
            daylist: time.getDaysOfTheTimeRange(start, end)
          };
          this.$store.commit('getDayRange', dayRange);
          this.nextStep++;
          this.$store.commit('getStepperStep', this.nextStep);
        }
        else {
          console.log('Vous ne pouvez pas plannifier des disponibilités pour des dates antérieures à aujourd\'hui, et les disponibilités doivent s\'appliquer au moins à un jour!')
            this.nextStep = 1;
            this.$store.commit('getStepperStep', this.nextStep)
        }
      },
      setOpeningHours(start, end){
        this.nextStep = 2;
        console.log ('je suis disponible entre : ' + start + ' et ' + end );
        console.log('start: ', start);
        console.log('end: ',end);

        if (moment(start, 'HH:mm').isBefore(moment(end, 'HH:mm'))){
          let openingHours = {
            start: start,
            end: end
          }
          this.$store.commit('getOpeningHours', openingHours);
          console.log('j envoie au store mes horaires d ouverture');
          this.nextStep++;
          this.$store.commit('getStepperStep', this.nextStep)
        }
        else{
          console.log('vous ne pouvez pas paraméter une heure de fin antérieure à l\'heure de début');
        }
      },
      setAvailableDays(workdays, daylist){
        console.log('j apl setAvailableDays');
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
        this.$store.commit('getAvailableDays', availableDays);
        //initialize workdays
        let days = [];
        this.$store.commit('getWorkDays', days);
      },
      createAvailabilities(){
        // Creation of slots based on what has been put in settings in the store
        let daySlots = [];
        // 1- we need to apply the opening hours to each day available
        for (let i=0; i<this.settings.dayRangeAvailable.length; i++){
            let opening = moment(this.settings.dayRangeAvailable[i]).startOf('day').add(time.convertTimeInMinutes(this.settings.openingHours.start), 'minutes');
            let closing = moment(this.settings.dayRangeAvailable[i]).startOf('day').add(time.convertTimeInMinutes(this.settings.openingHours.end), 'minutes');
            //2 - now we get an opening and closing time per day, we can turn it into a range, and dispatch it into slots.
            daySlots.push(time.setSlotsArray(opening, closing, this.duration, 'available'));
        }
        this.slotsAvailable = _.flatten(daySlots);
        this.$router.push('Agenda'); 
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
      openDialog(){
        this.dialog1 = true;
      },
      quitAvailabilitySetting(){
        this.dialog1 = false;
        this.nextStep = 1;
        this.$store.commit('getStepperStep', this.nextStep)
        this.$router.push('Home'); 
      },
      goBackToFirstStep(){
        //initialize stepper
        this.nextStep = 1;
        this.$store.commit('getStepperStep', this.nextStep);
        this.e6 = 1;
        //initialize settings
        this.initializeSettings();
      },
      initializeSettings(){
        let workdays = [];
        let openingHours = {};
        openingHours.start = '';
        openingHours.end = '';
        this.$store.commit('getWorkingDays', workdays);
        this.$store.commit('getOpeningHours', openingHours);
      }
    },
    filters:{
      dateFormatDay: function(date) {
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