<template>
  <v-container id="container">
    <v-row align-content="center"  id="all">
      <v-col cols="12" sm="12" id="col">
        <v-card id="back" class="elevation-6 mt-10">
          <Alert v-if="isError" class="alert" :alertObj="errorObj"></Alert>
          <div id="row">
            <v-col cols="12" sm="6">
              <v-card-text class="mt-15">
                <h2 class="text-center mb-6">Login in to Your Account</h2>
                <h6 class="text-center grey--text">
                  Log in to your account so you can continue building
                </h6>
                <v-row align-center justify="center">
                  <v-col cols="12" sm="8" class="mt-8">
                    <v-text-field
                        label="Id"
                        bg-color="white"
                        color="blue"
                        v-model="userData.loginId"
                    />
                    <v-text-field
                        label="Password"
                        bg-color="white"
                        color="blue"
                        type="password"
                        v-model="userData.password"
                        @keydown.enter="signIn"
                    />
                    <v-row>
                      <v-col cols="12" sm="7">
                        <v-checkbox
                            label="Remember Me"
                            class="mt-n5"
                            color="blue"
                            v-model="isRememberId"
                        />
                      </v-col>
                    </v-row>
                    <v-btn
                        color="blue"
                        class="mt-n7"
                        dark
                        block
                        tile
                        @click="signIn"
                    >
                      Login
                    </v-btn>
                    <div class="btn-line"></div>
                    <v-btn color="blue"
                           class="google-login"
                           outlined
                           :href="googleSignUrl">
                      <v-icon size="20"
                              class="mr-3">
                        mdi-google
                      </v-icon>
                      Sign in with Google
                    </v-btn>
                    <v-col cols="12" sm="10">
                      <a
                          class="caption text"
                          id="forgetPassword"
                          href="/forget-password"
                      >
                        Did you forget your password?
                      </a>
                    </v-col>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-col>
            <v-col cols="12" md="6">
              <h3 class="text-center">Welcome!</h3>
              <div class="text-center">
                <img
                    class="center"
                    src="../../assets/images/logo_transparent.png"
                    alt="noBrainLogo"
                    style="width: 200px"
                />
              </div>
              <div class="text-center">
                <v-card-text class="white--text">
                  <h3 class="text-center">Don't Have an Account Yet?</h3>
                  <h5 class="text-center">Sign up here</h5>
                </v-card-text>
                <div class="text-center">
                  <v-btn
                      absolute="true"
                      tile
                      outlined
                      dark
                      to="/signup"
                      color="#BBDEFB"
                  >
                    Sing up
                  </v-btn>
                </div>
              </div>
            </v-col>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import router from "../../router";
import {store} from "../../store"
import Alert from "../../components/alert/Alert.vue";
import {onMounted, ref, watch} from "vue";
import {SignInWithGoogle} from "../../api/oauth/OAuthApi";
import {bookmarkStore} from "../../store/bookmark/bookmark";
import {useRoute} from "vue-router";

const googleSignUrl = 'https://accounts.google.com/o/oauth2/v2/auth?client_id=' +
    `${import.meta.env.VITE_APP_GOOGLE_CLIENT_ID}` +
    '&redirect_uri=' +
    `${import.meta.env.VITE_APP_GOOGLE_REDIRECT_URL}` +
    '&response_type=code' +
    '&scope=email profile';

const userData = ref({
  loginId: "",
  password: "",
});

const errorObj = ref({
  type: "error",
  title: "",
  text: "",
});

const route = useRoute();
const isRememberId = ref(true);
const isError = ref(false);
const oauthUserInfo = ref({});

const signIn = async() => {
  await store.dispatch('signIn', userData.value).then((response) => {
    router.replace(`/${response.username}`);
  }).catch((error) => {
    console.log(error);
    errorObj.value.title = "로그인 오류";
    errorObj.value.text = error.response.data.message;
    isError.value = true;
  })
};

onMounted(async () => {
  const code = route.query.code;
  if (code) {
    await sigInInWithGoogle(code);
    // router.push(`/${oauthUserInfo.value.name}`);
  }
})
const sigInInWithGoogle = async (code) => {
  await SignInWithGoogle('google', code).then((response) => {
    oauthUserInfo.value = response.data.data;
  }).catch((error) => {

  })
}
</script>

<style scoped>
#all {
  margin-top: 2%;
}

#col {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 800px;
}

#back {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 85%;
  height: 100%;
}

#back::after {
  width: 100%;
  height: 100%;
  content: "";
  background-image: url("../../assets/images/background.jpg");
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  opacity: 0.5;
}

.btn-line {
  margin: 17px 0 10px 0;
  background-image: repeating-linear-gradient(to right, transparent, transparent 10px, black 10px, black 20px);
  height: 1px;
  border-spacing: 10px;
  text-align: center;
}

.google-login {
  width: 100%;
  height: 40px;
  border-color: #db4437; /* Google red */
  color: #db4437; /* Google red */
}

.google-login:hover {
  color: white;
  background-color: #db4437; /* Google red */
}

.v-text-field label {
  font-weight: bold;
}

#row {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

#forgetPassword {
  color: black;
  font-weight: bold;
  font-size: 17px;
  text-decoration-line: none;
}

#forgetPassword:hover {
  color: rgb(101, 104, 189);
  text-decoration-line: underline;
}

.alert {
  position: absolute;
  width: 100%;
}

</style>
