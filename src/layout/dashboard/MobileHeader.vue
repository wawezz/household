<template>
  <div id="kt_header_mobile" class="kt-header-mobile kt-header-mobile--fixed">
    <div class="kt-header-mobile__logo">
      <a routerLink="/">
        <img alt="logo" :src="require('./../../assets/media/logos/logo-2-sm.png')" />
      </a>
    </div>
    <div class="kt-header-mobile__toolbar">
      <button
        class="kt-header-mobile__toggler kt-header-mobile__toggler--left"
        id="kt_aside_mobile_toggler"
      >
        <span></span>
      </button>
      <button class="kt-header-mobile__toolbar-toggler" id="kt_header_mobile_toggler">
        <span></span>
      </button>
      <button class="kt-header-mobile__toolbar-topbar-toggler" id="kt_header_mobile_topbar_toggler">
        <i class="flaticon-more-1"></i>
      </button>
    </div>
  </div>
</template>
<style>
</style>