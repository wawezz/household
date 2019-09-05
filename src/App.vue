<template>
  <div class="full-height">
    <router-view :key="$route.fullPath"></router-view>
  </div>
</template>

<style>
  .full-height {
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    flex-direction: column;
    height: 100%;
  }
</style>