<template>
  <div class="login">
    <h2>Please log in...</h2>
    <LoginForm />
  </div>
</template>

<script>
  import { LoginForm } from "@/components";

  export default {
    name: "login",
    components: { LoginForm }
  };
</script>

<style scoped>
</style>