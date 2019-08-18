<template>
  <div class="user">
    <h2>Login: {{errors.username}}</h2>
    <input type="text" placeholder="login" v-model="data.username" />
    <br />
    <h2>Password: {{errors.password}}</h2>
    <input type="text" placeholder="password" v-model="data.password" />
    <br />
    <br />
    <button @click="submitForm">Submit</button>
  </div>
</template>


<script>
  import AuthService from "../services/AuthService";
  import { main } from "../mixins/main";

  export default {
    name: "LoginForm",

    data: () => {
      return {
        data: {
          username: "",
          password: ""
        },
        errors: {
          username: null,
          password: null
        }
      };
    },
    computed: {
      hasError() {
        return this.errors.username !== null || this.errors.password !== null;
      }
    },
    methods: {
      submitForm() {
        if (this.inProgress === true) return;

        this.errors.username = null;
        this.errors.password = null;

        if (this.validateField(this.data.username) !== "Correct") {
          this.errors.username = "Incorrect username.";
          return false;
        }

        if (this.validateField(this.data.password) !== "Correct") {
          this.errors.password = "Password is required.";
          return false;
        }

        if (this.data.username !== this.$store.state.testUser.username) {
          this.errors.username = "No such user.";
          return false;
        }

        if (this.data.password !== this.$store.state.testUser.password) {
          this.errors.password = "Incorrect password.";
          return false;
        }

        if (this.hasError) {
          return false;
        }

        AuthService.setUser(this.$store.state.testUser.data);
        this.$store.commit("SET_USER", this.$store.state.testUser.data);
        this.$store.commit("CLEAR_AUTH_FORM_DATA");

        this.$router.push({ path: "/" });
      }
    },
    mixins: [main]
  };
</script>

<style scoped>
</style>