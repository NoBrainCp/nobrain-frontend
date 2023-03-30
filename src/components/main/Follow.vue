<template>
  <v-card style="width: 105%">
    <v-tabs
        class="tabs"
        v-model="tab"
        style="position: fixed; top: 100px;">
      <v-tab value="follower" class="tab" @click="followerClick">팔로워</v-tab>
      <v-tab value="following" class="tab" @click="followingClick">팔로잉</v-tab>
    </v-tabs>
    <UserCard/>
  </v-card>
</template>

<script setup>
import {ref, watch} from "vue";
import {followStore} from "../../store/follow/follow";
import UserCard from "./UserCard.vue";


const tab = ref(followStore.state.followWindow);

watch(() => (followStore.state.followWindow), (newValue) => {
  tab.value = newValue;
});

const followerClick = ()=> {
  followStore.commit('setFollowWindow', tab.value);
};

const followingClick = () => {
  followStore.commit('setFollowWindow', tab.value);
};

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