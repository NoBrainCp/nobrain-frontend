<template>
  <v-card class="text-center" id="card" variant="outlined">
    <v-card-text class="mx-5">
      <v-radio-group v-model="radios">
        <v-radio
            label="회원정보에 등록한 휴대전화로 인증"
            value="radioPhoneNumber"
            @click="clickPhoneNumber"
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
                  @click="sendAuthCodeFromPhoneNumber(user.phoneNumber)"
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
                        >확인
                        </v-btn
                        >
                      </v-col>
                    </v-row>
                    <v-col col="12" sm="12" class="field"> 남은시간 : {{ timeCount.timeStr }}</v-col>
                  </v-card>
                </v-dialog>
              </v-btn>
            </v-col>
          </v-row>
        </v-card>

        <v-radio
            label="본인확인 이메일로 인증"
            value="radioEmail"
            @click="clickEmail"
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
              <v-btn id="submit" color="blue" @click="sendAuthCodeFromEmail(user.email)">
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
                      <v-col col="12" sm="12"> 남은시간 : {{ timeCount.timeStr }}</v-col>
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
<script setup>
import {useRoute} from "vue-router";
import router from "../../router";
import {ref} from "vue";
import {
  sendAuthenticationEmail,
  sendAuthenticationPhoneNumber,
  sendEmailAndLoginId, sendMailAndPassword,
  sendMessageAndLoginId, sendMessageAndPassword
} from "../../api/auth/authApi";

const route = useRoute();
const user = ref({
  email: "",
  password: "",
  phoneNumber: "",
});

const timeCount = ref({
  restSec: 180,
  restTimeData: "",
  timeStr: "",
});

const dialog = ref(false);
const radios = ref("radioPhoneNumber");
const isPhoneCheck = ref(false);
const isEmailCheck = ref(false);
const authCode = ref("");

const clickPhoneNumber = () => {
  radios.value = "radioPhoneNumber";
  user.value.phoneNumber = "";
  isEmailCheck.value = false;
};

const clickEmail = () => {
  radios.value = "radioEmail";
  user.value.email = "";
  isPhoneCheck.value = false;
};

const startTimer = () => {
  timeCount.value.restSec = 180;
  const timerObj = setInterval(() => {
    timeCount.value.timeStr = prettyTimer(timeCount.value.restSec);
    timeCount.value.restSec--;

    if (timeCount.value.restSec == 0) {
      timerStop(timerObj);
    }
  }, 1000);
};
const prettyTimer = (restSec) => {
  let minutes = parseInt(restSec / 60);
  let seconds = (restSec % 60);
  return (
      minutes.toString().padStart(2, "0") + " : " + seconds.toString().padStart(2, "0")
  )
};
const timerStop = (timerObj) => {
  clearInterval(timerObj);
  timeCount.value.timeStr = "";
  dialog.value = false;
  isEmailCheck.value = false;
  isPhoneCheck.value = false;
};

const sendAuthCodeFromPhoneNumber = async (phoneNumber) => {
  await sendAuthenticationPhoneNumber(phoneNumber).then(() => {
    isPhoneCheck.value = true;
    startTimer();
  }).catch((error) => {
    console.log(error);
    alert("전화번호를 확인해주세요.");
    dialog.value = !dialog.value;
  })
};

const sendAuthCodeFromEmail = async (email) => {
  await sendAuthenticationEmail(email).then(() => {
    isEmailCheck.value = true;
    startTimer();
  }).catch(() => {
    alert("이메일을 확인해주세요.");
    dialog.value = !dialog.value;
  });
};

const checkAuthCode = (media, authCode) => {
  const loginId = route.params.loginId;
  if (!loginId) {
    findId(media, authCode);
  } else {
    findPassword(loginId, media, authCode);
  }
};

const findId = (media, authCode) => {
  if (isEmailCheck.value) {
    findIdByEmail(media, authCode);
  } else {
    findIdByPhoneNumber(media, authCode);
  }
};

const findIdByEmail = async (email, authCode) => {
  await sendEmailAndLoginId(email, authCode).then((response) => {
    const isSuccess = response.data.success;
    if (isSuccess) {
      alert("인증한 이메일로 본인의 아이디가 전송되었습니다.");
      router.push(`/`);
    } else {
      alert(response.data.data);
    }
  }).catch((error) => {
    alert(error.response);
  })
};

const findIdByPhoneNumber = async (phoneNumber, authCode) => {
  await sendMessageAndLoginId(phoneNumber, authCode).then((response) => {
    const isSuccess = response.data.success;
    if (isSuccess) {
      alert("인증한 휴대전화로 본인의 아이디가 전송되었습니다.");
      router.push(`/`);
    } else {
      alert(response.data.data);
    }
  }).catch((error) => {
    alert(error.response);
  })
};

const findPassword = (loginId, media, authCode) => {
  if (isEmailCheck) {
    findPasswordByEmail(loginId, media, authCode);
  } else {
    findPasswordByPhoneNumber(loginId, media, authCode);
  }
};

const findPasswordByEmail = async (loginId, email, authCode) => {
  await sendMailAndPassword(email, authCode).then((response) => {
    const isSuccess = response.data.success;
    if (isSuccess) {
      alert("인증이 완료 되었습니다.");
      router.push("/change-password/" + loginId);
    } else {
      alert(response.data.message);
    }
  }).catch((error) => {
    alert(error.response);
  })
};

const findPasswordByPhoneNumber = async (loginId, phoneNumber, authCode) => {
  await sendMessageAndPassword(phoneNumber, authCode).then((response) => {
    const isSuccess = response.data.success;
    if (isSuccess) {
      alert("인증이 완료 되었습니다.");
      router.push("/change-password/" + loginId);
    } else {
      alert(response.data.message);
    }
  }).catch((error) => {
    alert(error.response);
  })
};


</script>

<style>
.field {
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
