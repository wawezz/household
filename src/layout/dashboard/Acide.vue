<template>
    <!-- BEGIN: Left Aside -->
    <div>
    <!--<ktOffcanvas [options]="menuCanvasOptions"></ktOffcanvas>    -->
        <!---->
    <div class="kt-aside kt-aside--fixed kt-grid__item kt-grid kt-grid--desktop kt-grid--hor-desktop" id="kt_aside">
        <!-- BEGIN: Aside Menu -->
        <div class="kt-aside-menu-wrapper kt-grid__item kt-grid__item--fluid" id="kt_aside_menu_wrapper">
            <div #asideMenu ktMenu [options]="menuOptions" [perfectScrollbar]="{wheelPropagation: false}" [ngStyle]="{'max-height': '90vh', 'position': 'relative'}" id="kt_aside_menu" class="kt-aside-menu"
                 (mouseenter)="mouseEnter($event)" (mouseleave)="mouseLeave($event)"
                 [ngClass]="htmlClassService.getClasses('aside_menu', true)">
                <ul class="kt-menu__nav" [ngClass]="htmlClassService.getClasses('aside_menu_nav', true)">
                    <div [ngTemplateOutlet]="menuListTemplate"></div>
                </ul>
            </div>
        </div>
        <!-- END: Aside Menu -->
    </div>
    </div>
    <!-- END: Left Aside -->

    <ng-template #menuListTemplate>
        <div v-for="child in menuAsideService.menuList$ | async">
            <div v-if="child.section" [ngTemplateOutlet]="menuItemSectionTemplate"
                          [ngTemplateOutletContext]="{ item: child }"></div>
            <div v-if="child.separator" [ngTemplateOutlet]="menuItemSeparatorTemplate"
                          [ngTemplateOutletContext]="{ item: child }"></div>
            <div v-if="child.title" [ngTemplateOutlet]="menuItemTemplate"
                          [ngTemplateOutletContext]="{ item: child }"></div>
        </div>
    </ng-template>

    <ng-template #menuItemTemplate let-item="item" let-parentItem="parentItem">
        <div v-if="!item.permission" [ngTemplateOutlet]="menuItemInnerTemplate" [ngTemplateOutletContext]="{ item: item, parentItem: parentItem  }"></div>
        <ng-template v-if="item.permission" ngxPermissionsOnly="{{ item.permission }}">
            <div [ngTemplateOutlet]="menuItemInnerTemplate" [ngTemplateOutletContext]="{ item: item, parentItem: parentItem  }"></div>
        </ng-template>
    </ng-template>

    <ng-template #menuItemInnerTemplate let-item="item" let-parentItem="parentItem">
        <li [attr.aria-haspopup]="true"
            [attr.data-ktmenu-submenu-toggle]="getItemAttrSubmenuToggle(item)"
            [attr.data-ktmenu-submenu-mode]="item.mode"
            [attr.data-ktmenu-dropdown-toggle-class]="item['dropdown-toggle-class']" [ngClass]="getItemCssClasses(item)"
            [ngbTooltip]="item.tooltip" data-placement="right">

            <!-- if menu item hasn't submenu -->
            <a v-if="!item.submenu" [routerLink]="item.page" class="kt-menu__link kt-menu__toggle">
                <div [ngTemplateOutlet]="menuItemTextTemplate"
                              [ngTemplateOutletContext]="{ item: item, parentItem: parentItem }"></div>
            </a>
            <!-- if menu item has sumnenu child  -->
            <a v-if="item.submenu" class="kt-menu__link kt-menu__toggle">
                <div [ngTemplateOutlet]="menuItemTextTemplate"
                              [ngTemplateOutletContext]="{ item: item, parentItem: parentItem }"></div>
            </a>

            <!-- if menu item has submenu child then recursively call new menu item component -->
            <div v-if="item.submenu" class="kt-menu__submenu">
                <span class="kt-menu__arrow"></span>
                <div v-if="item['custom-class'] === 'kt-menu__item--submenu-fullheight'" class="kt-menu__wrapper">
                    <!-- wrap submenu to full height -->
                    <div [ngTemplateOutlet]="menuSubmenuTemplate"
                                  [ngTemplateOutletContext]="{ item: item, parentItem: parentItem }"></div>
                </div>
                <!-- normal submenu -->
                <div v-if="item['custom-class'] !== 'kt-menu__item--submenu-fullheight'"
                              [ngTemplateOutlet]="menuSubmenuTemplate"
                              [ngTemplateOutletContext]="{ item: item, parentItem: parentItem }">
                </div>
            </div>
        </li>

    </ng-template>

    <ng-template #menuSubmenuTemplate let-item="item" let-parentItem="parentItem">
        <ul class="kt-menu__subnav">
            <div *ngFor="let child of item.submenu">
                <div v-if="child.section" [ngTemplateOutlet]="menuItemSectionTemplate"
                              [ngTemplateOutletContext]="{ item: child, parentItem: item }"></div>
                <div v-if="child.separator" [ngTemplateOutlet]="menuItemSeparatorTemplate"
                              [ngTemplateOutletContext]="{ item: child, parentItem: item }"></div>
                <div v-if="child.title" [ngTemplateOutlet]="menuItemTemplate"
                              [ngTemplateOutletContext]="{ item: child, parentItem: item }"></div>
            </div>
        </ul>
    </ng-template>

    <ng-template #menuItemTextTemplate let-item="item" let-parentItem="parentItem">
        <!-- if menu item has icon -->
        <i v-if="item.icon" class="kt-menu__link-icon item.icon"></i>

        <!-- if menu item using bullet -->
        <i v-if="parentItem && parentItem.bullet === 'dot'" class="kt-menu__link-bullet kt-menu__link-bullet--dot">
            <span></span>
        </i>
        <i v-if="parentItem && parentItem.bullet === 'line'" class="kt-menu__link-bullet kt-menu__link-bullet--line">
            <span></span>
        </i>

        <!-- menu item title text -->
        <span class="kt-menu__link-text">{{item.title}}</span>
        <!-- menu item with badge -->
        <span v-if="item.badge" class="kt-menu__link-badge">
		<span class="kt-badge item.badge.type">{{item.badge.value}}</span>
	</span>

        <!-- if menu item has submenu child then put arrow icon -->
        <i v-if="item.submenu" class="kt-menu__ver-arrow la la-angle-right"></i>
    </ng-template>

    <ng-template #menuItemSeparatorTemplate let-item="item" let-parentItem="parentItem">
        <li class="kt-menu__separator"><span></span></li>
    </ng-template>

    <ng-template #menuItemSectionTemplate let-item="item" let-parentItem="parentItem">
        <li class="kt-menu__section">
            <h4 class="kt-menu__section-text">{{item.section}}</h4>
            <i class="kt-menu__section-icon flaticon-more-v2"></i>
        </li>
    </ng-template>

</template>

<script>
  export default {
    name: "Acide"
  }
</script>

<style lang="scss" scoped>
    :host {
    .kt-aside {
        height: 100%;
    }

    // fixed text line break issue on minimized aside hover
       .kt-menu__link-text {
           white-space: nowrap;
       }
    }
</style>