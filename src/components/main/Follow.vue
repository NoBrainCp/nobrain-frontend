<template>
  <v-card style="width: 105%">
    <v-tabs
        class="tabs"
        v-model="tab"
        style="position: fixed; top: 100px;">
      <v-tab value="follower" class="tab">팔로워</v-tab>
      <v-tab value="following" class="tab">팔로잉</v-tab>
    </v-tabs>

    <v-card-text>
      <v-window v-model="tab">
        <v-window-item value="follower">
          <UserCard/>
        </v-window-item>
        <v-window-item value="following">
          <UserCard/>
        </v-window-item>
      </v-window>
    </v-card-text>
  </v-card>
</template>

<script>
import {ref, watch} from "vue";
import {followStore} from "../../store/follow/follow";
import UserCard from "./UserCard.vue";

export default {
  name: 'Follow',
  components: {UserCard},

  setup() {
    const tab = ref(followStore.state.followWindow);

    watch(() => (followStore.state.followWindow), (newValue) => {
      console.log("FOLLOW WINDOW WATCH");
      tab.value = newValue;
    });

    watch(() => (tab.value), (newValue) => {
      console.log("TAB VALUE WATCH");
      followStore.commit('setUserCardWindow', newValue);
    });

    return { tab };
  },
}
</script>

<style scoped>
.tabs {
  width: 100%;
  border-bottom: 1px solid #d2d2d2;
}

.tab {
  width: 150px;
  color: #03A9F4;
}
</style>