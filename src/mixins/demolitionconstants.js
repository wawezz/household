import axios from "axios";
import moment from "moment";
import {
  updatedDiff
} from 'deep-object-diff';

export const demolitionConstants = {
  data() {
    return {
      demolitionConstantsOptions: {
        limit: 25
      },
      demolitionConstants: [],
      demolitionConstantsLoading: false,
      demolitionConstantsTotalCount: 0,
      demolitionConstantsInProgress: false,
      demolitionConstantsError: {
        timeoutID: null,
        message: null
      },
      demolitionConstantsResponse: {
        timeoutID: null,
        message: false
      },
      originDemolitionConstants: [],
      responseSuccessful: false,
      demolitionConstantsFilter: '[]',
      demolitionConstantsSort: '[]',
      demolitionConstantsFilterObject: {
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
    curDemolitionConstantsPage() {
      let page = 1;
      if (this.$route.params.page) page = this.$route.params.page;
      return parseInt(page);
    }
  },
  created() {
    this.demolitionConstantsSort = this.$route.query.sort && this.$route.query.sort.length ? JSON.parse(this.$route.query.sort) : this.demolitionConstantsSort;
    this.demolitionConstantsFilter = this.$route.query.filter && this.$route.query.filter.length ? JSON.parse(this.$route.query.filter) : this.demolitionConstantsFilter;
    if (this.demolitionConstantsFilter !== '[]') {
      for (let key in this.demolitionConstantsFilter) {
        const val = this.demolitionConstantsFilter[key].split("|");
        if (val.length == 3) {
          this.demolitionConstantsFilterObject[key].from = val[1];
          this.demolitionConstantsFilterObject[key].to = val[2];
        } else {
          this.demolitionConstantsFilterObject[key].value = val[1]
        }
      }
    }
  },
  methods: {

    filterDemolitionConstants() {
      let filterData = {};

      for (let key in this.demolitionConstantsFilterObject) {
        let field = this.demolitionConstantsFilterObject[key];
        if (field.condition !== "BETWEEN" && field.value === "") continue;
        if (field.condition === "BETWEEN" && (field.from === "" || field.to === "")) continue;
        if (field.condition === '!=' && !field.value) continue;

        let val;
        if (field.condition !== '!=' && field.condition !== 'BETWEEN') val = field.condition + '|' + field.value;
        if (field.condition === '!=') val = field.condition + '|' + field.default;
        if (field.condition === 'BETWEEN') val = field.condition + '|' + (field.isDate ? moment(field.from).format("YYYY-MM-DD") + ' 00:00:00' : field.from) + '|' + (field.isDate ? moment(field.to).format("YYYY-MM-DD") + ' 00:00:00' : field.to);

        filterData[key] = val;
      }

      this.demolitionConstantsFilter = '[]';

      if (Object.keys(filterData).length > 0) {
        this.demolitionConstantsFilter = filterData;
      }

      this.demolitionConstantsQueryControll();
      this.getDemolitionConstants();
    },
    sortDemolitionConstantsBy(field = null) {
      if (field === null) return;
      if (this.demolitionConstantsSort === '[]') this.demolitionConstantsSort = {};
      if (!this.demolitionConstantsSort[field]) {
        this.demolitionConstantsSort[field] = 'DESC';
      } else if (this.demolitionConstantsSort[field] === 'DESC') {
        this.demolitionConstantsSort[field] = 'ASC';
      } else if (this.demolitionConstantsSort[field] === 'ASC') {
        delete this.demolitionConstantsSort[field];
      }

      const sortFieldsCount = Object.keys(this.demolitionConstantsSort).length;

      if (sortFieldsCount === 0) this.demolitionConstantsSort = '[]';
      this.demolitionConstantsQueryControll();
      this.getDemolitionConstants();
    },

    demolitionConstantsQueryControll() {

      if ((this.$route.query.filter != '' && this.$route.query.filter === JSON.stringify(this.demolitionConstantsFilter)) &&
        (this.$route.query.sort != '' && this.$route.query.sort === JSON.stringify(this.demolitionConstantsSort))) return;

      if (this.curDemolitionConstantsPage != 1) {
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
          sort: (this.demolitionConstantsSort !== '[]') ? JSON.stringify(this.demolitionConstantsSort) : '',
          filter: (this.demolitionConstantsFilter !== '[]') ? JSON.stringify(this.demolitionConstantsFilter) : ''
        }
      });
    },

    getDemolitionConstants() {
      this.demolitionConstantsLoading = true;
      const skip = this.demolitionConstantsOptions.limit * (this.curDemolitionConstantsPage - 1);
      const filter = this.demolitionConstantsFilter !== '[]' ? JSON.stringify(this.demolitionConstantsFilter) : this.demolitionConstantsFilter;
      const sort = this.demolitionConstantsSort !== '[]' ? JSON.stringify(this.demolitionConstantsSort) : this.demolitionConstantsSort;
      axios({
          method: "get",
          url: `http://cors-anywhere.herokuapp.com/http://209.163.136.235:3010/BasicCosts/?skip=${skip}&take=${this.directcostsOptions.limit}&sort=${sort}&filter=${filter}`
        })
        .then(obj => {
          this.demolitionConstants = obj.data.data;
          this.originDemolitionConstants = JSON.parse(JSON.stringify(obj.data.data));
          this.demolitionConstantsTotalCount = parseInt(obj.data.count);
          this.demolitionConstantsLoading = false;
        })
        .catch(error => {
          console.log(error);
        })
    },

    acceptDemolitionConstantsChanges() {
      const changes = updatedDiff(this.originDemolitionConstants, this.demolitionConstants);
      if (Object.keys(changes).length === 0) {
        this.demolitionConstantsError.message = 'No changes detected';
        this.demolitionConstantsError.timeoutID =
          setTimeout(() => {
            this.demolitionConstantsError.message = null
          }, 3000);

        return;
      }

      if (this.demolitionConstantsInProgress === true) return;
      this.demolitionConstantsInProgress = true;
      const changedArray = [];

      for (let key in changes) {

        let demolitionConstant = this.demolitionConstants[key];
        demolitionConstant.ModifiedDate = moment().toISOString();
        changedArray.push(demolitionConstant);
      }

      axios({
          method: "post",
          url: "http://cors-anywhere.herokuapp.com/http://209.163.136.235:3010/BasicCosts/save",
          data: changedArray,
        })
        .then(() => {
          this.demolitionConstantsResponse.message = 'New data accepted succesfully';
          this.demolitionConstantsResponse.timeoutID =
            setTimeout(() => {
              this.demolitionConstantsResponse.message = null
            }, 3000);
          this.demolitionConstantsInProgress = false;
        })
        .catch(e => {
          this.demolitionConstantsError.message = e.response.data;
          this.demolitionConstantsError.timeoutID =
            setTimeout(() => {
              this.demolitionConstantsError.message = null
            }, 5000);
          this.demolitionConstantsInProgress = false;
        })
    }
  }
}