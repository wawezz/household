<template>
  <div class="kt-header kt-grid__item" id="kt_header">
    <div class="kt-header__top">
      <div class="kt-container kt-container--fluid">
        <!-- begin:: Brand -->
        <brand></brand>
        <!-- end:: Brand -->
        <!-- begin:: Header Topbar -->
        <topbar></topbar>
        <!-- end:: Header Topbar -->
      </div>
    </div>
    <div class="kt-header__bottom">
      <div class="kt-container kt-container--fluid">
        <!-- begin: Header Menu -->
        <!--<kt-menu-horizontal *ngIf="menuHeaderDisplay"></kt-menu-horizontal>-->
        <!-- end: Header Menu -->
      </div>
    </div>
  </div>
</template>
<script>
  import Brand from "./Brand";
  import Topbar from "./Topbar";
  export default {
    components: {
      Brand,
      Topbar
    }
  };
</script>

