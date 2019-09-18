<template>
  <div class="cost-distribution">
    <div class="table">
      <table class="full-table">
        <thead>
        <tr>
          <th>
             <span>
               ID
             </span>
          </th>
          <th>
             <span>
               Item Name
             </span>
          </th>
          <th>
             <span>
               LineItemId
             </span>
          </th>
          <th>
             <span>
               MaterialDistribution
             </span>
          </th>
          <th>
             <span>
               LaborDistribution
             </span>
          </th>
          <th>
             <span>
               EquipmentDistribution
             </span>
          </th>
          <th>
             <span>
               Modified By
             </span>
          </th>
          <th>
             <span>
               Modified Date
             </span>
          </th>
        </tr>
        </thead>
        <tbody v-for="(item,index) in this.costdistributions" :key="item.id">
        <tr>
          <th>
             <span>
               {{item.id}}
             </span>
          </th>
          <th>
             <span>
               {{item.ItemName}}
             </span>
          </th>
          <th>
             <span>
               {{item.LineItemId}}
             </span>
          </th>
          <th>
             <span>
               {{item.MaterialDistribution}}
             </span>
          </th>
          <th>
             <span>
               {{item.LaborDistribution}}
             </span>
          </th>
          <th>
             <span>
               {{item.EquipmentDistribution}}
             </span>
          </th>
          <th>
             <span>
               {{item.ModifiedBy}}
             </span>
          </th>
          <th>
             <span>
               {{item.ModifiedDate}}
             </span>
          </th>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>


<script>
  export default {
    name: "CostDistribution",
    data() {
      return {
        costdistributions:
          [
            {
              id: 123,
              ItemName: '123',
              LineItemId: '123',
              MaterialDistribution: 10254.1254,
              LaborDistribution: 125.1254,
              EquipmentDistribution: 125.4588,
              ModifiedBy: 'ivan',
              ModifiedDate: 'today'
            },
            {
              id: 121,
              ItemName: '123',
              LineItemId: '123',
              MaterialDistribution: 10254.1254,
              LaborDistribution: 125.1254,
              EquipmentDistribution: 125.4588,
              ModifiedBy: 'ivan',
              ModifiedDate: 'today'
            },
            {
              id: 122,
              ItemName: '123',
              LineItemId: '123',
              MaterialDistribution: 10254.1254,
              LaborDistribution: 125.1254,
              EquipmentDistribution: 125.4588,
              ModifiedBy: 'ivan',
              ModifiedDate: 'today'
            }
          ]
      }
    }
  }

</script>

<style scoped>

</style>