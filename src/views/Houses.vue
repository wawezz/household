<template>
  <div class="houses">
    <div v-if="this.housesLoading">Loading information. Please wait...</div>

    <div v-else-if="!this.housesLoading">
      <div>
        <p>
          Number of displaying pages:
          <select
            class="houseTable"
            @change="getHouses"
            v-model="housesOptions.limit"
          >
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
            <option value="150">150</option>
          </select>
        </p>
      </div>

      <div class="table">
        <table>
          <thead>
            <tr>
              <th>House</th>
              <th>Number of corners</th>
              <th>Quality Group</th>
              <th>Area Group</th>
              <th>Cost PenSquareFoot</th>
              <th>Modified by</th>
              <th>Modified Date</th>
            </tr>
          </thead>
          <tbody v-for="(item, index) in this.houses" :key="item.id">
            <tr>
              <td>
                <span>{{item.id}}</span>
              </td>
              <td>
                <select class="houseTable" v-model="houses[index].NumberOfCorners">
                  <option disabled>{{item.NumberOfCorners}}</option>
                  <option>4</option>
                  <option>6</option>
                  <option>8</option>
                  <option>10</option>
                </select>
              </td>
              <td>
                <select class="houseTable" v-model="houses[index].QualityGroup">
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
                <select class="houseTable" v-model="houses[index].AreaGroup">
                  <option disabled>{{item.AreaGroup}}</option>
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
                  v-model="houses[index].CostPerSquareFoot"
                  :placeholder="[[item.CostPerSquareFoot]]"
                />
              </td>
              <td>
                <span>{{item.ModifiedBy}}</span>
              </td>
              <td>
                <span>{{item.ModifiedDate | dateTime}}</span>
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
        <base-button @click="acceptChanges()">Accept changes</base-button>
      </div>
      <br />
      <div v-if="housesResponse.active" class="alert alert-success" role="alert">
        <div class="alert-text">New data accepted succesfully</div>
      </div>

      <div v-if="housesError.message" class="alert alert-danger" role="alert">
        <div class="alert-text">{{housesError.message}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import { Pagination } from "@/components";
  import { main } from "./../mixins/main";
  import { houses } from "./../mixins/houses";
  import authGuard from "./../guards/auth.guard";

  export default {
    beforeRouteEnter: authGuard,
    data() {
      return {};
    },
    components: {
      Pagination
    },

    mounted() {
      this.getHouses();
    },

    mixins: [main, houses]
  };
</script>

<style scoped>
  .houseTable {
    margin-left: 8px;
  }
  .respSuccessfull {
    margin-left: 20px;
    color: green;
  }
</style>