<template>
  <v-app id="inspire">
    <Headed/>
    <Side/>
    <v-main class="main">
      <Profile/>
    </v-main>
    <TagBar class="tag-bar"/>

  </v-app>
</template>

<script>
import Side from "../components/Side.vue";
import Headed from "../components/Head.vue";
import TagBar from "../components/TagBar.vue";
import Profile from "../components/Profile.vue";

export default {
  components: {Profile, TagBar, Headed, Side},
  name: 'userprofile',

  data: () => ({


  }),
}
</script>

<style scoped>

.main {
  margin-top: 35px;
  margin-bottom: 35px;
  margin-left: 35px;
}

</style>