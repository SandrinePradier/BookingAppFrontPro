<template>
  <v-container fluid class="backgound">
    <v-card flat>

      <v-toolbar color="green lighten-5"flat dense>
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

      <v-container fluid grid-list >
        <v-layout fluid row wrap justify-center>
          
          <v-flex justify-center xs12 sm4 md1 lg1 xl1 class="day" v-for="(day,index) in timeRangeToDisplay" :key="index">
            <v-flex class="dayName">{{day | dateFormatDayName}}</v-flex>
            <v-flex class="dayNumber">{{day | dateFormatDayNumberAndMonth}}</v-flex>
            <ul class="slotUl" v-for="(button, index) in btnIdToDisplay" v-if="buttonIdIsInDay(day,button)" :key="index">
              <li class="slotLi">
                <v-btn outline 
                v-bind:color="btnColor[index]" 
                v-bind:class="classId[index]" 
                v-bind:id="button" 
                v-on:click="getMatchingSlot(button,slots)"  >
                <li class="slotLi__button_id">{{button.id | displayButtonId }} {{button.client}}</li>
              </v-btn>
            </li>
          </ul>
        </v-flex>
      </v-layout>
    </v-container>

  </v-card>
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
    btnColor(){
      return this.btnIdToDisplay.map(function(button){
        return button.color;
      })
    },
    btnClient(){
      return this.btnIdToDisplay.map(function(button){
        return button.client;
      })
    },
    getClients(){
      return this.$store.state.clients;
    },
    slots(){
      return this.$store.state.slots
    }
  },
  created(){
    this.beginDisplay = 0;
    this.weekNumber = time.filterInt(this.week);
    this.minTimeRange = time.GetMinTimeFromSlotsArray(this.slots);
    this.getTimeRange();
    this.createButtonId(this.timeRange);
    this.updateButtonId(this.slots, this.buttonIdList, this.getClients);
  },
  methods:{
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
            color: 'grey',
            client:''
          }
          this.buttonIdList.push(button);
        }
      }
      return this.buttonIdList;
    },
    updateButtonId: function(slots, idList, clients){
      //this function will update ButtonID based on slots status, and modify the buttonsID accordingly
      for (let i=0; i<slots.length; i++){
        for (let j=0; j<idList.length; j++){
          let sl = moment(slots[i].start).format('YYYY-MM-DD-HH-mm').toString();
          let id = idList[j].id.slice(0,16);
          if (sl == id) {
            if(slots[i].status === 'available'){
              idList[j].id = idList[j].id.slice(0,16)+'-'+'A';
              idList[j].class = 'A';
              idList[j].color = 'teal accent-2';

            }
            if(slots[i].status === 'booked'){
              idList[j].id = idList[j].id.slice(0,16)+'-'+'B';
              idList[j].class = 'B';
              idList[j].color = 'deep-purple ';
              for (let k=0; k<clients.length; k++){
                let apt = moment(clients[k].time).format('YYYY-MM-DD-HH-mm').toString();
                // console.log('apt:', apt)
                if (id == apt){
                  // console.log('matching found: ', clients[k])
                  idList[j].client = clients[k].lastname;
                }
              }
            }
          }
        }
      }
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

.background{
  color: #606060;
}


h1, h2{
  font-weight: normal;
  color: #404040;
}

h3{
  color: #404040;
}



.day{
  min-width: 13%;
  /*background-color: pink;*/
  padding: 0;
  margin: 0;
}


.dayName{
  /*font-weight: bold*/
  color: #606060;
/*background-color: purple;
*/}

.dayNumber{
  color: #606060;
  /*font-weight: bold*/
/*background-color: green;*/
}

.slotUl{
/*background-color: blue;*/
width: 100%;
list-style-type: none;
  padding: 0;
  margin: 0;
}


.A{
  border-top: 1px dotted #e5e5e5;
  border-bottom:1px dotted #e5e5e5;
  border-left: 10px solid #64FFDA;
  border-right: 1px solid #d4d4d4;
  /*background-color: white;*/
  /*color:grey;*/
  border-radius:0;
  width: 100%;
  margin-bottom: 0px;
  margin-top: 0px;
  margin-left:0px;
  font-size: 10px;
  /*text-align: right;*/
  vertical-align: top
}

.N{
  border-top: 1px dotted #e5e5e5;
  border-bottom:1px dotted #e5e5e5;
  border-left: 1px solid #d4d4d4;
  border-right: 1px solid #d4d4d4;
  /*box-shadow: none;*/
  /*box-shadow: 0.5rem 1rem 1rem rgba(0, 0, 0, 0.1);*/
 /* background-color: grey;*/
  /*color:grey;*/
  border-radius:0;
  width: 100%;
  margin-bottom: 0px;
  margin-top: 0px;
  margin-left:0px;
  font-size: 8px;
  /*text-align: right;*/
  vertical-align: top;
}

.B{
  border-top: 1px dotted #e5e5e5;
  border-bottom:1px dotted #e5e5e5;
  border-left: 10px solid #673AB7;
  border-right: 1px solid #d4d4d4;
  /*background-color: yellow;*/
  /*color:grey;*/
  border-radius:0;
  width: 100%;
  margin-bottom: 0px;
  margin-top: 0px;
  margin-left:0px;
  font-size: 10px;
  /*text-align: right;*/
  vertical-align: top;
}

.slotLi{
  /*background-color: transparent;*/
  width: 100%;
}

.slotLi__button_id{
  text-align: left;
  width: 100%;
}



/*{
  primary: "#64FFDA",
  secondary: "#E8F5E9",
  accent: "#64FFDA",
  error: "#FF5722",
  warning: "#ffeb3b",
  info: "#009688",
  success: "#4CAF50"
}
*/
/*{
  primary: colors.teal.accent2,
  secondary: colors.green.lighten5,
  accent: colors.teal.accent2,
  error: colors.deepOrange.base,
  warning: colors.yellow.base,
  info: colors.teal.base,
  success: colors.green.base
}*/

/*gris à essayer:
#606060 rgb(96,96,96)
#686868 rgb(104,104,104)
#696969 rgb(105,105,105)*/



</style>