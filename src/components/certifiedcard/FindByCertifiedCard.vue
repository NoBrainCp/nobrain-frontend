<template>
  <v-card class="text-center" id="card" variant="outlined">
    <v-card-text class="mx-5">
      <v-radio-group v-model="radios">
        <v-radio
          label="회원정보에 등록한 휴대전화로 인증"
          value="radioPhoneNumber"
          @click="clickPhoneNumber()"
        />
        <v-card
          class="mx-12"
          id="kinds-card"
          variant="outlined"
          v-if="radios === 'radioPhoneNumber'"
        >
          <div class="text-left" id="subtext1">
            회원정보에 등록한 휴대전화 번호와 입력한 번호가 같아야, 인증번호를
            받을 수 있습니다.
          </div>
          <v-row>
            <v-col cols="12" sm="7" id="text-field">
              <v-text-field
                v-model="user.phoneNumber"
                label="PhoneNumber"
                color="blue"
                hint="-를 제외한 핸드폰 번호"
              />
            </v-col>
            <v-col cols="12" sm="4">
              <v-btn
                id="submit"
                color="blue"
                @click="existPhoneNumber(user.phoneNumber)"
              >
                인증번호 받기
                <v-dialog
                  v-model="dialog"
                  activator="parent"
                  transition="dialog-top-transition"
                >
                  <v-card
                    v-if="isPhoneCheck"
                    class="mx-auto"
                    max-width="500"
                    style="width: 500px; height: 200px"
                  >
                    <v-row style="margin-top: 8%" class="field">
                      <v-col col="12" sm="8">
                        <v-text-field
                          v-model="authCode"
                          label="인증번호"
                          bg-color="white"
                          color="blue"
                          @keydown.enter="checkAuthCode(user.phoneNumber, authCode)"
                        >
                        </v-text-field>
                      </v-col>
                      <v-col col="12" sm="3">
                        <v-btn
                          color="blue"
                          block
                          @click="checkAuthCode(user.phoneNumber, authCode)"
                          >확인</v-btn
                        >
                      </v-col>
                    </v-row>
                    <v-col col="12" sm="12" class="field"> 남은시간 : {{ timeStr }} </v-col>
                  </v-card>
                </v-dialog>
              </v-btn>
            </v-col>
          </v-row>
        </v-card>

        <v-radio
          label="본인확인 이메일로 인증"
          value="radioEmail"
          @click="clickEmail()"
        />
        <v-card
          class="mx-12"
          id="kinds-card"
          variant="outlined"
          v-if="radios === 'radioEmail'"
        >
          <div class="text-left" id="subtext1">
            본인확인 이메일 주소와 입력한 이메일 주소가 같아야, 인증번호를 받을
            수 있습니다.
          </div>
          <v-row>
            <v-col cols="12" sm="7" id="text-field">
              <v-text-field v-model="user.email" label="Email" color="blue"/>
            </v-col>
            <v-col cols="12" sm="4">
              <v-btn id="submit" color="blue" @click="existEmail(user.email)">
                인증번호 받기
                <v-dialog
                  v-model="dialog"
                  activator="parent"
                  transition="dialog-top-transition"
                >
                  <v-card
                    v-if="isEmailCheck"
                    class="mx-auto"
                    max-width="500"
                    style="width: 500px; height: 200px"
                  >
                    <v-row style="margin-top: 8%" class="field">
                      <v-col col="12" sm="8">
                        <v-text-field
                          v-model="authCode"
                          label="인증번호"
                          bg-color="white"
                          color="blue"
                          @keydown.enter="checkAuthCode(user.email, authCode)"
                        >
                        </v-text-field>
                      </v-col>
                      <v-col col="12" sm="3">
                        <v-btn
                          color="blue"
                          block
                          @click="checkAuthCode(user.email, authCode)"
                          >확인
                        </v-btn>
                      </v-col>
                    </v-row>
                    <v-row class="field">
                      <v-col col="12" sm="12"> 남은시간 : {{ timeStr }} </v-col>
                    </v-row>
                  </v-card>
                </v-dialog>
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-radio-group>
    </v-card-text>
  </v-card>
  <v-btn
    id="next-btn"
    block
    height="50px"
    color="blue"
    to="/sign-in"
    class="btn"
  >
    홈페이지로 이동
  </v-btn>
</template>
<script>
import axios from "axios";

import { useRoute } from "vue-router";
import router from "../../router";
export default {
  data: () => ({
    route: useRoute(),
    user: {
      email: "",
      password: "",
      phoneNumber: "",
    },
    //dialog
    dialog: false,

    //timeCount
    restSec: 180,
    restTimeData: "",
    timeStr: "",

    //radio btn
    radios: "radioPhoneNumber",

    //send
    isPhoneCheck: false,
    isEmailCheck: "",
    authCode: "",
  }),
  methods: {
    //라디오 버튼 활성화 메서드
    clickPhoneNumber() {
      this.radios = "radioPhoneNumber";
      this.user.phoneNumber = "";
      this.isEmailCheck = false;
    },
    clickEmail() {
      this.radios = "radioEmail";
      this.user.email = "";
      this.isPhoneCheck = false;
    },
    // 전화번호 존재 여부 파악 메서드
    async existPhoneNumber(phoneNumber) {
      try {
        //존재하는 핸드폰 번호이면 인증번호 전송
        await axios.get("/api/phone/" + phoneNumber + "/auth-code");
        this.isPhoneCheck = true;
        this.startTimer();
      } catch (err) {
        alert("닉네임 혹은 전화번호를 확인해주세요.");
        this.dialog = !this.dialog;
      }
    },
    // 이메일 존재 여부 파악 메서드
    async existEmail(email) {
      console.log("wewqee");
      try {
        console.log("try");
        //존재하는 이메일이면 인증번호 전송
        await axios.get("/api/mail/" + email + "/auth-code");
        this.isEmailCheck = true;
        this.startTimer();
      } catch (err) {
        console.log("catch");
        alert("닉네임 혹은 이메일을 확인해주세요.");
        this.dialog = !this.dialog;
      }
    },
    //인증번호 체크 메소드
    checkAuthCode(media, authCode) {
      const loginId = this.route.params.loginId;
      if (loginId === undefined) {
        //아이디 찾기에서 인증번호가 완료가 되면 아이디를 매개체로 전송
        this.findId(media, authCode);
      } else {
        //비밀번호 찾기에서 인증번호가 완료가 되면 비밀번호 변경하기 창으로 이동
        this.findPassword(loginId, media, authCode);
      }
    },

    findId(media, authCode) {
      try {
        if (media === this.user.email) {
          //이메일로 아이디 찾기
          this.findIdByEmail(media, authCode);
        } else {
          //휴대전화로 아이디 찾기
          this.findIdByPhoneNumber(media, authCode);
        }
      } catch (err) {
        alert(err.data.message);
      }
    },
    //이메일로 아이디 찾기 메서드
    async findIdByEmail(email, authCode) {
      await axios
        .post("/api/mail/" + email + "/auth-code/login-id", {
          code: authCode,
        })
        .then((res) => {
          if (res.data.success) {
            alert("인증한 이메일로 본인의 아이디가 전송되었습니다.");
            router.push("/");
          } else {
            alert(res.data.message);
          }
        });
    },
    //휴대전화로 아이디 찾기
    async findIdByPhoneNumber(phoneNumber, authCode) {
      await axios
        .post("/api/phone/" + phoneNumber + "/auth-code/login-id", {
          code: authCode,
        })
        .then((res) => {
          if (res.data.success) {
            alert("인증한 휴대전화로 본인의 아이디가 전송되었습니다.");
            router.push("/");
          } else {
            alert(res.data.message);
          }
        });
    },

    findPassword(loginId, media, authCode) {
      try {
        console.log(media === this.user.email);
        if (media === this.user.email) {
          //이메일로 비밀번호 찾기
          this.findPasswordByEmail(loginId, media, authCode);
        } else {
          //휴대전화로 비밀번호 찾기
          this.findPasswordByPhoneNumber(loginId, media, authCode);
        }
      } catch (err) {
        alert(err.data.message);
      }
    },
    //이메일로 페스워드 찾기
    async findPasswordByEmail(loginId, email, authCode) {
      await axios
        .post("/api/mail/" + email + "/auth-code/password", {
          code: authCode,
        })
        .then((res) => {
          if (res.data.success) {
            alert("인증이 완료 되었습니다.");
            router.push("/change-password/" + loginId);
          } else {
            alert(res.data.message);
          }
        });
    },
    //휴대전화로 페스워드 찾기
    async findPasswordByPhoneNumber(loginId, phoneNumber, authCode) {
      try {
        await axios
          .post("/api/phone/" + phoneNumber + "/auth-code/password", {
            code: authCode,
          })
          .then((res) => {
            if (res.data.success) {
              alert("인증이 완료 되었습니다.");
                router.push("/change-password/" + loginId);
            } else {
              alert(res.data.message);
            }
          });
      } catch (err) {
        console.log(err);
      }
    },
    //타이머 기능 구현
    startTimer() {
      this.restSec = 180;
      const timerObject = setInterval(() => {
        this.timeStr = this.prettyTime(this.restSec);
        this.restSec--;
        if (this.restSec === 0) {
          this.timerStop(timerObject);
        }
      }, 1000);
      return timerObject;
    },

    prettyTime(restSec) {
      let minutes = parseInt(restSec / 60);
      let seconds = (restSec % 60);
      return (
        minutes.toString().padStart(2, "0") +
        " : " +
        seconds.toString().padStart(2, "0")
      );
    },

    timerStop(timerObject) {
      clearInterval(timerObject);
      this.timeStr = "";
      this.dialog = false;
      this.isEmailCheck = false;
      this.isPhoneCheck = false;
    },
  },
};
</script>

<style>
.field{
  margin-left: 1%;
}

#next-btn {
  font-size: 18px;
}

#subtext1 {
  margin-top: 2%;
  margin-bottom: 1%;
  margin-left: 30px;
}

#text-field {
  margin-left: 30px;
}

#card {
  height: 450px;
  background-color: white;
}

#kinds-card {
  background-color: rgb(240, 245, 243);
}

#submit {
  margin-right: 150px;
  margin-top: 10px;
}

</style>
