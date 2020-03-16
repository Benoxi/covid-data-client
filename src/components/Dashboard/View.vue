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
// const fs = require('fs');
import fs from 'fs';

@Component
export default class DashboardView extends Vue {
  // data = [];
  countryData = [];
  covidData = Array<dataPoint>();
  inProgress = false;
  localStorageData: boolean = true;

  get headers() {
    return [
      { text: 'Country', value: 'country', width: 'auto' },
      { text: 'Confirmed', value: 'confirmed', width: '300px' },
      { text: 'Cured', value: 'cured', width: '300px' },
      { text: 'Dead', value: 'dead', width: '300px' },
      // { text: 'Suspected', value: 'suspected' }
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
      let res = await axios.get(`https://lab.isaaclin.cn/nCoV/api/area`);
      this.parseResults(res.data.results);
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
    console.log(JSON.stringify(results));
    // @ts-ignore
    results.forEach(res => {
      if(res.locationId !== 0) {
        this.covidData.push({
          id: res.locationId,
          country: res.countryEnglishName,
          confirmed: res.confirmedCount,
          suspected: res.suspectedCount,
          cured: res.curedCount,
          dead: res.deadCount
        });
      }
    });
  }
}
</script>

