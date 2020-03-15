<template>
  <v-container class="view">
    This is the general Dashboard view
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import axios from 'axios';

@Component
export default class DasboardView extends Vue {
  data = [];

  async created() {
    this.fetchServicesData();
  }
  async fetchServicesData(){
    try {
      let res = await axios.get(`https://restcountries.eu/rest/v2/all`);
      console.log(res);
    } catch (e) {
      console.log(e);
    }

    try {
      let res = await axios.get(`https://lab.isaaclin.cn/nCoV/api/area?`);
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  }


}
</script>

