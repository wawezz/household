<template>
  <div class="costDistributions">
    <div v-if="this.costDistributionsLoading">Loading information. Please wait...</div>

    <div v-if="!this.costDistributionsLoading">
      <notifications :response="costDistributionsResponse" :error="costDistributionsError"></notifications>
      <div class="d-f-space">
        <div>
          Number of displaying pages:
          <select
            class="costDistributionsTable"
            @change="getCostDistributions"
            v-model="costDistributionsOptions.limit"
          >
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
            <option value="150">150</option>
          </select>
        </div>

        <div class="table">
          <active-table
            :columns="costDistributionsColumns"
            :filters="costDistributionsFilterObject"
            :data="originCostDistributions"
            :updatebleData="costDistributions"
            :sort="costDistributionsort"
            :filterFunction="filterCostDistributions"
            :sortBy="sortCostDistributionsBy"
            :total="costDistributionsTotalCount"
            :current="curCostDistributionsPage"
            :size="costDistributionsOptions.limit"
            :prefix="'/cost-distributions/'"
            :update="acceptCostDistributionsChanges"
          ></active-table>
        </div>
        <notifications :response="costDistributionsResponse" :error="costDistributionsError"></notifications>
      </div>
    </div>
  </div>
</template>


<script>
  import { ActiveTable } from "@/components";
  import { Notifications } from "@/components";
  import { costDistributions } from "../mixins/costDistributions";
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
      this.getCostDistributions();
    },

    mixins: [main, costDistributions]
  };
</script>

<style scoped>
  .costDistributionsTable {
    margin-left: 8px;
  }
</style>