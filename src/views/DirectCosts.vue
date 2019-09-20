<template>
  <div class="direct-costs">
    <div class="table">
      <table class="full-table">
        <thead>
          <tr>
            <th>
              <span>Group ID</span>
            </th>
            <th>
              <span>Item Name</span>
            </th>
            <th>
              <span>Material Constant</span>
            </th>
            <th>
              <span>Labour Constant</span>
            </th>
            <th>
              <span>Equip Constant</span>
            </th>
            <th>
              <span>Total Constant</span>
            </th>
            <th>
              <span>Sort Order</span>
            </th>
            <th>
              <span>Quality Class</span>
            </th>
            <th>
              <span>Masonry</span>
            </th>
            <th>
              <span>Modified By</span>
            </th>
            <th>
              <span>Modified Date</span>
            </th>
          </tr>
        </thead>
        <tbody v-for="(item,index) in directCostsMock" :key="item.id">
          <tr>
            <th>
              <span>{{item.GroupId}}</span>
            </th>
            <th>
              <span>{{item.ItemName}}</span>
            </th>
            <th>
              <span>{{item.MaterialConstant}}</span>
            </th>
            <th>
              <span>{{item.LabourConstant}}</span>
            </th>
            <th>
              <span>{{item.EquipConstant}}</span>
            </th>
            <th>
              <span>{{item.TotalConstant}}</span>
            </th>
            <th>
              <span>{{item.SortOrder}}</span>
            </th>
            <th>
              <span>{{item.QualityClass}}</span>
            </th>
            <th>
              <span>
                <input v-if="item.Masonry" type="checkbox" checked />
                <input v-if="!item.Masonry" type="checkbox" />
              </span>
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
    <div v-if="directCostsResponse.message" class="alert alert-success" role="alert">
      <div class="alert-text">{{directCostsResponse.message}}}</div>
    </div>

    <div v-if="directCostsError.message" class="alert alert-danger" role="alert">
      <div class="alert-text">{{directCostsError.message}}</div>
    </div>
  </div>
</template>

<script>
  import { directCosts } from "../mixins/directCosts";

  export default {
    data() {
      return {
        directCostsMock: [
          {
            GroupId: "12",
            ItemName: "",
            MaterialConstant: 10.2,
            LabourConstant: 10.3,
            EquipConstant: 10.4,
            TotalConstant: 10.5,
            SortOrder: 2,
            QualityClass: 0,
            Masonry: 0,
            ModifiedBy: "ivan",
            ModifiedDate: "today"
          },
          {
            GroupId: "123",
            ItemName: "qwer",
            MaterialConstant: 10.2,
            LabourConstant: 10.3,
            EquipConstant: 10.4,
            TotalConstant: 10.5,
            SortOrder: 2,
            QualityClass: 0,
            Masonry: 1,
            ModifiedBy: "ivan",
            ModifiedDate: "today"
          }
        ]
      };
    },
    mixins: [directCosts]
  };
</script>

<style scoped>
</style>