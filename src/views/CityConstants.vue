<template>
  <div class="cityConstants">
    <div v-if="this.cityConstantsLoading">Loading information. Please wait...</div>

    <div v-if="!this.cityConstantsLoading">
      <notifications :response="cityConstantsResponse" :error="cityConstantsError"></notifications>
      <div class="d-f-space">
        <div>
          Number of displaying pages:
          <select
            class="cityConstantsTable"
            @change="getCityConstants"
            v-model="cityConstantsOptions.limit"
          >
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
            <option value="150">150</option>
          </select>
        </div>

        <div class="table">
          <active-table
            :columns="cityConstantsColumns"
            :filters="cityConstantsFilterObject"
            :data="originCityConstants"
            :updatebleData="cityConstants"
            :sort="cityConstantsSort"
            :filterFunction="filterCityConstants"
            :sortBy="sortCityConstantsBy"
            :total="cityConstantsTotalCount"
            :current="curCityConstantsPage"
            :size="cityConstantsOptions.limit"
            :prefix="'/city-constants/'"
            :update="acceptCityConstantsChanges"
          ></active-table>
        </div>
        <notifications :response="cityConstantsResponse" :error="cityConstantsError"></notifications>
      </div>
    </div>
  </div>
</template>

<script>
  import { ActiveTable } from "@/components";
  import { Notifications } from "@/components";
  import { cityConstants } from "../mixins/cityConstants";
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
      this.getCityConstants();
    },

    mixins: [main,cityConstants]
  };
</script>

<style scoped>
  .cityConstantsTable {
    margin-left: 8px;
  }
</style>