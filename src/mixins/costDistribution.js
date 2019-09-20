import axios from "axios";
import moment from "moment";
import {
  updatedDiff
} from 'deep-object-diff';

export const costDistribution = {
  data() {
    return {
      costDistributionOptions: {
        limit: 25
      },
      costDistributions: [],
      costDistributionLoading: false,
      costDistributionTotalCount: 0,
      costDistributionInProgress: false,
      costDistributionError: {
        timeoutID: null,
        message: null
      },
      costDistributionResponse: {
        timeoutID: null,
        message: false
      },
      originCostDistributions: [],
      responseSuccessful: false,
      costDistributionFilter: '[]',
      costDistributionSort: '[]',
      costDistributionColumns: [
        {
          name: 'Id',
          field: 'id'
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
          name: 'Material distribution',
          field: 'MaterialDistribution',
          updateble: true,
          type: 'number'
        },
        {
          name: 'Labor distribution',
          field: 'LaborDistribution',
          updateble: true,
          type: 'number'
        },
        {
          name: 'Equipment distribution',
          field: 'EquipmentDistribution',
          updateble: true,
          type: 'number'
        },
        {
          name: 'Modified by',
          field: 'ModifiedBy'
        },
        {
          name: 'Modified date',
          field: 'ModifiedDate'
        }
      ],

      costDistributionFilterObject: {
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
        }
      }
    }
  },
  computed: {
    curCostDistributionPage() {
      let page = 1;
      if (this.$route.params.page) page = this.$route.params.page;
      return parseInt(page);
    }
  },
  created() {
    this.costDistributionSort = this.$route.query.sort && this.$route.query.sort.length ? JSON.parse(this.$route.query.sort) : this.costDistributionSort;
    this.costDistributionFilter = this.$route.query.filter && this.$route.query.filter.length ? JSON.parse(this.$route.query.filter) : this.costDistributionFilter;
    if (this.costDistributionFilter !== '[]') {
      for (let key in this.costDistributionFilter) {
        const val = this.costDistributionFilter[key].split("|");
        if (val.length == 3) {
          this.costDistributionFilterObject[key].from = val[1];
          this.costDistributionFilterObject[key].to = val[2];
        } else {
          this.costDistributionFilterObject[key].value = val[1]
        }
      }
    }
  },
  methods: {

    filterCostDistribution() {
      let filterData = {};

      for (let key in this.costDistributionFilterObject) {
        let field = this.costDistributionFilterObject[key];
        if (field.condition !== "BETWEEN" && field.value === "") continue;
        if (field.condition === "BETWEEN" && (field.from === "" || field.to === "")) continue;
        if (field.condition === '!=' && !field.value) continue;

        let val;
        if (field.condition !== '!=' && field.condition !== 'BETWEEN') val = field.condition + '|' + field.value;
        if (field.condition === '!=') val = field.condition + '|' + field.default;
        if (field.condition === 'BETWEEN') val = field.condition + '|' + (field.isDate ? moment(field.from).format("YYYY-MM-DD") + ' 00:00:00' : field.from) + '|' + (field.isDate ? moment(field.to).format("YYYY-MM-DD") + ' 00:00:00' : field.to);

        filterData[key] = val;
      }

      this.costDistributionFilter = '[]';

      if (Object.keys(filterData).length > 0) {
        this.costDistributionFilter = filterData;
      }

      this.costDistributionQueryControll();
      this.getCostDistribution();
    },
    sortCostDistributionBy(field = null) {
      if (field === null) return;
      if (this.costDistributionSort === '[]') this.costDistributionSort = {};
      if (!this.costDistributionSort[field]) {
        this.costDistributionSort[field] = 'DESC';
      } else if (this.costDistributionSort[field] === 'DESC') {
        this.costDistributionSort[field] = 'ASC';
      } else if (this.costDistributionSort[field] === 'ASC') {
        delete this.costDistributionSort[field];
      }

      const sortFieldsCount = Object.keys(this.costDistributionSort).length;

      if (sortFieldsCount === 0) this.costDistributionSort = '[]';
      this.costDistributionQueryControll();
      this.getCostDistribution();
    },

    costDistributionQueryControll() {

      if ((this.$route.query.filter != '' && this.$route.query.filter === JSON.stringify(this.costDistributionFilter)) &&
        (this.$route.query.sort != '' && this.$route.query.sort === JSON.stringify(this.costDistributionSort))) return;

      if (this.curCostDistributionPage != 1) {
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
          sort: (this.costDistributionSort !== '[]') ? JSON.stringify(this.costDistributionSort) : '',
          filter: (this.costDistributionFilter !== '[]') ? JSON.stringify(this.costDistributionFilter) : ''
        }
      });
    },

    getCostDistribution() {
      this.costDistributionLoading = true;
      const skip = this.costDistributionOptions.limit * (this.curCostDistributionPage - 1);
      const filter = this.costDistributionFilter !== '[]' ? JSON.stringify(this.costDistributionFilter) : this.costDistributionFilter;
      const sort = this.costDistributionSort !== '[]' ? JSON.stringify(this.costDistributionSort) : this.costDistributionSort;
      axios({
          method: "get",
          url: `http://cors-anywhere.herokuapp.com/http://209.163.136.235:3010/CostDistribution/?skip=${skip}&take=${this.costDistributionOptions.limit}&sort=${sort}&filter=${filter}`
        })
        .then(obj => {
          this.costDistributions = obj.data.data;
          this.originCostDistributions = JSON.parse(JSON.stringify(obj.data.data));
          this.costDistributionTotalCount = parseInt(obj.data.count);
          this.costDistributionLoading = false;
        })
        .catch(error => {
          console.log(error);
        })
    },

    acceptCostDistributionsChanges() {
      const changes = updatedDiff(this.originCostDistributions, this.costDistributions);
      if (Object.keys(changes).length === 0) {
        this.costDistributionError.message = 'No changes detected';
        this.costDistributionError.timeoutID =
          setTimeout(() => {
            this.costDistributionError.message = null
          }, 3000);

        return;
      }

      if (this.costDistributionInProgress === true) return;
      this.costDistributionInProgress = true;
      const changedArray = [];

      for (let key in changes) {

        let costDistribution = this.costDistributions[key];
        costDistribution.ModifiedDate = moment().toISOString();
        changedArray.push(costDistribution);
      }

      axios({
          method: "post",
          url: "http://cors-anywhere.herokuapp.com/http://209.163.136.235:3010/CostDistribution/save",
          data: changedArray,
        })
        .then(() => {
          this.costDistributionResponse.message = 'New data accepted succesfully';
          this.costDistributionResponse.timeoutID =
            setTimeout(() => {
              this.costDistributionResponse.message = null
            }, 3000);
          this.costDistributionInProgress = false;
        })
        .catch(e => {
          this.costDistributionError.message = e.response.data;
          this.costDistributionError.timeoutID =
            setTimeout(() => {
              this.costDistributionError.message = null
            }, 5000);
          this.costDistributionInProgress = false;
        })
    }
  }
}