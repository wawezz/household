import axios from "axios";
import moment from "moment";
import {
  updatedDiff
} from 'deep-object-diff';

export const indirectcosts = {
  data() {
    return {
      indirectcostsOptions: {
        limit: 25
      },
      indirectcosts: [],
      indirectcostsLoading: false,
      indirectcostsTotalCount: 0,
      indirectcostsInProgress: false,
      indirectcostsError: {
        timeoutID: null,
        message: null
      },
      indirectcostsResponse: {
        timeoutID: null,
        message: false
      },
      originIndirectcosts: [],
      responseSuccessful: false,
      indirectcostsFilter: '[]',
      indirectcostsSort: '[]',
      indirectcostsFilterObject: {
        ItemName: {
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
        TotalConstant: {
          value: '',
          condition: '='
        },
        IncludeInSubtotal: {
          value: '',
          condition: '='
        },
        IsEnabled: {
          value: '',
          condition: '='
        },
        SortOrder: {
          value: '',
          condition: '='
        },
        QualityClass: {
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
    curIndirectCostPage() {
      let page = 1;
      if (this.$route.params.page) page = this.$route.params.page;
      return parseInt(page);
    }
  },
  created() {
    this.indirectcostsSort = this.$route.query.sort && this.$route.query.sort.length ? JSON.parse(this.$route.query.sort) : this.indirectcostsSort;
    this.indirectcostsFilter = this.$route.query.filter && this.$route.query.filter.length ? JSON.parse(this.$route.query.filter) : this.indirectcostsFilter;
    if (this.indirectcostsFilter !== '[]') {
      for (let key in this.indirectcostsFilter) {
        const val = this.indirectcostsFilter[key].split("|");
        if (val.length == 3) {
          this.indirectcostsFilterObject[key].from = val[1];
          this.indirectcostsFilterObject[key].to = val[2];
        } else {
          this.indirectcostsFilterObject[key].value = val[1]
        }
      }
    }
  },
  methods: {

    filterIndirectCosts() {
      let filterData = {};

      for (let key in this.indirectcostsFilterObject) {
        let field = this.indirectcostsFilterObject[key];
        if (field.condition !== "BETWEEN" && field.value === "") continue;
        if (field.condition === "BETWEEN" && (field.from === "" || field.to === "")) continue;
        if (field.condition === '!=' && !field.value) continue;

        let val;
        if (field.condition !== '!=' && field.condition !== 'BETWEEN') val = field.condition + '|' + field.value;
        if (field.condition === '!=') val = field.condition + '|' + field.default;
        if (field.condition === 'BETWEEN') val = field.condition + '|' + (field.isDate ? moment(field.from).format("YYYY-MM-DD") + ' 00:00:00' : field.from) + '|' + (field.isDate ? moment(field.to).format("YYYY-MM-DD") + ' 00:00:00' : field.to);

        filterData[key] = val;
      }

      this.indirectcostsFilter = '[]';

      if (Object.keys(filterData).length > 0) {
        this.indirectcostsFilter = filterData;
      }

      this.indirectcostsQueryControll();
      this.getIndirectCosts();
    },
    sortIndirectCostsBy(field = null) {
      if (field === null) return;
      if (this.indirectcostsSort === '[]') this.indirectcostsSort = {};
      if (!this.indirectcostsSort[field]) {
        this.indirectcostsSort[field] = 'DESC';
      } else if (this.indirectcostsSort[field] === 'DESC') {
        this.indirectcostsSort[field] = 'ASC';
      } else if (this.indirectcostsSort[field] === 'ASC') {
        delete this.indirectcostsSort[field];
      }

      const sortFieldsCount = Object.keys(this.indirectcostsSort).length;

      if (sortFieldsCount === 0) this.indirectcostsSort = '[]';
      this.indirectcostsQueryControll();
      this.getIndirectCosts();
    },

    indirectcostsQueryControll() {

      if ((this.$route.query.filter != '' && this.$route.query.filter === JSON.stringify(this.indirectcostsFilter)) &&
        (this.$route.query.sort != '' && this.$route.query.sort === JSON.stringify(this.indirectcostsSort))) return;

      if (this.curIndirectCostPage != 1) {
        this.$router.push({
          name: 'indirect-costs',
          params: {
            page: 1
          },
          query: this.$route.query
        });

      }
      this.$router.replace({
        query: {
          sort: (this.indirectcostsSort !== '[]') ? JSON.stringify(this.indirectcostsSort) : '',
          filter: (this.indirectcostsFilter !== '[]') ? JSON.stringify(this.indirectcostsFilter) : ''
        }
      });
    },

    getIndirectCosts() {
      this.indirectcostsLoading = true;
      const skip = this.indirectcostsOptions.limit * (this.curIndirectCostPage - 1);
      const filter = this.indirectcostsFilter !== '[]' ? JSON.stringify(this.indirectcostsFilter) : this.indirectcostsFilter;
      const sort = this.indirectcostsSort !== '[]' ? JSON.stringify(this.indirectcostsSort) : this.indirectcostsSort;
      axios({
        method: "get",
        url: `http://cors-anywhere.herokuapp.com/http://209.163.136.235:3010/BasicCosts/?skip=${skip}&take=${this.indirectcostsOptions.limit}&sort=${sort}&filter=${filter}`
      })
        .then(obj => {
          this.indirectcosts = obj.data.data;
          this.originIndirectcosts = JSON.parse(JSON.stringify(obj.data.data));
          this.indirectcostsTotalCount = parseInt(obj.data.count);
          this.indirectcostsLoading = false;
        })
        .catch(error => {
          console.log(error);
        })
    },

    acceptChanges() {
      const changes = updatedDiff(this.originIndirectcosts, this.indirectcosts);
      if (Object.keys(changes).length === 0) {
        this.indirectcostsError.message = 'No changes detected';
        this.indirectcostsError.timeoutID =
          setTimeout(() => {
            this.indirectcostsError.message = null
          }, 3000);

        return;
      }

      if (this.indirectcostsInProgress === true) return;
      this.indirectcostsInProgress = true;
      const changedArray = [];

      for (let key in changes) {

        let indirectcost = this.indirectcosts[key];
        indirectcost.ModifiedDate = moment().toISOString();
        changedArray.push(indirectcost);
      }

      axios({
        method: "post",
        url: "http://cors-anywhere.herokuapp.com/http://209.163.136.235:3010/BasicCosts/save",
        data: changedArray,
      })
        .then(() => {
          this.indirectcostsResponse.message = 'New data accepted succesfully';
          this.indirectcostsResponse.timeoutID =
            setTimeout(() => {
              this.indirectcostsResponse.message = null
            }, 3000);
          this.indirectcostsInProgress = false;
        })
        .catch(e => {
          this.indirectcostsError.message = e.response.data;
          this.indirectcostsError.timeoutID =
            setTimeout(() => {
              this.indirectcostsError.message = null
            }, 5000);
          this.indirectcostsInProgress = false;
        })
    }
  }
}