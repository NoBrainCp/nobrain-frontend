<template>
  <v-app id="inspire">
    <Header/>
    <SideBar/>

    <v-window v-model="window">

      <v-main class="main">
        <v-window-item class="book-window" value="book">
          <TagBar/>
          <CategoryBar/>
          <Bookmark/>
        </v-window-item>

        <v-window-item class="profile-window" value="profile">
          <Profile/>
        </v-window-item>

        <v-window-item class="follow-window" value="follow">
          <Follow class="follow-vue"/>
        </v-window-item>

        <v-window-item class="not-search-window" value="notResult">
          <NoSearch/>
        </v-window-item>
      </v-main>
    </v-window>

  </v-app>
</template>

<script setup>
import SideBar from "../components/main/SideBar.vue";
import Header from "../components/main/Header.vue";
import CategoryBar from "../components/main/CategoryBar.vue";
import TagBar from "../components/main/TagBar.vue";
import Profile from "../components/main/Profile.vue";
import {store} from "../store";
import Bookmark from "../components/main/Bookmark.vue";
import Follow from "../components/main/Follow.vue";
import router from "../router";
import NoSearch from "../components/main/NoSearch.vue";
import {useRoute} from "vue-router";
import {existsUsername} from "../api/user/userApi";
import {onMounted, ref, watch} from "vue";

const route = useRoute();
const window = ref("");

onMounted(async () => {
  const exists = await existsUsername(route.params.username);
  if (!exists.data.data) {
    await router.push(`not-found`);
  }
})

watch(() => store.state.window, (newWindow) => {
  window.value = newWindow;
});

watch(() => route.params.username, (newUsername) => {
  router.push(`/${newUsername}`).then(() => {
    window.location.reload();
  });
});

</script>

<style scoped>
.book-window {
  margin: 35px 0 35px 35px;
}

.profile-window {
  margin: 15px 0 0 40px;
}
</style>