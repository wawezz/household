<template>
  <!-- BEGIN: Horizontal Menu -->
  <div class="menuhorizontal kt-container kt-container--fluid">
    <button class="kt-header-menu-wrapper-close" id="kt_header_menu_mobile_close_btn">
      <i class="la la-close"></i>
    </button>
    <div class="kt-header-menu-wrapper" id="kt_header_menu_wrapper">
      <div id="kt_header_menu" class="kt-header-menu kt-header-menu-mobile">
        <ul class="kt-menu__nav">
          <li
            class="kt-menu__item kt-menu__item--submenu kt-menu__item--rel"
            data-ktmenu-submenu-toggle="click"
            aria-haspopup="true"
          >
            <router-link to="/dashboard" class="kt-menu__link kt-menu__toggle">
              <span class="kt-menu__link-text">Dashboards</span>
              <i class="kt-menu__ver-arrow la la-angle-right"></i>
            </router-link>
          </li>
          <li
            class="kt-menu__item kt-menu__item--submenu kt-menu__item--rel"
            data-ktmenu-submenu-toggle="click"
            aria-haspopup="true"
          >
            <router-link to="/basic-costs/1" class="kt-menu__link kt-menu__toggle">
              <span class="kt-menu__link-text">Basic Costs</span>
              <i class="kt-menu__ver-arrow la la-angle-right"></i>
            </router-link>
          </li>
          <li
            class="kt-menu__item kt-menu__item--submenu kt-menu__item--rel"
            data-ktmenu-submenu-toggle="click"
            aria-haspopup="true"
          >
            <router-link to="/direct-costs/1" class="kt-menu__link kt-menu__toggle">
              <span class="kt-menu__link-text">Direct Costs</span>
              <i class="kt-menu__ver-arrow la la-angle-right"></i>
            </router-link>
          </li>
          <li
            class="kt-menu__item kt-menu__item--submenu kt-menu__item--rel"
            data-ktmenu-submenu-toggle="click"
            aria-haspopup="true"
          >
            <router-link to="/unit-costs/1" class="kt-menu__link kt-menu__toggle">
              <span class="kt-menu__link-text">Unit Costs</span>
              <i class="kt-menu__ver-arrow la la-angle-right"></i>
            </router-link>
          </li>
          <li
            class="kt-menu__item kt-menu__item--submenu kt-menu__item--rel"
            data-ktmenu-submenu-toggle="click"
            aria-haspopup="true"
          >
            <router-link to="/cost-distribution/1" class="kt-menu__link kt-menu__toggle">
              <span class="kt-menu__link-text">Cost Distribution</span>
              <i class="kt-menu__ver-arrow la la-angle-right"></i>
            </router-link>
          </li>
          <li
            class="kt-menu__item kt-menu__item--submenu kt-menu__item--rel"
            data-ktmenu-submenu-toggle="click"
            aria-haspopup="true"
          >
            <router-link to="/city-constants/1" class="kt-menu__link kt-menu__toggle">
              <span class="kt-menu__link-text">City Constants</span>
              <i class="kt-menu__ver-arrow la la-angle-right"></i>
            </router-link>
          </li>
          <li
            class="kt-menu__item kt-menu__item--submenu kt-menu__item--rel"
            data-ktmenu-submenu-toggle="click"
            aria-haspopup="true"
          >
            <router-link to="/indirect-costs/1" class="kt-menu__link kt-menu__toggle">
              <span class="kt-menu__link-text">Indirect Costs</span>
              <i class="kt-menu__ver-arrow la la-angle-right"></i>
            </router-link>
          </li>
          <li
            class="kt-menu__item kt-menu__item--submenu kt-menu__item--rel"
            data-ktmenu-submenu-toggle="click"
            aria-haspopup="true"
          >
            <router-link to="/demolition-constants/1" class="kt-menu__link kt-menu__toggle">
              <span class="kt-menu__link-text">Demolition Constants</span>
              <i class="kt-menu__ver-arrow la la-angle-right"></i>
            </router-link>
          </li>
        </ul>
      </div>
      <div class="kt-header-toolbar">
        <button class="kt-header-menu-wrapper-close">
          <i class="la la-close"></i>
        </button>
        <div class="kt-header-menu kt-header-menu-mobile">
          <ul class="kt-menu__nav">
            <li
              class="kt-menu__item kt-menu__item--submenu kt-menu__item--rel"
              data-ktmenu-submenu-toggle="click"
              aria-haspopup="true"
            ></li>
          </ul>
        </div>
        <div class="kt-quick-search" id="kt_quick_search_default">
          <form method="get" class="kt-quick-search__form">
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text">
                  <i class="flaticon2-search-1"></i>
                </span>
              </div>
              <input
                type="text"
                class="form-control kt-quick-search__input"
                placeholder="Search..."
              />
              <div class="input-group-append">
                <span class="input-group-text">
                  <i class="la la-close kt-quick-search__close"></i>
                </span>
              </div>
            </div>
          </form>
          <div id="kt_quick_search_toggle" data-toggle="dropdown" data-offset="0px,10px"></div>
          <div
            class="dropdown-menu dropdown-menu-fit dropdown-menu-right dropdown-menu-anim dropdown-menu-lg"
          >
            <div
              class="kt-quick-search__wrapper kt-scroll"
              data-scroll="true"
              data-height="300"
              data-mobile-height="200"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang = "scss" scoped>
  :host {
    width: 100%;
    .kt-header-menu-wrapper {
      height: 100%;
    }
  }

  .kt-header-menu .kt-menu__nav .kt-menu__link.active {
    background-color: #374afb;

    .kt-menu__link-icon {
      color: #ffffff;
      svg g [fill] {
        transition: fill 0.3s ease;
        fill: #ffffff;
      }
    }

    .kt-menu__link-bullet {
      .kt-menu__link-bullet--dot > span {
        background-color: #ffffff;
      }
      .kt-menu__link-bullet--line > span {
        background-color: #ffffff;
      }
    }
    .kt-menu__link-text {
      color: #ffffff;
    }
    .kt-menu__hor-arrow {
      color: #ffffff;
    }
  }
</style>