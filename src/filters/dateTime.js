import moment from "moment";

export default function (Vue) {
  Vue.filter("dateTime", function (value) {
    if (value) {
      return moment(String(value)).format("YYYY-MM-DD HH:mm:ss")
    }
  });
}