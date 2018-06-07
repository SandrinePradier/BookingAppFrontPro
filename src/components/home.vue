<template>
  <v-container fluid>
  <v-container class="container" fluid>
     <img height="650"
             :src="require('./../assets/images/background.jpg')" />
  </v-container>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-card flat>
        <v-card-text>
              <v-flex xs12 align-end flexbox>
                <p class="date">{{day}}&nbsp{{date}}</p>
                <p class="hour">{{hour}}</p>
              </v-flex>
        </v-card-text>
        <v-card-title>
          <v-flex xs12 align-end flexbox>
            <span>Prochain Rendez-vous: &nbsp</span><br>
            <span>ICI le prochain RDV</span>
          </v-flex>
        </v-card-title>
      </v-card>
    </v-flex>
  </v-layout>
  </v-container>
</template>

<script>

import { store } from './../store/store';
import axios from 'axios';
import moment from 'moment';

export default {
  name: 'Home',
  data () {
    return {
      // imageSrc:"require('./../assets/images/background.jpg')"
    }
  },
  created(){
    this.$store.dispatch('loadClients');
  },
  computed:{
    day(){
      return moment().format('dddd');
    },
    date(){
      return moment().format('D MMM');
    },
    hour(){
      return moment().format('HH:mm');
    }
  }
};
</script>


<style scoped>

/*.container {
    -webkit-box-flex: 1;
    -ms-flex: 1 1 100%;
    flex: 1 1 100%;
    padding: 0px !important;
    margin-top: 0px;
    margin: auto;
   /*  padding: -16px; */
   /* width: 100%;*/
/*}*/*/

.container {
  position: fixed; 
  top: -50%; 
  left: -50%; 
  width: 200%; 
  height: 200%;
}
.container img {
  position: absolute; 
  top: 0; 
  left: 0; 
  right: 0; 
  bottom: 0; 
  margin: auto; 
  min-width: 50%;
  min-height: 50%;
}

/*.hello{
  padding: 0px !important;
  margin:0px !important;
}*/
.hour{
  font-size:60px;
}

.date{
  padding-top: 5vh;
  font-size:25px;
}

img {
 width: 100%;
height:auto;
  margin-top:0px;
}

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