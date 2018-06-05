<template>
  <v-container fluid class="hello">

    <v-content class="welcome">
    <v-layout class="text" column wrap justify-center>
    <v-flex class="msg"><h1>{{ msg }}</h1></v-flex>
    <v-flex class="msga"><h1>{{ msga }}</h1></v-flex>
    </v-layout>
    <v-btn outline color="white" v-if="visible" v-on:click.native="showLogin" :to="{name:'Landing'}">LogIn</v-btn>
    <v-btn outline color="white" v-if="!visible" v-on:click.native="showSignUp" :to="{name:'Landing'}">SignUp</v-btn>
    </v-content>

    <v-content class="signup">
      <signup v-bind:displaySignup="visible" v-on:signUpValidate="updateVisible($event)" v-if="visible"></signup>
    </v-content>
    <v-content class="login">
      <login v-bind:displayLogin="!visible" v-if="!visible"></login>
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
     visible: true,
    }
  },
  methods:{
    showLogin: function() {
        // console.log( 'this.visible :', this.visible)
        // console.log ('jaffiche le compoment login');
        this.visible = !this.visible;
        // console.log('this visible after click: ,', this.visible)
      },
      showSignUp: function() {
        // console.log( 'this.visible :', this.visible)
        // console.log ('jaffiche le compoment signUp');
        this.visible = !this.visible;
        // console.log('this visible after click: ,', this.visible)
      },
      updateVisible: function(updatedVisible){
        this.visible = updatedVisible;
      }
  }
};
</script>


<style scoped>

.hello{
  /*background-image: linear-gradient(to right, #43e97b 0%, #38f9d7 100%);*/
  background-image: linear-gradient(to top, #37ecba 0%, #72afd3 100%);
  /*background-image: linear-gradient(to top, #9890e3 0%, #b1f4cf 100%);*/
  height: 100%;
  color:white;
}

.text{
  margin-top: 30vh;
}

h1 {
  text-align: center;
  color:white;
  font-family: 'Raleway', sans-serif;
  font-weight: 1200;
  font-size: 60px;
  line-height: 60px;
 
}

.msga{
  margin-bottom: 5vh;
}

</style>