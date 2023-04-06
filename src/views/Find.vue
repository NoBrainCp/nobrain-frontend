<template>
  <v-parallax
      class="parallax"
      src="/../src/assets/images/start-page-header.jpg"
  >
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
        <v-window-item value="changePassword">
          <ChangePassword/>
        </v-window-item>
      </v-card>
    </v-window>
  </v-parallax>
</template>

<script setup>

import {ref, watch} from "vue";
import {store} from "../store";
import ForgetPassword from "../components/find/ForgetPassword.vue";
import FindByInfo from "../components/find/FindByInfo.vue";
import ChangePassword from "../components/find/ChangePassword.vue";

const windowValue = ref("");

watch(() => store.state.window, (newValue) => {
  windowValue.value = newValue;
  console.log(1);
});

</script>

<style scoped>
.parallax {
  position: relative;
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
  height: 60%;
  border-radius: 1em;
  border: 1px solid #181818;
  position: absolute;

}
</style>