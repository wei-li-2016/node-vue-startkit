<template>
  <b-container fluid>
    <h3>Motherboards</h3>
    <hr />

    <div class="buttons-options">
      <b-form-group class="group-search">
        <b-input-group size="sm">
          <b-form-input
            v-model="filter"
            type="search"
            id="filterInput"
            placeholder="Type to Search"
          ></b-form-input>
          <b-input-group-append>
            <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
          </b-input-group-append>
        </b-input-group>
      </b-form-group>

      <b-form-group class="group-search group-search-button">
        <router-link :to="{ name: 'motherboardsForm' }">
          <b-button class="group-search-button btn-sm" variant="secondary">
            <i class="fa fa-plus"></i>
          </b-button>
        </router-link>
      </b-form-group>
    </div>

    <b-table
      show-empty
      small
      bordered
      hover
      stacked="md"
      class="table-white"
      :items="motherboards"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      :filter="filter"
      :filterIncludedFields="filterOn"
      @filtered="onFiltered"
    >
      <template v-slot:cell(id)="data">
        <router-link
          :to="{ name: 'motherboardsFormId', params: { id: data.value } }"
          >{{ data.value }}</router-link
        >
      </template>
      <template v-slot:table-caption
        >Total de itens cadastrados: {{ totalRows }}</template
      >
    </b-table>

    <hr />

    <div class="complements">
      <div class="itens-per-page">
        <b-form-group
          label="Itens"
          label-cols-sm="4"
          label-align-sm="left"
          label-size="sm"
          label-for="perPageSelect"
          class="mb-0"
        >
          <b-form-select
            style="width:50%"
            v-model="perPage"
            id="perPageSelect"
            size="sm"
            :options="pageOptions"
          ></b-form-select>
        </b-form-group>
      </div>
      <div class="itens-pagination">
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          align="fill"
          size="sm"
          class="my-0"
        ></b-pagination>
      </div>
    </div>
  </b-container>
</template>

<script>
import axios from "axios";
import { baseApiUrl } from "@/global";
export default {
  name: "Motherboards",
  data: function() {
    return {
      motherboards: [],

      fields: [
        { key: "id", label: "Id" },
        { key: "name", label: "Name" },
        { key: "chipset", label: "Chipset" },
        { key: "memory", label: "RAM" },
        { key: "socket", label: "Socket" },
        { key: "format", label: "Size" }
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15],
      filter: null,
      filterOn: [],
      form: {
        search: ""
      }
    };
  },
  created() {
    this.getMotherboards();
  },
  methods: {
    getMotherboards() {
      axios.get("http://localhost:3001/motherboards").then(res => {
        this.motherboards = res.data;
        this.totalRows = this.motherboards.length;
      });
    },
    onSubmit(evt) {
      evt.preventDefault();
      alert(JSON.stringify(this.form));
    },
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    }
  }
};
</script>

<style>
* {
  box-sizing: border-box;
}

.buttons-options {
  display: grid;
  grid-template-areas: "s s";
  justify-content: space-between;
}

.group-search-button {
  justify-self: right;
}

.complements {
  border-radius: 15px;
  grid-gap: 10px;
  display: grid;
  grid-template-areas: "s s";
  justify-content: stretch;
}

.table-white {
  background-color: #fff;
}

.table-white tr th {
  background-color: #6c757d;
  color: #fff;
}

.itens-per-page {
  width: 40%;
}

.itens-pagination {
  display: grid;
  width: 50%;
  justify-self: right;
}

.page-link {
  color: rgb(87, 87, 87);
}

.page-item.active .page-link {
  color: #fff;
  background-color: #6c757d;
  border-color: #6c757d;
}
</style>
