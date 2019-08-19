<template>
  <div id="base">
    <mobile-header></mobile-header>

    <div class="kt-grid kt-grid--hor kt-grid--root">
      <!-- begin::Body -->
      <div class="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--ver kt-page">
        <div
          class="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor kt-wrapper"
          id="kt_wrapper"
        >
          <!-- begin:: Header -->
          <dashboard-header></dashboard-header>
          <!-- end:: Header -->

          <!-- begin:: Content -->
          <dashboard-content></dashboard-content>

          <content-footer></content-footer>
        </div>
      </div>
      <!-- end:: Body -->

      <!--<kt-quick-panel></kt-quick-panel>
      <kt-scroll-top></kt-scroll-top>
      <kt-sticky-toolbar></kt-sticky-toolbar>-->
    </div>
  </div>
</template>
<style lang="scss">
</style>
<script>
  import AuthService from "../../services/AuthService";
  import MobileHeader from "./MobileHeader";
  import ContentFooter from "./ContentFooter";
  import DashboardContent from "./Content";
  import DashboardHeader from "./Header";
  export default {
    components: {
      ContentFooter,
      MobileHeader,
      DashboardContent,
      DashboardHeader
    },
    methods: {
      logout() {
        AuthService.removeUser();
        this.$store.commit("CLEAR_USER");
        this.$router.push({ path: "/login" });
      }
    }
  };
</script>
