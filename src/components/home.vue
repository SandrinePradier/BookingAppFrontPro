<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>

import { store } from './../store/store';

export default {
  name: 'Home',
  data () {
    return {
      msg: 'Welcome to Home'
    }
  },
  created(){
    this.$store.dispatch('loadClients');
    this.$store.dispatch('loadSlots');
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