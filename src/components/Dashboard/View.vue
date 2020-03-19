<template>
  <v-container class="view">
    <v-data-table :loading="inProgress"
     loading-text="Fetching data... Please wait!"
      :headers="headers"
      :items="covidData"
      item-key="id"
      sort-by="confirmed"
      sort-desc
      ></v-data-table>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import dataPoint from '@/models/dataPoint';
import axios from 'axios';

@Component
export default class DashboardView extends Vue {
  // data = [];
  countryData = [];
  covidData = Array<dataPoint>();
  inProgress = false;
  localStorageData: boolean = true;

  get headers() {
    return [
      { text: 'Country', value: 'country', width: '300px' },
      { text: 'Cases', value: 'cases' },
      { text: 'Todays cases', value: 'todayCases' },
      { text: 'Active', value: 'active'},
      { text: 'Dead', value: 'dead'},
      { text: 'Recovered', value: 'recovered'},

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
      this.parseResults(JSON.parse(res.data));
    } catch (e) {
      console.log(e);
    }
  }
  async fetchLocalData() {
    try {
        //@ts-ignore
        fs.readFile('../src/store/covidCasesData.json', 'utf8', (err, jsonString) => {
          if (err) {
            throw(err);
          }
          this.parseResults(jsonString);
        });
      } catch (e) {
        console.log(e);
      }
  }
  parseResults(results: any) {
    let id = 0;
    // @ts-ignore
    results.forEach(res => {
      if(res.locationId !== 0) {
        this.covidData.push({
          id: id,
          country: res.country,
          cases: res.cases,
          todayCases: res.todayCases,
          dead: res.deaths,
          todayDead: res.todayDeaths,
          recovered: res.recovered,
          active: res.active,
          critical: res.critical
        });
      id++;
      }
    });
  }
}
</script>

