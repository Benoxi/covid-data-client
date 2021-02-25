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
          @click:row="dialog = true"
          :headers="headers"
          :items="covidData"
          :search="search"
          item-key="ID"
          sort-by="cases"
          sort-desc
          ></v-data-table>
      </v-card>

      <v-dialog v-model="dialog" persistent max-width="600px">
        <dashboard-dialog v-if="dialog"/>
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
}
</script>

