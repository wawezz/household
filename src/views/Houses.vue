<template>
  <div class="houses">
    <div v-if="this.housesLoading">Loading information. Please wait...</div>

    <div v-if="!this.housesLoading">
      <div v-if="housesResponse.message" class="alert alert-success" role="alert">
        <div class="alert-text">{{housesResponse.message}}}</div>
      </div>

      <div v-if="housesError.message" class="alert alert-danger" role="alert">
        <div class="alert-text">{{housesError.message}}</div>
      </div>
      <div class="d-f-space">
        <div>
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
        </div>

        <div>
          Change costs to
          <input
            type="number"
            class="percentInput"
            min="1"
            v-model="housesCostPrecent"
          /> %
          <base-button
            :type="'primary'"
            :size="'xs'"
            class="ml-2 mr-2"
            @click="updateCosts('up')"
          >Up</base-button>
          <base-button
            :type="'primary'"
            :size="'xs'"
            class="ml-2 mr-2"
            @click="updateCosts('down')"
          >Down</base-button>
        </div>
      </div>

      <div class="table">
        <table class="full-table">
          <thead>
            <tr>
              <th>
                <span
                  v-if="housesSort['id']"
                  class="mr-1"
                >#{{Object.keys(housesSort).indexOf('id')}}</span>
                <font-awesome-icon
                  :icon="`sort${housesSort['id']?housesSort['id'] === 'DESC'?'-down':'-up':''}`"
                  @click="sortHousesBy('id')"
                  class="mr-2 pointer"
                ></font-awesome-icon>House
              </th>
              <th>
                <span
                  v-if="housesSort['NumberOfCorners']"
                  class="mr-1"
                >#{{Object.keys(housesSort).indexOf('NumberOfCorners')}}</span>
                <font-awesome-icon
                  :icon="`sort${housesSort['NumberOfCorners']?housesSort['NumberOfCorners'] === 'DESC'?'-down':'-up':''}`"
                  @click="sortHousesBy('NumberOfCorners')"
                  class="mr-2 pointer"
                ></font-awesome-icon>Number of corners
                <select
                  class="ml-2 houseFilterSelect"
                  v-model="housesFilterObject.NumberOfCorners.value"
                  @change="filterHouses"
                >
                  <option selected value></option>
                  <option>4</option>
                  <option>6</option>
                  <option>8</option>
                  <option>10</option>
                </select>
              </th>
              <th>
                <span
                  v-if="housesSort['QualityGroup']"
                  class="mr-1"
                >#{{Object.keys(housesSort).indexOf('QualityGroup')}}</span>
                <font-awesome-icon
                  :icon="`sort${housesSort['QualityGroup']?housesSort['QualityGroup'] === 'DESC'?'-down':'-up':''}`"
                  @click="sortHousesBy('QualityGroup')"
                  class="mr-2 pointer"
                ></font-awesome-icon>Quality Group
                <select
                  class="ml-2 houseFilterSelect"
                  v-model="housesFilterObject.QualityGroup.value"
                  @change="filterHouses"
                >
                  <option selected value></option>
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
              </th>
              <th>
                <span
                  v-if="housesSort['AreaGroup']"
                  class="mr-1"
                >#{{Object.keys(housesSort).indexOf('AreaGroup')}}</span>
                <font-awesome-icon
                  :icon="`sort${housesSort['AreaGroup']?housesSort['AreaGroup'] === 'DESC'?'-down':'-up':''}`"
                  @click="sortHousesBy('AreaGroup')"
                  class="mr-2 pointer"
                ></font-awesome-icon>Area Group
                <select
                  class="ml-2 houseFilterSelect"
                  v-model="housesFilterObject.AreaGroup.value"
                  @change="filterHouses"
                >
                  <option selected value></option>
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
              </th>
              <th>
                <span
                  v-if="housesSort['CostPerSquareFoot']"
                  class="mr-1"
                >#{{Object.keys(housesSort).indexOf('CostPerSquareFoot')}}</span>
                <font-awesome-icon
                  :icon="`sort${housesSort['CostPerSquareFoot']?housesSort['CostPerSquareFoot'] === 'DESC'?'-down':'-up':''}`"
                  @click="sortHousesBy('CostPerSquareFoot')"
                  class="mr-2 pointer"
                ></font-awesome-icon>Cost PenSquareFoot
              </th>
              <th>
                <span
                  v-if="housesSort['ModifiedBy']"
                  class="mr-1"
                >#{{Object.keys(housesSort).indexOf('ModifiedBy')}}</span>
                <font-awesome-icon
                  :icon="`sort${housesSort['ModifiedBy']?housesSort['ModifiedBy'] === 'DESC'?'-down':'-up':''}`"
                  @click="sortHousesBy('ModifiedBy')"
                  class="mr-2 pointer"
                ></font-awesome-icon>Modified by
              </th>
              <th>
                <span
                  v-if="housesSort['ModifiedDate']"
                  class="mr-1"
                >#{{Object.keys(housesSort).indexOf('ModifiedDate')}}</span>
                <font-awesome-icon
                  :icon="`sort${housesSort['ModifiedDate']?housesSort['ModifiedDate'] === 'DESC'?'-down':'-up':''}`"
                  @click="sortHousesBy('ModifiedDate')"
                  class="mr-2 pointer"
                ></font-awesome-icon>Modified Date
              </th>
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
                  type="number"
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
        <base-button :type="'primary'" @click="acceptChanges()">Accept changes</base-button>
      </div>
      <br />
      <div v-if="housesResponse.message" class="alert alert-success" role="alert">
        <div class="alert-text">{{housesResponse.message}}}</div>
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

<style>
  .houseTable {
    margin-left: 8px;
  }
</style>