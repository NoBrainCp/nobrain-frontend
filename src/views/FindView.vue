<template>
  <v-parallax
      class="parallax"
      src="/../src/assets/images/start-page-header.jpg"
      :style="{opacity: opacity}"
  > <img
      src="src/assets/images/logo_transparent.png"
      alt="nobrain-logo"
      class="mainLogo mt-n8 ml-14"
      @click="home"
  /></v-parallax>

    <v-window
        class="window"
        v-model="windowValue">
      <v-card
          class="card">
        <v-window-item value="forgetPassword">
          <ForgetPassword/>
        </v-window-item>
        <v-window-item value="findByInfo">
          <FindByInfo/>
        </v-window-item>
      </v-card>
    </v-window>

</template>

<script setup>

import {onMounted, ref, watch} from "vue";
import {store} from "../store";
import ForgetPassword from "../components/find/ForgetPassword.vue";
import FindByInfo from "../components/find/FindByInfo.vue";
import router from "../router";

const windowValue = ref("");
const opacity = ref(0);

const home = () => {
  router.push("/");
};

watch(() => store.state.window, (newValue) => {
  windowValue.value = newValue;
});

onMounted(() => {
  let opt = 0;
  const intervalId = setInterval(() => {
    opt += 0.1;
    if (opt >= 1) {
      clearInterval(intervalId);
    }
    opacity.value = opt;
  }, 100);
});

</script>

<style scoped>
.parallax {
  height: 100vh;
  position: relative;
  transition: opacity 1s;
}

.mainLogo {
  height: 170px;
  cursor: pointer;
  position: absolute;
}

.window {
  left: 30%;
  top: 10%;
  width: 100%;
  height: 100%;
  position: absolute;
}

.card {
  width: 40%;
  height: 80%;
  border-radius: 1em;
  border: 1px solid #181818;
  position: absolute;

}
</style>