<template>
  <div class="basicCosts">
    <div v-if="this.basicCostsLoading">Loading information. Please wait...</div>

    <div v-if="!this.basicCostsLoading">
      <notifications :response="basicCostsResponse" :error="basicCostsError"></notifications>
      <div class="d-f-space">
        <div>
          Number of displaying pages:
          <select
            class="basicCostsTable"
            @change="getBasicCosts"
            v-model="basicCostsOptions.limit"
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
            v-model="basicCostsCostPrecent"
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
        <active-table
          :columns="basicCostsColumns"
          :filters="basicCostsFilterObject"
          :data="originBasicCosts"
          :updatebleData="basicCosts"
          :sort="basicCostsSort"
          :filterFunction="filterBasicCosts"
          :sortBy="sortBasicCostsBy"
          :total="basicCostsTotalCount"
          :current="curPage"
          :size="basicCostsOptions.limit"
          :prefix="'/basic-costs/'"
          :update="acceptBasicCostsChanges"
        ></active-table>
      </div>

      <notifications :response="basicCostsResponse" :error="basicCostsError"></notifications>
    </div>
  </div>
</template>

<script>
  import { ActiveTable } from "@/components";
  import { Notifications } from "@/components";
  import { main } from "./../mixins/main";
  import { basicCosts } from "./../mixins/basicCosts";
  import authGuard from "./../guards/auth.guard";

  export default {
    beforeRouteEnter: authGuard,
    data() {
      return {};
    },
    components: {
      ActiveTable,
      Notifications
    },

    mounted() {
      this.getBasicCosts();
    },

    mixins: [main, basicCosts]
  };
</script>

<style>
  .basicCostsTable {
    margin-left: 8px;
  }
</style>