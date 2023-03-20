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
      </v-main>
    </v-window>

  </v-app>
</template>

<script>
import SideBar from "../components/main/SideBar.vue";
import Header from "../components/main/Header.vue";
import CategoryBar from "../components/main/CategoryBar.vue";
import TagBar from "../components/main/TagBar.vue";
import Profile from "../components/main/Profile.vue";
import {ref, watch} from "vue";
import {store} from "../store";
import Bookmark from "../components/main/Bookmark.vue";
import Follow from "../components/main/Follow.vue";
import {useRoute} from "vue-router";
import router from "../router";

export default {
  name: 'main',
  components: {Follow, CategoryBar, Profile, TagBar,  Header, SideBar, Bookmark},

  setup() {
    const route = useRoute();
    const windowValue = ref();

    watch(() => store.state.window, (newWindow) => {
      windowValue.value = newWindow;
    });

    watch(() => route.params.username, (newUsername) => {
      router.push(`/${newUsername}`).then(() => {
        window.location.reload();
      });
    });

    return { window: windowValue };
  },
}
</script>

<style scoped>
.book-window {
  margin: 35px 0 35px 35px;
}

.profile-window {
  margin: 15px 0 0 40px;
}
</style>