<template>
    <!-- BEGIN: Horizontal Menu -->
    <div class="menuhorizontal kt-container kt-container--fluid">
    <button class="kt-header-menu-wrapper-close" id="kt_header_menu_mobile_close_btn"><i class="la la-close"></i></button>
    <div class="kt-header-menu-wrapper" id="kt_header_menu_wrapper">
        <div id="kt_header_menu" class="kt-header-menu kt-header-menu-mobile ">
            <ul class="kt-menu__nav ">
                <li class="kt-menu__item  kt-menu__item--open kt-menu__item--here kt-menu__item--submenu kt-menu__item--rel kt-menu__item--open kt-menu__item--here"
                    data-ktmenu-submenu-toggle="click"
                    aria-haspopup="true">
                    <a href="javascript:;" class="kt-menu__link kt-menu__toggle"><span class="kt-menu__link-text">Dashboards</span><i class="kt-menu__ver-arrow la la-angle-right"></i></a>
                </li>
                <li class="kt-menu__item  kt-menu__item--submenu kt-menu__item--rel"
                    data-ktmenu-submenu-toggle="click"
                    aria-haspopup="true">
                    <router-link to="/houses/1" class="kt-menu__link kt-menu__toggle"><span class="kt-menu__link-text">Houses</span><i class="kt-menu__ver-arrow la la-angle-right"></i></router-link>
                    <!--                <a href="javascript:;" class="kt-menu__link kt-menu__toggle"><span class="kt-menu__link-text">Houses</span><i class="kt-menu__ver-arrow la la-angle-right"></i></a>-->
                </li>
                <li class="kt-menu__item  kt-menu__item--submenu kt-menu__item--rel"
                    data-ktmenu-submenu-toggle="click"
                    aria-haspopup="true">
                    <a href="javascript:;" class="kt-menu__link kt-menu__toggle"><span class="kt-menu__link-text">About page</span><i class="kt-menu__ver-arrow la la-angle-right"></i></a>
                </li>
            </ul>
        </div>
        <div class="kt-header-toolbar">
            <button class="kt-header-menu-wrapper-close"><i class="la la-close"></i></button>
            <div class="kt-header-menu kt-header-menu-mobile ">
                <ul class="kt-menu__nav ">
                    <li class="kt-menu__item  kt-menu__item--submenu kt-menu__item--rel"
                        data-ktmenu-submenu-toggle="click"
                        aria-haspopup="true">
                        <a href="javascript:;" @click="logout"
                           class="kt-menu__link kt-menu__toggle"><span class="kt-menu__link-text">Logout</span><i class="kt-menu__ver-arrow la la-angle-right"></i></a>
                    </li>
                </ul>
            </div>
            <div class="kt-quick-search" id="kt_quick_search_default">
                <form method="get" class="kt-quick-search__form">
                    <div class="input-group">
                        <div class="input-group-prepend"><span class="input-group-text"><i class="flaticon2-search-1"></i></span></div>
                        <input type="text" class="form-control kt-quick-search__input" placeholder="Search...">
                        <div class="input-group-append"><span class="input-group-text"><i class="la la-close kt-quick-search__close"></i></span></div>
                    </div>
                </form>
                <div id="kt_quick_search_toggle" data-toggle="dropdown" data-offset="0px,10px"></div>
                <div class="dropdown-menu dropdown-menu-fit dropdown-menu-right dropdown-menu-anim dropdown-menu-lg">
                    <div class="kt-quick-search__wrapper kt-scroll" data-scroll="true" data-height="300" data-mobile-height="200">
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
  import AuthService from "../../services/AuthService";

  export default {
    name: "MenuHorizontal",
    methods: {
        logout() {
          AuthService.removeUser();
          this.$store.commit("CLEAR_USER");
          this.$router.push({ path: "/login" });
        }
    }
  }
</script>

<style lang = "scss" scoped>
 :host {
   width: 100%;
    .kt-header-menu-wrapper {
        height: 100%;
    }
    }
</style>