<template>
  <div>
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
  </div>
</template>

<script>
export default {
  name: 'sideBar',
  data: () =>({
    items: [
      ['mdi-email', 'home', '/'],
      ['mdi-account-supervisor-circle', 'Game', '/TheGame'],
      ['mdi-clock-start', 'Support', '/support']
    ]
  })
}
</script>