<template>
  <v-container>
    <v-row align-content="center" justify="center" id="all">
      <v-col cols="12" sm="10">
        <v-card class="elevation-6 mt-9" id="back">
          <v-row align-content="center" justify="center">
            <v-col cols="12" md="10">
              <v-card-text class="mt-12">
                <h1 id="main-text">No brain</h1>
                <v-row align-content="start" >
                  <h1>
                    비밀번호 변경
                    <v-icon size="33px" class="mdi mdi-lock"></v-icon>
                  </h1>
                </v-row>

                <v-row align-content="center" justify="center">
                  <v-col col="12" sm="10">
                    <hr/>
                    <v-text-field
                        prepend-inner-icon="mdi-account"
                        bg-color="white"
                        disabled
                    > {{ this.route.params.loginId }}
                    </v-text-field>
                  </v-col>
                  <v-col col="12" sm="10">
                    <v-text-field
                        v-model="password"
                        label="Password"
                        hint="숫자와 특수문자를 포함한 8글자 이상"
                        color="blue"
                        type="password"
                        bg-color="white"
                    />
                  </v-col>
                  <v-col col="12" sm="10">
                    <v-text-field
                        v-model="passwordCheck"
                        label="PasswordCheck"
                        bg-color="white"
                        color="blue"
                        type="password"
                        @keydown.enter="checkPassword(password, passwordCheck)"
                    />
                  </v-col>
                  <v-col col="12" sm="10">
                    <v-btn
                        v-model="button"
                        block
                        height="50px"
                        color="blue"
                        @click="checkPassword(password, passwordCheck)"
                        class="btn">
                      변경하기
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import {useRoute} from "vue-router";
import router from "../../router";

export default {
  name: "ChangePassword",

  data: () => ({
    route: useRoute(),
    password: "",
    passwordCheck: "",
    button: ""
  }),

  methods: {
    async checkPassword(password, passwordCheck) {
      try {
        let result = await axios.put("/api/user/password", {
          loginId: this.route.params.loginId,
          password: password,
          passwordCheck: passwordCheck
        });
        console.log(result);
        alert("비밀번호 변경이 완료되었습니다.");
        await router.push("/");
      } catch (err) {
        alert("비밀번호가 일치하지 않습니다.");
      }
    },
  },
};
</script>

<style scoped>
/* 배경화면 */
#back {
  width: 100%;
  height: 800px;
  text-align: center;
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

#main-text {
  font-size: 50px;
  margin-bottom: 7%;
  position: center;
}

.btn {
  font-size: 18px;
}

#all {
  margin-top: 3%;
}

hr {
  background-color: rgba(56, 51, 51, 0.257);
  height: 2pt;
  margin-bottom: 1%;
}

</style>
  