import axios from "axios";
import moment from "moment";
import {
  updatedDiff
} from 'deep-object-diff';

export const cityconstants = {
  data() {
    return {
      cityconstantsOptions: {
        limit: 25
      },
      cityconstants: [],
      cityconstantsLoading: false,
      cityconstantsTotalCount: 0,
      cityconstantsInProgress: false,
      cityconstantsError: {
        timeoutID: null,
        message: null
      },
      cityconstantsResponse: {
        timeoutID: null,
        message: false
      },
      originCityconstants: [],
      responseSuccessful: false,
      cityconstantsFilter: '[]',
      cityconstantsSort: '[]',
      cityconstantsFilterObject: {
        City: {
          value: '',
          condition: '='
        },
        MaterialConstant: {
          value: '',
          condition: '='
        },
        LabourConstant: {
          value: '',
          condition: '='
        },
        EquipConstant: {
          value: '',
          condition: '='
        },
        StateId: {
          value: '',
          condition: '='
        },
        ModifiedBy: {
          value: '',
          condition: '='
        },
        ModifiedDate: {
          value: '',
          condition: '='
        }
      }
    }
  },
  computed: {
    curCityConstantsPage() {
      let page = 1;
      if (this.$route.params.page) page = this.$route.params.page;
      return parseInt(page);
    }
  },
  created() {
    this.cityconstantsSort = this.$route.query.sort && this.$route.query.sort.length ? JSON.parse(this.$route.query.sort) : this.cityconstantsSort;
    this.cityconstantsFilter = this.$route.query.filter && this.$route.query.filter.length ? JSON.parse(this.$route.query.filter) : this.cityconstantsFilter;
    if (this.cityconstantsFilter !== '[]') {
      for (let key in this.cityconstantsFilter) {
        const val = this.cityconstantsFilter[key].split("|");
        if (val.length == 3) {
          this.cityconstantsFilterObject[key].from = val[1];
          this.cityconstantsFilterObject[key].to = val[2];
        } else {
          this.cityconstantsFilterObject[key].value = val[1]
        }
      }
    }
  },
  methods: {

    filterCityConstants() {
      let filterData = {};

      for (let key in this.cityconstantsFilterObject) {
        let field = this.cityconstantsFilterObject[key];
        if (field.condition !== "BETWEEN" && field.value === "") continue;
        if (field.condition === "BETWEEN" && (field.from === "" || field.to === "")) continue;
        if (field.condition === '!=' && !field.value) continue;

        let val;
        if (field.condition !== '!=' && field.condition !== 'BETWEEN') val = field.condition + '|' + field.value;
        if (field.condition === '!=') val = field.condition + '|' + field.default;
        if (field.condition === 'BETWEEN') val = field.condition + '|' + (field.isDate ? moment(field.from).format("YYYY-MM-DD") + ' 00:00:00' : field.from) + '|' + (field.isDate ? moment(field.to).format("YYYY-MM-DD") + ' 00:00:00' : field.to);

        filterData[key] = val;
      }

      this.cityconstantsFilter = '[]';

      if (Object.keys(filterData).length > 0) {
        this.cityconstantsFilter = filterData;
      }

      this.cityconstantsQueryControll();
      this.getCityConstants();
    },
    sortCityConstantsBy(field = null) {
      if (field === null) return;
      if (this.cityconstantsSort === '[]') this.cityconstantsSort = {};
      if (!this.cityconstantsSort[field]) {
        this.cityconstantsSort[field] = 'DESC';
      } else if (this.cityconstantsSort[field] === 'DESC') {
        this.cityconstantsSort[field] = 'ASC';
      } else if (this.cityconstantsSort[field] === 'ASC') {
        delete this.cityconstantsSort[field];
      }

      const sortFieldsCount = Object.keys(this.cityconstantsSort).length;

      if (sortFieldsCount === 0) this.directcostsSort = '[]';
      this.cityconstantsQueryControll();
      this.getCityConstants();
    },

    cityconstantsQueryControll() {

      if ((this.$route.query.filter != '' && this.$route.query.filter === JSON.stringify(this.cityconstantsFilter)) &&
        (this.$route.query.sort != '' && this.$route.query.sort === JSON.stringify(this.cityconstantsSort))) return;

      if (this.curCityConstantsPage != 1) {
        this.$router.push({
          name: 'city-constants',
          params: {
            page: 1
          },
          query: this.$route.query
        });

      }
      this.$router.replace({
        query: {
          sort: (this.cityconstantsSort !== '[]') ? JSON.stringify(this.cityconstantsSort) : '',
          filter: (this.cityconstantsFilter !== '[]') ? JSON.stringify(this.cityconstantsFilter) : ''
        }
      });
    },

    getCityConstants() {
      this.cityconstantsLoading = true;
      const skip = this.cityconstantsOptions.limit * (this.curCityConstantsPage - 1);
      const filter = this.cityconstantsFilter !== '[]' ? JSON.stringify(this.cityconstantsFilter) : this.cityconstantsFilter;
      const sort = this.cityconstantsSort !== '[]' ? JSON.stringify(this.cityconstantsSort) : this.cityconstantsSort;
      axios({
        method: "get",
        url: `http://cors-anywhere.herokuapp.com/http://209.163.136.235:3010/BasicCosts/?skip=${skip}&take=${this.cityconstantsOptions.limit}&sort=${sort}&filter=${filter}`
      })
        .then(obj => {
          this.cityconstants = obj.data.data;
          this.originCityConstants = JSON.parse(JSON.stringify(obj.data.data));
          this.cityconstantsTotalCount = parseInt(obj.data.count);
          this.cityconstantsLoading = false;
        })
        .catch(error => {
          console.log(error);
        })
    },

    acceptChanges() {
      const changes = updatedDiff(this.originCityconstants, this.cityconstants);
      if (Object.keys(changes).length === 0) {
        this.cityconstantsError.message = 'No changes detected';
        this.cityconstantsError.timeoutID =
          setTimeout(() => {
            this.cityconstantsError.message = null
          }, 3000);

        return;
      }

      if (this.cityconstantsInProgress === true) return;
      this.cityconstantsInProgress = true;
      const changedArray = [];

      for (let key in changes) {

        let cityconstant = this.cityconstants[key];
        cityconstant.ModifiedDate = moment().toISOString();
        changedArray.push(cityconstant);
      }

      axios({
        method: "post",
        url: "http://cors-anywhere.herokuapp.com/http://209.163.136.235:3010/BasicCosts/save",
        data: changedArray,
      })
        .then(() => {
          this.cityconstantsResponse.message = 'New data accepted succesfully';
          this.cityconstantsResponse.timeoutID =
            setTimeout(() => {
              this.cityconstantsResponse.message = null
            }, 3000);
          this.cityconstantsInProgress = false;
        })
        .catch(e => {
          this.cityconstantsError.message = e.response.data;
          this.cityconstantsError.timeoutID =
            setTimeout(() => {
              this.cityconstantsError.message = null
            }, 5000);
          this.cityconstantsInProgress = false;
        })
    }
  }
}