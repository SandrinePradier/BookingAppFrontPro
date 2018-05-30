<template>
    <v-container fluid>
    <v-toolbar dense>
      <!-- <v-toolbar-side-icon></v-toolbar-side-icon> -->
      <v-toolbar-title>Agenda</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon v-on:click="getPreviousDays">
        <v-icon>navigate_before</v-icon>
      </v-btn>
        <h3>Semaine {{weekNumber}}</h3>
      <v-btn icon v-on:click="getNextDays">
        <v-icon>navigate_next</v-icon>
      </v-btn>
    </v-toolbar>

    <v-container fluid grid-list class="agendaBody">

      <v-layout row wrap justify-space-between class="agendaBodyDays">
        <v-flex xs12 sm4 md1 lg1 xl1 class="day" v-for="(day,index) in timeRangeToDisplay" :key="index">
          <v-flex class="dayName">{{day | dateFormatDayName}}</v-flex>
          <v-flex class="dayNumber">{{day | dateFormatDayNumberAndMonth}}</v-flex>
           <ul class="slotUl" v-for="(button, index) in btnIdToDisplay" v-if="buttonIdIsInDay(day,button)" :key="index">
            <li class="slotLi">
              <v-btn small outline v-bind:color="getColor[index]" v-on:click="getMatchingSlot(button,slots)" v-bind:class="classId[index]" v-bind:id="button" >
                <li class="slotLi__button_id">{{button.id | displayButtonId }}</li>
              </v-btn>
            </li>
          </ul>
        </v-flex>
      </v-layout>

    </v-container>

  </v-container>
</template>

<script>

import moment from 'moment'
import 'moment/locale/fr'
import { store } from './../store/store'
import http from './../helpers/http'
import * as time from './../helpers/time'

export default {
  name: 'Agenda',
  data () {
    return {
      msg: 'Welcome to Agenda',
      //the hourList should be generated dynamically refereing to opening hours
      hourList:['08:00','09:00',
          '10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00'],
      slots:[],
      minTimeRange:{},
      timeRange:'',
      beginDisplay:'',
      button:'',
      buttonIdList:[],
      filteredButtonIdList: [],
      display:false
      // color:'green'
    }
  },
  computed:{
    endDisplay(){
      return time.limitDisplay('week', this.beginDisplay);
    },
    timeRangeToDisplay(){
      return this.getTimeRange().slice(this.beginDisplay, this.endDisplay)
    },
    week(){
      return time.getWeekNumber(moment());
    },
    btnIdToDisplay(){
      return this.filterButtonIdToDisplay(this.timeRangeToDisplay, this.buttonIdList);
    },
    classId(){
      return this.btnIdToDisplay.map(function(button){
        return button.class;
      });
    },
    getColor(){
      return this.btnIdToDisplay.map(function(button){
        return button.color;
      })
    }
  },
  created(){
    this.beginDisplay = 0;
    this.weekNumber = time.filterInt(this.week);
    http.get('/slots')
    .then(res => {
      console.log('res from get slots:', res);
      this.slots = res.data.content;
      this.minTimeRange = time.GetMinTimeFromSlotsArray(res.data.content);
      this.commit();
      this.getTimeRange();
      this.createButtonId(this.timeRange);
      this.updateButtonId(this.slots, this.buttonIdList);
    })
    .catch(error => {
      console.log( 'error:', error);
    })
  },
  methods:{
    commit () {
      this.$store.commit('storeSlots', this.slots);
    },
    getTimeRange (){
      let nowStartWeek = time.getWeekFirstDate(moment());
      let end = time.addTwoMonth(this.minTimeRange.end);
      return this.timeRange = time.getDaysOfTheTimeRange(nowStartWeek,end);
    },
    getNextDays(){
      this.beginDisplay += 7;
      this.weekNumber +=1;
      this.filteredButtonIdList = [];
    },
    getPreviousDays(){
      if (this.beginDisplay>=7){
        this.beginDisplay -= 7;
        this.weekNumber -=1;
        this.filteredButtonIdList = [];
      }
    },
    createButtonId: function(timeRange){
      this.buttonIdList = [];
      //based on a timeRange of days, and based on the hours to display in agenda
      //this function create buttons with Id representatives of the date, hour.
      //by default, they also represent status N( Non available)
      let reg = /:/;
      for (let i=0; i<timeRange.length; i++){
        for(let j=0; j<this.hourList.length; j++){
          let id;
          id = moment(timeRange[i]).format('YYYY-MM-DD').toString()+ '-' + this.hourList[j]+ '-' +'N';
          id = id.replace(reg, '-');
          let button = {
            id: id,
            class:'N',
            color: 'grey'
            // aptFullName:'',
            // aptType:'',
            // aptId:'',
            // aptDuration:''
          }
          this.buttonIdList.push(button);
        }
      }
      return this.buttonIdList;
    },
    updateButtonId: function(slots, idList){
      //this function will update ButtonID based on slots status, and modify the buttonsID accordingly
      for (let i=0; i<slots.length; i++){
        for (let j=0; j<idList.length; j++){
          let sl = moment(slots[i].start).format('YYYY-MM-DD-HH-mm').toString();
          let id = idList[j].id.slice(0,16);
          if (sl == id) {
            if(slots[i].status === 'available'){
              idList[j].id = idList[j].id.slice(0,16)+'-'+'A';
              idList[j].class = 'A';
              idList[j].color = 'green';
            }
            if(slots[i].status === 'booked'){
              idList[j].id = idList[j].id.slice(0,16)+'-'+'B';
              idList[j].class = 'B';
              idList[j].color = 'grey';
            }
          }
        }
      }
      console.log('les boutons ont bien été updatés avec les slots');
      console.log('buttonIdList:', this.buttonIdList);
      // this.cleanButtonId(this.buttonIdList);
      // this.cleanButtonId(this.buttonIdList);
      return this.buttonIdList;
    },
    filterButtonIdToDisplay: function(timeRange, btnIdList){
      for (let i=0; i<timeRange.length; i++){
        let trday
        trday = moment(timeRange[i]).format('YYYY-MM-DD').toString();
        for (let j=0; j<btnIdList.length; j++){
          let btnid = btnIdList[j].id.slice(0,10);
          if (trday == btnid){
            this.filteredButtonIdList.push(btnIdList[j]);
          }
        }
      }
      console.log('this.filteredButtonIdList:', this.filteredButtonIdList)
      return this.filteredButtonIdList;
    },
    buttonIdIsInDay: function(day,btn){
      // this is a conditional function, called in V-for to display under the day only the button with ID matching the day
      let a = moment(day).format('YYYY-MM-DD').toString();
      let b = btn.id.slice(0,10);
      if(a == b) {
        return true;
      }
    },
    getMatchingSlot: function(btn, slots){
      console.log('j actionne le buttonId', btn);
        for (let i=0; i<slots.length; i++){
          let sl = moment(slots[i].start).format('YYYY-MM-DD-HH-mm').toString();
          let id = btn.id.slice(0,16);
          if (sl == id){
            this.matchingSlot = slots[i];
            console.log('the matching slot is:', this.matchingSlot);
            // this.getRelevantModal(btn);
          }
          else {
            console.log('no matching slot');
            //si aucun matching slot n'est trouvé, 
            //c'est que le boutton est en N
            //alors on peut lui proposer de passer en A
          }
        }
    },
  },
  filters: {
    dateFormatDayName: function(date) {
      return moment(date).format('dddd');
    },
    dateFormatDayNumberAndMonth: function(date) {
      return moment(date).format('D MMM');
    },
    formatDayHour: function(date) {
      return moment(date).format('lll');
    },
    displayButtonId: function(id){
      return id.slice(11,16);
    }
  }


};
</script>


<style scoped>
h1, h2 {
  font-weight: normal;
}
/*h4 {
  padding-left: 20px;
  padding-right: 60px;
}*/
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

/*.A{
  padding: 0;
  min-width: 0;
}*/




/*.agendaBodyDays {
  background-color: pink;
}*/
</style>