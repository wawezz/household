<template>
  <div>
    <div class="demolition-constants">
      <div class="table">
        <table class="full-table">
          <thead>
            <tr>
              <th>
                <span>ID</span>
              </th>
              <th>
                <span>Item Name</span>
              </th>
              <th>
                <span>Cost Per Square Foot</span>
              </th>
              <th>
                <span>Modified By</span>
              </th>
              <th>
                <span>Modified Date</span>
              </th>
            </tr>
          </thead>
          <tbody v-for="(item,index) in demolitionConstantsMock" :key="item.id">
            <tr>
              <th>
                <span>{{item.id}}</span>
              </th>
              <th>
                <span>{{item.ItemName}}</span>
              </th>
              <th>
                <span>{{item.CostPerSquareFoot}}</span>
              </th>
              <th>
                <span>{{item.ModifiedBy}}</span>
              </th>
              <th>
                <span>{{item.ModifiedDate}}</span>
              </th>
            </tr>
          </tbody>
        </table>
      </div>

      <div>
        <base-button :type="'primary'" @click="acceptChanges()">Accept changes</base-button>
      </div>
      <br />
      <div v-if="demolitionConstantsResponse.message" class="alert alert-success" role="alert">
        <div class="alert-text">{{demolitionConstantsResponse.message}}}</div>
      </div>

      <div v-if="demolitionConstantsError.message" class="alert alert-danger" role="alert">
        <div class="alert-text">{{demolitionConstantsError.message}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import { demolitionConstants } from "../mixins/demolitionConstants";

  export default {
    name: "demolitionConstants",
    data() {
      return {
        demolitionConstantsMock: [
          {
            id: 123,
            ItemName: "qwer",
            CostPerSquareFoot: 1233.222,
            ModifiedBy: "qwwer",
            ModifiedDate: "qwer"
          },
          {
            id: 113,
            ItemName: "qwer",
            CostPerSquareFoot: 1233.222,
            ModifiedBy: "qwwer",
            ModifiedDate: "qwer"
          },
          {
            id: 153,
            ItemName: "qwer",
            CostPerSquareFoot: 1233.222,
            ModifiedBy: "qwwer",
            ModifiedDate: "qwer"
          }
        ]
      };
    },
    mixins: [demolitionConstants]
  };
</script>

<style scoped>
</style>
