import axios from "axios";
import moment from "moment";
import {
  updatedDiff
} from 'deep-object-diff';

export const costdistribution = {
  data() {
    return {
      costdistributionOptions: {
        limit: 25
      },
      costdistributions: [],
      costdistributionLoading: false,
      costdistributionTotalCount: 0,
      costdistributionInProgress: false,
      costdistributionError: {
        timeoutID: null,
        message: null
      },
      costdistributionResponse: {
        timeoutID: null,
        message: false
      },
      originCostdistributions: [],
      responseSuccessful: false,
      costdistributionFilter: '[]',
      costdistributionSort: '[]',
      costdistributionFilterObject: {
        ItemName: {
          value: '',
          condition: '='
        },
        LineItemId: {
          value: '',
          condition: '='
        },
        MaterialDistribution: {
          value: '',
          condition: '='
        },
        LaborDistribution: {
          value: '',
          condition: '='
        },
        EquipmentDistribution: {
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
    curCostdistributionPage() {
      let page = 1;
      if (this.$route.params.page) page = this.$route.params.page;
      return parseInt(page);
    }
  },
  created() {
    this.costdistributionSort = this.$route.query.sort && this.$route.query.sort.length ? JSON.parse(this.$route.query.sort) : this.costdistributionSort;
    this.costdistributionFilter = this.$route.query.filter && this.$route.query.filter.length ? JSON.parse(this.$route.query.filter) : this.costdistributionFilter;
    if (this.costdistributionFilter !== '[]') {
      for (let key in this.costdistributionFilter) {
        const val = this.costdistributionFilter[key].split("|");
        if (val.length == 3) {
          this.costdistributionFilterObject[key].from = val[1];
          this.costdistributionFilterObject[key].to = val[2];
        } else {
          this.costdistributionFilterObject[key].value = val[1]
        }
      }
    }
  },
  methods: {

    filterCostdistribution() {
      let filterData = {};

      for (let key in this.costdistributionFilterObject) {
        let field = this.costdistributionFilterObject[key];
        if (field.condition !== "BETWEEN" && field.value === "") continue;
        if (field.condition === "BETWEEN" && (field.from === "" || field.to === "")) continue;
        if (field.condition === '!=' && !field.value) continue;

        let val;
        if (field.condition !== '!=' && field.condition !== 'BETWEEN') val = field.condition + '|' + field.value;
        if (field.condition === '!=') val = field.condition + '|' + field.default;
        if (field.condition === 'BETWEEN') val = field.condition + '|' + (field.isDate ? moment(field.from).format("YYYY-MM-DD") + ' 00:00:00' : field.from) + '|' + (field.isDate ? moment(field.to).format("YYYY-MM-DD") + ' 00:00:00' : field.to);

        filterData[key] = val;
      }

      this.costdistributionFilter = '[]';

      if (Object.keys(filterData).length > 0) {
        this.costdistributionFilter = filterData;
      }

      this.costdistributionQueryControll();
      this.getCostdistribution();
    },
    sortCostdistributionBy(field = null) {
      if (field === null) return;
      if (this.costdistributionSort === '[]') this.costdistributionSort = {};
      if (!this.costdistributionSort[field]) {
        this.costdistributionSort[field] = 'DESC';
      } else if (this.costdistributionSort[field] === 'DESC') {
        this.costdistributionSort[field] = 'ASC';
      } else if (this.costdistributionSort[field] === 'ASC') {
        delete this.costdistributionSort[field];
      }

      const sortFieldsCount = Object.keys(this.costdistributionSort).length;

      if (sortFieldsCount === 0) this.costdistributionSort = '[]';
      this.costdistributionQueryControll();
      this.getCostdistribution();
    },

    costdistributionQueryControll() {

      if ((this.$route.query.filter != '' && this.$route.query.filter === JSON.stringify(this.costdistributionFilter)) &&
        (this.$route.query.sort != '' && this.$route.query.sort === JSON.stringify(this.costdistributionSort))) return;

      if (this.curCostdistributionPage != 1) {
        this.$router.push({
          name: 'cost-distribution',
          params: {
            page: 1
          },
          query: this.$route.query
        });

      }
      this.$router.replace({
        query: {
          sort: (this.costdistributionSort !== '[]') ? JSON.stringify(this.costdistributionSort) : '',
          filter: (this.costdistributionFilter !== '[]') ? JSON.stringify(this.costdistributionFilter) : ''
        }
      });
    },

    getCostdistribution() {
      this.costdistributionLoading = true;
      const skip = this.costdistributionOptions.limit * (this.curCostdistributionPage - 1);
      const filter = this.costdistributionFilter !== '[]' ? JSON.stringify(this.costdistributionFilter) : this.costdistributionFilter;
      const sort = this.costdistributionSort !== '[]' ? JSON.stringify(this.costdistributionSort) : this.costdistributionSort;
      axios({
        method: "get",
        url: `http://cors-anywhere.herokuapp.com/http://209.163.136.235:3010/BasicCosts/?skip=${skip}&take=${this.costdistributionOptions.limit}&sort=${sort}&filter=${filter}`
      })
        .then(obj => {
          this.costdistributions = obj.data.data;
          this.originCostdistributions = JSON.parse(JSON.stringify(obj.data.data));
          this.costdistributionTotalCount = parseInt(obj.data.count);
          this.costdistributionLoading = false;
        })
        .catch(error => {
          console.log(error);
        })
    },

    acceptChanges() {
      const changes = updatedDiff(this.originCostdistributions, this.costdistributions);
      if (Object.keys(changes).length === 0) {
        this.costdistributionError.message = 'No changes detected';
        this.costdistributionError.timeoutID =
          setTimeout(() => {
            this.costdistributionError.message = null
          }, 3000);

        return;
      }

      if (this.costdistributionInProgress === true) return;
      this.costdistributionInProgress = true;
      const changedArray = [];

      for (let key in changes) {

        let costdistribution = this.costdistributions[key];
        costdistribution.ModifiedDate = moment().toISOString();
        changedArray.push(costdistribution);
      }

      axios({
        method: "post",
        url: "http://cors-anywhere.herokuapp.com/http://209.163.136.235:3010/BasicCosts/save",
        data: changedArray,
      })
        .then(() => {
          this.costdistributionResponse.message = 'New data accepted succesfully';
          this.costdistributionResponse.timeoutID =
            setTimeout(() => {
              this.costdistributionResponse.message = null
            }, 3000);
          this.costdistributionInProgress = false;
        })
        .catch(e => {
          this.costdistributionError.message = e.response.data;
          this.costdistributionError.timeoutID =
            setTimeout(() => {
              this.costdistributionError.message = null
            }, 5000);
          this.costdistributionInProgress = false;
        })
    }
  }
}