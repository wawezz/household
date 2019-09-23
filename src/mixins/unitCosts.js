import axios from "axios";
import moment from "moment";
import {
  updatedDiff
} from 'deep-object-diff';

export const unitCosts = {
  data() {
    return {
      unitCostsOptions: {
        limit: 25
      },
      unitCosts: [],
      unitCostsLoading: false,
      unitCostsTotalCount: 0,
      unitCostsInProgress: false,
      unitCostsError: {
        timeoutID: null,
        message: null
      },
      unitCostsResponse: {
        timeoutID: null,
        message: false
      },
      originUnitCosts: [],
      responseSuccessful: false,
      unitCostsFilter: '[]',
      unitCostsSort: '[]',
      unitCostsColumns: [
        {
          name: 'Id',
          field: 'Id'
        },
        {
          name: 'Item Name',
          field: 'ItemName',
          updateble: true,
          type: 'text'
        },
        {
          name: 'General cost per unit',
          field: 'GeneralCostPerUnit',
          updateble: true,
          type: 'number'
        },
        {
          name: 'Material cost per unit',
          field: 'MaterialCostPerUnit',
          updateble: true,
          type: 'number'
,        },
        {
          name: 'Labor cost per unit',
          field: 'LaborCostPerUnit',
          updateble: true,
          type: 'number'
        },
        {
          name: 'Equipment cost per unit',
          field: 'EquipmentCostPerUnit',
          updateble: true,
          type: 'number'
        }
      ],


      unitCostsFilterObject: {
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
    this.unitCostsSort = this.$route.query.sort && this.$route.query.sort.length ? JSON.parse(this.$route.query.sort) : this.unitCostsSort;
    this.unitCostsFilter = this.$route.query.filter && this.$route.query.filter.length ? JSON.parse(this.$route.query.filter) : this.unitCostsFilter;
    if (this.unitCostsFilter !== '[]') {
      for (let key in this.unitCostsFilter) {
        const val = this.unitCostsFilter[key].split("|");
        if (val.length == 3) {
          this.unitCostsFilterObject[key].from = val[1];
          this.unitCostsFilterObject[key].to = val[2];
        } else {
          this.unitCostsFilterObject[key].value = val[1]
        }
      }
    }
  },
  methods: {

    filterUnitCosts() {
      let filterData = {};

      for (let key in this.unitCostsFilterObject) {
        let field = this.unitCostsFilterObject[key];
        if (field.condition !== "BETWEEN" && field.value === "") continue;
        if (field.condition === "BETWEEN" && (field.from === "" || field.to === "")) continue;
        if (field.condition === '!=' && !field.value) continue;

        let val;
        if (field.condition !== '!=' && field.condition !== 'BETWEEN') val = field.condition + '|' + field.value;
        if (field.condition === '!=') val = field.condition + '|' + field.default;
        if (field.condition === 'BETWEEN') val = field.condition + '|' + (field.isDate ? moment(field.from).format("YYYY-MM-DD") + ' 00:00:00' : field.from) + '|' + (field.isDate ? moment(field.to).format("YYYY-MM-DD") + ' 00:00:00' : field.to);

        filterData[key] = val;
      }

      this.unitCostsFilter = '[]';

      if (Object.keys(filterData).length > 0) {
        this.unitCostsFilter = filterData;
      }

      this.unitCostsQueryControll();
      this.unitCosts();
    },
    sortUnitCostsBy(field = null) {
      if (field === null) return;
      if (this.unitCostsSort === '[]') this.unitCostsSort = {};
      if (!this.unitCostsSort[field]) {
        this.unitCostsSort[field] = 'DESC';
      } else if (this.unitCostsSort[field] === 'DESC') {
        this.unitCostsSort[field] = 'ASC';
      } else if (this.unitCostsSort[field] === 'ASC') {
        delete this.unitCostsSort[field];
      }

      const sortFieldsCount = Object.keys(this.unitCostsSort).length;

      if (sortFieldsCount === 0) this.unitCostsSort = '[]';
      this.unitCostsQueryControll();
      this.getUnitCosts();
    },

    unitCostsQueryControll() {

      if ((this.$route.query.filter != '' && this.$route.query.filter === JSON.stringify(this.unitCostsFilter)) &&
        (this.$route.query.sort != '' && this.$route.query.sort === JSON.stringify(this.unitCostsSort))) return;

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
          sort: (this.unitCostsSort !== '[]') ? JSON.stringify(this.unitCostsSort) : '',
          filter: (this.unitCostsFilter !== '[]') ? JSON.stringify(this.unitCostsFilter) : ''
        }
      });
    },

    getUnitCosts() {
      this.unitCostsLoading = true;
      const skip = this.unitCostsOptions.limit * (this.curUnitCostsPage - 1);
      const filter = this.unitCostsFilter !== '[]' ? JSON.stringify(this.unitCostsFilter) : this.unitCostsFilter;
      const sort = this.unitCostsSort !== '[]' ? JSON.stringify(this.unitCostsSort) : this.unitCostsSort;
      axios({
        method: "get",
        url: `http://cors-anywhere.herokuapp.com/http://209.163.136.235:3010/UnitCosts/?skip=${skip}&take=${this.unitCostsOptions.limit}&sort=${sort}&filter=${filter}`
      })
        .then(obj => {
          this.unitCosts = obj.data.data;
          this.originUnitCosts = JSON.parse(JSON.stringify(obj.data.data));
          this.unitCostsTotalCount = parseInt(obj.data.count);
          this.unitCostsLoading = false;
        })
        .catch(error => {
          console.log(error);
        })
    },

    acceptUnitCostsChanges() {
      const changes = updatedDiff(this.originUnitCosts, this.unitCosts);
      if (Object.keys(changes).length === 0) {
        this.unitCostsError.message = 'No changes detected';
        this.unitCostsError.timeoutID =
          setTimeout(() => {
            this.unitCostsError.message = null
          }, 3000);

        return;
      }

      if (this.unitCostsInProgress === true) return;
      this.unitCostsInProgress = true;
      const changedArray = [];

      for (let key in changes) {

        let unitCost = this.unitCosts[key];
        unitCost.ModifiedDate = moment().toISOString();
        changedArray.push(unitCost);
      }

      axios({
        method: "post",
        url: "http://cors-anywhere.herokuapp.com/http://209.163.136.235:3010/UnitCosts/save",
        data: changedArray,
      })
        .then(() => {
          this.unitCostsResponse.message = 'New data accepted succesfully';
          this.unitCostsResponse.timeoutID =
            setTimeout(() => {
              this.unitCostsResponse.message = null
            }, 3000);
          this.unitCostsInProgress = false;
        })
        .catch(e => {
          this.unitCostsError.message = e.response.data;
          this.unitCostsError.timeoutID =
            setTimeout(() => {
              this.unitCostsError.message = null
            }, 5000);
          this.unitCostsInProgress = false;
        })
    }
  }
}