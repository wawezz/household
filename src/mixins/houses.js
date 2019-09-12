import axios from "axios";
import moment from "moment";
import {
    updatedDiff
} from 'deep-object-diff';

export const houses = {
    data() {
        return {
            housesOptions: {
                limit: 25
            },
            houses: [],
            housesLoading: false,
            housesTotalCount: 0,
            housesInProgress: false,
            housesError: {
                timeoutID: null,
                message: null
            },
            housesResponse: {
                timeoutID: null,
                message: false
            },
            originHouses: [],
            responseSuccessful: false,
            housesCostPrecent: 1,
            housesFilter: '[]',
            housesSort: '[]',
            housesFilterObject: {
                NumberOfCorners: {
                    value: '',
                    condition: '='
                },
                QualityGroup: {
                    value: '',
                    condition: '='
                },
                 AreaGroup: {
                    value: '',
                    condition: '='
                },
            housesSearchString: ''
            }
        }
    },

    methods: {


//////////////////////
        filterHouses() {
            let filterData = {};

            for (let key in this.housesFilterObject) {
                let field = this.housesFilterObject[key];
                if (field.condition !== "BETWEEN" && field.value === "") continue;
                if (field.condition === "BETWEEN" && (field.from === "" || field.to === "")) continue;
                if (field.condition === '!=' && !field.value) continue;

                let val;
                if (field.condition !== '!=' && field.condition !== 'BETWEEN') val = field.condition + '|' + field.value;
                if (field.condition === '!=') val = field.condition + '|' + field.default;
                if (field.condition === 'BETWEEN') val = field.condition + '|' + (field.isDate ? moment(field.from).format("YYYY-MM-DD") + ' 00:00:00' : field.from) + '|' + (field.isDate ? moment(field.to).format("YYYY-MM-DD") + ' 00:00:00' : field.to);

                filterData[key] = val;
            }

            this.housesFilter = '[]';

            if (Object.keys(filterData).length > 0) {
                this.housesFilter = filterData;
            }
            console.log("filterData", filterData);


            this.housesQueryControll();
            this.getHouses();
        },
        housesQueryControll() {

            if  (this.$route.query.filter != '' && this.$route.query.filter === JSON.stringify(this.housesFilter)) return;


            console.log('housesQueryControll');

            if (this.curPage != 1) {
                this.$router.push({
                    name: 'houses',
                    params: {
                        page: 1
                    },
                    query: this.$route.query
                });
            }
            this.$router.replace({
                query: {
                    string: this.housesSearchString,
                    sort: (this.housesSort !== '[]') ? JSON.stringify(this.housesSort) : '',
                    filter: (this.housesFilter !== '[]') ? JSON.stringify(this.housesFilter) : ''
                }
            });
        },

////////////////////////
        getHouses() {
            this.housesLoading = true;
            const skip = this.housesOptions.limit * (this.curPage - 1);
            axios({
                    method: "get",
                    url: 'http://cors-anywhere.herokuapp.com/http://209.163.136.235:3015/BasicCosts/?skip=' + skip + '&take=' + this.housesOptions.limit
                })
                .then(obj => {
                    this.houses = obj.data.data;
                    this.originHouses = JSON.parse(JSON.stringify(obj.data.data));
                    this.housesTotalCount = parseInt(obj.data.count);
                    this.housesLoading = false;
                })
                .catch(error => {
                    console.log(error);
                })
        },
        updateCosts() {
            axios({
                    method: "get",
                    url: "http://cors-anywhere.herokuapp.com/http://209.163.136.235:3015/BasicCosts/priceupdate?percent=" + this.housesCostPrecent
                })
                .then((res) => {
                    if (res.data.raw.length) {
                        this.housesResponse.message = `cost of ${res.data.raw.length} objects updated to ${this.housesCostPrecent}%`;
                        this.housesResponse.timeoutID =
                            setTimeout(() => {
                                this.housesResponse.message = null
                            }, 3000);
                        this.getHouses();
                    } else {
                        this.housesError.message = 'error updating objects';
                        this.housesError.timeoutID =
                            setTimeout(() => {
                                this.housesError.message = null
                            }, 3000);
                    }
                    this.housesInProgress = false;
                })
                .catch(e => {
                    this.housesError.message = e.response.data;
                    this.housesError.timeoutID =
                        setTimeout(() => {
                            this.housesError.message = null
                        }, 5000);
                    this.housesInProgress = false;
                })
        },
        acceptChanges() {
            const changes = updatedDiff(this.originHouses, this.houses);
            if (Object.keys(changes).length === 0) {
                this.housesError.message = 'No changes detected';
                this.housesError.timeoutID =
                    setTimeout(() => {
                        this.housesError.message = null
                    }, 3000);

                return;
            }

            if (this.housesInProgress === true) return;
            this.housesInProgress = true;
            const changedArray = [];

            for (let key in changes) {

                let house = this.houses[key];
                house.ModifiedDate = moment().toISOString();
                changedArray.push(house);
            }

            axios({
                    method: "post",
                    url: "http://cors-anywhere.herokuapp.com/http://209.163.136.235:3015/BasicCosts/save",
                    data: changedArray,
                })
                .then(() => {
                    this.housesResponse.message = 'New data accepted succesfully';
                    this.housesResponse.timeoutID =
                        setTimeout(() => {
                            this.housesResponse.message = null
                        }, 3000);
                    this.housesInProgress = false;
                })
                .catch(e => {
                    this.housesError.message = e.response.data;
                    this.housesError.timeoutID =
                        setTimeout(() => {
                            this.housesError.message = null
                        }, 5000);
                    this.housesInProgress = false;
                })
        }
    }
}