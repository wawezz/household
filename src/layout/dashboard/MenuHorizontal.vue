<template>
    <!-- BEGIN: Horizontal Menu -->
    <button class="kt-header-menu-wrapper-close" id="kt_header_menu_mobile_close_btn"><i class="la la-close"></i></button>


    <div ktOffcanvas [options]="offcanvasOptions" class="kt-header-menu-wrapper" id="kt_header_menu_wrapper">
        <div ktMenu [options]="menuOptions" id="kt_header_menu" class="kt-header-menu kt-header-menu-mobile" [ngClass]="htmlClassService.getClasses('header_menu', true)">
            <ul class="kt-menu__nav" [ngClass]="htmlClassService.getClasses('header_menu_nav', true)">
                <ng-container *ngFor="let item of menuHorService.menuList$ | async">
                    <ng-container *ngIf="item.title" [ngTemplateOutlet]="menuTemplate" [ngTemplateOutletContext]="{ item: item }"></ng-container>
                </ng-container>
            </ul>
        </div>
        <kt-search-default></kt-search-default>
    </div>
    <!-- END: Horizontal Menu -->


    <ng-template #menuTemplate let-item="item" let-parentItem="parentItem">
        <!--<li [attr.aria-haspopup]="true"-->
            <!--[attr.data-ktmenu-submenu-toggle]="getItemAttrSubmenuToggle(item)"-->
            <!--(mouseleave)="mouseLeave($event)"-->
            <!--(mouseenter)="mouseEnter($event)"-->
            <!--[ngClass]="getItemCssClasses(item)">-->
            <!--&lt;!&ndash; if item has submenu &ndash;&gt;-->
            <!--<div v-if="item.submenu">-->
                <!--<a href="javascript:;" class="kt-menu__link kt-menu__toggle">-->

                    <!--&lt;!&ndash;<div [ngTemplateOutlet]="menuItemInnerTemplate" [ngTemplateOutletContext]="{ item: item, parentItem: parentItem }"></div>&ndash;&gt;-->

                    <!--<div v-if="rootArrowEnabled">-->
                        <!--&lt;!&ndash; arrow icons &ndash;&gt;-->
                        <!--<i v-if="item.submenu && item.root" class="kt-menu__hor-arrow la la-angle-down"></i>-->
                        <!--<i v-if="item.submenu && item.root" class="kt-menu__ver-arrow la la-angle-right"></i>-->
                    <!--</div>-->
                    <!--&lt;!&ndash; else arrow icons &ndash;&gt;-->
                    <!--<i v-if="item.submenu && !item.root" class="kt-menu__hor-arrow la la-angle-right"></i>-->
                    <!--<i v-if="item.submenu && !item.root" class="kt-menu__ver-arrow la la-angle-right"></i>-->
                <!--</a>-->
            <!--</div>-->
            <!--&lt;!&ndash; if item hasn't sumbenu &ndash;&gt;-->
            <!--<div v-if="!item.submenu">-->
                <!--<a [routerLink]="item.page" class="kt-menu__link kt-menu__toggle">-->
                    <!--<div [ngTemplateOutlet]="menuItemInnerTemplate" [ngTemplateOutletContext]="{ item: item, parentItem: parentItem }"></div>-->
                <!--</a>-->
            <!--</div>-->
<!--вот тут роуты ангуляра, у нас же свои -->


            <!-- if menu item has submenu child then recursively call new menu item component -->
            <div v-if="item.submenu">
                <div class="kt-menu__submenu getItemMenuSubmenuClass"> <!--у этого тега также был стиль [ngStyle]="{ 'width': item.submenu.width }"--->
                    <span class="kt-menu__arrow kt-menu__arrow--adjust"></span>

                    <ul v-if="item.submenu?.length" class="kt-menu__subnav">
                        <!--<div v-for="child in item.submenu">-->

                            <!--<ng-container [ngTemplateOutlet]="menuTemplate" [ngTemplateOutletContext]="{ item: child, parentItem: item }">-->
                            <!--</ng-container>-->
                        <!--</div>-->
                     <!--//тут поскольку темплейт, взял в комменты-->
                    </ul>

                    <ul v-if="item.submenu.items?.length" class="kt-menu__subnav">
                        <!--<div v-for="child in item.submenu.items">-->
                            <!--<div [ngTemplateOutlet]="menuTemplate" [ngTemplateOutletContext]="{ item: child, parentItem: item }">-->
                            <!--</div>-->
                        <!--</div>-->
                    <!--##такая же тема с темплейтами-->
                    </ul>

                    <div v-if="item.submenu.type === 'mega' && item.submenu.columns?.length" class="kt-menu__subnav">
                        <ul class="kt-menu__content">
                            <div v-for="child in item.submenu.columns">
                                <div [ngTemplateOutlet]="menuColumnTemplate" [ngTemplateOutletContext]="{ item: child }"></div>
                            </div>
                        </ul>
                    </div>

                </div>
            </div>
        </li>
    </ng-template>

    <!-- item inner -->
    <ng-template #menuItemInnerTemplate let-item="item" let-parentItem="parentItem">
        <!-- if menu item has icon -->
        <i v-if="item.icon" class="kt-menu__link-icon item.icon"></i>

        <div v-if="!item.icon">
            <!-- if menu item using bullet -->
            <i v-if="parentItem && parentItem.bullet === 'dot' || item.bullet === 'dot'" class="kt-menu__link-bullet kt-menu__link-bullet--dot">
                <span></span>
            </i>
            <i v-if="parentItem && parentItem.bullet === 'line' || item.bullet === 'line'" class="kt-menu__link-bullet kt-menu__link-bullet--line">
                <span></span>
            </i>
        </div>
<!-- вот тут переделал на конструкцию условной отрисовки Vue-->
        <div v-if="!item.badge">
            <span class="kt-menu__item-here"></span>
            <!-- menu item title text -->
            <span class="kt-menu__link-text">
			{{item.title}}
		</span>
        </div>
        <div v-else-if="menuLinkBadge">
            <span class="kt-menu__item-here"></span>
            <!-- menu item title text -->
            <span class="kt-menu__link-text">
			{{item.title}}
        </div>



        <ng-template #menuLinkBadge>
            <!-- menu item with badge -->
            <span class="kt-menu__link-text">{{item.title}}</span>
            <span class="kt-menu__link-badge">
			<span class="kt-badge kt-badge--brand kt-badge--inline kt-badge--pill item.badge.type">{{item.badge.value}}</span>
		</span>
        </ng-template>
    </ng-template>

    <!-- item column -->
    <ng-template #menuColumnTemplate let-item="item">
        <li class="kt-menu__item">
            <h3 class="kt-menu__heading kt-menu__toggle">
			<span class="kt-menu__link-text">
				{{item.heading.title}}
			</span>
                <i class="kt-menu__ver-arrow la la-angle-right"></i>
            </h3>
            <ng-container *ngIf="item.items?.length">
                <ul class="kt-menu__inner">
                    <ng-container *ngFor="let child of item.items">
                        <ng-container [ngTemplateOutlet]="menuTemplate" [ngTemplateOutletContext]="{ item: child, parentItem: item }">
                        </ng-container>
                    </ng-container>
                </ul>
            </ng-container>
        </li>
    </ng-template>

    
</template>

<script>
  export default {
    name: "MenuHorizontal"
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