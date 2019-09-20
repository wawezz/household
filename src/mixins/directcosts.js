import axios from "axios";
import moment from "moment";
import {
  updatedDiff
} from 'deep-object-diff';

export const directCosts = {
  data() {
    return {
      directCostsOptions: {
        limit: 25
      },
      directCosts: [],
      directCostsLoading: false,
      directCostsTotalCount: 0,
      directCostsInProgress: false,
      directCostsError: {
        timeoutID: null,
        message: null
      },
      directCostsResponse: {
        timeoutID: null,
        message: false
      },
      originDirectCosts: [],
      responseSuccessful: false,
      directCostsFilter: '[]',
      directCostsSort: '[]',
      directCostsFilterObject: {
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
        SortOrder: {
          value: '',
          condition: '='
        },
        QualityClass: {
          value: '',
          condition: '='
        },
        Masonry: {
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
    curDirectCostsPage() {
      let page = 1;
      if (this.$route.params.page) page = this.$route.params.page;
      return parseInt(page);
    }
  },
  created() {
    this.directCostsSort = this.$route.query.sort && this.$route.query.sort.length ? JSON.parse(this.$route.query.sort) : this.directCostsSort;
    this.directCostsFilter = this.$route.query.filter && this.$route.query.filter.length ? JSON.parse(this.$route.query.filter) : this.directCostsFilter;
    if (this.directCostsFilter !== '[]') {
      for (let key in this.directCostsFilter) {
        const val = this.directCostsFilter[key].split("|");
        if (val.length == 3) {
          this.directCostsFilterObject[key].from = val[1];
          this.directCostsFilterObject[key].to = val[2];
        } else {
          this.directCostsFilterObject[key].value = val[1]
        }
      }
    }
  },
  methods: {

    filterDirectCosts() {
      let filterData = {};

      for (let key in this.directCostsFilterObject) {
        let field = this.directCostsFilterObject[key];
        if (field.condition !== "BETWEEN" && field.value === "") continue;
        if (field.condition === "BETWEEN" && (field.from === "" || field.to === "")) continue;
        if (field.condition === '!=' && !field.value) continue;

        let val;
        if (field.condition !== '!=' && field.condition !== 'BETWEEN') val = field.condition + '|' + field.value;
        if (field.condition === '!=') val = field.condition + '|' + field.default;
        if (field.condition === 'BETWEEN') val = field.condition + '|' + (field.isDate ? moment(field.from).format("YYYY-MM-DD") + ' 00:00:00' : field.from) + '|' + (field.isDate ? moment(field.to).format("YYYY-MM-DD") + ' 00:00:00' : field.to);

        filterData[key] = val;
      }

      this.directCostsFilter = '[]';

      if (Object.keys(filterData).length > 0) {
        this.directCostsFilter = filterData;
      }

      this.directCostsQueryControll();
      this.getDirectCosts();
    },
    sortDirectCostsBy(field = null) {
      if (field === null) return;
      if (this.directCostsSort === '[]') this.directCostsSort = {};
      if (!this.directCostsSort[field]) {
        this.directCostsSort[field] = 'DESC';
      } else if (this.directCostsSort[field] === 'DESC') {
        this.directCostsSort[field] = 'ASC';
      } else if (this.directCostsSort[field] === 'ASC') {
        delete this.directCostsSort[field];
      }

      const sortFieldsCount = Object.keys(this.directCostsSort).length;

      if (sortFieldsCount === 0) this.directCostsSort = '[]';
      this.directCostsQueryControll();
      this.getDirectCosts();
    },

    directCostsQueryControll() {

      if ((this.$route.query.filter != '' && this.$route.query.filter === JSON.stringify(this.directCostsFilter)) &&
        (this.$route.query.sort != '' && this.$route.query.sort === JSON.stringify(this.directCostsSort))) return;

      if (this.curDirectCostsPage != 1) {
        this.$router.push({
          name: 'direct-costs',
          params: {
            page: 1
          },
          query: this.$route.query
        });

      }
      this.$router.replace({
        query: {
          sort: (this.directCostsSort !== '[]') ? JSON.stringify(this.directCostsSort) : '',
          filter: (this.directCostsFilter !== '[]') ? JSON.stringify(this.directCostsFilter) : ''
        }
      });
    },

    getDirectCosts() {
      this.directCostsLoading = true;
      const skip = this.directCostsOptions.limit * (this.curDirectCostsPage - 1);
      const filter = this.directCostsFilter !== '[]' ? JSON.stringify(this.directCostsFilter) : this.directCostsFilter;
      const sort = this.directCostsSort !== '[]' ? JSON.stringify(this.directCostsSort) : this.directCostsSort;
      axios({
          method: "get",
          url: `http://cors-anywhere.herokuapp.com/http://209.163.136.235:3010/BasicCosts/?skip=${skip}&take=${this.directCostsOptions.limit}&sort=${sort}&filter=${filter}`
        })
        .then(obj => {
          this.directCosts = obj.data.data;
          this.originDirectCosts = JSON.parse(JSON.stringify(obj.data.data));
          this.directCostsTotalCount = parseInt(obj.data.count);
          this.directCostsLoading = false;
        })
        .catch(error => {
          console.log(error);
        })
    },

    acceptDirectCostsChanges() {
      const changes = updatedDiff(this.originDirectCosts, this.directCosts);
      if (Object.keys(changes).length === 0) {
        this.directCostsError.message = 'No changes detected';
        this.directCostsError.timeoutID =
          setTimeout(() => {
            this.directCostsError.message = null
          }, 3000);

        return;
      }

      if (this.directCostsInProgress === true) return;
      this.directCostsInProgress = true;
      const changedArray = [];

      for (let key in changes) {

        let directCost = this.directCosts[key];
        directCost.ModifiedDate = moment().toISOString();
        changedArray.push(directCost);
      }

      axios({
          method: "post",
          url: "http://cors-anywhere.herokuapp.com/http://209.163.136.235:3010/BasicCosts/save",
          data: changedArray,
        })
        .then(() => {
          this.directCostsResponse.message = 'New data accepted succesfully';
          this.directCostsResponse.timeoutID =
            setTimeout(() => {
              this.directCostsResponse.message = null
            }, 3000);
          this.directCostsInProgress = false;
        })
        .catch(e => {
          this.directCostsError.message = e.response.data;
          this.directCostsError.timeoutID =
            setTimeout(() => {
              this.directCostsError.message = null
            }, 5000);
          this.directCostsInProgress = false;
        })
    }
  }
}