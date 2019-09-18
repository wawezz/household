import DashboardLayout from "@/layout/dashboard/DashboardLayout.vue";
// GeneralViews
import NotFound from "@/views/NotFound.vue";

const Login = () => import( /* webpackChunkName: "login" */ "@/views/Login.vue");
const Dashboard = () => import( /* webpackChunkName: "dashboard" */ "@/views/Dashboard.vue");
const Houses = () => import( /* webpackChunkName: "houses" */ "@/views/Houses.vue");
const DirectCosts = () => import ("@/views/DirectCosts.vue");
const UnitCosts = () => import ("@/views/UnitCosts.vue");
const CostDistribution = () => import ("@/views/CostDistribution.vue");
const CityConstants = () => import ("@/views/CityConstants.vue");
const IndirectCosts = () => import ("@/views/IndirectCosts.vue");
const DemolitionConstants = () => import ("@/views/DemolitionConstants.vue");


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
        path: "houses/:page",
        name: "houses",
        component: Houses
      },
      {
        path: "directcosts/:page",
        name: "directcosts",
        component: DirectCosts
      },
      {
        path: "unitcosts/:page",
        name: "unitcosts",
        component: UnitCosts
      },
      {
        path: "costdistribution/:page",
        name: "costdistribution",
        component: CostDistribution
      },
      {
        path: "cityconstants/:page",
        name: "cityconstants",
        component: CityConstants
      },
      {
        path: "indirectcosts/:page",
        name: "indirectcosts",
        component: IndirectCosts
      },
      {
        path: "demolitionconstants/:page",
        name: "demolitionconstants",
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