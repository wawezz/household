<template>
  <div class="cost-distribution">
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
              <span>LineItemId</span>
            </th>
            <th>
              <span>MaterialDistribution</span>
            </th>
            <th>
              <span>LaborDistribution</span>
            </th>
            <th>
              <span>EquipmentDistribution</span>
            </th>
            <th>
              <span>Modified By</span>
            </th>
            <th>
              <span>Modified Date</span>
            </th>
          </tr>
        </thead>
        <tbody v-for="(item,index) in costDistributionsMock" :key="item.id">
          <tr>
            <th>
              <span>{{item.id}}</span>
            </th>
            <th>
              <span>{{item.ItemName}}</span>
            </th>
            <th>
              <span>{{item.LineItemId}}</span>
            </th>
            <th>
              <span>{{item.MaterialDistribution}}</span>
            </th>
            <th>
              <span>{{item.LaborDistribution}}</span>
            </th>
            <th>
              <span>{{item.EquipmentDistribution}}</span>
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
    <div v-if="costDistributionResponse.message" class="alert alert-success" role="alert">
      <div class="alert-text">{{costDistributionResponse.message}}}</div>
    </div>

    <div v-if="costDistributionError.message" class="alert alert-danger" role="alert">
      <div class="alert-text">{{costDistributionError.message}}</div>
    </div>
  </div>
</template>


<script>
  import { costDistribution } from "../mixins/costDistribution";

  export default {
    name: "costDistribution",
    data() {
      return {
        costDistributionsMock: [
          {
            id: 123,
            ItemName: "123",
            LineItemId: "123",
            MaterialDistribution: 10254.1254,
            LaborDistribution: 125.1254,
            EquipmentDistribution: 125.4588,
            ModifiedBy: "ivan",
            ModifiedDate: "today"
          },
          {
            id: 121,
            ItemName: "123",
            LineItemId: "123",
            MaterialDistribution: 10254.1254,
            LaborDistribution: 125.1254,
            EquipmentDistribution: 125.4588,
            ModifiedBy: "ivan",
            ModifiedDate: "today"
          },
          {
            id: 122,
            ItemName: "123",
            LineItemId: "123",
            MaterialDistribution: 10254.1254,
            LaborDistribution: 125.1254,
            EquipmentDistribution: 125.4588,
            ModifiedBy: "ivan",
            ModifiedDate: "today"
          }
        ]
      };
    },
    mixins: [costDistribution]
  };
</script>

<style scoped>
</style>