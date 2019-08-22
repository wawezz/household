<template>
  <div class="houses">
    <div class="table">
      <table>
        <thead>
          <tr>
            <th>House</th>
            <th>Type of House</th>
            <th>Number of corners</th>
            <th>Quality Group</th>
            <th>Area Group</th>
            <th>Cost PenSquareFoot</th>
            <th>Modified by</th>
            <th>Modified Date</th>
          </tr>
        </thead>
        <tbody v-for="item in houses" :key="item.number">
          <tr>
            <td>
              <span>{{item.number}}</span>
            </td>
            <td>
              <span>{{item.typeofHouse}}</span>
            </td>
            <td>
              <span>{{item.numberOfCorners}}</span>
            </td>
            <td>
              <span>{{item.qualityGroup}}</span>
            </td>
            <td>
              <span>{{item.areaGroup}}</span>
            </td>
            <td>
              <span>{{item.costPerSquareFoot}}</span>
            </td>
            <td>
              <span>{{item.modifiedBy}}</span>
            </td>
            <td>
              <span>{{item.modifiedDate}}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div>
      <pagination
        v-if="housesTotalCount"
        :total="housesTotalCount"
        :current="curPage"
        :size="housesOptions.limit"
        :prefix="'/houses/'"
      />
    </div>
  </div>
</template>

<script>
  import { Pagination } from "@/components";
  import { main } from "./../mixins/main";
  import { houses } from "./../mixins/houses";
  import authGuard from "./../guards/auth.guard";

  export default {
    beforeRouteEnter: authGuard,
    data() {
      return {};
    },
    components: {
      Pagination
    },
    created() {
      this.getHouses();
    },
    mounted() {
      this.$store.dispatch('getHousesInfo')
    },
    mixins: [main, houses]
  };
</script>

<style scoped>
</style>