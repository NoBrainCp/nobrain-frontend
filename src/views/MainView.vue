<template>
  <v-app id="inspire">
    <Headers/>

    <v-main class="grey lighten-3">
      <v-container>
        <v-row>
          <SideBar/>

          <router-view :key="$route.fullPath">
            <Bookmark/>
          </router-view>

        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
  import Headers from "../components/Header.vue";
  import SideBar from "../components/main/SideBar.vue";
  import Bookmark from "../components/main/Bookmark.vue";

  export default {
    components: {Bookmark, SideBar, Headers},
  }
</script>