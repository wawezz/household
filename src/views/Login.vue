<template>
  <div class="kt-grid kt-grid--ver kt-grid--root">
    <div class="kt-grid kt-grid--hor kt-grid--root kt-login kt-login--v1" id="kt_login">
      <div
        class="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--desktop kt-grid--ver-desktop kt-grid--hor-tablet-and-mobile"
      >
        <!--begin::Aside-->
        <div
          class="kt-grid__item kt-grid__item--order-tablet-and-mobile-2 kt-grid kt-grid--hor kt-login__aside"
          v-bind:style="{ backgroundImage: 'url(' + require('./../assets/media/bg/bg-4.jpg') + ')' }"
        >
          <div class="kt-grid__item">
            <a href="javascript:;" class="kt-login__logo">
              <img :src="require('./../assets/media/logos/logo-4.png')" alt />
            </a>
          </div>
          <div class="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--ver">
            <div class="kt-grid__item kt-grid__item--middle">
              <h3 class="kt-login__title">Welcome to Metronic!</h3>
              <h4
                class="kt-login__subtitle"
              >The ultimate Bootstrap &amp; Angular 8 admin theme framework for next generation web apps.</h4>
            </div>
          </div>
          <div class="kt-grid__item">
            <div class="kt-login__info">
              <div class="kt-login__copyright">© 2019 Metronic</div>
              <div class="kt-login__menu"></div>
            </div>
          </div>
        </div>
        <!--begin::Aside-->

        <!--begin::Content-->
        <div
          class="kt-grid__item kt-grid__item--fluid kt-grid__item--order-tablet-and-mobile-1 kt-login__wrapper"
        >
          <LoginForm />
        </div>
        <!--end::Content-->
      </div>
    </div>
  </div>
</template>

<script>
  import { LoginForm } from "@/components";

  export default {
    name: "login",
    components: { LoginForm }
  };
</script>

<style lang="scss">
  @import "../assets/css/pages/login/login-1.css";
</style>