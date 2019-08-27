import axios from "axios";
import { updatedDiff } from 'deep-object-diff';

export const houses = {
    data() {
        return {
            housesOptions: {
                limit: 5
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
        }
    },

    methods: {
        getHouses () {
            this.housesLoading = true;
            axios
                .get('http://cors-anywhere.herokuapp.com/newsarmenia.am/mockData.php')
                .then(obj => {
                    this.houses = obj.data;
                    this.originHouses = JSON.parse(JSON.stringify(obj.data));
                    const start = this.housesOptions.limit * (this.curPage - 1);
                    const end = start + this.housesOptions.limit;
                    this.housesTotalCount = parseInt(this.houses.length);
                    this.houses = this.houses.slice(start, end);
                    this.originHouses = this.originHouses.slice(start, end);
                    this.housesLoading = false;
                })
                .catch(error => {console.log(error)})
        },

        acceptChanges () {
            const currentDate = new Date();
            const formatter = new Intl.DateTimeFormat("ru");
            const actualDate = formatter.format(currentDate);
            console.log('actualDate',actualDate);
            let changedHouses = [];
            let wasHousesChanged = false; //<-- эту штуку добавил чтобы отслеживать нажатие на клик, если изменений реально нет
            for(let i=0; i<this.houses.length; i++) {
                if(Object.keys(updatedDiff(this.houses[i],this.originHouses[i])).length !== 0) {
                    changedHouses.push(this.houses[i]);
                    changedHouses[i].modifiedBy  = this.$store.state.testUser.username;
                    changedHouses[i].modifiedDate  = actualDate;
                    wasHousesChanged = true;
                }
            }

            console.log('results', changedHouses, wasHousesChanged);

        }
    }
}