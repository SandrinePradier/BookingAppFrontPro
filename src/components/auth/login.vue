<template>
		<v-content class="auth">
				<v-form ref="form1">
		<v-text-field color="white" type="text" v-model="username" name="username" placeholder="e-mail" :rules="usernameRules" autocomplete="off"/>
		<v-text-field color="white" type="password" v-model="password" name="password" placeholder="password"
		:rules="[v => !!v || 'Password requis']" autocomplete="off"/>
		<v-btn outline class="btncol" color="white" v-on:click="logIn()" type="button">Log in</v-btn>
		<v-btn outline color="white" v-on:click="$refs.form1.reset()" type="button">Annuler</v-btn>
	</v-form>
		</v-content>
</template>

<script type="text/javascript">

import http from './../../helpers/http'

	export default {
		name:"login",
		props: ['displayLogin'],
		data (){
			return{
				username:'',
				password:'',
				token: '',
				form1:'',
				usernameRules: [
        v => !!v || 'Email requis',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'L\'e-mail doit être valide'
      ],
			}
		},
		methods: {
			logIn(){
				if (this.$refs.form1.validate()){
					let postBody = {
					username : this.username,
					password: this.password,
				};
				http.post('/auth/login', postBody)
					.then(
						res => {
						if (res.data.content) {
							this.token = res.data.content;
							sessionStorage.setItem('token', this.token);
							this.$swal('welcome');
							this.$router.push('home');
						} 
						})
					.catch(
						error => {
					    console.log(error.response);
					});
				}
			}
		}
	};


</script>

<style scoped type="text/css">

.auth{
	width: 50%;
	color: white;
	margin: auto;
}

.input{
	background-color: none;
}

/*.application .theme--light.input-group input, .application .theme--light.input-group textarea, .theme--light .input-group input, .theme--light .input-group textarea {
    color: white !important;
    background-color: none !important;
    -webkit-text-fill-color: white !important;
}*/

.btncol{
  border:1px solid !important;
}

</style>