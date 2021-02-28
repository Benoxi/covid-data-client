<template>
  <v-card class="dialog">
    <v-card-title>{{ this.countryData.Country}}</v-card-title>
    <v-card-text>
      <v-row>
        <v-col>
          <p class="text-subtitle-1 text--primary font-weight-bold">New cases</p>
          <p class="text-subtitle-2">{{ this.countryData.NewConfirmed }}</p>
        </v-col>
        <v-col>
          <p class="text-subtitle-1 text--primary font-weight-bold">New deaths</p>
          <p class="text-subtitle-2">{{ this.countryData.NewDeaths }}</p>
        </v-col>
        <v-col>
          <p class="text-subtitle-1 text--primary font-weight-bold">New recovered</p>
          <p class="text-subtitle-2">{{ this.countryData.NewRecovered }}</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <p class="text-subtitle-1 text--primary font-weight-bold">All cases</p>
          <p class="text-subtitle-2">{{ this.countryData.TotalConfirmed }}</p>
        </v-col>
        <v-col>
          <p class="text-subtitle-1 text--primary font-weight-bold">All deaths</p>
          <p class="text-subtitle-2">{{ this.countryData.TotalDeaths }}</p>
        </v-col>
        <v-col>
          <p class="text-subtitle-1 text--primary font-weight-bold">All recovered</p>
          <p class="text-subtitle-2">{{ this.countryData.TotalRecovered }}</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <p class="text-h6 text--primary font-weight-bold">Graph</p>
          <v-card class="pa-4">
            <cases-chart :chart-data="casesData"></cases-chart>
          </v-card>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="red" text @click="$emit('close-dialog-event')">Close</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import DataPoint from '@/models/DataPoint';
import DayPoint from '@/models/DayPoint';
import CasesChart from '@/components/Dashboard/CasesChart.vue';
import { Component, Vue, Prop } from 'vue-property-decorator';
import moment from 'moment';

@Component({
    components: {
        CasesChart
    }
})
export default class DashboardDialog extends Vue {

  @Prop() countryData!: DataPoint

  casesData = {};

  created() {
    this.createCasesData()
  }
  createCasesData(){
    // console.log(moment.now());

    let activeArray: Array<number> = [];
    let confirmedArray: Array<number> = [];
    let dateArray: Array<string> = [];

    this.countryData.DayOne.forEach(element => {
      activeArray.push(element.Active);
      confirmedArray.push(element.Confirmed);

      let newDate = moment(element.Date).format("DD MMM YY")
      dateArray.push(newDate);
    });

    this.casesData = {
				labels: dateArray,
				datasets: [
					{
						label: 'Active Cases',
						backgroundColor: '#283593',
						borderColor: '#283593',
						data: activeArray,
						lineTension: 0,
						fill: false
					},
					{
						label: 'Confimed Cases',
						backgroundColor: '#C62828',
						borderColor: '#C62828',
						data: confirmedArray,
						lineTension: 0,
						fill: false
					}
				]
			}
  }
}
</script>

