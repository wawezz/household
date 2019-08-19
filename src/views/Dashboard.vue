
<template>
  <div class="home"></div>
</template>

<script>
  import authGuard from "./../guards/auth.guard";

  export default {
    beforeRouteEnter: authGuard
  };
</script>
