import DashboardLayout from "@/layout/dashboard/DashboardLayout.vue";
// GeneralViews
import NotFound from "@/views/NotFound.vue";

const Login = () => import( /* webpackChunkName: "login" */ "@/views/Login.vue");
const Dashboard = () => import( /* webpackChunkName: "dashboard" */ "@/views/Dashboard.vue");
const BasicCosts = () => import( /* webpackChunkName: "houses" */ "@/views/BasicCosts.vue");
const DirectCosts = () => import("@/views/DirectCosts.vue");
const UnitCosts = () => import("@/views/UnitCosts.vue");
const CostDistributions = () => import("@/views/CostDistributions.vue");
const CityConstants = () => import("@/views/CityConstants.vue");
const IndirectCosts = () => import("@/views/IndirectCosts.vue");
const DemolitionConstants = () => import("@/views/DemolitionConstants.vue");


const routes = [{
    path: "/login",
    component: Login
  },
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/dashboard",
    children: [{
        path: "dashboard",
        name: "dashboard",
        component: Dashboard
      },
      {
        path: "basic-costs/:page",
        name: "basic-costs",
        component: BasicCosts
      },
      {
        path: "direct-costs/:page",
        name: "direct-costs",
        component: DirectCosts
      },
      {
        path: "unit-costs/:page",
        name: "unit-costs",
        component: UnitCosts
      },
      {
        path: "cost-distributions/:page",
        name: "cost-distributions",
        component: CostDistributions
      },
      {
        path: "city-constants/:page",
        name: "city-constants",
        component: CityConstants
      },
      {
        path: "indirect-costs/:page",
        name: "indirect-costs",
        component: IndirectCosts
      },
      {
        path: "demolition-constants/:page",
        name: "demolition-constants",
        component: DemolitionConstants
      },




    ]
  },
  {
    path: "*",
    component: NotFound
  },
];

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes;