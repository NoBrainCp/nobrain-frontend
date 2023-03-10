<template>
  <v-app id="inspire">
    <Header @setting="showSettingVue"/>
    <SideBar/>
    <TagBar class="tag-bar"/>

    <v-window
      v-model="window">
      <v-main class="main">
        <v-window-item value="book">
          <CategoryBar/>
          <Bookmark/>
        </v-window-item>
        <v-window-item value="profile">
          <Profile/>
        </v-window-item>
      </v-main>
    </v-window>

  </v-app>
</template>

<script>
import SideBar from "../components/SideBar.vue";
import Header from "../components/Header.vue";
import CategoryBar from "../components/CategoryBar.vue";
import TagBar from "../components/TagBar.vue";
import Profile from "../components/Profile.vue";
import {ref, watch} from "vue";
import {store} from "../store";
import Bookmark from "../components/Bookmark.vue";

export default {
  name: 'main',
  components: {CategoryBar, Profile, TagBar,  Header, SideBar, Bookmark},

  data: () => ({
  }),

  setup() {
    const window = ref();

    watch(() => store.state.window, (newWindow, oldWindow) => {
      window.value = newWindow;
    })

    return { window };
  },

  methods: {
    showSettingVue(setting) {
      this.window = setting;
    }
  }
}
</script>

<style scoped>
.main {
  margin-top: 35px;
  margin-bottom: 35px;
  margin-left: 35px;
}
</style>