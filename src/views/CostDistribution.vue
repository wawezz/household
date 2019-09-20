<template>
  <div class="costDistribution">
    <div v-if="this.costDistributionLoading">Loading information. Please wait...</div>

    <div v-if="!this.costDistributionLoading">
      <notifications :response="costDistributionResponse" :error="costDistributionError"></notifications>
      <div class="d-f-space">
        <div>
          Number of displaying pages:
          <select
            class="costDistributionTable"
            @change="getCostDistribution"
            v-model="costDistributionOptions.limit"
          >
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
            <option value="150">150</option>
          </select>
        </div>

        <div class="table">
          <active-table
            :columns="costDistributionColumns"
            :filters="costDistributionFilterObject"
            :data="originCostDistributions"
            :updatebleData="costDistributions"
            :sort="costDistributionSort"
            :filterFunction="filterCostDistribution"
            :sortBy="sortCostDistributionBy"
            :total="costDistributionTotalCount"
            :current="curCostDistributionPage"
            :size="costDistributionOptions.limit"
            :prefix="'/cost-distribution/'"
            :update="acceptCostDistributionsChanges"
          ></active-table>
        </div>
        <notifications :response="costDistributionResponse" :error="costDistributionError"></notifications>
      </div>
    </div>
  </div>
</template>


<script>
  import { ActiveTable } from "@/components";
  import { Notifications } from "@/components";
  import { costDistribution } from "../mixins/costDistribution";
  import { main } from "./../mixins/main";
  import authGuard from "../guards/auth.guard";

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
      this.getCostDistribution();
    },

    mixins: [main,costDistribution]
  };
</script>

<style scoped>
  .costDistributionTable {
    margin-left: 8px;
  }
</style>