import axios from "axios";
import moment from "moment";
import {
    updatedDiff
} from 'deep-object-diff';

export const basicCosts = {
    data() {
        return {
            basicCostsOptions: {
                limit: 25
            },
            basicCosts: [],
            basicCostsLoading: false,
            basicCostsTotalCount: 0,
            basicCostsInProgress: false,
            basicCostsError: {
                timeoutID: null,
                message: null
            },
            basicCostsResponse: {
                timeoutID: null,
                message: false
            },
            originBasicCosts: [],
            responseSuccessful: false,
            basicCostsCostPrecent: 1,
            basicCostsFilter: '[]',
            basicCostsSort: '[]',
            basicCostsColumns: [{
                    name: 'Id',
                    field: 'id'
                },
                {
                    name: 'Number of corners',
                    field: 'NumberOfCorners',
                    updateble: true,
                    type: 'select',
                    options: {
                        min: 4,
                        max: 10,
                        step: 2
                    }
                },
                {
                    name: 'Quality group',
                    field: 'QualityGroup',
                    updateble: true,
                    type: 'select',
                    options: {
                        min: 1,
                        max: 6,
                        step: .5
                    }
                },
                {
                    name: 'Area Group',
                    field: 'AreaGroup',
                    updateble: true,
                    type: 'select',
                    options: {
                        min: 100,
                        max: 5000,
                        step: 100
                    }
                },
                {
                    name: 'Cost per square foot',
                    field: 'CostPerSquareFoot',
                    updateble: true,
                    type: 'number',
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
            basicCostsFilterObject: {
                NumberOfCorners: {
                    value: '',
                    condition: '=',
                    type: 'select',
                    options: {
                        min: 4,
                        max: 10,
                        step: 2
                    }
                },
                QualityGroup: {
                    value: '',
                    condition: '=',
                    type: 'select',
                    options: {
                        min: 1,
                        max: 6,
                        step: .5
                    }
                },
                AreaGroup: {
                    value: '',
                    condition: '=',
                    type: 'select',
                    options: {
                        min: 100,
                        max: 5000,
                        step: 100
                    }
                }
            }
        }
    },
    computed: {
        curBasicCostsPage() {
            let page = 1;
            if (this.$route.params.page) page = this.$route.params.page;
            return parseInt(page);
        }
    },
    created() {
        this.basicCostsSort = this.$route.query.sort && this.$route.query.sort.length ? JSON.parse(this.$route.query.sort) : this.basicCostsSort;
        this.basicCostsFilter = this.$route.query.filter && this.$route.query.filter.length ? JSON.parse(this.$route.query.filter) : this.basicCostsFilter;
        if (this.basicCostsFilter !== '[]') {
            for (let key in this.basicCostsFilter) {
                const val = this.basicCostsFilter[key].split("|");
                if (val.length == 3) {
                    this.basicCostsFilterObject[key].from = val[1];
                    this.basicCostsFilterObject[key].to = val[2];
                } else {
                    this.basicCostsFilterObject[key].value = val[1]
                }
            }
        }
    },
    methods: {

        filterBasicCosts() {
            let filterData = {};

            for (let key in this.basicCostsFilterObject) {
                let field = this.basicCostsFilterObject[key];
                if (field.condition !== "BETWEEN" && field.value === "") continue;
                if (field.condition === "BETWEEN" && (field.from === "" || field.to === "")) continue;
                if (field.condition === '!=' && !field.value) continue;

                let val;
                if (field.condition !== '!=' && field.condition !== 'BETWEEN') val = field.condition + '|' + field.value;
                if (field.condition === '!=') val = field.condition + '|' + field.default;
                if (field.condition === 'BETWEEN') val = field.condition + '|' + (field.isDate ? moment(field.from).format("YYYY-MM-DD") + ' 00:00:00' : field.from) + '|' + (field.isDate ? moment(field.to).format("YYYY-MM-DD") + ' 00:00:00' : field.to);

                filterData[key] = val;
            }

            this.basicCostsFilter = '[]';

            if (Object.keys(filterData).length > 0) {
                this.basicCostsFilter = filterData;
            }

            this.basicCostsQueryControll();
            this.getBasicCosts();
        },
        sortBasicCostsBy(field = null) {
            if (field === null) return;
            if (this.basicCostsSort === '[]') this.basicCostsSort = {};
            if (!this.basicCostsSort[field]) {
                this.basicCostsSort[field] = 'DESC';
            } else if (this.basicCostsSort[field] === 'DESC') {
                this.basicCostsSort[field] = 'ASC';
            } else if (this.basicCostsSort[field] === 'ASC') {
                delete this.basicCostsSort[field];
            }

            const sortFieldsCount = Object.keys(this.basicCostsSort).length;

            if (sortFieldsCount === 0) this.basicCostsSort = '[]';
            this.basicCostsQueryControll();
            this.getBasicCosts();
        },
        basicCostsQueryControll() {

            if ((this.$route.query.filter != '' && this.$route.query.filter === JSON.stringify(this.basicCostsFilter)) &&
                (this.$route.query.sort != '' && this.$route.query.sort === JSON.stringify(this.basicCostsSort))) return;

            if (this.curBasicCostsPage != 1) {
                this.$router.push({
                    name: 'basic-costs',
                    params: {
                        page: 1
                    },
                    query: this.$route.query
                });

            }
            this.$router.replace({
                query: {
                    sort: (this.basicCostsSort !== '[]') ? JSON.stringify(this.basicCostsSort) : '',
                    filter: (this.basicCostsFilter !== '[]') ? JSON.stringify(this.basicCostsFilter) : ''
                }
            });
        },

        getBasicCosts() {
            this.basicCostsLoading = true;
            const skip = this.basicCostsOptions.limit * (this.curBasicCostsPage - 1);
            const filter = this.basicCostsFilter !== '[]' ? JSON.stringify(this.basicCostsFilter) : this.basicCostsFilter;
            const sort = this.basicCostsSort !== '[]' ? JSON.stringify(this.basicCostsSort) : this.basicCostsSort;
            axios({
                    method: "get",
                    url: `http://cors-anywhere.herokuapp.com/http://209.163.136.235:3010/BasicCosts/?skip=${skip}&take=${this.basicCostsOptions.limit}&sort=${sort}&filter=${filter}`
                })
                .then(obj => {
                    this.basicCosts = obj.data.data;
                    this.originBasicCosts = JSON.parse(JSON.stringify(obj.data.data));
                    this.basicCostsTotalCount = parseInt(obj.data.count);
                    this.basicCostsLoading = false;
                })
                .catch(error => {
                    console.log(error);
                })
        },
        updateCosts(action) {
            axios({
                    method: "get",
                    url: `http://cors-anywhere.herokuapp.com/http://209.163.136.235:3010/BasicCosts/priceupdate?percent=${this.basicCostsCostPrecent}&action=${action}`
                })
                .then((res) => {
                    if (res.data.raw.length) {
                        this.basicCostsResponse.message = `cost of ${res.data.raw.length} objects updated to ${this.basicCostsCostPrecent}%`;
                        this.basicCostsResponse.timeoutID =
                            setTimeout(() => {
                                this.basicCostsResponse.message = null
                            }, 3000);
                        this.getBasicCosts();
                    } else {
                        this.basicCostsError.message = 'error updating objects';
                        this.basicCostsError.timeoutID =
                            setTimeout(() => {
                                this.basicCostsError.message = null
                            }, 3000);
                    }
                    this.basicCostsInProgress = false;
                })
                .catch(e => {
                    this.basicCostsError.message = e.response.data;
                    this.basicCostsError.timeoutID =
                        setTimeout(() => {
                            this.basicCostsError.message = null
                        }, 5000);
                    this.basicCostsInProgress = false;
                })
        },
        acceptBasicCostsChanges() {
            const changes = updatedDiff(this.originBasicCosts, this.basicCosts);
            if (Object.keys(changes).length === 0) {
                this.basicCostsError.message = 'No changes detected';
                this.basicCostsError.timeoutID =
                    setTimeout(() => {
                        this.basicCostsError.message = null
                    }, 3000);

                return;
            }

            if (this.basicCostsInProgress === true) return;
            this.basicCostsInProgress = true;
            const changedArray = [];

            for (let key in changes) {

                let basicCost = this.basicCosts[key];
                basicCost.ModifiedDate = moment().toISOString();
                changedArray.push(basicCost);
            }

            axios({
                    method: "post",
                    url: "http://cors-anywhere.herokuapp.com/http://209.163.136.235:3010/BasicCosts/save",
                    data: changedArray,
                })
                .then(() => {
                    this.basicCostsResponse.message = 'New data accepted succesfully';
                    this.basicCostsResponse.timeoutID =
                        setTimeout(() => {
                            this.basicCostsResponse.message = null
                        }, 3000);
                    this.basicCostsInProgress = false;
                })
                .catch(e => {
                    this.basicCostsError.message = e.response.data;
                    this.basicCostsError.timeoutID =
                        setTimeout(() => {
                            this.basicCostsError.message = null
                        }, 5000);
                    this.basicCostsInProgress = false;
                })
        }
    }
}