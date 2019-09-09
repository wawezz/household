import axios from "axios";
import { updatedDiff } from 'deep-object-diff';

export const houses = {
    data() {
        return {
            housesOptions: {
                limit: 10
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
        getHouses () {
            this.housesLoading = true;
            const skip = this.housesOptions.limit * (this.curPage-1);
            console.log('http://cors-anywhere.herokuapp.com/http://209.163.136.235:3000/BasicCosts/?skip=' + skip + '&take=' + this.housesOptions.limit);
            axios({
                method: "get",
                url: 'http://cors-anywhere.herokuapp.com/http://209.163.136.235:3000/BasicCosts/?skip=' + skip + '&take=' + this.housesOptions.limit
                })
                .then(obj => {
                    this.houses = obj.data.data;
                    this.originHouses = JSON.parse(JSON.stringify(obj.data.data));
                    this.housesTotalCount = parseInt(obj.data.count);
                    this.housesLoading = false;

                   //const start = this.housesOptions.limit * (this.curPage - 1);
                   //const end = start + this.housesOptions.limit;
                   //this.houses = this.houses.slice(start, end);
                   //this.originHouses = this.originHouses.slice(start, end);
                })
                .catch(error => {console.log(error)})
        },

        acceptChanges () {
            const currentDate = new Date();
            const formatter = new Intl.DateTimeFormat("ru");
            const actualDate = formatter.format(currentDate);
            let changedHouses = [];
            let wasHousesChanged = false; //<-- эту штуку добавил чтобы отслеживать нажатие на клик, если изменений реально нет то на сервер не пойдет пост запрос

            for(let i=0; i<this.houses.length; i++) {
                if(Object.keys(updatedDiff(this.houses[i],this.originHouses[i])).length !== 0) {
                    changedHouses.push(this.houses[i]);
                    wasHousesChanged = true;
                }
            }
            // ++ actual user && actual date
            if(changedHouses.length !==0) {
                for(let i=0; i<changedHouses.length; i++) {
                    changedHouses[i].ModifiedBy  = this.$store.state.testUser.username;
                    changedHouses[i].ModifiedDate  = actualDate;
                }
            }
            //POST changed data to server
            if (wasHousesChanged) {

                axios({
                    method: "post",
                    url: "http://cors-anywhere.herokuapp.com/http://209.163.136.235:3000/BasicCosts/save",
                    data: changedHouses
                    ,
                })
                    .then(() => {
                       this.responseSuccessful = true;
                       setTimeout(()=>{this.responseSuccessful = false}, 3000)
                       }
                    )
                    .catch(e => {
                        const data = e.response.data;
                        console.log('response error:',data)
                    })
            }
        }
    }
}