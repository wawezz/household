<template>
  <div class="wrapper">
    <div>
      <router-link to="/dashboard">Dashboard</router-link>|
      <router-link to="/houses/1">Houses</router-link>|
      <a href="#" @click.prevent="logout">Logout</a>
    </div>
    <div class="main-panel">
      <dashboard-content></dashboard-content>

      <content-footer></content-footer>
    </div>
  </div>
</template>
<style lang="scss">
</style>
<script>
  import AuthService from "../../services/AuthService";
  import ContentFooter from "./ContentFooter.vue";
  import DashboardContent from "./Content.vue";
  export default {
    components: {
      ContentFooter,
      DashboardContent
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
