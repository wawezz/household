import GlobalComponents from "./globalComponents";

//css assets
import "@/assets/sass/theme/custom/metronic/dashboard.scss";

export default {
  install(Vue) {
    Vue.use(GlobalComponents);
  }
}