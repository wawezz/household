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
        >Add new
        </base-button>
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
      <div>
        <h2 class="direct-cost-h2">Add direct cost</h2>
        <hr>
      </div>
      <div>
        <div>
          <table>
            <tr>
              <th>
                <div class="direct-head-field">
                  <span class="direct-head">Item id</span>
                  <input
                    class="form-control direct-head-input"
                    type="text"
                    placeholder="Item id"
                    v-model="modalDirectCosts.id"
                  />
                </div>
              </th>
              <th>
                <div class="direct-head-field">
                  <span class="direct-head">Group id</span>
                  <input
                    class="form-control direct-head-input"
                    type="text"
                    placeholder="Group id"
                    v-model="modalDirectCosts.groupId"
                  />
                </div>
              </th>
              <th>
                <div class="direct-head-field">
                  <span class="direct-head">Item name</span>
                  <input
                    class="form-control direct-head-input"
                    type="text"
                    placeholder="Item name"
                    v-model="modalDirectCosts.itemName"
                  />
                </div>
              </th>
            </tr>
            <tr>
              <th>
                <div class="direct-head-field">
                  <span class="direct-head">Material constant</span>
                  <input
                    class="form-control direct-head-input"
                    type="text"
                    placeholder="Material constant"
                    v-model="modalDirectCosts.materialConstant"
                  />
                </div>
              </th>
              <th>
                <div class="direct-head-field">
                  <span class="direct-head">Labour constant</span>
                  <input
                    class="form-control direct-head-input"
                    type="text"
                    placeholder="Labour constant"
                    v-model="modalDirectCosts.labourConstant"
                  />
                </div>
              </th>
              <th>
                <div class="direct-head-field">
                  <span class="direct-head">Eqiup constant</span>
                  <input
                    class="form-control direct-head-input"
                    type="text"
                    placeholder="Equip constant"
                    v-model="modalDirectCosts.equipConstant"
                  />
                </div>
              </th>
            </tr>
            <tr>
              <th>
                <div class="direct-head-field">
                  <span class="direct-head">Total constant</span>
                  <input
                    class="form-control direct-head-input"
                    type="text"
                    placeholder="Total constant"
                    v-model="modalDirectCosts.totalConstant"
                  />
                </div>
              </th>
              <th>
                <div class="direct-head-field">
                  <span class="direct-head">Sort order</span>
                  <input
                    class="form-control direct-head-input"
                    type="text"
                    placeholder="Sort order"
                    v-model="modalDirectCosts.sortOrder"
                  />
                </div>
              </th>
              <th>
                <div class="direct-head-field">
                  <span class="direct-head">Quality class</span>
                  <input
                    class="form-control direct-head-input"
                    type="text"
                    placeholder="Quality class"
                    v-model="modalDirectCosts.qualityClass"
                  />
                </div>
              </th>
            </tr>
            <tr>
              <th>
                <div class="direct-head-field">
                  <input
                    class="direct-head-checkbox"
                    type="checkbox"
                    v-model="modalDirectCosts.masonry"
                  />
                  <span class="direct-head">Masonry</span>
                </div>
              </th>
              <th>
                <div class="direct-head-field">
                  <span class="direct-head">Modified by</span>
                  <input
                    class="form-control direct-head-input"
                    type="text"
                    placeholder="Modified by"
                    v-model="modalDirectCosts.modifiedBy"
                  />
                </div>
              </th>
              <th>
                <div class="direct-head-field">
                  <span class="direct-head">Modified Date</span>
                  <input
                    class="form-control direct-head-input"
                    type="text"
                    placeholder="Modified date"
                    v-model="modalDirectCosts.modifiedDate"
                  />
                </div>
              </th>
            </tr>
          </table>
        </div>

        <div class="kt-login__actions">
          <button
            class="kt-spinner
            kt-spinner--right
             kt-spinner--md
             btn btn-primary
             btn-elevate
             kt-login__btn-primary
             direct-cost-btn"
             id="kt_login_signin_submit"
             @click = "addDirectCosts"
          >Add
          </button>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
  import {ActiveTable} from "@/components";
  import {Notifications} from "@/components";
  import {Modal} from "@/components";
  import {directCosts} from "../mixins/directCosts";
  import {main} from "./../mixins/main";
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
  .direct-head {
    margin-left: 10px;
  }
  .direct-head-field {
    margin: 5px;
  }
  .direct-head-checkbox {
    margin-left: 15px;
  }
  .direct-cost-btn {
    margin-left: 15px;
  }
  .direct-cost-h2 {
    padding-left: 20px;
  }
</style>