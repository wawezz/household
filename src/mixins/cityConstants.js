import axios from "axios";
import moment from "moment";
import {
  updatedDiff
} from 'deep-object-diff';

export const cityConstants = {
  data() {
    return {
      cityConstantsOptions: {
        limit: 25
      },
      cityConstants: [],
      cityConstantsLoading: false,
      cityConstantsTotalCount: 0,
      cityConstantsInProgress: false,
      cityConstantsError: {
        timeoutID: null,
        message: null
      },
      cityConstantsResponse: {
        timeoutID: null,
        message: false
      },
      originCityConstants: [],
      responseSuccessful: false,
      cityConstantsFilter: '[]',
      cityConstantsSort: '[]',
      cityConstantsColumns: [
        {
          name: 'Id',
          field: 'Id'
        },
        {
          name: 'City',
          field: 'City',
          updateble: true,
          type: 'text'
        },
        {
          name: 'Material constant',
          field: 'MaterialConstant',
          updateble: true,
          type: 'number'
        },
        {
          name: 'Equip constant',
          field: 'EquipConstant',
          updateble: true,
          type: 'number'
        },
        {
          name: 'State id',
          field: 'State',
          updateble: true,
          type: 'text'
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
      cityConstantsFilterObject: {
        City: {
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
        StateId: {
          value: '',
          condition: '='
        }
      }
    }
  },
  computed: {
    curCityConstantsPage() {
      let page = 1;
      if (this.$route.params.page) page = this.$route.params.page;
      return parseInt(page);
    }
  },
  created() {
    this.cityConstantsSort = this.$route.query.sort && this.$route.query.sort.length ? JSON.parse(this.$route.query.sort) : this.cityConstantsSort;
    this.cityConstantsFilter = this.$route.query.filter && this.$route.query.filter.length ? JSON.parse(this.$route.query.filter) : this.cityConstantsFilter;
    if (this.cityConstantsFilter !== '[]') {
      for (let key in this.cityConstantsFilter) {
        const val = this.cityConstantsFilter[key].split("|");
        if (val.length == 3) {
          this.cityConstantsFilterObject[key].from = val[1];
          this.cityConstantsFilterObject[key].to = val[2];
        } else {
          this.cityConstantsFilterObject[key].value = val[1]
        }
      }
    }
  },
  methods: {

    filterCityConstants() {
      let filterData = {};

      for (let key in this.cityConstantsFilterObject) {
        let field = this.cityConstantsFilterObject[key];
        if (field.condition !== "BETWEEN" && field.value === "") continue;
        if (field.condition === "BETWEEN" && (field.from === "" || field.to === "")) continue;
        if (field.condition === '!=' && !field.value) continue;

        let val;
        if (field.condition !== '!=' && field.condition !== 'BETWEEN') val = field.condition + '|' + field.value;
        if (field.condition === '!=') val = field.condition + '|' + field.default;
        if (field.condition === 'BETWEEN') val = field.condition + '|' + (field.isDate ? moment(field.from).format("YYYY-MM-DD") + ' 00:00:00' : field.from) + '|' + (field.isDate ? moment(field.to).format("YYYY-MM-DD") + ' 00:00:00' : field.to);

        filterData[key] = val;
      }

      this.cityConstantsFilter = '[]';

      if (Object.keys(filterData).length > 0) {
        this.cityConstantsFilter = filterData;
      }

      this.cityConstantsQueryControll();
      this.getCityConstants();
    },
    sortCityConstantsBy(field = null) {
      if (field === null) return;
      if (this.cityConstantsSort === '[]') this.cityConstantsSort = {};
      if (!this.cityConstantsSort[field]) {
        this.cityConstantsSort[field] = 'DESC';
      } else if (this.cityConstantsSort[field] === 'DESC') {
        this.cityConstantsSort[field] = 'ASC';
      } else if (this.cityConstantsSort[field] === 'ASC') {
        delete this.cityConstantsSort[field];
      }

      const sortFieldsCount = Object.keys(this.cityConstantsSort).length;

      if (sortFieldsCount === 0) this.directcostsSort = '[]';
      this.cityConstantsQueryControll();
      this.getCityConstants();
    },

    cityConstantsQueryControll() {

      if ((this.$route.query.filter != '' && this.$route.query.filter === JSON.stringify(this.cityConstantsFilter)) &&
        (this.$route.query.sort != '' && this.$route.query.sort === JSON.stringify(this.cityConstantsSort))) return;

      if (this.curCityConstantsPage != 1) {
        this.$router.push({
          name: 'city-constants',
          params: {
            page: 1
          },
          query: this.$route.query
        });

      }
      this.$router.replace({
        query: {
          sort: (this.cityConstantsSort !== '[]') ? JSON.stringify(this.cityConstantsSort) : '',
          filter: (this.cityConstantsFilter !== '[]') ? JSON.stringify(this.cityConstantsFilter) : ''
        }
      });
    },

    getCityConstants() {
      this.cityConstantsLoading = true;
      const skip = this.cityConstantsOptions.limit * (this.curCityConstantsPage - 1);
      const filter = this.cityConstantsFilter !== '[]' ? JSON.stringify(this.cityConstantsFilter) : this.cityConstantsFilter;
      const sort = this.cityConstantsSort !== '[]' ? JSON.stringify(this.cityConstantsSort) : this.cityConstantsSort;
      axios({
          method: "get",
          url: `http://cors-anywhere.herokuapp.com/http://209.163.136.235:3010/CityConstants/?skip=${skip}&take=${this.cityConstantsOptions.limit}&sort=${sort}&filter=${filter}`
        })
        .then(obj => {
          this.cityConstants = obj.data.data;
          this.originCityConstants = JSON.parse(JSON.stringify(obj.data.data));
          this.cityConstantsTotalCount = parseInt(obj.data.count);
          this.cityConstantsLoading = false;
        })
        .catch(error => {
          console.log(error);
        })
    },

    acceptCityConstantsChanges() {
      const changes = updatedDiff(this.originCityConstants, this.cityConstants);
      if (Object.keys(changes).length === 0) {
        this.cityConstantsError.message = 'No changes detected';
        this.cityConstantsError.timeoutID =
          setTimeout(() => {
            this.cityConstantsError.message = null
          }, 3000);

        return;
      }

      if (this.cityConstantsInProgress === true) return;
      this.cityConstantsInProgress = true;
      const changedArray = [];

      for (let key in changes) {

        let cityConstant = this.cityConstants[key];
        cityConstant.ModifiedDate = moment().toISOString();
        changedArray.push(cityConstant);
      }

      axios({
          method: "post",
          url: "http://cors-anywhere.herokuapp.com/http://209.163.136.235:3010/CityConstants/save",
          data: changedArray,
        })
        .then(() => {
          this.cityConstantsResponse.message = 'New data accepted succesfully';
          this.cityConstantsResponse.timeoutID =
            setTimeout(() => {
              this.cityConstantsResponse.message = null
            }, 3000);
          this.cityConstantsInProgress = false;
        })
        .catch(e => {
          this.cityConstantsError.message = e.response.data;
          this.cityConstantsError.timeoutID =
            setTimeout(() => {
              this.cityConstantsError.message = null
            }, 5000);
          this.cityConstantsInProgress = false;
        })
    }
  }
}