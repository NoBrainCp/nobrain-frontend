<template>
  <v-card-text class="find-by-info">
    <h2 class="body-card-title text-h3 font-weight-bold text-center mt-3 mb-8">
      Nobrain
    </h2>
    <h1 class="body-card-sub-title font-weight-regular ml-6 mb-n2 mt-12">
      {{infoText}}
    </h1>

    <FindByCertifiedCard/>
  </v-card-text>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {store} from "../../store";
import FindByCertifiedCard from "../certifiedcard/FindByCertifiedCard.vue";

const infoText = ref("");

onMounted(() => {
  if (!store.state.username) {
    infoText.value = "닉네임 찾기";
  } else {
    infoText.value = "비밀번호 찾기";
  }
});

</script>

<style scoped>

.find-by-info {
  position: absolute;
  height: 100%;
  width: 100%;
}

.body-card-title {
  color: #0363f4;
  top: 2%;
  position: relative;
}

.body-card-sub-title {
  left: 2%;
  top: 2%;
  position: relative;
}


hr {
  background-color: rgba(56, 51, 51, 0.257);
  height: 2pt;
  margin-bottom: 0.5%;
}

</style>
