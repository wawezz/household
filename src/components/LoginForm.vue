<template>
  <div class="kt-login__body">
    <!--begin::Signin-->
    <div class="kt-login__form">
      <div class="kt-login__title">
        <h3>Sign In</h3>
      </div>

      <div v-if="errors.username" class="alert alert-danger" role="alert">
        <div class="alert-text">{{errors.username}}</div>
      </div>

      <div v-if="errors.password" class="alert alert-danger" role="alert">
        <div class="alert-text">{{errors.password}}</div>
      </div>

      <!--begin::Form-->
      <form class="kt-form" autocomplete="off">
        <div class="form-group">
          <div>
            <input class="form-control" type="text" placeholder="login" v-model="data.username" />
          </div>
        </div>
        <div class="form-group">
          <div>
            <input
              class="form-control"
              type="password"
              placeholder="password"
              v-model="data.password"
            />
          </div>
        </div>
        <!--begin::Action-->
        <div class="kt-login__actions">
          <button
            @click="submitForm"
            class="kt-spinner kt-spinner--right kt-spinner--md btn btn-primary btn-elevate kt-login__btn-primary"
            id="kt_login_signin_submit"
          >Submit</button>
        </div>
        <!--end::Action-->
      </form>
      <!--end::Form-->
    </div>
    <!--end::Signin-->
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

        this.$router.push({
          path: "/"
        });
      }
    },
    mixins: [main]
  };
</script>

<style>
</style>