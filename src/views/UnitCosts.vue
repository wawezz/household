<template>
 <div class="unit-costs">
   <div class="table">
     <table class="full-table">
       <thead>
         <tr>
           <th>
             <span>
               HomeType
             </span>
           </th>
           <th>
             <span>
               Item Name
             </span>
           </th>
           <th>
             <span>
               GeneralCostPerUnit
             </span>
           </th>
           <th>
             <span>
               MaterialCostPerUnit
             </span>
           </th>
           <th>
             <span>
               LaborCostPerUnit
             </span>
           </th>
           <th>
             <span>
               EquipmentCostPerUnit
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
       <tbody v-for="(item,index) in this.unitcosts" :key="item.id">
         <tr>
           <th>
             <span>
               {{item.HomeType}}
             </span>
           </th>
           <th>
             <span>
               {{item.ItemName}}
             </span>
           </th>
           <th>
             <span>
               {{item.GeneralCostPerUnit}}
             </span>
           </th>
           <th>
             <span>
               {{item.MaterialCostPerUnit}}
             </span>
           </th>
           <th>
             <span>
               {{item.LaborCostPerUnit}}
             </span>
           </th>
           <th>
             <span>
               {{item.EquipmentCostPerUnit}}
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
   <div>
     <base-button :type="'primary'" @click="acceptChanges()">Accept changes</base-button>
   </div>
   <br />
   <div v-if="unitcostsResponse.message" class="alert alert-success" role="alert">
     <div class="alert-text">{{unitcostsResponse.message}}}</div>
   </div>

   <div v-if="unitcostsError.message" class="alert alert-danger" role="alert">
     <div class="alert-text">{{unitcostsError.message}}</div>
   </div>
 </div>
</template>

<script>
    import {unitcosts} from '../mixins/unitcosts';

    export default {
        name: "UnitCosts",
        data() {
            return {
                unitcosts: [
                    {
                    HomeType: 0,
                    ItemName: '123',
                    GeneralCostPerUnit: 123.2568,
                    MaterialCostPerUnit: 1254.1254,
                    LaborCostPerUnit: 125.1254,
                    EquipmentCostPerUnit: 125.4588,
                    ModifiedBy: 'ivan',
                    ModifiedDate: 'today'
                },
                    {
                        HomeType: 1,
                        ItemName: '123',
                        GeneralCostPerUnit: 123.2568,
                        MaterialCostPerUnit: 1254.1254,
                        LaborCostPerUnit: 125.1254,
                        EquipmentCostPerUnit: 125.4588,
                        ModifiedBy: 'ivan',
                        ModifiedDate: 'today'
                    },
                    {
                        HomeType: 0,
                        ItemName: '123',
                        GeneralCostPerUnit: 123.2568,
                        MaterialCostPerUnit: 1254.1254,
                        LaborCostPerUnit: 125.1254,
                        EquipmentCostPerUnit: 125.4588,
                        ModifiedBy: 'ivan',
                        ModifiedDate: 'today'
                    }
                ]
            }
        },
        mixins: [unitcosts]
    }
</script>

<style scoped>

</style>