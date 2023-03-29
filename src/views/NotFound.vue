<template>
  <v-app>
    <v-container class="text-center">
      <v-row>
        <v-img src="../src/assets/images/error-page.png"
               class="error-img"
               aspect-ratio="16/9"/>
      </v-row>
      <v-col class="justify-center">
        <p class="main-text">죄송합니다. 현재 찾을 수 없는 페이지를 요청 하셨습니다..</p>
        <v-spacer class="mt-8"/>
        <p class="sub-text" >존재하지 않는 주소를 입력하셨거나,</p>
        <p class="sub-text" >요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다.</p>
        <p class="sub-text" >궁금한 점이 있으시면 언제든 노브레인을 통해 문의해 주시기 바랍니다.</p>
        <p class="sub-text">감사합니다.</p>
        <v-spacer class="mt-8"/>
        <v-btn
            prepend-icon="mdi mdi-keyboard-backspace"
            variant="outlined"
            color="blue"
            @click="backPage"
            > 이전페이지
        </v-btn>
        <v-btn
            class="ml-5"
            variant="outlined"
            color="blue"
            prepend-icon="mdi mdi-home"
            @click="goMainPage"
        > 메인으로
        </v-btn>
      </v-col>
    </v-container>
  </v-app>
</template>

<script>
import Header from "../components/main/Header.vue";
import ErrorPage from "../components/error/ErrorPage.vue";
import router from "../router";
import {getAccessTokenFromCookie, getUsernameFromCookie} from "../utils/cookies";

export default {
  name: "NotFound",
  components: {ErrorPage, Header},

  methods: {
    backPage() {
      router.go(-2);
    },

    goMainPage() {
      if (getAccessTokenFromCookie()) {
        router.push(`/${getUsernameFromCookie()}`);
      } else {
        router.push(`/sign-in`);
      }
    }
  }
}
</script>

<style scoped>

.error-img {
  max-height: 500px;
  max-width: 1200px;
}

.main-text {
  font-size: 24px;
  color: deepskyblue;
}

.sub-text {
  font-size: 17px;
  margin-top: 1%;
  color: gray;
}

</style>