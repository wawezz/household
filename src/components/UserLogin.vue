<template>
    <div class="user">
      <div v-if="!result">
        <h2>Login: {{userMessage}}</h2>
        <input type="text" placeholder="login" v-model="userName">
        <br>
        <h2>Password: {{passwordMessage}}</h2>
        <input type="text" placeholder="password" v-model="userPass">
        <br>
        <br>
        <h2></h2>
        <br>

        <button @click="userSubmit">
           Submit
        </button>
      </div>

      <div v-if="result">
          <h2>пользователь успешно найден</h2>
          {{this.$store.state.userLoggedIn + '-состояние юзера в store'}}
      </div>
    </div>
</template>


<script>
    export default {
        name: 'UserLogin.vue',

        data: ()=>{
            return {
                userName: "",
                userPass: "",
                userMessage: "",
                passwordMessage: "",
                result: false
            }
        },

        methods: {
           userSubmit() {
               function validateUser(str) {
                 let regularValidate = /^(|[a-z\s]+|[A-Z\s])$/iu.test(str)
                 if(str.length<5)
                 {
                   return 'invalidLength'
                 }
                 if(!regularValidate)
                 {
                   return 'incorrect symbols'
                 }
                 if(regularValidate && (str.length>=5))
                 {
                   return true
                 }
               }

               const valueUserName = validateUser(this.userName)
               const valuePasswordName = validateUser(this.userPass)

               if (valueUserName && valuePasswordName && this.userName == this.$store.state.username &&
                   this.userPass == this.$store.state.userlogin)
               {
                   this.result = true;
               }

               return this.$store.commit('userSubmitSuccessful')
           }
        }

    }
</script>

<style scoped>

</style>