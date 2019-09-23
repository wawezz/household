<template>
  <div class="indirectCosts">
    <div v-if="this.indirectCostsLoading">Loading information. Please wait...</div>

    <div v-if="!this.indirectCostsLoading">
      <notifications :response="indirectCostsResponse" :error="indirectCostsError"></notifications>
      <div class="d-f-space">
        <div>
          Number of displaying pages:
          <select
            class="ml-2"
            @change="getIndirectCosts"
            v-model="indirectCostsOptions.limit"
          >
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
            <option value="150">150</option>
          </select>
        </div>
      </div>
      <div class="table">
        <active-table
          :columns="indirectCostsColumns"
          :filters="indirectCostsFilterObject"
          :data="originIndirectCosts"
          :updatebleData="indirectCosts"
          :sort="indirectCostsSort"
          :filterFunction="filterIndirectCosts"
          :sortBy="sortIndirectCostsBy"
          :total="indirectCostsTotalCount"
          :current="curIndirectCostsPage"
          :size="indirectCostsOptions.limit"
          :prefix="'/indirect-costs/'"
          :update="acceptIndirectCostsChanges"
        ></active-table>
      </div>
      <notifications :response="indirectCostsResponse" :error="indirectCostsError"></notifications>
    </div>
  </div>
</template>

<script>
  import { ActiveTable } from "@/components";
  import { Notifications } from "@/components";
  import { indirectCosts } from "../mixins/indirectCosts";
  import { main } from "./../mixins/main";
  import authGuard from "../guards/auth.guard";

  export default {
    name: "indirectCosts",
    beforeRouteEnter: authGuard,
    data() {
      return {};
    },
    components: {
      ActiveTable,
      Notifications
    },

    mounted() {
      this.getIndirectCosts();
    },

    mixins: [main, indirectCosts]
  };
</script>

<style>
</style>
