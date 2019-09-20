import axios from "axios";
import moment from "moment";
import {
  updatedDiff
} from 'deep-object-diff';

export const indirectCosts = {
  data() {
    return {
      indirectCostsOptions: {
        limit: 25
      },
      indirectCosts: [],
      indirectCostsLoading: false,
      indirectCostsTotalCount: 0,
      indirectCostsInProgress: false,
      indirectCostsError: {
        timeoutID: null,
        message: null
      },
      indirectCostsResponse: {
        timeoutID: null,
        message: false
      },
      originIndirectCosts: [],
      responseSuccessful: false,
      indirectCostsFilter: '[]',
      indirectCostsSort: '[]',
      indirectCostsFilterObject: {
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
    curIndirectCostsPage() {
      let page = 1;
      if (this.$route.params.page) page = this.$route.params.page;
      return parseInt(page);
    }
  },
  created() {
    this.indirectCostsSort = this.$route.query.sort && this.$route.query.sort.length ? JSON.parse(this.$route.query.sort) : this.indirectCostsSort;
    this.indirectCostsFilter = this.$route.query.filter && this.$route.query.filter.length ? JSON.parse(this.$route.query.filter) : this.indirectCostsFilter;
    if (this.indirectCostsFilter !== '[]') {
      for (let key in this.indirectCostsFilter) {
        const val = this.indirectCostsFilter[key].split("|");
        if (val.length == 3) {
          this.indirectCostsFilterObject[key].from = val[1];
          this.indirectCostsFilterObject[key].to = val[2];
        } else {
          this.indirectCostsFilterObject[key].value = val[1]
        }
      }
    }
  },
  methods: {

    filterIndirectCosts() {
      let filterData = {};

      for (let key in this.indirectCostsFilterObject) {
        let field = this.indirectCostsFilterObject[key];
        if (field.condition !== "BETWEEN" && field.value === "") continue;
        if (field.condition === "BETWEEN" && (field.from === "" || field.to === "")) continue;
        if (field.condition === '!=' && !field.value) continue;

        let val;
        if (field.condition !== '!=' && field.condition !== 'BETWEEN') val = field.condition + '|' + field.value;
        if (field.condition === '!=') val = field.condition + '|' + field.default;
        if (field.condition === 'BETWEEN') val = field.condition + '|' + (field.isDate ? moment(field.from).format("YYYY-MM-DD") + ' 00:00:00' : field.from) + '|' + (field.isDate ? moment(field.to).format("YYYY-MM-DD") + ' 00:00:00' : field.to);

        filterData[key] = val;
      }

      this.indirectCostsFilter = '[]';

      if (Object.keys(filterData).length > 0) {
        this.indirectCostsFilter = filterData;
      }

      this.indirectCostsQueryControll();
      this.getIndirectCosts();
    },
    sortIndirectCostsBy(field = null) {
      if (field === null) return;
      if (this.indirectCostsSort === '[]') this.indirectCostsSort = {};
      if (!this.indirectCostsSort[field]) {
        this.indirectCostsSort[field] = 'DESC';
      } else if (this.indirectCostsSort[field] === 'DESC') {
        this.indirectCostsSort[field] = 'ASC';
      } else if (this.indirectCostsSort[field] === 'ASC') {
        delete this.indirectCostsSort[field];
      }

      const sortFieldsCount = Object.keys(this.indirectCostsSort).length;

      if (sortFieldsCount === 0) this.indirectCostsSort = '[]';
      this.indirectCostsQueryControll();
      this.getIndirectCosts();
    },

    indirectCostsQueryControll() {

      if ((this.$route.query.filter != '' && this.$route.query.filter === JSON.stringify(this.indirectCostsFilter)) &&
        (this.$route.query.sort != '' && this.$route.query.sort === JSON.stringify(this.indirectCostsSort))) return;

      if (this.curIndirectCostsPage != 1) {
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
          sort: (this.indirectCostsSort !== '[]') ? JSON.stringify(this.indirectCostsSort) : '',
          filter: (this.indirectCostsFilter !== '[]') ? JSON.stringify(this.indirectCostsFilter) : ''
        }
      });
    },

    getIndirectCosts() {
      this.indirectCostsLoading = true;
      const skip = this.indirectCostsOptions.limit * (this.curIndirectCostsPage - 1);
      const filter = this.indirectCostsFilter !== '[]' ? JSON.stringify(this.indirectCostsFilter) : this.indirectCostsFilter;
      const sort = this.indirectCostsSort !== '[]' ? JSON.stringify(this.indirectCostsSort) : this.indirectCostsSort;
      axios({
          method: "get",
          url: `http://cors-anywhere.herokuapp.com/http://209.163.136.235:3010/BasicCosts/?skip=${skip}&take=${this.indirectCostsOptions.limit}&sort=${sort}&filter=${filter}`
        })
        .then(obj => {
          this.indirectCosts = obj.data.data;
          this.originIndirectCosts = JSON.parse(JSON.stringify(obj.data.data));
          this.indirectCostsTotalCount = parseInt(obj.data.count);
          this.indirectCostsLoading = false;
        })
        .catch(error => {
          console.log(error);
        })
    },

    acceptIndirectCostsChanges() {
      const changes = updatedDiff(this.originIndirectCosts, this.indirectCosts);
      if (Object.keys(changes).length === 0) {
        this.indirectCostsError.message = 'No changes detected';
        this.indirectCostsError.timeoutID =
          setTimeout(() => {
            this.indirectCostsError.message = null
          }, 3000);

        return;
      }

      if (this.indirectCostsInProgress === true) return;
      this.indirectCostsInProgress = true;
      const changedArray = [];

      for (let key in changes) {

        let indirectCost = this.indirectCosts[key];
        indirectCost.ModifiedDate = moment().toISOString();
        changedArray.push(indirectCost);
      }

      axios({
          method: "post",
          url: "http://cors-anywhere.herokuapp.com/http://209.163.136.235:3010/BasicCosts/save",
          data: changedArray,
        })
        .then(() => {
          this.indirectCostsResponse.message = 'New data accepted succesfully';
          this.indirectCostsResponse.timeoutID =
            setTimeout(() => {
              this.indirectCostsResponse.message = null
            }, 3000);
          this.indirectCostsInProgress = false;
        })
        .catch(e => {
          this.indirectCostsError.message = e.response.data;
          this.indirectCostsError.timeoutID =
            setTimeout(() => {
              this.indirectCostsError.message = null
            }, 5000);
          this.indirectCostsInProgress = false;
        })
    }
  }
}