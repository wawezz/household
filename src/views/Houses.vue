<template>
  <div class="houses">
    <div v-if="this.housesLoading">Loading information. Please wait... </div>

    <div v-else-if="!this.housesLoading">
    <div>
      <p>Number of displaying pages:
      <select class="houseTable" v-model="pageDisplaySize">
        <option>5</option>
        <option>10</option>
        <option>15</option>
        <option>20</option>
      </select>
      </p>
    </div>

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
        <tbody v-for="(item, index) in this.houses" :key="item.number">
          <tr>
            <td>
              <span>{{item.number}}</span>
            </td>
            <td>
              <span>{{item.typeofHouse}}</span>
            </td>
            <td>
                <select class="houseTable" v-model="changedHouses[index].numberOfCorners">
                  <option disabled>{{item.numberOfCorners}}</option>
                  <option>4</option>
                  <option>6</option>
                  <option>8</option>
                  <option>10</option>
                </select>
             </td>
            <td>
                <select class="houseTable" v-model="changedHouses[index].qualityGroup">
                  <option disabled>{{item.qualityGroup}}</option>
                  <option>1</option>
                  <option>1.5</option>
                  <option>2</option>
                  <option>2.5</option>
                  <option>3</option>
                  <option>3.5</option>
                  <option>4</option>
                  <option>4.5</option>
                  <option>5</option>
                  <option>5.5</option>
                  <option>6</option>
                 </select>
            </td>
            <td>
                <select class="houseTable" v-model="changedHouses[index].areaGroup">
                  <option disabled>{{item.areaGroup}}</option>
                  <option>700</option>
                  <option>800</option>
                  <option>900</option>
                  <option>1000</option>
                  <option>1200</option>
                  <option>1300</option>
                  <option>1400</option>
                  <option>1500</option>
                  <option>1600</option>
                  <option>1700</option>
                  <option>1800</option>
                  <option>1900</option>
                  <option>2000</option>
                  <option>2100</option>
                  <option>2200</option>
                  <option>2300</option>
                  <option>2400</option>
                  <option>2500</option>
                  <option>2700</option>
                  <option>2800</option>
                  <option>3000</option>
                  <option>3500</option>
                  <option>4000</option>
                  <option>4500</option>
                  <option>5000</option>
                </select>
            </td>
            <td>
              <input
                type="text"
                size="6"
                class="houseTable"
                v-model="changedHouses[index].costPerSquareFoot"
                :placeholder = [[item.costPerSquareFoot]]
              >
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
      <pagination
        v-if="housesTotalCount"
        :total="housesTotalCount"
        :current="curPage"
        :size="housesOptions.limit"
        :prefix="'/houses/'"
      />
    </div>

    <div>
      <base-button>Accept changes</base-button>
    </div>

    </div>
  </div>
</template>

<script>
  import { Pagination } from "@/components";
  import { BaseButton } from "@/components";
  import { main } from "./../mixins/main";
  import { houses } from "./../mixins/houses";
  import authGuard from "./../guards/auth.guard";

  export default {
    beforeRouteEnter: authGuard,
    data() {
      return {
        pageDisplaySize: 5,
      };
    },
    components: {
      Pagination
    },

    mounted() {
      this.getHouses();
    },

    beforeUpdate () {
      console.log("pageDisplaySize:", this.pageDisplaySize);
      this.housesOptions.limit = this.pageDisplaySize;
      this.changedHouses = [...this.houses];
      console.log('changedHouses:', this.changedHouses);
      console.log('Houses:', this.houses);
    },


    mixins: [main, houses]
  };
</script>

<style scoped>

  .houseTable {
    margin-left: 8px;
}

</style>