<template>
  <div>
    <v-card
      height="1160"
    >
      <v-toolbar
        color="teal"
        dark
      >
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
      
        <v-toolbar-title>メニュー</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </v-toolbar>
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
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'sideBar',
  data: () =>({
    items: [
      ['mdi-email', 'home', '/'],
      ['mdi-account-supervisor-circle', 'ゲーム', '/TheGame'],
      ['', '音楽', '/GuiterScale'],
      ['mdi-clock-start', '問い合わせ', '/support']
    ]
  })
}
</script>