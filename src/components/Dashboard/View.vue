<template>
  <v-container class="view">
    <v-data-table :loading="inProgress"
     loading-text="Fetching data... Please wait!"
      :headers="headers"
      :items="desserts"
      ></v-data-table>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import dataPoint from '@/models/dataPoint.ts';
import axios from 'axios';

@Component
export default class DashboardView extends Vue {
  // data = [];
  countryData = [];
  covidData = Array<dataPoint>();
  inProgress = false;
  headers= [
          {
            text: 'Dessert (100g serving)',
            align: 'start',
            sortable: false,
            value: 'fat',
          },
          { text: 'Calories', value: 'calories' },
          { text: 'Fat (g)', value: 'fat' },
          { text: 'Carbs (g)', value: 'carbs' },
          { text: 'Protein (g)', value: 'protein' },
          { text: 'Iron (%)', value: 'iron' },
        ];
        desserts = [
          {
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
            iron: '1%',
          }
        ];

  headerss = [
    // { text: 'Currently cofirmed', value: 'currentConfirmedCount'},
    { text: 'Country', value: 'country' },
    { text: 'Confirmed', value: 'confirmed' },
    { text: 'Suspected', value: 'suspected' },
    { text: 'Cured', value: 'cured' },
    { text: 'Dead', value: 'dead' }
  ];

  async created() {
    this.inProgress = true;
    //await this.fetchServicesData();
    this.inProgress = false;
  }
  async fetchServicesData(){
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
    // @ts-ignore
    //console.log(this.covidData[0].get('countryEnglishName'));
    // @ts-ignore
    console.log(this.covidData[0].id);
  }
  parseResults(results: any) {
    console.log(results);
    // @ts-ignore
    results.forEach(res => {
      if(res) {
        this.covidData.push({
          id: res.locationId,
          country: 'food',//res.countryEnglishName,
          confirmed: 0,//res.confirmedCount,
          suspected: 0,//res.suspectedCount,
          cured: 0,//res.curedCount,
          dead: 0,//res.deadCount
        });
      }
    });
    console.log(this.covidData);
  }


}
</script>

