import axios from "axios";
import moment from "moment";
import {
  updatedDiff
} from 'deep-object-diff';

export const directcosts = {
  data() {
    return {
      directcostsOptions: {
        limit: 25
      },
      directcosts: [],
      directcostsLoading: false,
      directcostsTotalCount: 0,
      directcostsInProgress: false,
      directcostsError: {
        timeoutID: null,
        message: null
      },
      directcostsResponse: {
        timeoutID: null,
        message: false
      },
      originDirectcosts: [],
      responseSuccessful: false,
      directcostsFilter: '[]',
      directcostsSort: '[]',
      directcostsFilterObject: {
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
    curDirectCostPage() {
      let page = 1;
      if (this.$route.params.page) page = this.$route.params.page;
      return parseInt(page);
    }
  },
  created() {
    this.directcostsSort = this.$route.query.sort && this.$route.query.sort.length ? JSON.parse(this.$route.query.sort) : this.directcostsSort;
    this.directcostsFilter = this.$route.query.filter && this.$route.query.filter.length ? JSON.parse(this.$route.query.filter) : this.directcostsFilter;
    if (this.directcostsFilter !== '[]') {
      for (let key in this.directcostsFilter) {
        const val = this.directcostsFilter[key].split("|");
        if (val.length == 3) {
          this.directcostsFilterObject[key].from = val[1];
          this.directcostsFilterObject[key].to = val[2];
        } else {
          this.directcostsFilterObject[key].value = val[1]
        }
      }
    }
  },
  methods: {

    filterDirectCosts() {
      let filterData = {};

      for (let key in this.directcostsFilterObject) {
        let field = this.directcostsFilterObject[key];
        if (field.condition !== "BETWEEN" && field.value === "") continue;
        if (field.condition === "BETWEEN" && (field.from === "" || field.to === "")) continue;
        if (field.condition === '!=' && !field.value) continue;

        let val;
        if (field.condition !== '!=' && field.condition !== 'BETWEEN') val = field.condition + '|' + field.value;
        if (field.condition === '!=') val = field.condition + '|' + field.default;
        if (field.condition === 'BETWEEN') val = field.condition + '|' + (field.isDate ? moment(field.from).format("YYYY-MM-DD") + ' 00:00:00' : field.from) + '|' + (field.isDate ? moment(field.to).format("YYYY-MM-DD") + ' 00:00:00' : field.to);

        filterData[key] = val;
      }

      this.directcostsFilter = '[]';

      if (Object.keys(filterData).length > 0) {
        this.directcostsFilter = filterData;
      }

      this.directcostsQueryControll();
      this.getDirectCosts();
    },
    sortDirectCostsBy(field = null) {
      if (field === null) return;
      if (this.directcostsSort === '[]') this.directcostsSort = {};
      if (!this.directcostsSort[field]) {
        this.directcostsSort[field] = 'DESC';
      } else if (this.directcostsSort[field] === 'DESC') {
        this.directcostsSort[field] = 'ASC';
      } else if (this.directcostsSort[field] === 'ASC') {
        delete this.directcostsSort[field];
      }

      const sortFieldsCount = Object.keys(this.directcostsSort).length;

      if (sortFieldsCount === 0) this.directcostsSort = '[]';
      this.directcostsQueryControll();
      this.getDirectCosts();
    },

    directcostsQueryControll() {

      if ((this.$route.query.filter != '' && this.$route.query.filter === JSON.stringify(this.directcostsFilter)) &&
        (this.$route.query.sort != '' && this.$route.query.sort === JSON.stringify(this.directcostsSort))) return;

      if (this.curDirectCostPage != 1) {
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
          sort: (this.directcostsSort !== '[]') ? JSON.stringify(this.directcostsSort) : '',
          filter: (this.directcostsFilter !== '[]') ? JSON.stringify(this.directcostsFilter) : ''
        }
      });
    },

    getDirectCosts() {
      this.directcostsLoading = true;
      const skip = this.directcostsOptions.limit * (this.curDirectCostPage - 1);
      const filter = this.directcostsFilter !== '[]' ? JSON.stringify(this.directcostsFilter) : this.directcostsFilter;
      const sort = this.directcostsSort !== '[]' ? JSON.stringify(this.directcostsSort) : this.directcostsSort;
      axios({
        method: "get",
        url: `http://cors-anywhere.herokuapp.com/http://209.163.136.235:3010/BasicCosts/?skip=${skip}&take=${this.directcostsOptions.limit}&sort=${sort}&filter=${filter}`
      })
        .then(obj => {
          this.directcosts = obj.data.data;
          this.originDirectcosts = JSON.parse(JSON.stringify(obj.data.data));
          this.directcostsTotalCount = parseInt(obj.data.count);
          this.directcostsLoading = false;
        })
        .catch(error => {
          console.log(error);
        })
    },

    acceptChanges() {
      const changes = updatedDiff(this.originDirectcosts, this.directcosts);
      if (Object.keys(changes).length === 0) {
        this.directcostsError.message = 'No changes detected';
        this.directcostsError.timeoutID =
          setTimeout(() => {
            this.directcostsError.message = null
          }, 3000);

        return;
      }

      if (this.directcostsInProgress === true) return;
      this.directcostsInProgress = true;
      const changedArray = [];

      for (let key in changes) {

        let directcost = this.directcosts[key];
        directcost.ModifiedDate = moment().toISOString();
        changedArray.push(directcost);
      }

      axios({
        method: "post",
        url: "http://cors-anywhere.herokuapp.com/http://209.163.136.235:3010/BasicCosts/save",
        data: changedArray,
      })
        .then(() => {
          this.directcostsResponse.message = 'New data accepted succesfully';
          this.directcostsResponse.timeoutID =
            setTimeout(() => {
              this.directcostsResponse.message = null
            }, 3000);
          this.directcostsInProgress = false;
        })
        .catch(e => {
          this.directcostsError.message = e.response.data;
          this.directcostsError.timeoutID =
            setTimeout(() => {
              this.directcostsError.message = null
            }, 5000);
          this.directcostsInProgress = false;
        })
    }
   }
 }