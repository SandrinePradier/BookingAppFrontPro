<template>
  <v-container fluid class="hello">

    <v-content class="welcome">
    <v-layout class="text" column wrap justify-center>
    <v-flex class="msg"><h1>{{ msg }}</h1></v-flex>
    <v-flex class="msga"><h1>{{ msga }}</h1></v-flex>
    <v-flex class="msgb"><h5>{{ msgb }}</h5></v-flex>
    </v-layout>
    <v-btn outline class="btncol" color="white" v-on:click.native="showLogin" :to="{name:'Landing'}" v-if="visible">LogIn</v-btn>
    </v-content>

    <v-content class="signup">
    </v-content>
    <v-content class="login">
      <login v-if="!visible"></login>
    </v-content>
  </v-container>
</template>


<script>
import Signup from './signup'
import Login from './login'

export default {
  name: 'Landing',
  components: {
    Login,
    Signup
    },
  data () {
    return {
     msg:'Bienvenue',
     msga:'sur MyBookingApp !',
     msgb:'MyBookingApp est une application qui permet de proposer une prise de rendez-vous en ligne à vos clients.',
     visible: true,
    }
  },
  methods:{
    showLogin: function() {
        this.visible = !this.visible;
      }
  }
};
</script>


<style scoped>

.hello{
  background-image: linear-gradient(to top, #64FFDA 0%, #00897B 100%);
  height: 100%;
  color:white;
}

.text{
  margin-top: 25vh;
}


h1 {
  text-align: center;
  color:white;
  font-family: 'Raleway', sans-serif;
  font-weight: 1200;
  font-size: 60px;
  line-height: 60px;
}


.msgb{
  margin-bottom: 5vh;
}

.btncol{
  border:1px solid !important;
}

</style>