<template>
  <div class="houses">
      <div class="table">
          <table>
              <thead>
              <tr>
                  <th>House</th>
                  <th>Type of House</th>
                  <th>Number of corners</th>
                  <th>Quality Group</th>
                  <th>Area Group</th>
                  <th>Cost PenSquareFoot</th>
                  <th>Modified by</th>
                  <th>Modified Date</th>
              </tr>
              </thead>
              <tbody v-for="item in items" :key="item.number">
              <tr>
                  <td>
                      <span>{{item.number}}</span>
                  </td>
                  <td>
                      <span>{{item.typeofHouse}}</span>
                  </td>
                  <td>
                      <span>{{item.numberOfCorners}}</span>
                  </td>
                  <td>
                      <span>{{item.qualityGroup}}</span>
                  </td>
                  <td>
                      <span>{{item.areaGroup}}</span>
                  </td>
                  <td>
                      <span>{{item.costPerSquareFoot}}</span>
                  </td>
                  <td>
                      <span>{{item.modifiedBy}}</span>
                  </td>
                  <td>
                      <span>{{item.modifiedDate}}</span>
                  </td>
              </tr>
              </tbody>
          </table>
      </div>
      <div>
         <Paginate
           v-model="page"
           :page-count="pageCount"
           :click-handler="pageChangeHandler"
           :prev-text="'Prev'"
           :next-text="'Next'"
           :container-class="'className'"
         >
         </Paginate>
      </div>
  </div>
</template>

<script>
  import paginationMixin from '../mixins/pagination.mixin'

  export default {
    name: "houses",

    data: ()=> {
      return {
        housesForSale: [
          {number: 1,
           typeofHouse: 'Single family',
           numberOfCorners: 10,
           qualityGroup: 1,
           areaGroup: 1000,
           costPerSquareFoot: 1000,
           modifiedBy: 'user 1',
           modifiedDate: 'date 1'
          },
          { number: 2,
            typeofHouse: 'Single family',
            numberOfCorners: 10,
            qualityGroup: 1,
            areaGroup: 1000,
            costPerSquareFoot: 1000,
            modifiedBy: 'user 2',
            modifiedDate: 'date 2'
          },
          { number: 3,
            typeofHouse: 'Single family',
            numberOfCorners: 10,
            qualityGroup: 1,
            areaGroup: 1000,
            costPerSquareFoot: 1000,
            modifiedBy: 'user 3',
            modifiedDate: 'date 3'
          },
          { number: 4,
            typeofHouse: 'Single family',
            numberOfCorners: 8,
            qualityGroup: 1,
            areaGroup: 1000,
            costPerSquareFoot: 1000,
            modifiedBy: 'user 4',
            modifiedDate: 'date 4'
          },
          { number: 5,
            typeofHouse: 'Single family',
            numberOfCorners: 8,
            qualityGroup: 1,
            areaGroup: 1000,
            costPerSquareFoot: 1000,
            modifiedBy: 'user 4',
            modifiedDate: 'date 4'
          },
          { number: 6,
            typeofHouse: 'Single family',
            numberOfCorners: 8,
            qualityGroup: 1,
            areaGroup: 1000,
            costPerSquareFoot: 1000,
            modifiedBy: 'user 4',
            modifiedDate: 'date 4'
          },
          { number: 7,
            typeofHouse: 'Single family',
            numberOfCorners: 8,
            qualityGroup: 1,
            areaGroup: 1000,
            costPerSquareFoot: 1000,
            modifiedBy: 'user 4',
            modifiedDate: 'date 4'
          },
          { number: 8,
            typeofHouse: 'Single family',
            numberOfCorners: 8,
            qualityGroup: 1,
            areaGroup: 1000,
            costPerSquareFoot: 1000,
            modifiedBy: 'user 4',
            modifiedDate: 'date 4'
          },
          { number: 9,
            typeofHouse: 'Single family',
            numberOfCorners: 8,
            qualityGroup: 1,
            areaGroup: 1000,
            costPerSquareFoot: 1000,
            modifiedBy: 'user 4',
            modifiedDate: 'date 4'
          },
          { number: 10,
            typeofHouse: 'Single family',
            numberOfCorners: 8,
            qualityGroup: 1,
            areaGroup: 1000,
            costPerSquareFoot: 1000,
            modifiedBy: 'user 4',
            modifiedDate: 'date 4'
          },
          { number: 11,
            typeofHouse: 'Single family',
            numberOfCorners: 8,
            qualityGroup: 1,
            areaGroup: 1000,
            costPerSquareFoot: 1000,
            modifiedBy: 'user 4',
            modifiedDate: 'date 4'
          },
          { number: 12,
            typeofHouse: 'Single family',
            numberOfCorners: 8,
            qualityGroup: 1,
            areaGroup: 1000,
            costPerSquareFoot: 1000,
            modifiedBy: 'user 4',
            modifiedDate: 'date 4'
          },
          { number: 13,
            typeofHouse: 'Single family',
            numberOfCorners: 8,
            qualityGroup: 1,
            areaGroup: 1000,
            costPerSquareFoot: 1000,
            modifiedBy: 'user 4',
            modifiedDate: 'date 4'
          }
        ]
      }
    },

    mixins: [paginationMixin],

    async mounted() {
      this.setupPagination(this.housesForSale)
    }
  }



</script>

<style scoped>

</style>