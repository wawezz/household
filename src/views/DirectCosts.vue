<template>
  <div class="directCosts">
    <div v-if="directCostsLoading">Loading information. Please wait...</div>

    <div v-if="!directCostsLoading">
      <notifications :response="directCostsResponse" :error="directCostsError"></notifications>
      <div class="d-f-space">
        <div>
          Number of displaying pages:
          <select
            class="ml-2"
            @change="getDirectCosts"
            v-model="directCostsOptions.limit"
          >
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
            <option value="150">150</option>
          </select>
        </div>
        <div>
          Total:
          <b>{{directCostsTotalCount}}</b>
        </div>
        <base-button
          href="#"
          data-toggle="modal"
          data-target="#addDirectCost"
          @click.prevent="directCostAddModalVisible = true"
          :type="'primary'"
        >Add new</base-button>
      </div>
      <div class="table">
        <active-table
          :columns="directCostsColumns"
          :filters="directCostsFilterObject"
          :data="originDirectCosts"
          :updatebleData="directCosts"
          :sort="directCostsSort"
          :filterFunction="filterDirectCosts"
          :sortBy="sortDirectCostsBy"
          :total="directCostsTotalCount"
          :current="curDirectCostsPage"
          :size="directCostsOptions.limit"
          :prefix="'/direct-costs/'"
          :update="acceptDirectCostsChanges"
        ></active-table>
      </div>
      <notifications :response="directCostsResponse" :error="directCostsError"></notifications>
    </div>
    <modal
      modalClasses="modal-lg"
      :show.sync="directCostAddModalVisible"
      id="addDirectCost"
      :centered="false"
      :show-close="true"
    >test</modal>
  </div>
</template>

<script>
  import { ActiveTable } from "@/components";
  import { Notifications } from "@/components";
  import { Modal } from "@/components";
  import { directCosts } from "../mixins/directCosts";
  import { main } from "./../mixins/main";
  import authGuard from "../guards/auth.guard";

  export default {
    name: "directCosts",
    beforeRouteEnter: authGuard,
    data() {
      return {
        directCostAddModalVisible: false
      };
    },
    components: {
      ActiveTable,
      Notifications,
      Modal
    },

    mounted() {
      this.getDirectCosts();
    },

    mixins: [main, directCosts]
  };
</script>

<style>
</style>