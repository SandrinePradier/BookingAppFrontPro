<template>
    <v-container fluid>
    <h1>{{msg}}</h1>
  </v-container>
</template>

<script>

export default {
  name: 'Agenda',
  data () {
    return {
      msg: 'Welcome to Agenda',
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