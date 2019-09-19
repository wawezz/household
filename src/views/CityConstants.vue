<template>
  <div>
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
               City
             </span>
          </th>
          <th>
             <span>
               MaterialConstant
             </span>
          </th>
          <th>
             <span>
               LabourConstant
             </span>
          </th>
          <th>
             <span>
               EquipConstant
             </span>
          </th>
          <th>
             <span>
               StateId
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
        <tbody v-for="(item,index) in this.SingleFamilyHomeCityConstants" :key="item.id">
        <tr>
          <th>
             <span>
               {{item.id}}
             </span>
          </th>
          <th>
             <span>
               {{item.City}}
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
               {{item.StateId}}
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
    <div v-if="cityconstantsResponse.message" class="alert alert-success" role="alert">
      <div class="alert-text">{{cityconstantsResponse.message}}}</div>
    </div>

    <div v-if="cityconstantsError.message" class="alert alert-danger" role="alert">
      <div class="alert-text">{{cityconstantsError.message}}</div>
    </div>
  </div>
</template>

<script>
  import {cityconstants} from "../mixins/cityconstants";

  export default {
    name: "CityConstants",
    data() {
      return {
        SingleFamilyHomeCityConstants:
          [
            {
              id: 123,
              City: 'qwer',
              MaterialConstant: 123.256,
              LabourConstant: 1254.3564,
              EquipConstant: 125.321,
              StateId: 'erty',
              ModifiedBy: 'author',
              ModifiedDate: 'today'
            },
            {
              id: 124,
              City: 'qwer',
              MaterialConstant: 123.256,
              LabourConstant: 1254.3564,
              EquipConstant: 125.321,
              StateId: 'erty',
              ModifiedBy: 'author',
              ModifiedDate: 'today'
            },
            {
              id: 121,
              City: 'qwer',
              MaterialConstant: 123.256,
              LabourConstant: 1254.3564,
              EquipConstant: 125.321,
              StateId: 'erty',
              ModifiedBy: 'author',
              ModifiedDate: 'today'
            }
          ]
      }
    },
    mixins: [cityconstants]

  }
</script>

<style scoped>

</style>