<template>
  <div
    class="kt-body kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor kt-grid--stretch"
    id="kt_body"
  >
    <div class="kt-container--fluid kt-grid kt-grid--ver">
      <!-- begin:: Aside Left -->
      <div v-if="asideDisplay">
        <button class="kt-aside-close" id="kt_aside_close_btn">
          <i class="la la-close"></i>
        </button>
        <!--<kt-aside-left></kt-aside-left>-->
      </div>
      <!-- end:: Aside Left -->

      <div
        class="kt-content kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor"
        id="kt_content"
      >
        <!-- begin:: Content Head -->
        <!--<kt-subheader *ngIf="subheaderDisplay"></kt-subheader>-->
        <!-- end:: Content Head -->

        <!-- begin:: Content Body -->
        <div
          ktContentAnimate
          class="kt-container kt-grid__item kt-grid__item--fluid kt-container--fluid"
        >
          <router-view></router-view>
        </div>
        <!-- end:: Content Body -->
      </div>
    </div>
    <!-- end:: Content -->
  </div>
</template>
<script>
  export default {
    props: {
      asideDisplay: {
        type: Boolean,
        default: false
      },
      subheaderDisplay: {
        type: Boolean,
        default: false
      }
    }
  };
</script>
