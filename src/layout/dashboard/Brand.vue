<template>
  <div class="kt-header__brand kt-grid__item" id="kt_header_brand">
    <div class="kt-header__brand-logo">
      <router-link :to="'/dashboard'">
        <img
          alt="logo"
          :src="require('./../../assets/media/logos/logo-2.png')"
          class="kt-header__brand-logo-default"
        />
        <img
          alt="logo"
          :src="require('./../../assets/media/logos/logo-2-sm.png')"
          class="kt-header__brand-logo-sticky"
        />
      </router-link>
    </div>
    <div class="kt-header__brand-nav">
      <div ngbDropdown class="dropdown">
<!--        <button-->
<!--          ngbDropdownToggle-->
<!--          type="button"-->
<!--          class="btn btn-default dropdown-toggle"-->
<!--        >SAAS Customers</button>-->
        <div ngbDropdownMenu class="dropdown-menu dropdown-menu-lg">
          <ul class="kt-nav kt-nav--bold kt-nav--md-space kt-nav--v3 kt-margin-t-20 kt-margin-b-20">
            <li class="kt-nav__item">
              <a class="kt-nav__link active" href="javascript:;">
                <span class="kt-nav__link-icon">
                  <i class="flaticon2-user"></i>
                </span>
                <span class="kt-nav__link-text">Human Resources</span>
              </a>
            </li>
            <li class="kt-nav__item">
              <a class="kt-nav__link" href="javascript:;">
                <span class="kt-nav__link-icon">
                  <i class="flaticon-feed"></i>
                </span>
                <span class="kt-nav__link-text">Customer Relationship</span>
              </a>
            </li>
            <li class="kt-nav__item">
              <a class="kt-nav__link" href="javascript:;">
                <span class="kt-nav__link-icon">
                  <i class="flaticon2-settings"></i>
                </span>
                <span class="kt-nav__link-text">Order Processing</span>
              </a>
            </li>
            <li class="kt-nav__item">
              <a class="kt-nav__link" href="javascript:;">
                <span class="kt-nav__link-icon">
                  <i class="flaticon2-chart2"></i>
                </span>
                <span class="kt-nav__link-text">Accounting</span>
              </a>
            </li>
            <li class="kt-nav__separator"></li>
            <li class="kt-nav__item">
              <a class="kt-nav__link" href="javascript:;">
                <span class="kt-nav__link-icon">
                  <i class="flaticon-security"></i>
                </span>
                <span class="kt-nav__link-text">Finance</span>
              </a>
            </li>
            <li class="kt-nav__item">
              <a class="kt-nav__link" href="javascript:;">
                <span class="kt-nav__link-icon">
                  <i class="flaticon2-cup"></i>
                </span>
                <span class="kt-nav__link-text">Administration</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
