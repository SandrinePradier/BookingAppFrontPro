<template>
  <v-container>
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
      <v-list >
        <v-list-tile v-on:click="logOut()">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Log Out</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

    </v-navigation-drawer>

    <!-- Top menu -->
    <v-toolbar flat class="toolbar" color="primary" app>
      <v-toolbar-side-icon v-on:click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor:pointer">My Booking App</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon>search</v-icon>
            </v-btn>
            <v-btn icon v-on:click="logOut()">
              <v-icon>exit_to_app</v-icon>
            </v-btn>
    </v-toolbar>

  </v-container>
</template>

<script>
export default {
  name: 'Menu',
  data(){
    return {
      ndItems: [
          { title: 'Home', icon: 'home', link:'/home' },
          { title: 'Clients', icon: 'contacts', link:'/clients'},
          { title: 'Agenda', icon: 'date_range', link:'/agenda' },
          { title: 'Disponibilités', icon: 'settings_applications', link:'/availabilitysettings' },
          // { title: 'Log Out', icon: 'exit_to_app', @click:"logOut()" }
        ],
      drawer: null
    }
  },
  methods:{
    logOut () {
      console.log('je vais me déconnecter');
      sessionStorage.clear();
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>

</style>