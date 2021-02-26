<template>
  <v-container class="view">
    <v-card>
      <v-card-title class="py-1">
        Dashboard
        <v-spacer></v-spacer>
        <v-text-field v-model="search" label="Search" append-icon="mdi-magnify"></v-text-field>
      </v-card-title>
        <v-data-table :loading="inProgress"
        loading-text="Fetching data... Please wait!"
          :headers="headers"
          :items="covidData"
          :search="search"
          item-key="ID"
          sort-by="cases"
          sort-desc
          >
          <template v-slot:item="{ item }">
            <tr @click="openDialog(item)">
              <td>{{ item.Country}}</td>
              <td>{{ item.TotalConfirmed}}</td>
              <td>{{ item.NewConfirmed}}</td>
              <td>{{ item.TotalDeaths}}</td>
              <td>{{ item.TotalRecovered}}</td>
            </tr>
          </template>
          </v-data-table>
      </v-card>

      <v-dialog v-model="dialog" max-width="800px">
        <dashboard-dialog v-if="dialog" :countryData="selectedCountry" v-on:close-dialog-event="closeDialog"/>
      </v-dialog>

  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import DashboardDialog from '@/components/Dashboard/Dialog.vue';
import DataPoint from '@/models/DataPoint';
import axios from 'axios';


@Component({
    components: {
        DashboardDialog
    }
})
export default class DashboardView extends Vue {
  search: string = "";
  countryData = [];
  covidData = Array<DataPoint>();
  inProgress: boolean = false;
  localStorageData: boolean = true;
  dialog: boolean = false;
  selectedCountry = Array<Object>();

  get headers() {
    return [
      { text: 'Country', value: 'Country', width: '300px' },
      { text: 'Cases', value: 'TotalConfirmed' },
      { text: 'Today', value: 'NewConfirmed' },
      { text: 'Dead', value: 'TotalDeaths'},
      { text: 'Recovered', value: 'TotalRecovered'},
    ]
  };

  async created() {
    this.inProgress = true;
    // if(this.localStorageData)
    //   await this.fetchLocalData();
    // else
    await this.fetchServicesData();
    this.inProgress = false;
  }
  async fetchServicesData() {
    try {
      //let res = await axios.get(`https://restcountries.eu/rest/v2/all`);
      //this.countryData = res.data;
    } catch (e) {
      console.log(e);
    }

    try {
      let res = await axios.get(process.env.VUE_APP_API_ENDPOINT + `/v1/covid`);
      this.parseResults(res.data);
    } catch (e) {
      console.log(e);
    }
  }
  parseResults(results: any) {
    let id = 0;
    // @ts-ignore
    results.forEach(res => {
      if(res.locationId !== 0) {
        res.id = id++;
        this.covidData.push(res);
      }
    });
  }
  openDialog(item: any) {
    this.selectedCountry = item;
    this.dialog = true;
  }
  closeDialog() {
    this.dialog = false;
  }
}
</script>

