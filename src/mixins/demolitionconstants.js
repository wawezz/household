import axios from "axios";
import moment from "moment";
import {
  updatedDiff
} from 'deep-object-diff';

export const demolitionconstants = {
  data() {
    return {
      demolitionconstantsOptions: {
        limit: 25
      },
      demolitionconstants: [],
      demolitionconstantsLoading: false,
      demolitionconstantsTotalCount: 0,
      demolitionconstantsInProgress: false,
      demolitionconstantsError: {
        timeoutID: null,
        message: null
      },
      demolitionconstantsResponse: {
        timeoutID: null,
        message: false
      },
      originDemolitionconstants: [],
      responseSuccessful: false,
      demolitionconstantsFilter: '[]',
      demolitionconstantsSort: '[]',
      demolitionconstantsFilterObject: {
        ItemName: {
          value: '',
          condition: '='
        },
        CostPerSquareFoot: {
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
    curDemolitionconstantsPage() {
      let page = 1;
      if (this.$route.params.page) page = this.$route.params.page;
      return parseInt(page);
    }
  },
  created() {
    this.demolitionconstantsSort = this.$route.query.sort && this.$route.query.sort.length ? JSON.parse(this.$route.query.sort) : this.demolitionconstantsSort;
    this.demolitionconstantsFilter = this.$route.query.filter && this.$route.query.filter.length ? JSON.parse(this.$route.query.filter) : this.demolitionconstantsFilter;
    if (this.demolitionconstantsFilter !== '[]') {
      for (let key in this.demolitionconstantsFilter) {
        const val = this.demolitionconstantsFilter[key].split("|");
        if (val.length == 3) {
          this.demolitionconstantsFilterObject[key].from = val[1];
          this.demolitionconstantsFilterObject[key].to = val[2];
        } else {
          this.demolitionconstantsFilterObject[key].value = val[1]
        }
      }
    }
  },
  methods: {

    filterDemolitionConstants() {
      let filterData = {};

      for (let key in this.demolitionconstantsFilterObject) {
        let field = this.demolitionconstantsFilterObject[key];
        if (field.condition !== "BETWEEN" && field.value === "") continue;
        if (field.condition === "BETWEEN" && (field.from === "" || field.to === "")) continue;
        if (field.condition === '!=' && !field.value) continue;

        let val;
        if (field.condition !== '!=' && field.condition !== 'BETWEEN') val = field.condition + '|' + field.value;
        if (field.condition === '!=') val = field.condition + '|' + field.default;
        if (field.condition === 'BETWEEN') val = field.condition + '|' + (field.isDate ? moment(field.from).format("YYYY-MM-DD") + ' 00:00:00' : field.from) + '|' + (field.isDate ? moment(field.to).format("YYYY-MM-DD") + ' 00:00:00' : field.to);

        filterData[key] = val;
      }

      this.demolitionconstantsFilter = '[]';

      if (Object.keys(filterData).length > 0) {
        this.demolitionconstantsFilter = filterData;
      }

      this.demolitionconstantsQueryControll();
      this.getDemolitionConstants();
    },
    sortDemolitionConstantsBy(field = null) {
      if (field === null) return;
      if (this.demolitionconstantsSort === '[]') this.demolitionconstantsSort = {};
      if (!this.demolitionconstantsSort[field]) {
        this.demolitionconstantsSort[field] = 'DESC';
      } else if (this.demolitionconstantsSort[field] === 'DESC') {
        this.demolitionconstantsSort[field] = 'ASC';
      } else if (this.demolitionconstantsSort[field] === 'ASC') {
        delete this.demolitionconstantsSort[field];
      }

      const sortFieldsCount = Object.keys(this.demolitionconstantsSort).length;

      if (sortFieldsCount === 0) this.demolitionconstantsSort = '[]';
      this.demolitionconstantsQueryControll();
      this.getDemolitionConstants();
    },

    demolitionconstantsQueryControll() {

      if ((this.$route.query.filter != '' && this.$route.query.filter === JSON.stringify(this.demolitionconstantsFilter)) &&
        (this.$route.query.sort != '' && this.$route.query.sort === JSON.stringify(this.demolitionconstantsSort))) return;

      if (this.curDemolitionconstantsPage != 1) {
        this.$router.push({
          name: 'demolition-constants',
          params: {
            page: 1
          },
          query: this.$route.query
        });

      }
      this.$router.replace({
        query: {
          sort: (this.demolitionconstantsSort !== '[]') ? JSON.stringify(this.demolitionconstantsSort) : '',
          filter: (this.demolitionconstantsFilter !== '[]') ? JSON.stringify(this.demolitionconstantsFilter) : ''
        }
      });
    },

    getDemolitionConstants() {
      this.demolitionconstantsLoading = true;
      const skip = this.demolitionconstantsOptions.limit * (this.curDemolitionconstantsPage - 1);
      const filter = this.demolitionconstantsFilter !== '[]' ? JSON.stringify(this.demolitionconstantsFilter) : this.demolitionconstantsFilter;
      const sort = this.demolitionconstantsSort !== '[]' ? JSON.stringify(this.demolitionconstantsSort) : this.demolitionconstantsSort;
      axios({
        method: "get",
        url: `http://cors-anywhere.herokuapp.com/http://209.163.136.235:3010/BasicCosts/?skip=${skip}&take=${this.directcostsOptions.limit}&sort=${sort}&filter=${filter}`
      })
        .then(obj => {
          this.demolitionconstants = obj.data.data;
          this.originDemolitionconstants = JSON.parse(JSON.stringify(obj.data.data));
          this.demolitionconstantsTotalCount = parseInt(obj.data.count);
          this.demolitionconstantsLoading = false;
        })
        .catch(error => {
          console.log(error);
        })
    },

    acceptChanges() {
      const changes = updatedDiff(this.originDemolitionconstants, this.demolitionconstants);
      if (Object.keys(changes).length === 0) {
        this.demolitionconstantsError.message = 'No changes detected';
        this.demolitionconstantsError.timeoutID =
          setTimeout(() => {
            this.demolitionconstantsError.message = null
          }, 3000);

        return;
      }

      if (this.demolitionconstantsInProgress === true) return;
      this.demolitionconstantsInProgress = true;
      const changedArray = [];

      for (let key in changes) {

        let demolitionconstant = this.demolitionconstants[key];
        demolitionconstant.ModifiedDate = moment().toISOString();
        changedArray.push(demolitionconstant);
      }

      axios({
        method: "post",
        url: "http://cors-anywhere.herokuapp.com/http://209.163.136.235:3010/BasicCosts/save",
        data: changedArray,
      })
        .then(() => {
          this.demolitionconstantsResponse.message = 'New data accepted succesfully';
          this.demolitionconstantsResponse.timeoutID =
            setTimeout(() => {
              this.demolitionconstantsResponse.message = null
            }, 3000);
          this.demolitionconstantsInProgress = false;
        })
        .catch(e => {
          this.demolitionconstantsError.message = e.response.data;
          this.demolitionconstantsError.timeoutID =
            setTimeout(() => {
              this.demolitionconstantsError.message = null
            }, 5000);
          this.demolitionconstantsInProgress = false;
        })
    }
  }
}