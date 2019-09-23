<template>
  <div class="table">
    <table class="full-table">
      <thead>
        <tr>
          <th v-for="(column, i) in columns" :key="i">
            <span
              v-if="sort[column.field || column.name]"
            >#{{Object.keys(sort).indexOf(column.field || column.name)}}</span>
            <font-awesome-icon
              v-if="(column.field || column.name) && !column.disableSort"
              :icon="`sort${sort[column.field || column.name]?sort[column.field || column.name] === 'DESC'?'-down':'-up':''}`"
              @click="sortBy(column.field || column.name)"
              class="mr-2 pointer"
            ></font-awesome-icon>
            {{column.name}}
            <span v-if="(column.field || column.name) in filters">
              <select
                v-if="filters[(column.field || column.name)].type === 'select'"
                v-model="filters[(column.field || column.name)].value"
                class="ml-2 activeFilterSelect"
                @change="filterFunction"
              >
                <option selected value></option>
                <option
                  v-for="i in range(filters[(column.field || column.name)].options.min, filters[(column.field || column.name)].options.max, filters[(column.field || column.name)].options.step)"
                  :key="i"
                >{{i}}</option>
              </select>
            </span>
          </th>
        </tr>
      </thead>
      <tbody v-for="(item, n) in data" :key="item.id">
        <tr class="advance-table-row">
          <td v-for="(column, i) in columns" :key="i">
            <div v-if="column.updateble">
              <span v-if="column.type === 'text' || column.type === 'number'">
                <input :type="column.type" v-model="updatebleData[n][column.field || column.name]" />
              </span>
              <select
                v-if="column.type === 'select'"
                v-model="updatebleData[n][column.field || column.name]"
                class="ml-2 activeFilterSelect"
              >
                <option
                  v-for="i in range(column.options.min, column.options.max, column.options.step)"
                  :key="i"
                >{{i}}</option>
              </select>
              <input
                v-if="column.type === 'checkbox'"
                type="checkbox"
                :name="(column.field || column.name)"
                v-model="updatebleData[n][column.field || column.name]"
                :checked="updatebleData[n][column.field || column.name]"
              />
            </div>
            <div v-if="!column.updateble">
              <router-link
                v-if="column.type === 'link'"
                :target="column.target||'_self'"
                :to="{ path: column.prefix + item.id + (column.query != null?column.query:'')}"
              >{{item[column.field||column.name]}}</router-link>
              <a
                v-if="column.type === 'email'"
                :href="'mail-to:' + item[column.field||column.name]"
              >{{item[column.field||column.name]}}</a>
              <span v-if="column.type === 'date'">{{item[column.field||column.name].date | date}}</span>
              <span
                v-if="column.type === 'select' || column.type === 'text' || column.type === 'number' || !column.type"
              >{{item[column.field||column.name] || item[column.field||column.name] != 'null'?item[column.field||column.name]:(column.default || 'null')}}</span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <pagination v-if="total" :total="total" :current="current" :size="size" :prefix="prefix" />
    <base-button :type="'primary'" @click="update()">Accept changes</base-button>
  </div>
</template>
<script>
  import Pagination from "./Pagination";

  export default {
    name: "active-table",
    components: {
      Pagination
    },
    props: {
      columns: {
        type: Array,
        default: () => [],
        description: "Table columns"
      },
      filters: {
        type: Object,
        default: () => [],
        description: "Table filters"
      },
      data: {
        type: [Array, Object],
        default: () => [],
        description: "Table data"
      },
      sort: {
        type: [String, Object]
      },
      updatebleData: {
        type: [Array, Object],
        default: () => []
      },
      sortBy: {
        type: Function
      },
      filterFunction: {
        type: Function
      },
      update: {
        type: Function
      },
      total: {
        type: Number,
        default: 0
      },
      size: {
        type: [Number, String],
        default: 1
      },
      current: {
        type: Number,
        default: 1
      },
      prefix: {
        type: String,
        default: "/"
      }
    },
    methods: {
      range: (start, end, step) => {
        const len = Math.floor((end - start) / step) + 1;
        return Array(len)
          .fill()
          .map((_, idx) => start + idx * step);
      }
    }
  };
</script>
<style>
</style>
