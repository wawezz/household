<template>
  <div>
    <div class="unit-costs">
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
               Material Constant
             </span>
            </th>
            <th>
             <span>
               Labour Constant
             </span>
            </th>
            <th>
             <span>
               Equip Constant
             </span>
            </th>
            <th>
             <span>
               Total Constant
             </span>
            </th>
            <th>
             <span>
               IncludeInSubtotal
             </span>
            </th>
            <th>
             <span>
               Is Enabled
             </span>
            </th>
            <th>
             <span>
               Sort Order
             </span>
            </th>
            <th>
             <span>
               Quality Class
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
          <tbody v-for="(item,index) in this.IndirectCostConstants" :key="item.id">
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
               {{item.MaterialConstant}}
             </span>
            </th>
            <th>
             <span>
               {{item.LabourConstant}}
             </span>
            </th>
            <th>
             <span>
               {{item.EquipConstant}}
             </span>
            </th>
            <th>
             <span>
               {{item.TotalConstant}}
             </span>
            </th>
            <th>
             <span>
               {{item.IncludeInSubtotal}}
             </span>
            </th>
            <th>
             <span>
               {{item.IsEnabled}}
             </span>
            </th>
            <th>
             <span>
               {{item.SortOrder}}
             </span>
            </th>
            <th>
             <span>
               {{item.QualityClass}}
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
  </div>
</template>

<script>
  export default {
    name: "IndirectCosts",
    data() {
      return {
        IndirectCostConstants: [
          {
            id: 121,
            ItemName: 'qwer',
            MaterialConstant: 123.122,
            LabourConstant: 123.344,
            EquipConstant: 1233.222,
            TotalConstant: 1222.444,
            IncludeInSubtotal: 0,
            IsEnabled: 0,
            SortOrder: 0,
            QualityClass: 5,
            ModifiedBy: 'qwe',
            ModifiedDate: 'qwe'
          },
          {
            id: 123,
            ItemName: 'qwer',
            MaterialConstant: 123.122,
            LabourConstant: 123.344,
            EquipConstant: 1233.222,
            TotalConstant: 1222.444,
            IncludeInSubtotal: 0,
            IsEnabled: 1,
            SortOrder: 0,
            QualityClass: 5,
            ModifiedBy: 'qwe',
            ModifiedDate: 'qwe'
          },
          {
            id: 122,
            ItemName: 'qwer',
            MaterialConstant: 123.122,
            LabourConstant: 123.344,
            EquipConstant: 1233.222,
            TotalConstant: 1222.444,
            IncludeInSubtotal: 1,
            IsEnabled: 0,
            SortOrder: 1,
            QualityClass: 5,
            ModifiedBy: 'qwe',
            ModifiedDate: 'qwe'
          },
        ]
      }
    }
  }
</script>

<style scoped>

</style>
