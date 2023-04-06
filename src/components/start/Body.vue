<template>
  <v-parallax
    class="parallax"
    src="/../src/assets/images/start-page-header.jpg"
  >
    <v-row class="d-flex">
      <v-col cols="12" sm="7">
        <div class="body-text ml-8">
          <h3 class="text-h3 font-weight-thin mb-5">
            자신의 북마크를 기록하고 공유하세요!
          </h3>
          <h4>Build your own bookmark</h4>
        </div>
      </v-col>
      <v-col cols="12" sm="5">
        <v-card class="body-card d-flex">
          <v-card-text>
            <h2
              class="body-card-title text-h3 font-weight-bold text-center mt-10"
            >
              Nobrain
            </h2>
            <div class="body-card-text">
              <v-text-field
                label="Id"
                bg-color="white"
                color="blue"
                variant="outlined"
                v-model="userData.loginId"
              />
              <v-text-field
                class="mt-1"
                label="Password"
                bg-color="white"
                color="blue"
                type="password"
                variant="outlined"
                @keydown.enter="signIn"
                v-model="userData.password"
              />
              <v-row class="mt-2 mb-5">
                <v-checkbox
                  label="로그인 상태 유지"
                  class="mt-n5"
                  color="blue"
                  v-model="isRememberId"
                />
              </v-row>
              <v-btn
                color="blue"
                class="mt-2 mb-3 login-button"
                variant="outlined"
                block
                @click="signIn"
              >
                로그인
              </v-btn>
              <!--            :href="googleSignUrl"-->


            <div class="body-card-oauth-button mt-8">
              <a
                id="forgetPassword"
                 href="/find"
                @click="setWindow"
              >
                아이디 찾기 / 비밀번호 찾기
              </a>
              <div class="body-card-oauth-button mt-8">
                <img
                  src="src/assets/images/google-logo.png"
                  class="google-logo"
                  alt="google"
                  @click="googleLogin"
                />
                <img
                  src="src/assets/images/naver-logo.png"
                  class="naver-logo"
                  alt="naver"
                  @click="naverLogin"
                />
                <img
                  src="src/assets/images/kakao-logo.png"
                  class="kakao-logo"
                  alt="kakao"
                  @click="kakaoLogin"
                />
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-parallax>
  <div class="space" />
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { store } from "../../store";
import router from "../../router";

const userData = ref({
  loginId: "",
  password: "",
});

const errorObj = ref({
  type: "error",
  title: "",
  text: "",
});

const signIn = async () => {
  await store
    .dispatch("signIn", userData.value)
    .then((response) => {
      router.replace(`/${response.username}`);
    })
    .catch((error) => {
      console.log(error);
      errorObj.value.title = "로그인 오류";
      errorObj.value.text = error.response.data.message;
      isError.value = true;
    });
};


const setWindow = () => {
  store.state.window = "forgetPassword";
};

const googleSignUrl = 'https://accounts.google.com/o/oauth2/v2/auth?client_id=' +
    `${import.meta.env.VITE_APP_GOOGLE_CLIENT_ID}` +
    '&redirect_uri=' +
    `${import.meta.env.VITE_APP_GOOGLE_REDIRECT_URL}` +
    '&response_type=code' +
    '&scope=email profile';


const route = useRoute();
const isRememberId = ref(true);
const isError = ref(false);
const oauthUserInfo = ref({});

onMounted(() => {
  let parallax = document.querySelector(".parallax");
  console.log(parallax);
});
</script>

<style scoped>
.parallax {
  weight: 1800px;
  height: 800px;
  position: relative;
  transition: all 3s;
}

.body-text {
  top: 50%;
  position: absolute;
}

.body-card {
  top: 10%;
  height: 80%;
  width: 38%;
  border-radius: 1rem;
  border-color: #181818;

  outline: #181818;
  position: absolute;
}

.body-card-title {
  color: #0363f4;
}

.body-card-text {
  width: 70%;
  top: 25%;
  left: 15%;
  position: absolute;
}

.space {
  height: 100px;
}

.login-button {
  height: 45px;
}

.body-card-oauth-button {
  left: 20%;
}

.google-logo {
  position: absolute;
  height: 50px;
  cursor: pointer;
  left: 25%;
}

.naver-logo {
  position: absolute;
  height: 50px;
  cursor: pointer;
  left: 45%;
}

.kakao-logo {
  position: absolute;
  height: 50px;
  cursor: pointer;
  left: 65%;
}
</style>
