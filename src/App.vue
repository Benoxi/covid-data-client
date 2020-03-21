<template>
  <v-app id="inspire">
    <v-app-bar app clipped-left >
      <!-- <v-app-bar-nav-icon @click.stop="drawer = !drawer" /> -->
      <v-toolbar-title>
        <v-img class="float-left" :src="require('@/assets/logo.png')" height="75px" width="60px"></v-img>
        <div class="title-div">Data Query - {{ this.title }}</div>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-label :dark="darkMode">Dark</v-label>
      <v-switch class="mt-6 mx-3" v-model="darkMode" @change="isDarkMode"></v-switch>
      <v-btn v-for="menu in menus" v-bind:key="menu.title" icon @click="switchPage(menu)">
        <v-icon>{{ menu.icon }}</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>

    <!-- <v-footer app></v-footer> -->
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class App extends Vue
{
  darkMode = true;
  drawer = false;
  title = 'Dashboard'
  menus = [
    {
        title: 'Dashboard',
        url: '/',
        icon: 'mdi-home'
    },
    {
        title: 'About',
        url: '/about',
        icon: 'mdi-information'
    },
];

  switchPage(menu: any) {
    this.title = menu.title;
    this.$router.push(menu.url);
    console.log(menu);
  }
  isDarkMode(){
    this.$vuetify.theme.dark = this.darkMode;
  }


}
</script>

<style lang="scss">
.container {
  max-width: none !important;
}

.title-div {
  margin-left: 75px;
  padding-top: 23px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
