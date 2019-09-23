<template>
  <div class="unitCosts">
    <div v-if="this.unitCostsLoading">Loading information. Please wait...</div>

    <div v-if="!this.unitCostsLoading">
      <notifications :response="unitCostsResponse" :error="unitCostsError"></notifications>
      <div class="d-f-space">
        <div>
          Number of displaying pages:
          <select
            class="ml-2"
            @change="getUnitCosts"
            v-model="unitCostsOptions.limit"
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
          :columns="unitCostsColumns"
          :filters="unitCostsFilterObject"
          :data="originUnitCosts"
          :updatebleData="unitCosts"
          :sort="unitCostsSort"
          :filterFunction="filterUnitCosts"
          :sortBy="sortUnitCostsBy"
          :total="unitCostsTotalCount"
          :current="curUnitCostsPage"
          :size="unitCostsOptions.limit"
          :prefix="'/unit-costs/'"
          :update="acceptUnitCostsChanges"
        ></active-table>
      </div>
      <notifications :response="unitCostsResponse" :error="unitCostsError"></notifications>
    </div>
  </div>
</template>

<script>
  import { ActiveTable } from "@/components";
  import { Notifications } from "@/components";
  import { unitCosts } from "../mixins/unitCosts";
  import { main } from "./../mixins/main";
  import authGuard from "../guards/auth.guard";

  export default {
    name: "unitCosts",
    beforeRouteEnter: authGuard,
    data() {
      return {};
    },
    components: {
      ActiveTable,
      Notifications
    },

    mounted() {
      this.getUnitCosts();
    },

    mixins: [main, unitCosts]
  };
</script>

<style>
</style>