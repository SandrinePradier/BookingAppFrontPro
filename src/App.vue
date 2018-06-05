<template>
  <v-app>
      <v-content>
        <router-view name="menu"></router-view>
        <router-view></router-view>
      </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data(){
    return {
    }
  },
  methods:{
  }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*height: 100%*/
  /*margin-top: 60px;*/
}
</style>
