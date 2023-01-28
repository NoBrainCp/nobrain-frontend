<template>
  <v-container>
    <v-row align-content="center" justify="center" id="all">
      <v-col cols="12" sm="10">
        <v-card class="elevation-6 mt-9" id="back">
          <v-row>
            <v-col cols="12" md="2" class="blue rounded-br-xl"> </v-col>

            <v-col cols="12" md="8">
              <v-card-text class="mt-12">
                <h1 class="text-center" id="maintext">Nobrain</h1>

                <v-row align-center justify="center">
                  <v-col cols="12" sm="12">
                    <h2 class="text-center" id="subtext">
                      비밀번호를 찾고자 하는 아이디를 입력해주세요.
                    </h2>
                    <v-icon></v-icon>
                    <v-col col="12" sm="12">
                      <v-text-field
                        variant="outlined"
                        prepend-inner-icon="mdi-account"
                        v-model="user.loginId"
                        label="Id"
                        id="account"
                        bg-color="white"
                        color="blue"
                      />
                    </v-col>
                    <v-col col="12" sm="12">
                      <v-btn
                        id="nextbtn"
                        flat="true"
                        block
                        height="50px"
                        color="blue"
                        @click="idcheck(user.loginId)"
                        class="btn"
                      >
                        다음
                      </v-btn>
                    </v-col>
                    <div style="padding: 20px 0"></div>

                    <div class="link_wrap">
                      <span
                        >아이디가 기억나지 않는다면?
                        <a href="/forgetid" class="link" onclick="idInquiry();"
                          ><div class="txt">아이디 찾기</div></a
                        >
                      </span>
                    </div>
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
import { ref, onMounted } from "vue";

export default {
  name: "ForgetPassword",

  data() {
    return {};
  },
  data: () => ({
    user: {
      name: "",
      email: "",
      loginId: "",
      password: "",
      passwordcheck: "",
      phoneNumber: "",
      birthDate: "",
    },
    isExistsName: "",
    isExistsId: "",
    isExistsEmail: "",
    isSubmit: "",
    isError: "",
  }),
  methods: {
    async namecheck(name) {
      let result = axios
        .get("/api/username/" + name + "/exists")
        .then((res) => {
          this.isExistsName = res.data.data;
        });
    },
    async idcheck(loginId) {
      let result = axios
        .get("/api/loginId/" + loginId + "/exists")
        .then((res) => {
          this.isExistsId = res.data.data;
        });
    },
    async send() {
      try {
        this.isError = 200;
        if (this.isExistsId === false && this.isExistsName === false) {
          let result = await axios.post("/api/signup", {
            name: this.user.name,
            email: this.user.email,
            loginId: this.user.loginId,
            password: this.user.password,
            passwordcheck: this.user.passwordcheck,
            phoneNumber: this.user.phoneNumber,
            birthDate: document.querySelector("#date").value,
          });
          this.isSubmit = result.data.success;
        }
      } catch (err) {
        this.isError = err.response.data.status;
      }
    },
  },
};
</script>

<style scoped>
#back {
  width: 100%;
  height: 800px;
  text-align: center;
}

#back::after {
  width: 100%;
  height: 100%;
  content: "";
  background-image: url("../assets/imges/background.jpg");
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  opacity: 0.5;
}

.v-input__details {
  display: none;
}

#maintext {
  margin-top: 7%;
  font-size: 50px;
  margin-bottom: 10%;
}
#subtext {
  margin-bottom: 10%;
}
.btn {
  font-size: 18px;
}
#all {
  margin-top: 3%;
}
span {
  font-size: 13pt;
}
</style>
