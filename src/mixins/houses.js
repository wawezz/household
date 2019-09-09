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
                active: false
            },
            originHouses: [],
            responseSuccessful: false
        }
    },

    methods: {
        getHouses() {
            this.housesLoading = true;
            const skip = this.housesOptions.limit * (this.curPage - 1);
            axios({
                    method: "get",
                    url: 'http://cors-anywhere.herokuapp.com/http://209.163.136.235:3000/BasicCosts/?skip=' + skip + '&take=' + this.housesOptions.limit
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
                    url: "http://cors-anywhere.herokuapp.com/http://209.163.136.235:3000/BasicCosts/save",
                    data: changedArray,
                })
                .then(() => {
                    this.housesResponse.active = true;
                    this.housesResponse.timeoutID =
                        setTimeout(() => {
                            this.housesResponse.active = false
                        }, 3000);
                    this.housesInProgress = false;
                })
                .catch(e => {
                    const data = e.response.data;
                    console.log('response error:', data);
                    this.housesInProgress = false;
                })
        }
    }
}