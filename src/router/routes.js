import DashboardLayout from "@/layout/dashboard/DashboardLayout.vue";
// GeneralViews
import NotFound from "@/views/NotFound.vue";

const Login = () => import( /* webpackChunkName: "login" */ "@/views/Login.vue");
const Dashboard = () => import( /* webpackChunkName: "dashboard" */ "@/views/Dashboard.vue");
const Houses = () => import( /* webpackChunkName: "houses" */ "@/views/Houses.vue");

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
      }
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