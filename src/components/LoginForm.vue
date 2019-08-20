<template>
  <div class="user">
    <div class="kt-login__head">
      <span class="kt-login__signup-label">Don't have an account yet?</span>&nbsp;&nbsp;
      <!--<a href="javascript:;" routerLink="/auth/register" class="kt-link kt-login__signup-link">{{ 'AUTH.GENERAL.SIGNUP_BUTTON' | translate }}</a>-->
    </div>

    <div class="kt-login__body">
      <!--begin::Signin-->
      <div class="kt-login__form">
        <div class="kt-login__title">
          <h3>Sign In</h3>
        </div>

        <!--<kt-auth-notice></kt-auth-notice>-->

        <!--begin::Form-->
        <form class="kt-form" autocomplete="off">
          <div class="form-group">
            <mat-form-field>
              <mat-label>Login: {{errors.username}}</mat-label>
              <br>
              <input type="text" placeholder="login" v-model="data.username" formControlName="password" autocomplete="off"/>
            </mat-form-field>
          </div>
          <div class="form-group">
            <mat-form-field>
              <mat-label>Password: {{errors.password}}</mat-label>
              <br>
              <input type="text" placeholder="password" v-model="data.password"/>
            </mat-form-field>
          </div>
          <!--begin::Action-->
          <div class="kt-login__actions">
            <button @click="submitForm"
                    class="kt-spinner
                    kt-spinner--right kt-spinner--md btn btn-primary btn-elevate kt-login__btn-primary"
                    id="kt_login_signin_submit">
                    Submit
                    </button>
          </div>
          <!--end::Action-->
        </form>
        <!--end::Form-->

        <!--begin::Divider-->
        <div class="kt-login__divider">
          <div class="kt-divider">
            <span></span>
            <span>OR</span>
            <span></span>
          </div>
        </div>
        <!--end::Divider-->

        <!--begin::Options-->
        <div class="kt-login__options">
          <a href="https://www.facebook.com/keenthemes/" target="_blank" class="btn btn-primary kt-btn">
            <i class="fab fa-facebook-f"></i>
            Facebook
          </a>

          <a href="https://twitter.com/keenthemes/" target="_blank" class="btn btn-info kt-btn">
            <i class="fab fa-twitter"></i>
            Twitter
          </a>

          <a href="javascript:;" class="btn btn-danger kt-btn">
            <i class="fab fa-google"></i>
            Google
          </a>
        </div>
        <!--end::Options-->
      </div>
      <!--end::Signin-->
    </div>

<!--Наша верстка-->
    <!--<h2>Login: {{errors.username}}</h2>-->
    <!--<input type="text" placeholder="login" v-model="data.username" />-->
    <!--<br />-->
    <!--<h2>Password: {{errors.password}}</h2>-->
    <!--<input type="text" placeholder="password" v-model="data.password" />-->
    <!--<br />-->
    <!--<br />-->
    <!--<button @click="submitForm">Submit</button>-->
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