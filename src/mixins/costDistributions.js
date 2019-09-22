import axios from "axios";
import moment from "moment";
import {
  updatedDiff
} from 'deep-object-diff';

export const costDistributions = {
  data() {
    return {
      costDistributionsOptions: {
        limit: 25
      },
      costDistributions: [],
      costDistributionsLoading: false,
      costDistributionsTotalCount: 0,
      costDistributionsInProgress: false,
      costDistributionsError: {
        timeoutID: null,
        message: null
      },
      costDistributionsResponse: {
        timeoutID: null,
        message: false
      },
      originCostDistributions: [],
      responseSuccessful: false,
      costDistributionsFilter: '[]',
      costDistributionsort: '[]',
      costDistributionsColumns: [{
          name: 'Id',
          field: 'Id'
        },
        {
          name: 'Item name',
          field: 'ItemName',
          updateble: true,
          type: 'text'
        },
        {
          name: 'Line item id',
          field: 'LineItemId',
          updateble: true,
          type: 'text'
        },
        {
          name: 'Material distributions',
          field: 'MaterialDistribution',
          updateble: true,
          type: 'number'
        },
        {
          name: 'Labor distributions',
          field: 'LaborDistribution',
          updateble: true,
          type: 'number'
        }
      ],

      costDistributionsFilterObject: {
        ItemName: {
          value: '',
          condition: '='
        },
        LineItemId: {
          value: '',
          condition: '='
        },
        MaterialDistributions: {
          value: '',
          condition: '='
        },
        LaborDistributions: {
          value: '',
          condition: '='
        },
        EquipmentDistributions: {
          value: '',
          condition: '='
        }
      }
    }
  },
  computed: {
    curCostDistributionsPage() {
      let page = 1;
      if (this.$route.params.page) page = this.$route.params.page;
      return parseInt(page);
    }
  },
  created() {
    this.costDistributionsort = this.$route.query.sort && this.$route.query.sort.length ? JSON.parse(this.$route.query.sort) : this.costDistributionsort;
    this.costDistributionsFilter = this.$route.query.filter && this.$route.query.filter.length ? JSON.parse(this.$route.query.filter) : this.costDistributionsFilter;
    if (this.costDistributionsFilter !== '[]') {
      for (let key in this.costDistributionsFilter) {
        const val = this.costDistributionsFilter[key].split("|");
        if (val.length == 3) {
          this.costDistributionsFilterObject[key].from = val[1];
          this.costDistributionsFilterObject[key].to = val[2];
        } else {
          this.costDistributionsFilterObject[key].value = val[1]
        }
      }
    }
  },
  methods: {

    filterCostDistributions() {
      let filterData = {};

      for (let key in this.costDistributionsFilterObject) {
        let field = this.costDistributionsFilterObject[key];
        if (field.condition !== "BETWEEN" && field.value === "") continue;
        if (field.condition === "BETWEEN" && (field.from === "" || field.to === "")) continue;
        if (field.condition === '!=' && !field.value) continue;

        let val;
        if (field.condition !== '!=' && field.condition !== 'BETWEEN') val = field.condition + '|' + field.value;
        if (field.condition === '!=') val = field.condition + '|' + field.default;
        if (field.condition === 'BETWEEN') val = field.condition + '|' + (field.isDate ? moment(field.from).format("YYYY-MM-DD") + ' 00:00:00' : field.from) + '|' + (field.isDate ? moment(field.to).format("YYYY-MM-DD") + ' 00:00:00' : field.to);

        filterData[key] = val;
      }

      this.costDistributionsFilter = '[]';

      if (Object.keys(filterData).length > 0) {
        this.costDistributionsFilter = filterData;
      }

      this.costDistributionsQueryControll();
      this.getCostDistributions();
    },
    sortCostDistributionsBy(field = null) {
      if (field === null) return;
      if (this.costDistributionsort === '[]') this.costDistributionsort = {};
      if (!this.costDistributionsort[field]) {
        this.costDistributionsort[field] = 'DESC';
      } else if (this.costDistributionsort[field] === 'DESC') {
        this.costDistributionsort[field] = 'ASC';
      } else if (this.costDistributionsort[field] === 'ASC') {
        delete this.costDistributionsort[field];
      }

      const sortFieldsCount = Object.keys(this.costDistributionsort).length;

      if (sortFieldsCount === 0) this.costDistributionsort = '[]';
      this.costDistributionsQueryControll();
      this.getCostDistributions();
    },

    costDistributionsQueryControll() {

      if ((this.$route.query.filter != '' && this.$route.query.filter === JSON.stringify(this.costDistributionsFilter)) &&
        (this.$route.query.sort != '' && this.$route.query.sort === JSON.stringify(this.costDistributionsort))) return;

      if (this.curCostDistributionsPage != 1) {
        this.$router.push({
          name: 'cost-distributions',
          params: {
            page: 1
          },
          query: this.$route.query
        });

      }
      this.$router.replace({
        query: {
          sort: (this.costDistributionsort !== '[]') ? JSON.stringify(this.costDistributionsort) : '',
          filter: (this.costDistributionsFilter !== '[]') ? JSON.stringify(this.costDistributionsFilter) : ''
        }
      });
    },

    getCostDistributions() {
      this.costDistributionsLoading = true;
      const skip = this.costDistributionsOptions.limit * (this.curCostDistributionsPage - 1);
      const filter = this.costDistributionsFilter !== '[]' ? JSON.stringify(this.costDistributionsFilter) : this.costDistributionsFilter;
      const sort = this.costDistributionsort !== '[]' ? JSON.stringify(this.costDistributionsort) : this.costDistributionsort;
      axios({
          method: "get",
          url: `http://cors-anywhere.herokuapp.com/http://209.163.136.235:3010/CostDistributions/?skip=${skip}&take=${this.costDistributionsOptions.limit}&sort=${sort}&filter=${filter}`
        })
        .then(obj => {
          this.costDistributions = obj.data.data;
          this.originCostDistributions = JSON.parse(JSON.stringify(obj.data.data));
          this.costDistributionsTotalCount = parseInt(obj.data.count);
          this.costDistributionsLoading = false;
        })
        .catch(error => {
          console.log(error);
        })
    },

    acceptCostDistributionsChanges() {
      const changes = updatedDiff(this.originCostDistributions, this.costDistributions);
      if (Object.keys(changes).length === 0) {
        this.costDistributionsError.message = 'No changes detected';
        this.costDistributionsError.timeoutID =
          setTimeout(() => {
            this.costDistributionsError.message = null
          }, 3000);

        return;
      }

      if (this.costDistributionsInProgress === true) return;
      this.costDistributionsInProgress = true;
      const changedArray = [];

      for (let key in changes) {

        let costDistributions = this.costDistributions[key];
        costDistributions.ModifiedDate = moment().toISOString();
        changedArray.push(costDistributions);
      }

      axios({
          method: "post",
          url: "http://cors-anywhere.herokuapp.com/http://209.163.136.235:3010/CostDistributions/save",
          data: changedArray,
        })
        .then(() => {
          this.costDistributionsResponse.message = 'New data accepted succesfully';
          this.costDistributionsResponse.timeoutID =
            setTimeout(() => {
              this.costDistributionsResponse.message = null
            }, 3000);
          this.costDistributionsInProgress = false;
        })
        .catch(e => {
          this.costDistributionsError.message = e.response.data;
          this.costDistributionsError.timeoutID =
            setTimeout(() => {
              this.costDistributionsError.message = null
            }, 5000);
          this.costDistributionsInProgress = false;
        })
    }
  }
}