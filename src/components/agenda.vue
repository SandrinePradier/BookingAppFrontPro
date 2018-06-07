<template>
  <v-container fluid class="backgound">
    <!-- <v-progress-circular :value="80" indeterminate color="primary"></v-progress-circular> -->
    <v-card flat>

      <v-toolbar class="toolbar" color="teal darken-1"flat dense>
        <v-toolbar-title>Agenda</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon dark v-on:click="getPreviousDays">
          <v-icon dark>navigate_before</v-icon>
        </v-btn>
        <h3>Semaine {{weekNumber}}</h3>
        <v-btn icon dark v-on:click="getNextDays">
          <v-icon >navigate_next</v-icon>
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
import { mapGetters } from 'vuex'
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
      weekNumber:'',
      button:'',
      buttonIdList:[],
      filteredButtonIdList: [],
      display:false,
      slots:[]
    }
  },
  computed:{
    endDisplay(){
      return time.limitDisplay('week', this.beginDisplay);
    },
    timeRangeToDisplay(){
      console.log('timeRangeToDisplay OK');
      console.log(this.timeRange.slice(this.beginDisplay, this.endDisplay));
      return this.timeRange.slice(this.beginDisplay, this.endDisplay);
    },
    // now(){
    //   // 60000
    //   return this.getHour;
    // },
    week(){
      return time.getWeekNumber(moment());
    },
    btnIdToDisplay(){
       console.log('btnIdToDisplay OK')
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
    ...mapGetters([
       'Clients'
    ]),
  },
  mounted(){
    this.$store.dispatch('loadClients');
    this.callHttp();
  },
  methods:{
    callHttp(){
       http.get('slot/slots')
        .then(res => {
        this.slots = res.data.content;
        this.minTimeRange = time.GetMinTimeFromSlotsArray(res.data.content);
        this.getTimeRange(this.minTimeRange);
        this.setUpCalendar()
        })
        .catch(error => {
        console.log( 'error:', error);
        })
    },
    // getHour(){
    //   setInterval(()=>{ console.log(moment()) }, 3000);
    // },
    getTimeRange(tr){
      return this.timeRange = time.getTimeRange(tr);
    },
    setUpCalendar(){
      this.beginDisplay = 0;
      this.weekNumber = time.filterInt(this.week);
      this.createButtonId(this.timeRange);
      this.updateButtonId(this.slots, this.buttonIdList, this.Clients);
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
      // console.log('buttonIdList ready');
      // console.log('buttonIdList', this.buttonIdList);
      return this.buttonIdList;
    },
    updateButtonId: function(slots, idList, clients){
      if (slots){
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
              idList[j].color = 'teal darken-1';
              for (let k=0; k<clients.length; k++){
                let apt = moment(clients[k].time, 'LLLL').format('YYYY-MM-DD-HH-mm').toString();
                if (id == apt){
                  idList[j].client = clients[k].lastname;
                }
              }
            }
          }
        }
      }
      return this.buttonIdList;
      }
      else{
        console.log('merci de créer vos disponibilités');
      }
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
      console.log('buttonIsInDay ready');
      let a = moment(day).format('YYYY-MM-DD').toString();
      let b = btn.id.slice(0,10);
      if(a == b) {
        return true;
      }
    },
    getMatchingSlot: function(btn, slots){
        for (let i=0; i<slots.length; i++){
          let sl = moment(slots[i].start).format('YYYY-MM-DD-HH-mm').toString();
          let id = btn.id.slice(0,16);
          if (sl == id){
            this.matchingSlot = slots[i];
            console.log('the matching slot is:', this.matchingSlot);
          }
        }
    },
    getNextMeeting(clients){
      console.log('jpl next meeting');
      let nextMeeting = '';
      for (let i=0; i<clients.length; i++){
        let rdv = moment(clients[i].time,'LLLL');
        let rdvAfter =  moment(clients[i].time,'LLLL').add(moment(clients[i].time,'LLLL'), 'minutes');
        if ( this.now.isAfter(rdv) && this.now.isBefore(rdvAfter)){
        nextMeeting = client[i].time;
        console.log('nextMeeting:', nextMeeting);
        return nextMeeting
        }
      }
     }
  },
  filters: {
    dateFormatDayName(date) {
      return moment(date).format('dddd');
    },
    dateFormatDayNumberAndMonth(date) {
      return moment(date).format('D MMM');
    },
    formatDayHour(date) {
      return moment(date).format('lll');
    },
    formatHour(hour){
      return moment(hour).format('HH:mm');
    },
    displayButtonId(id){
      return id.slice(11,16);
    }
  }


};
</script>


<style scoped>


h1, h2{
  font-weight: normal;
  color: #404040;
}


.background{
  color: #606060;
}

.toolbar{
  color:white;
}


.day{
  min-width: 13%;
  padding: 0;
  margin: 0;
}


.dayName{
  color: #606060;
}

.dayNumber{
  color: #606060;
}

.slotUl{
width: 100%;
list-style-type: none;
  padding: 0;
  margin: 0;
}

.btn.btn--outline {
    border: none;
}

.A{
  border-top: 1px dotted #e5e5e5;
  border-bottom:1px dotted #e5e5e5;
  border-left: 10px solid #64FFDA;
  border-right: 1px solid #d4d4d4;
  border-radius:0;
  width: 100%;
  margin-bottom: 0px;
  margin-top: 0px;
  margin-left:0px;
  font-size: 10px;
  vertical-align: top
}

.N{
  border-top: 1px dotted #e5e5e5;
  border-bottom:1px dotted #e5e5e5;
  border-left: 1px solid #d4d4d4;
  border-right: 1px solid #d4d4d4;
  border-radius:0;
  width: 100%;
  margin-bottom: 0px;
  margin-top: 0px;
  margin-left:0px;
  font-size: 8px;
  vertical-align: top;
}

.B{
  border-top: 1px dotted #e5e5e5;
  border-bottom:1px dotted #e5e5e5;
  border-left: 10px solid #00897B;
  border-right: 1px solid #d4d4d4;
  border-radius:0;
  width: 100%;
  margin-bottom: 0px;
  margin-top: 0px;
  margin-left:0px;
  font-size: 10px;
  vertical-align: top;
}

.slotLi{
  width: 100%;
}

.slotLi__button_id{
  text-align: left;
  width: 100%;
}


</style>