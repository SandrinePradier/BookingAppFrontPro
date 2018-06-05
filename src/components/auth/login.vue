<template>
		<v-content class="auth">
				<v-form>
		<v-text-field type="text" v-model="username" name="username" placeholder="e-mail"/>
		<v-text-field type="password" v-model="password" name="password" placeholder="password"/>
		<v-btn outline v-on:click="logIn()" type="button">Log in</v-btn>
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
			}
		},
		methods: {
			logIn: function (){
				console.log('je clique sur logIn');
				//récupérer les données
				let postBody = {
					username : this.username,
					password: this.password,
				}
				console.log('postBody: ', postBody);
				//envoyer les données au back et récupérer le token
				http.post('/auth/login', postBody)
					.then(
						res => {
						console.log('res from login:',res);
						//here we will get back the token
						if (res.data.content) {
							this.token = res.data.content;
							console.log('token:', this.token);
							//here we will store the token in local storage
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
	};
</script>

<style type="text/css">

.auth{
	width: 50%;
	color: white;
	margin: auto;
}
</style>