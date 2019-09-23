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
    >
      <h2 class="modalHeader">Add direct cost</h2>
      <div class="row mt-3">
        <div class="col-4">
          <div class="mb-1">
            <b>Item id</b>
          </div>

          <input
            class="form-control direct-head-input"
            type="number"
            placeholder="Item id"
            v-model="directCost.ItemID"
          />
        </div>
        <div class="col-4">
          <div class="mb-1">
            <b>Item name</b>
          </div>

          <input
            class="form-control direct-head-input"
            type="text"
            placeholder="Item name"
            v-model="directCost.ItemName"
          />
        </div>
        <div class="col-4">
          <div class="mb-1">
            <b>Group id</b>
          </div>

          <input
            class="form-control direct-head-input"
            type="text"
            placeholder="Group id"
            v-model="directCost.GroupID"
          />
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-4">
          <div class="mb-1">
            <b>Material constant</b>
          </div>

          <input
            class="form-control direct-head-input"
            type="number"
            placeholder="Material constant"
            v-model="directCost.MaterialConstant"
          />
        </div>
        <div class="col-4">
          <div class="mb-1">
            <b>Labour constant</b>
          </div>

          <input
            class="form-control direct-head-input"
            type="number"
            placeholder="Labour constant"
            v-model="directCost.LabourConstant"
          />
        </div>
        <div class="col-4">
          <div class="mb-1">
            <b>Eqiup constant</b>
          </div>

          <input
            class="form-control direct-head-input"
            type="number"
            placeholder="Equip constant"
            v-model="directCost.EquipConstant"
          />
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-3">
          <div class="mb-1">
            <b>Total constant</b>
          </div>

          <input
            class="form-control direct-head-input"
            type="number"
            placeholder="Total constant"
            v-model="directCost.TotalConstant"
          />
        </div>
        <div class="col-3">
          <div class="mb-1">
            <b>Sort order</b>
          </div>

          <input
            class="form-control direct-head-input"
            type="number"
            placeholder="Sort order"
            v-model="directCost.SortOrder"
          />
        </div>
        <div class="col-3">
          <div class="mb-1">
            <b>Quality class</b>
          </div>
          <input
            class="form-control direct-head-input"
            type="number"
            placeholder="Quality class"
            v-model="directCost.QualityClass"
          />
        </div>
        <div class="col-3">
          <div class="mb-1">
            <b>Masonry</b>
          </div>
          <input type="checkbox" class="mt-3" v-model="directCost.Masonry" />
        </div>
      </div>
      <div class="row mt-5">
        <div class="col-12">
          <base-button @click.prevent="addDirectCosts" :type="'primary'">Add</base-button>
        </div>
      </div>
    </modal>
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