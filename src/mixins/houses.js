import axios from "axios";

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

            //######## this items get used in V-model for edit houses information#################
            changedHouses: [],
            value1: null

            //#######################################
        }
    },

    methods: {
        // getHousesInfo () {
        //     this.housesLoading = true;
        //     axios
        //         .get('http://cors-anywhere.herokuapp.com/newsarmenia.am/mockData.php')
        //         .then(obj => {
        //             this.houses = obj.data;
        //             this.housesLoading = false;
        //             console.log("homes:", this.houses)
        //         })
        //         .catch(error => {console.log(error)})
        //     const start = this.housesOptions.limit * (this.curPage - 1);
        //     const end = start + this.housesOptions.limit;
        //     this.housesTotalCount = parseInt(this.houses.length);
        //     this.houses = this.houses.slice(start, end);
        //     //this.housesLoading = false;
        //
        //
        // },

        getHouses() {

                this.housesLoading = true;
                this.houses = [{
                        number: 1,
                        typeofHouse: "Single family",
                        numberOfCorners: 10,
                        qualityGroup: 1,
                        areaGroup: 1000,
                        costPerSquareFoot: 1000,
                        modifiedBy: "user 1",
                        modifiedDate: "date 1"
                    },
                    {
                        number: 2,
                        typeofHouse: "Single family",
                        numberOfCorners: 10,
                        qualityGroup: 1,
                        areaGroup: 1000,
                        costPerSquareFoot: 1000,
                        modifiedBy: "user 2",
                        modifiedDate: "date 2"
                    },
                    {
                        number: 3,
                        typeofHouse: "Single family",
                        numberOfCorners: 10,
                        qualityGroup: 1,
                        areaGroup: 1000,
                        costPerSquareFoot: 1000,
                        modifiedBy: "user 3",
                        modifiedDate: "date 3"
                    },
                    {
                        number: 4,
                        typeofHouse: "Single family",
                        numberOfCorners: 8,
                        qualityGroup: 1,
                        areaGroup: 1000,
                        costPerSquareFoot: 1000,
                        modifiedBy: "user 4",
                        modifiedDate: "date 4"
                    },
                    {
                        number: 5,
                        typeofHouse: "Single family",
                        numberOfCorners: 8,
                        qualityGroup: 1,
                        areaGroup: 1000,
                        costPerSquareFoot: 1000,
                        modifiedBy: "user 4",
                        modifiedDate: "date 4"
                    },
                    {
                        number: 6,
                        typeofHouse: "Single family",
                        numberOfCorners: 8,
                        qualityGroup: 1,
                        areaGroup: 1000,
                        costPerSquareFoot: 1000,
                        modifiedBy: "user 4",
                        modifiedDate: "date 4"
                    },
                    {
                        number: 7,
                        typeofHouse: "Single family",
                        numberOfCorners: 8,
                        qualityGroup: 1,
                        areaGroup: 1000,
                        costPerSquareFoot: 1000,
                        modifiedBy: "user 4",
                        modifiedDate: "date 4"
                    },
                    {
                        number: 8,
                        typeofHouse: "Single family",
                        numberOfCorners: 8,
                        qualityGroup: 1,
                        areaGroup: 1000,
                        costPerSquareFoot: 1000,
                        modifiedBy: "user 4",
                        modifiedDate: "date 4"
                    },
                    {
                        number: 9,
                        typeofHouse: "Single family",
                        numberOfCorners: 8,
                        qualityGroup: 1,
                        areaGroup: 1000,
                        costPerSquareFoot: 1000,
                        modifiedBy: "user 4",
                        modifiedDate: "date 4"
                    },
                    {
                        number: 10,
                        typeofHouse: "Single family",
                        numberOfCorners: 8,
                        qualityGroup: 1,
                        areaGroup: 1000,
                        costPerSquareFoot: 1000,
                        modifiedBy: "user 4",
                        modifiedDate: "date 4"
                    },
                    {
                        number: 11,
                        typeofHouse: "Single family",
                        numberOfCorners: 8,
                        qualityGroup: 1,
                        areaGroup: 1000,
                        costPerSquareFoot: 1000,
                        modifiedBy: "user 4",
                        modifiedDate: "date 4"
                    },
                    {
                        number: 12,
                        typeofHouse: "Single family",
                        numberOfCorners: 8,
                        qualityGroup: 1,
                        areaGroup: 1000,
                        costPerSquareFoot: 1000,
                        modifiedBy: "user 4",
                        modifiedDate: "date 4"
                    },
                    {
                        number: 13,
                        typeofHouse: "Single family",
                        numberOfCorners: 8,
                        qualityGroup: 1,
                        areaGroup: 1000,
                        costPerSquareFoot: 1000,
                        modifiedBy: "user 4",
                        modifiedDate: "date 4"
                    }
                ];

                const start = this.housesOptions.limit * (this.curPage - 1);
                const end = start + this.housesOptions.limit;
                this.housesTotalCount = parseInt(this.houses.length);
                this.houses = this.houses.slice(start, end);
                this.housesLoading = false;
            }
        },
        test () {
           console.log("Привет!!!")
        }
}