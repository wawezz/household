<template>
    <div class="user">
      <div v-if="!result">
        <h2>Login: {{userMessage}}</h2>
        <input
          type="text"
          placeholder="login"
          v-model="userName"
          @blur="validateUserField(userName)"
        >
        <br>
        <h2>Password: {{passwordMessage}}</h2>
        <input
          type="text"
          placeholder="password"
          v-model="userPass"
          @blur="validatePasswordField(userPass)"
        >
        <br>
        <br>
        <button @click="userSubmit">
           Submit
        </button>
        <br>
        <br>
        <hr>
        <button @click="adminInit">Initialise Local storage with admin</button> {{admin}}
        <br>
        <button @click="clearStorage">Clear Local storage </button> {{admin}}
      </div>

      <div v-if="result">
          <h2>пользователь успешно найден</h2>
          {{this.$store.state.userLoggedIn + ' -состояние юзера в store'}}
      </div>
    </div>
</template>


<script>

    import {main} from '../mixins/main'

    export default {
        name: 'UserLogin.vue',

        data: ()=>{
            return {
                userName: "",
                userPass: "",
                userMessage: "",
                passwordMessage: "",
                result: false,
                admin: null
            }
        },

        methods: {
//вспомогательные методы для инициализации LocalStorage

            adminInit: function() {
                localStorage['Username'] = 'admin'
                this.admin = localStorage.getItem('Username')
            },

            clearStorage: function(){
                localStorage.clear()
            },
///---------------------------------------------------

            validateUserField: function(message) {
              return this.userMessage = this.validateField(message)
            },

            validatePasswordField: function(message) {
              return this.passwordMessage = this.validateField(message)
            },

            userSubmit: function () {

                if (this.validateField(this.userName) === 'Correct' &&
                    this.validateField(this.userPass) === 'Correct' &&
                    this.userName == this.$store.state.username &&
                    this.userPass == this.$store.state.userlogin) {
                    this.result = true;
                }

                return this.$store.commit('userSubmitSuccessful')
            }
        },
       mixins: [main]

    }
</script>

<style scoped>

</style>