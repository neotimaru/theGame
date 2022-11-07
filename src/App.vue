<template>
<div id="app">
  <v-app>
    <v-app-bar
      app
      absolute
      dark
      shrink-on-scroll
      prominent
      height="120vm"
      src="https://picsum.photos/1920/1080?random"
      fade-img-on-scroll
      scroll-target="#scrolling-techniques-3"
    >
    </v-app-bar>

    <v-navigation-drawer
      app
      absolute
      width="15vm"
      class="pa-0"
      permanent
    >
    <SideBar></SideBar>
    </v-navigation-drawer>

    <v-main class="pt-20">
      <router-view/>
    </v-main>

    <!-- <v-footer>
    </v-footer> -->
  </v-app>
</div>

</template>

<script>
import SideBar from './components/SideBar'

export default {
  name:'app',
  components: {
    SideBar
  },
  data: () =>({
  })
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2968e7;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
