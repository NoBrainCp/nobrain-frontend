<template>
  <v-row class="header align-center">
    <v-col cols="12" sm="5" class="d-flex justify-start">
      <img
        src="src/assets/images/logo_transparent.png"
        alt="nobrain-logo"
        class="mainLogo ml-15"
        @click="home"
      />
    </v-col>
    <v-col cols="12" sm="6" class="d-flex justify-end">
      <div @click="moveSignUpPage" style="cursor: pointer">
        <v-icon class="ml-6 mdi mdi-account-arrow-up-outline flex-column"/>
        <h3>회원 가입</h3>
      </div>
    </v-col>
  </v-row>
</template>

<script setup>
import router from "../../router";

const home = () => {
  window.location.reload();
  router.push(`/`);
};

const moveSignUpPage = () => {
  router.push(`/sign-up`);
}
</script>

<style scoped>
.header {
  top: 0;
  background: white;
  position: sticky;
  border-bottom: 1px solid rgb(210, 210, 210);
  z-index: 10;
}

.mainLogo {
  cursor: pointer;
  height: 180px;
  width: 160px;
  filter: invert(55%) sepia(22%) saturate(7378%) hue-rotate(167deg) brightness(99%) contrast(98%);
}

</style>
