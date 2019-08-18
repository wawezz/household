
<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
  </div>
</template>

<script>
  import authGuard from "./../guards/auth.guard";

  export default {
    beforeRouteEnter: authGuard
  };
</script>
