<template>
  <div>
    <div v-if="response.message" class="alert alert-success" role="alert">
      <div class="alert-text">{{response.message}}}</div>
    </div>

    <div v-if="error.message" class="alert alert-danger" role="alert">
      <div class="alert-text">{{error.message}}</div>
    </div>
  </div>
</template>


<script>
  export default {
    name: "notifications",
    props: {
      response: {
        type: Object
      },
      error: {
        type: Object
      }
    }
  };
</script>

<style>
</style>