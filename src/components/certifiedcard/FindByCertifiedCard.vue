<template>
  <v-card class="text-center" id="card" variant="outlined">
    <v-card-text class="mx-5">
      <v-radio-group v-model="radios">
        <v-radio
          label="회원정보에 등록한 휴대전화로 인증"
          value="radio1"
          @click="clickradio1()"
        ></v-radio>
        <v-card
          class="mx-12 cardbox"
          id="kindscard"
          variant="outlined"
          v-if="radios === 'radio1'"
        >
          <div class="text-left" id="subtext1">
            회원정보에 등록한 휴대전화 번호와 입력한 번호가 같아야, 인증번호를
            받을 수 있습니다.
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
                <v-dialog
                  v-model="dialog"
                  activator="parent"
                  transition="dialog-top-transition"
                >
                  <v-card
                    v-if="isPhonecheck"
                    class="mx-auto"
                    max-width="500"
                    style="width: 500px; height: 200px"
                  >
                    <v-row id="rowfild" style="margin-top: 8%">
                      <v-col col="12" sm="8">
                        <v-text-field
                          v-model="num"
                          label="인증번호"
                          id="num"
                          bg-color="white"
                          color="blue"
                        >
                        </v-text-field>
                      </v-col>
                      <v-col col="12" sm="3">
                        <v-btn color="blue" block>확인</v-btn>
                      </v-col>
                    </v-row>
                    <v-col col="12" sm="12"> 남은시간 : {{ timeStr }} </v-col>
                  </v-card>
                </v-dialog>
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
          class="mx-12 cardbox"
          id="kindscard"
          variant="outlined"
          v-if="radios === 'radio2'"
        >
          <div class="text-left" id="subtext1">
            본인확인 이메일 주소와 입력한 이메일 주소가 같아야, 인증번호를 받을
            수 있습니다.
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
              <v-text-field v-model="user.email" label="Email" color="blue" />
            </v-col>
            <v-col cols="12" sm="4">
              <v-btn
                id="submit"
                color="blue"
                @click="sendEmail(user.name, user.email)"
              >
                인증번호 받기
                <v-dialog
                  v-model="dialog"
                  activator="parent"
                  transition="dialog-top-transition"
                >
                  <v-card
                    v-if="isEmailcheck"
                    class="mx-auto"
                    max-width="500"
                    style="width: 500px; height: 200px"
                  >
                    <v-row id="rowfild" style="margin-top: 8%">
                      <v-col col="12" sm="8">
                        <v-text-field
                          v-model="authCode"
                          label="인증번호"
                          id="num"
                          bg-color="white"
                          color="blue"
                        >
                        </v-text-field>
                      </v-col>
                      <v-col col="12" sm="3">
                        <v-btn color="blue" block @click="checkAuthCode(user.email, authCode)">확인</v-btn>
                      </v-col>
                    </v-row>
                    <v-row id="rowfild">
                      <v-col col="12" sm="5"> 남은시간 : {{ timeStr }} </v-col>
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
    id="nextbtn"
    flat="true"
    block
    height="50px"
    color="blue"
    to="/signin"
    class="btn"
  >
    홈페이지로 이동
  </v-btn>
</template>
<script>
import axios from "axios";
export default {
  data: () => ({
    user: {
      name: "",
      email: "",
      password: "",
      phoneNumber: "",
    },
    // findbyid -> data
    id: {},
    //findbypassword -> data
    password: {},

    //dialog
    dialog: false,

    //timeCount
    restSec: 180,
    restTimeData: "",
    timeStr: "",

    //radio btn
    radios: "radio1",

    //send
    isPhonecheck: false,
    isEmailcheck: "",
    authCode: "",
  }),
  methods: {
    clickradio1() {
      this.radios = "radio1";
      this.user.name = "";
      this.user.phoneNumber = "";
      this.isEmailcheck = false;
    },
    clickradio2() {
      this.radios = "radio2";
      this.user.name = "";
      this.user.email = "";
      this.isPhonecheck = false;
    },
    async sendPhone(phoneName, phoneNumber) {
      try {
        let result = await axios.post("/api/find/loginId/phone-number", {
          name: phoneName,
          phoneNumber: phoneNumber,
        });
        this.isPhonecheck = true;
        this.startTimer();
      } catch (err) {
        alert("닉네임 혹은 전화번호를 확인해주세요.");
        this.dialog = !this.dialog;
      }
    },
    async sendEmail(emailName, email) {
      try {
        let result = await axios.get("/api/mail/" + email + "/authcode");
        this.isEmailcheck = true;
        this.startTimer();
      } catch (err) {
        alert("닉네임 혹은 이메일을 확인해주세요.");
        this.dialog = !this.dialog;
      }
    },
    async checkAuthCode(email, authCode) {
      let result = await axios.post("/api/mail/" + email + "/authcode", {
        code: authCode,
      });

      const isSuccess = result.data.success;
      if (isSuccess) {
        alert("인증이 완료 되었습니다.");
        this.isEmailcheck = false;
      } else {
        alert(result.data.message);
      }
    },

    //타이머 기능 구현
    startTimer() {
      this.restSec = 30;
      var timerObject = setInterval(() => {
        this.timeStr = this.prettyTime();
        this.restSec--;
        if (this.restSec == 0) {
          this.timerStop(timerObject);
        }
      }, 1000);
      return this.timerObject;
    },
    prettyTime() {
      let time = this.restSec / 60;
      let minutes = parseInt(time);
      let seconds = Math.round((time - minutes) * 60);
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
      this.isEmailcheck = false;
      this.isPhonecheck = false;
    },
  },
};
</script>
<style>
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

#card {
  height: 450px;
  background-color: white;
}
#kindscard {
  background-color: rgb(240, 245, 243);
}
#submit {
  margin-right: 150px;
  margin-top: 10px;
}
</style>
