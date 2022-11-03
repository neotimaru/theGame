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
      Title
    </v-app-bar>

    <v-navigation-drawer
      app
      absolute
      dark
      color="#B1C5FF"
      width="15vm"
      permanent
    >
    <v-list>
      <v-list-item
        v-for="([icon, text, link], i) in items"
        :key="i"
        link
      >
        <v-list-item-icon>
          <v-icon>{{ icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title><router-link :to=link>{{ text }}</router-link></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    </v-navigation-drawer>

    <v-main class="pt-10">
      <router-view/>
    </v-main>

    <v-footer>
      footer
    </v-footer>
  </v-app>
</div>

</template>
<script>
export default {
  name:'app',
  data: () =>({
    items: [
      ['mdi-email', 'home', '/'],
      ['mdi-account-supervisor-circle', 'Game', '/TheGame'],
      ['mdi-clock-start', 'Support', '/support']
    ]
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
