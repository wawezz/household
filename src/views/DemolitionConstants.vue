<template>
  <div class="demolitionConstants">
    <div v-if="demolitionConstantsLoading">Loading information. Please wait...</div>

    <div v-if="!demolitionConstantsLoading">
      <notifications :response="demolitionConstantsResponse" :error="demolitionConstantsError"></notifications>
      <div class="d-f-space">
        <div>
          Number of displaying pages:
          <select
            class="ml-2"
            @change="getDemolitionConstants"
            v-model="demolitionConstantsOptions.limit"
          >
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
            <option value="150">150</option>
          </select>
        </div>
        <div>
          Total:
          <b>{{demolitionConstantsTotalCount}}</b>
        </div>
      </div>
      <div class="table">
        <active-table
          :columns="demolitionConstantsColumns"
          :filters="demolitionConstantsFilterObject"
          :data="originDemolitionConstants"
          :updatebleData="demolitionConstants"
          :sort="demolitionConstantsSort"
          :filterFunction="filterDemolitionConstants"
          :sortBy="sortDemolitionConstantsBy"
          :total="demolitionConstantsTotalCount"
          :current="curDemolitionConstantsPage"
          :size="demolitionConstantsOptions.limit"
          :prefix="'/demolition-constants/'"
          :update="acceptDemolitionConstantsChanges"
        ></active-table>
      </div>
      <notifications :response="demolitionConstantsResponse" :error="demolitionConstantsError"></notifications>
    </div>
  </div>
</template>

<script>
  import { ActiveTable } from "@/components";
  import { Notifications } from "@/components";
  import { demolitionConstants } from "../mixins/demolitionConstants";
  import { main } from "./../mixins/main";
  import authGuard from "../guards/auth.guard";

  export default {
    name: "demolitionConstants",
    beforeRouteEnter: authGuard,
    data() {
      return {};
    },
    components: {
      ActiveTable,
      Notifications
    },

    mounted() {
      this.getDemolitionConstants();
    },

    mixins: [main, demolitionConstants]
  };
</script>

<style>
</style>
