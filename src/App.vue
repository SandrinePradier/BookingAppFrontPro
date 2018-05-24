<template>
  <v-app>
    <!-- side menu -->
    <v-navigation-drawer v-model="drawer" temporary app>
      <v-toolbar flat>
        <v-list>
          <v-list-tile>
            <v-list-tile-title class="title">
              <!-- <router-link to="/" style="cursor:pointer" tag="span">My Booking App</router-link> -->
            </v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <v-divider></v-divider>
      <v-list >
        <v-list-tile v-for="ndItem in ndItems" :key="ndItem.title" router :to="ndItem.link">
          <v-list-tile-action>
            <v-icon>{{ndItem.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ndItem.title}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <!-- Top menu -->
    <v-toolbar color="primary" app>
      <v-toolbar-side-icon v-on:click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor:pointer">My Booking App</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
            <v-btn icon>
              <v-icon>search</v-icon>
            </v-btn>
            <v-btn icon v-on:click="logOut()"><v-icon>exit_to_app</v-icon></v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <!-- main display -->
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>

    <!-- bottom part -->
    <v-footer color="primary" app></v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data(){
    return {
      ndItems: [
          { title: 'Home', icon: 'home', link:'/' },
          { title: 'Clients', icon: 'contacts', link:'/clients'},
          { title: 'Agenda', icon: 'date_range', link:'/agenda' },
          { title: 'Disponibilités', icon: 'settings_applications', link:'/workdays' },
          { title: 'Log Out', icon: 'exit_to_app' }
        ],
      drawer: null
    }
  },
  methods:{
    logOut () {
      console.log('je vais me déconnecter')
    }
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
  /*margin-top: 60px;*/
}
</style>
