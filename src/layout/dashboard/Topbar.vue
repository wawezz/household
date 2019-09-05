<template>
  <div class="kt-header__topbar">
    <!--begin: My Cart -->
    <!--<kt-cart [bgImage]="'./assets/media/misc/bg-1.jpg'" [icon]="'./assets/media/icons/svg/Shopping/Cart%233.svg'" [useSVG]="true"></kt-cart>-->
    <!--end: My Cart -->
    <!--begin: Notifications -->
    <!--<kt-notification [bgImage]="'./assets/media/misc/bg-1.jpg'" [pulse]="true" [skin]="'dark'" [icon]="'./assets/media/icons/svg/Code/Compiling.svg'" [useSVG]="true"></kt-notification>-->
    <!--end: Notifications -->
    <!--begin: Quick actions -->
    <!--<kt-quick-action [bgImage]="'./assets/media/misc/bg-2.jpg'" [skin]="'dark'" [icon]="'./assets/media/icons/svg/Media/Equalizer.svg'" [useSVG]="true"></kt-quick-action>-->
    <!--end: Quick actions -->
    <!--begin: Quick panel toggler -->
    <div
      class="kt-header__topbar-item kt-header__topbar-item--quick-panel"
      data-placement="left"
      ngbTooltip="Quick panel"
    >
      <div class="kt-header__topbar-wrapper">
        <a href="javascript:;" @click="logout" class="btn btn-info btn-sm">
          <span class="kt-menu__link-text">Logout</span>
          <i class="kt-menu__ver-arrow la la-angle-right"></i>
        </a>
      </div>
    </div>
    <!--end: Quick panel toggler -->
    <!--begin: Language bar -->
    <!--<kt-language-selector></kt-language-selector>-->
    <!--end: Language bar -->
    <!--begin: User bar -->
    <!--<kt-user-profile2></kt-user-profile2>-->
    <!--end: User bar -->
  </div>
</template>

<script>
  import AuthService from "../../services/AuthService";

  export default {
    methods: {
      logout() {
        AuthService.removeUser();
        this.$store.commit("CLEAR_USER");
        this.$router.push({ path: "/login" });
      }
    }
  };
</script>

<style lang="scss" scoped>
  :host {
    ::ng-deep {
      // override default version style
      .kt-header__topbar {
        > :last-child:not([role="tooltip"]) {
          .kt-header__topbar-item {
            margin-right: 0 !important;
          }
        }
        .kt-header__topbar-item {
          margin-right: 0.36rem !important;
        }
      }
    }
  }
</style>