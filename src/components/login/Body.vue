<template>
  <v-parallax
    class="parallax"
    src="/../src/assets/images/login-page-header.jpg"
    :style="{ opacity: opacity }"
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
                v-model="userData.username"
                label="name"
                color="blue"
                variant="outlined"
              />
              <v-text-field
                v-model="userData.password"
                class="mt-1"
                label="Password"
                color="blue"
                type="password"
                variant="outlined"
                @keydown.enter="signIn"
              />

              <v-row class="mt-2 mb-5">
                <v-checkbox
                  v-model="userData.isKeepLoggedIn"
                  label="로그인 상태 유지"
                  class="mt-n5"
                  color="blue"
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

              <a class="caption text" href="/find" @click="setWindow">
                아이디 찾기 / 비밀번호 찾기
              </a>
              <div class="body-card-oauth-button mt-8">
                <a :href="githubSignUrl">
                  <img
                    src="src/assets/images/github-logo.png"
                    class="github-logo"
                    alt="github-logo"
                  />
                </a>

                <a :href="googleSignUrl">
                  <img
                    src="src/assets/images/google-logo.png"
                    class="google-logo"
                    alt="google"
                  />
                </a>

                <a :href="naverSignUrl">
                  <img
                    src="src/assets/images/naver-logo.png"
                    class="naver-logo"
                    alt="naver"
                  />
                </a>
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
import { store } from "../../store";
import router from "../../router";
import { getUsernameFromStorage } from "../../utils/storage";

const githubSignUrl =
  "https://github.com/login/oauth/authorize?client_id=66b0a35fa47a34ffe333&scope=id,name,email,avatar_url";

const googleSignUrl =
  "https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email&client_id=573015715079-dkk4mjkmq900jaj3u2gncptag1nocdb1.apps.googleusercontent.com&response_type=code&redirect_uri=http://localhost:5173/oauth2/google&access_type=offline";

const naverSignUrl =
  "https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=sYs05laPxAT1aByTYXLm&redirect_uri=http://localhost:5173/oauth2/naver";

const userData = ref({
  username: "",
  password: "",
  isKeepLoggedIn: false,
});

const signIn = async () => {
  await store
    .dispatch("signIn", userData.value)
    .then(() => {
      router.replace(`/${getUsernameFromStorage()}`);
    })
    .catch((error) => {
      console.log(error);
      alert("로그인에 실패하였습니다.");
    });
};

const setWindow = () => {
  store.state.window = "forgetPassword";
};

const opacity = ref(0);

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
  height: 90vh;
  position: relative;
  transition: opacity 1s;
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
  height: 60px;
}

.body-card-oauth-button {
  left: 20%;
}

.github-logo {
  position: absolute;
  height: 50px;
  cursor: pointer;
  left: 25%;
}

.google-logo {
  position: absolute;
  height: 50px;
  cursor: pointer;
  left: 45%;
}

.naver-logo {
  position: absolute;
  height: 50px;
  cursor: pointer;
  left: 65%;
}
</style>
