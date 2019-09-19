import axios from "axios";
import moment from "moment";
import {
  updatedDiff
} from 'deep-object-diff';

export const unitcosts = {
  data() {
    return {
      unitcostsOptions: {
        limit: 25
      },
      unitcosts: [],
      unitcostsLoading: false,
      unitcostsTotalCount: 0,
      unitcostsInProgress: false,
      unitcostsError: {
        timeoutID: null,
        message: null
      },
      unitcostsResponse: {
        timeoutID: null,
        message: false
      },
      originUnitcosts: [],
      responseSuccessful: false,
      unitcostsFilter: '[]',
      unitcostsSort: '[]',
      unitcostsFilterObject: {
        HomeType: {
          value: '',
          condition: '='
        },
        ItemName: {
          value: '',
          condition: '='
        },
        GeneralCostPerUnit: {
          value: '',
          condition: '='
        },
        MaterialCostPerUnit: {
          value: '',
          condition: '='
        },
        LaborCostPerUnit: {
          value: '',
          condition: '='
        },
        EquipmentCostPerUnit: {
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
    curUnitCostsPage() {
      let page = 1;
      if (this.$route.params.page) page = this.$route.params.page;
      return parseInt(page);
    }
  },
  created() {
    this.unitcostsSort = this.$route.query.sort && this.$route.query.sort.length ? JSON.parse(this.$route.query.sort) : this.unitcostsSort;
    this.unitcostsFilter = this.$route.query.filter && this.$route.query.filter.length ? JSON.parse(this.$route.query.filter) : this.unitcostsFilter;
    if (this.unitcostsFilter !== '[]') {
      for (let key in this.unitcostsFilter) {
        const val = this.unitcostsFilter[key].split("|");
        if (val.length == 3) {
          this.unitcostsFilterObject[key].from = val[1];
          this.unitcostsFilterObject[key].to = val[2];
        } else {
          this.unitcostsFilterObject[key].value = val[1]
        }
      }
    }
  },
  methods: {

    filterUnitCosts() {
      let filterData = {};

      for (let key in this.unitcostsFilterObject) {
        let field = this.unitcostsFilterObject[key];
        if (field.condition !== "BETWEEN" && field.value === "") continue;
        if (field.condition === "BETWEEN" && (field.from === "" || field.to === "")) continue;
        if (field.condition === '!=' && !field.value) continue;

        let val;
        if (field.condition !== '!=' && field.condition !== 'BETWEEN') val = field.condition + '|' + field.value;
        if (field.condition === '!=') val = field.condition + '|' + field.default;
        if (field.condition === 'BETWEEN') val = field.condition + '|' + (field.isDate ? moment(field.from).format("YYYY-MM-DD") + ' 00:00:00' : field.from) + '|' + (field.isDate ? moment(field.to).format("YYYY-MM-DD") + ' 00:00:00' : field.to);

        filterData[key] = val;
      }

      this.unitcostsFilter = '[]';

      if (Object.keys(filterData).length > 0) {
        this.unitcostsFilter = filterData;
      }

      this.unitcostsQueryControll();
      this.UnitCosts();
    },
    sortUnitCostsBy(field = null) {
      if (field === null) return;
      if (this.unitcostsSort === '[]') this.unitcostsSort = {};
      if (!this.unitcostsSort[field]) {
        this.unitcostsSort[field] = 'DESC';
      } else if (this.unitcostsSort[field] === 'DESC') {
        this.unitcostsSort[field] = 'ASC';
      } else if (this.unitcostsSort[field] === 'ASC') {
        delete this.unitcostsSort[field];
      }

      const sortFieldsCount = Object.keys(this.unitcostsSort).length;

      if (sortFieldsCount === 0) this.unitcostsSort = '[]';
      this.unitcostsQueryControll();
      this.getUnitCosts();
    },

    unitcostsQueryControll() {

      if ((this.$route.query.filter != '' && this.$route.query.filter === JSON.stringify(this.unitcostsFilter)) &&
        (this.$route.query.sort != '' && this.$route.query.sort === JSON.stringify(this.unitcostsSort))) return;

      if (this.curUnitCostsPage != 1) {
        this.$router.push({
          name: 'unit-costs',
          params: {
            page: 1
          },
          query: this.$route.query
        });

      }
      this.$router.replace({
        query: {
          sort: (this.unitcostsSort !== '[]') ? JSON.stringify(this.unitcostsSort) : '',
          filter: (this.unitcostsFilter !== '[]') ? JSON.stringify(this.unitcostsFilter) : ''
        }
      });
    },

    getUnitCosts() {
      this.unitcostsLoading = true;
      const skip = this.unitcostsOptions.limit * (this.curUnitCostsPage - 1);
      const filter = this.unitcostsFilter !== '[]' ? JSON.stringify(this.unitcostsFilter) : this.unitcostsFilter;
      const sort = this.unitcostsSort !== '[]' ? JSON.stringify(this.unitcostsSort) : this.unitcostsSort;
      axios({
        method: "get",
        url: `http://cors-anywhere.herokuapp.com/http://209.163.136.235:3010/BasicCosts/?skip=${skip}&take=${this.unitcostsOptions.limit}&sort=${sort}&filter=${filter}`
      })
        .then(obj => {
          this.unitcosts = obj.data.data;
          this.originUnitcosts = JSON.parse(JSON.stringify(obj.data.data));
          this.unitcostsTotalCount = parseInt(obj.data.count);
          this.unitcostsLoading = false;
        })
        .catch(error => {
          console.log(error);
        })
    },

    acceptChanges() {
      const changes = updatedDiff(this.originUnitcosts, this.unitcosts);
      if (Object.keys(changes).length === 0) {
        this.unitcostsError.message = 'No changes detected';
        this.unitcostsError.timeoutID =
          setTimeout(() => {
            this.unitcostsError.message = null
          }, 3000);

        return;
      }

      if (this.unitcostsInProgress === true) return;
      this.unitcostsInProgress = true;
      const changedArray = [];

      for (let key in changes) {

        let unitcost = this.unitcosts[key];
        unitcost.ModifiedDate = moment().toISOString();
        changedArray.push(unitcost);
      }

      axios({
        method: "post",
        url: "http://cors-anywhere.herokuapp.com/http://209.163.136.235:3010/BasicCosts/save",
        data: changedArray,
      })
        .then(() => {
          this.unitcostsResponse.message = 'New data accepted succesfully';
          this.unitcostsResponse.timeoutID =
            setTimeout(() => {
              this.unitcostsResponse.message = null
            }, 3000);
          this.unitcostsInProgress = false;
        })
        .catch(e => {
          this.unitcostsError.message = e.response.data;
          this.unitcostsError.timeoutID =
            setTimeout(() => {
              this.unitcostsError.message = null
            }, 5000);
          this.unitcostsInProgress = false;
        })
    }
  }
}