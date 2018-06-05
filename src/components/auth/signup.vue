<template>
		<v-content class="auth">
				<v-form>
				<v-text-field type="text" v-model="username" name="username" placeholder="e-mail"/>
				<v-text-field type="password" v-model="password" name="password" placeholder="password"/>
				<v-text-field type="text" v-model="firstname" name="firstname" placeholder="firstname"/>
				<v-text-field type="text" v-model="lastname" name="lastname" placeholder="lastname"/>
				<v-btn outline v-on:click='signUp()' type="button">Sign Up</v-btn>
			</v-form>
		</v-content>
</template>

<script type="text/javascript">

import http from './../../helpers/http'

	export default {
		name: 'Signup',
		props: ['displaySignup'],
		//here with props we get the values of below props
		// from authentication(parent) component
		data (){
			return {
				username:'',
				password :'',
				firstname:'',
				lastname:'',
				isDisplayed: this.displaySignup
			}
		},
		methods:{
			signUp: function() {
				console.log('je clique sur signUp');
				// récupérer les données et envoyer les données au back
				let postBody = {
					username : this.username,
					password: this.password,
					firstname: this.firstname,
					lastname: this.lastname
				};
				console.log('postBody: ', postBody);
				http.post('/auth/signup', postBody)
					.then(
						res => {
						console.log('res:',res);})
					.catch(
						error => {
					    console.log(error.response)
					});

					
				// if OK rediriger//afFicher vers login
				this.isDisplayed = !this.isDisplayed;
				console.log('this.isDisplayed: ', this.isDisplayed)
				this.$emit('signUpValidate', this.isDisplayed)

				//if not OK: message erreur
				}
			}

	};

</script>

<style >

.auth{
	width: 50%;
	color: white;
	margin: auto;
}

</style>