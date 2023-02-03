<template>
  <v-app-bar
      app
      flat
      height="90"
      id="app-bar"
  >
    <v-container class="py-2 fill-height">
<!--      <v-avatar color="info">-->
      <v-icon icon="mdi-account-circle" size="60" id="user-img" color="black"></v-icon>
<!--      </v-avatar>-->

      <v-btn
          v-for="link in links"
          :key="link"
          text
      >
        {{ link }}
      </v-btn>

      <v-spacer></v-spacer>

      <v-card
          class="mx-auto"
          color="#dedada"
          min-width="600"
      >
        <v-card-text>
          <v-text-field
              :loading="loading"
              density="compact"
              variant="solo"
              label="Search bookmarks"
              append-inner-icon="mdi-magnify"
              single-line
              hide-details
              @click:append-inner="onClick"
          ></v-text-field>
        </v-card-text>
      </v-card>
    </v-container>
  </v-app-bar>
</template>

<script>
  export default {
    name: 'Headers',
    data: () => ({
      links: [
        'Dashboard',
        'Messages',
        'Profile',
        'Updates',
      ],

      loaded: false,
      loading: false,
    }),

    methods: {
      onClick() {
        this.loading = true

        setTimeout(() => {
          this.loading = false;
          this.loaded = true;
        }, 2000)
      }
    }
  }
</script>

<style scoped>
#app-bar {
  background: #dedada;
}

#user-img {
  margin-left: 10px;
  margin-right: 50px;
}
</style>