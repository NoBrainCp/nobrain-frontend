<template>
  <v-app id="inspire">
    <Headed/>

    <Side/>

    <TagBar class="tag-bar"/>

  </v-app>
</template>

<script>
import Side from "../components/Side.vue";
import Headed from "../components/Head.vue";
import TagBar from "../components/TagBar.vue";

export default {
  components: {TagBar, Headed, Side},
  name: 'userprofile',

  data: () => ({


  }),
}
</script>

<style scoped>

</style>