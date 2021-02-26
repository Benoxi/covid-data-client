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
import CasesChart from '@/components/Dashboard/CasesChart.vue';
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({
    components: {
        CasesChart
    }
})
export default class DashboardDialog extends Vue {

  @Prop() countryData!: DataPoint

  casesData = [];

  created() {
    console.log("countryData");
    console.log(this.countryData);
  }
}
</script>

