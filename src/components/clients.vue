<template>
  <v-card>
    <v-card-title>
      Clients
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
      ></v-text-field>
    </v-card-title>
    <template >
    <v-data-table
      :headers="headers"
      :items="clients"
      :search="search"
    >
    <template slot="items" slot-scope="row">
        <td class="text-xs-left">{{ row.item.lastname }}</td>
        <td class="text-xs-left">{{ row.item.email }}</td>
        <td class="text-xs-left">{{ row.item.time | dateFormatFullDayHour}}</td>
        <td class="text-xs-left">{{ row.item.duration }} min</td>
      </template>
     
      <v-alert slot="no-results" :value="true" color="error" icon="warning">
        aucun résultat ne correspont à votre recherche "{{ search }}".
      </v-alert>
    </v-data-table>
     </template>
  </v-card>
</template>

<script>

import moment from 'moment';
import 'moment/locale/fr';
import { store } from './../store/store'
import http from './../helpers/http'


export default {
  name: 'Clients',
  data () {
    return {
      msg: 'Welcome to Clients',
      clients: [],
      search: '',
      headers: [
        {
          text: 'Nom',
          align: 'left',
          value: 'lastname'
        },
        { text: 'Email', value: 'email' },
        { text: 'Rendez-vous', value: 'time' },
        { text: 'Durée du RDV', value: 'duration' }
      ]
    }
  },
  created(){
    http.get('/clients')
    .then(res => {
      console.log('res from get clients:', res);
      this.clients = res.data.content
   // on passera les clients au store
    })
    .catch(error => {
      console.log( 'error:', error);
    })
  },
  filters:{
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