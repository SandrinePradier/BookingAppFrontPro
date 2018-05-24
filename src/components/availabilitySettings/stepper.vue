<template>
  <v-stepper v-model="e6" vertical>
    <v-stepper-step :complete="e6 > 1" step="1">
      Horaires d'ouvertures
      <small>Définissez ici les plages horaires habituelles de votre journée de travail</small>
    </v-stepper-step>
    <v-stepper-content step="1">
      <openingHours></openingHours>
      <v-btn color="primary" @click.native="e6 = 2">Suivant</v-btn>
      <v-btn flat>Cancel</v-btn>
    </v-stepper-content>
    <v-stepper-step :complete="e6 > 2" step="2">
      Jours de travail
      <small>Définissez ici les jours habituels de votre semaine de travail</small>
    </v-stepper-step>
    <v-stepper-content step="2">
      <workDays></workDays>
      <v-btn color="primary" @click.native="e6 = 3">Suivant</v-btn>
      <v-btn flat>Cancel</v-btn>
    </v-stepper-content>
    <v-stepper-step :complete="e6 > 3" step="3">
      Période
      <small>Définissez ici la période à laquelle vous souhaitez appliquer votre paramétrage de disponibilités</small></v-stepper-step>
    <v-stepper-content step="3">
      <dayRange></dayRange>
      <v-btn color="primary" @click.native="e6 = 4">Suivant</v-btn>
      <v-btn flat>Cancel</v-btn>
    </v-stepper-content>
  </v-stepper>
</template>


<script>

import openingHours from './openinghours'
import workDays from './workdays'
import dayRange from './dayrange'


  export default {
    name: 'ASStepper',
    data () {
      return {
        e6: 1
      }
    },
    components:{
      openingHours,
      workDays,
      dayRange
    }
  };
</script>