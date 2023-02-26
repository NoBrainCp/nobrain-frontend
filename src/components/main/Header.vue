<template>
  <v-app-bar app flat height="120" id="app-bar">
    <v-container class="py-2 fill-height">
      <!--      <v-icon icon="mdi-account-circle" size="60" id="user-img" color="black"></v-icon>-->
      <div class="col" id="logo-container" @click="moveMainPage">
        <img
          src="../../assets/images/logo_transparent.png"
          width="130"
          height="110"
          id="logo-img"
          alt="nobrain-logo"
        />
      </div>

      <div class="col">
        <v-card class="mx-auto" color="#dedada" min-width="600">
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
      </div>

      <div class="col">
        <b-input-group>
          <template #prepend>
            <b-dropdown text="Dropdown" variant="info">
              <b-dropdown-item>Action A</b-dropdown-item>
              <b-dropdown-item>Action B</b-dropdown-item>
            </b-dropdown>
          </template>

          <b-form-input></b-form-input>

          <template #append>
            <b-dropdown
              text="Dropdown"
              variant="outline-secondary"
              v-for="i in 2"
              :key="i"
            >
              <b-dropdown-item>Action C</b-dropdown-item>
              <b-dropdown-item>Action D</b-dropdown-item>
            </b-dropdown>
          </template>
        </b-input-group>
      </div>
    </v-container>
  </v-app-bar>
</template>

<script>
import MainView from "../../views/MainView.vue";
import axios from "axios";
import { useRoute } from "vue-router";

export default {
  name: "Headers",

  setup() {
    const route = useRoute();
  },

  data: () => ({
    loaded: false,
    loading: false,
  }),

  methods: {
    onClick() {
      this.loading = true;

      setTimeout(() => {
        this.loading = false;
        this.loaded = true;
      }, 2000);
    },

    moveMainPage() {
      axios.get("/api/", this.route.params.username);
    },
  },
};
</script>

<style scoped>
#app-bar {
  background: #dedada;
}

#logo-container {
  margin-right: 130px;
}

#logo-img:hover {
  cursor: pointer;
}

#user-img {
  margin-left: 10px;
  margin-right: 50px;
}

.col {
  display: flex;
  align-content: center;
}
</style>
