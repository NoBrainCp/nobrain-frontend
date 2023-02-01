<template>
  <v-container>
    <v-row align-center justify="center">
      <v-col cols="12" sm="12">
        <v-card class="elevation-6 mt-8" id="back">
          <v-row>
            <v-col cols="12" md="2" class="blue rounded-br-xl">
              <v-btn color="blue" class="movepassword" to="/forgetpassword"
                >비밀번호 찾기</v-btn
              >
            </v-col>

            <v-col cols="12" md="8">
              <h1 class="text-center" id="maintext">Nobrain</h1>

              <h3 class="text-left" id="subtext">아이디 찾기</h3>
              <hr />

              <v-col cols="12" sm="12">
                <v-card class="text-center" id="card" variant="outlined">
                  <v-card-text class="mx-5">
                    <v-radio-group v-model="radios">
                      <v-radio
                        label="회원정보에 등록한 휴대전화로 인증"
                        value="radio1"
                        @click="clickradio1()"
                      ></v-radio>
                      <v-card
                        class="mx-12"
                        id="kindscard"
                        variant="outlined"
                        v-if="radios === 'radio1'"
                      >
                        <div class="text-left" id="subtext1">
                          회원정보에 등록한 휴대전화 번호와 입력한 번호가
                          같아야, 인증번호를 받을 수 있습니다.
                        </div>
                        <v-col cols="12" sm="7" id="textfild">
                          <v-text-field
                            v-model="user.name"
                            id="name"
                            label="Nickname"
                            color="blue"
                          />
                        </v-col>
                        <v-row id="rowfild">
                          <v-col cols="12" sm="7" id="textfild">
                            <v-text-field
                              v-model="user.phoneNumber"
                              id="phonenumber"
                              label="phonenumber"
                              color="blue"
                              hint="-를 제외한 핸드폰 번호"
                            />
                          </v-col>
                          <v-col cols="12" sm="4">
                            <v-btn
                              id="submit"
                              color="blue"
                              @click="sendPhone(user.name, user.phoneNumber)"
                            >
                              인증번호 받기
                            </v-btn>
                          </v-col>
                        </v-row>
                      </v-card>
                      <v-radio
                        label="본인확인 이메일로 인증"
                        value="radio2"
                        @click="clickradio2()"
                      ></v-radio>
                      <v-card
                        class="mx-12"
                        id="kindscard"
                        variant="outlined"
                        v-if="radios === 'radio2'"
                      >
                        <div class="text-left" id="subtext1">
                          본인확인 이메일 주소와 입력한 이메일 주소가 같아야,
                          인증번호를 받을 수 있습니다.
                        </div>
                        <v-col cols="12" sm="7" id="textfild">
                          <v-text-field
                            v-model="user.name"
                            id="name"
                            label="Nickname"
                            color="blue"
                          />
                        </v-col>
                        <v-row id="rowfild">
                          <v-col cols="12" sm="7" id="textfild">
                            <v-text-field
                              v-model="user.email"
                              label="Email"
                              color="blue"
                            />
                          </v-col>
                          <v-col cols="12" sm="4">
                            <v-btn id="submit" color="blue">
                              인증번호 받기
                            </v-btn>
                          </v-col>
                        </v-row>
                      </v-card>
                    </v-radio-group>
                  </v-card-text>
                </v-card>
                <v-btn
                  id="nextbtn"
                  flat="true"
                  block
                  height="50px"
                  color="blue"
                  @click="idcheck(user.loginId)"
                  class="btn"
                >
                  <!--인증번호  -->
                  다음
                </v-btn>
              </v-col>
              <div style="padding: 20px 0"></div>
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
  name: "ForgetId",

  data: () => ({
    user: {
      name: "",
      email: "",
      password: "",
      phoneNumber: "",
    },
    radios: "radio1",
    isExistsName: "",
    isExistsPhone: "",
    isExistsEmail: "",
    isSubmit: "",
    isError: "",
  }),

  methods: {
    async sendPhone(name, phoneNumber) {
      let result = await axios.post("/api/forget/loginId", {
        name: this.user.name,
        phoneNumber: this.user.phoneNumber,
      });
      console.log(result);
    },

    clickradio1() {
      this.radios = "radio1";
    },
    clickradio2() {
      this.radios = "radio2";
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
  height: 100%;
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
  font-size: 50px;
  margin-top: 5%;
  margin-bottom: 10%;
}

#nextbtn {
  font-size: 18px;
}
#subtext {
  margin-bottom: 1%;
  margin-left: 20px;
}
#subtext1 {
  margin-top: 2%;
  margin-bottom: 1%;
  margin-left: 30px;
}
#textfild {
  margin-left: 30px;
}
#rowfild {
  margin-left: 0px;
}
.movepassword {
  margin-top: 25%;
  margin-left: 20%;
  font-size: large;
  color: black;
}
hr {
  background-color: black;
  height: 2pt;
}
#card {
  height: 450px;
  background-color: white;
}
#kindscard {
  background-color: white;
}
#submit {
  margin-right: 150px;
  margin-top: 10px;
}
</style>
