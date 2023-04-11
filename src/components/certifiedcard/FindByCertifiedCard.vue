<template>
  <v-card class="text-center" id="card" variant="outlined">
    <v-card-text class="mx-3">
      <v-radio-group v-model="radios">
        <div class="phone-card">
          <v-radio
              label="회원정보에 등록한 휴대전화로 인증"
              value="radioPhoneNumber"
              @click="clickPhoneNumber"
          />
          <v-card
              id="kinds-card"
              variant="outlined"
              v-if="radios === 'radioPhoneNumber'"
          >
            <h5 class="text-left font-weight-regular" id="subtext1">
              회원정보에 등록한 휴대전화 번호와 입력한 번호가 같아야, 인증번호를
              받을 수 있습니다.
            </h5>
            <v-row>
              <v-col cols="12" sm="7" class="ml-6">
                <v-text-field
                    v-model="user.phoneNumber"
                    label="PhoneNumber"
                    color="blue"
                    variant="outlined"
                    bg-color="white"
                    hint="-를 제외한 핸드폰 번호"
                />
              </v-col>
              <v-col cols="12" sm="4">
                <v-btn
                    class="ml-n8 mt-2"
                    color="black"
                    variant="outlined"
                    @click="sendAuthCodeFromPhoneNumber(user.phoneNumber)"
                >
                  인증번호 받기
                </v-btn>
              </v-col>
            </v-row>
          </v-card>
        </div>

        <div class="email-card">
          <v-radio
              label="본인확인 이메일로 인증"
              value="radioEmail"
              @click="clickEmail"
          />
          <v-card
              id="kinds-card"
              variant="outlined"
              v-if="radios === 'radioEmail'"
          >
            <h5 class="text-left font-weight-regular" id="subtext1">
              본인확인 이메일 주소와 입력한 이메일 주소가 같아야, 인증번호를 받을
              수 있습니다.
            </h5>
            <v-row>
              <v-col cols="12" sm="7" class="ml-6">
                <v-text-field
                    v-model="user.email"
                    label="Email"
                    bg-color="white"
                    variant="outlined"
                    color="blue"/>
              </v-col>

              <v-col cols="12" sm="4">
                <v-btn
                    class="ml-n8 mt-2"
                    color="black"
                    variant="outlined"
                    @click="sendAuthCodeFromEmail(user.email)">
                  인증번호 받기
                </v-btn>
              </v-col>
            </v-row>
          </v-card>
        </div>
      </v-radio-group>
    </v-card-text>
  </v-card>
  <v-btn
      class="next-button"
      color="blue"
      variant="outlined"
      to="/start"
  >
    홈페이지로 이동
  </v-btn>
  <AuthDialog
      :authObj="authObj"
      @submit="checkAuthCode"
  />
</template>
<script setup>
import router from "../../router";
import {store} from "../../store";
import {ref} from "vue";
import {
  sendAuthenticationEmail,
  sendAuthenticationPhoneNumber,
  sendEmailAndLoginId, sendMailAndPassword,
  sendMessageAndLoginId, sendMessageAndPassword
} from "../../api/auth/authApi";
import AuthDialog from "../dialog/AuthDialog.vue";

const user = ref({
  email: "",
  phoneNumber: "",
});

const authObj = ref({
  dialog: false,
  authCode: "",
});

const radios = ref("radioPhoneNumber");

const clickPhoneNumber = () => {
  radios.value = "radioPhoneNumber";
  user.value.phoneNumber = "";
};

const clickEmail = () => {
  radios.value = "radioEmail";
  user.value.email = "";
};

const sendAuthCodeFromPhoneNumber = async (phoneNumber) => {
  await sendAuthenticationPhoneNumber(phoneNumber).then(() => {
    authObj.value.dialog = true;
  }).catch((error) => {
    console.log(error);
    alert("전화번호를 확인해주세요.");
  })
};

const sendAuthCodeFromEmail = async (email) => {
  await sendAuthenticationEmail(email).then(() => {
    authObj.value.dialog = true;
  }).catch(() => {
    alert("이메일을 확인해주세요.");
  });
};

//**
const findPasswordByPhoneNumber = async (username, phoneNumber, authCode) => {
  await sendMessageAndPassword(phoneNumber, authCode).then((response) => {
    const isSuccess = response.data.success;
    if (isSuccess) {
      alert("고민 중");
    } else {
      alert(response.data.message);
    }
  }).catch((error) => {
    alert(error.response);
  })
};

const findPasswordByEmail = async (username, email, authCode) => {
  await sendMailAndPassword(email, authCode).then((response) => {
    const isSuccess = response.data.success;
    if (isSuccess) {
      alert("고민 중");
    } else {
      alert(response.data.message);
    }
  }).catch((error) => {
    alert(error.response);
  })
};

const findIdByPhoneNumber = async (phoneNumber, authCode) => {
  await sendMessageAndLoginId(phoneNumber, authCode).then((response) => {
    const isSuccess = response.data.success;
    if (isSuccess) {
      alert("인증한 휴대전화로 본인의 닉네임이 전송되었습니다.");
      router.push(`/`);
    } else {
      alert(response.data.data);
    }
  }).catch((error) => {
    alert(error.response);
  })
};

const findIdByEmail = async (email, authCode) => {
  await sendEmailAndLoginId(email, authCode).then((response) => {
    const isSuccess = response.data.success;
    if (isSuccess) {
      alert("인증한 이메일로 본인의 닉네임이 전송되었습니다.");
      router.push(`/`);
    } else {
      alert(response.data.data);
    }
  }).catch((error) => {
    alert(error.response);
  })
};

const checkAuthCode = async () => {
  const username = store.state.username;
  const authCode = authObj.value.authCode;

  if (username) {
    if (radios.value === "radioPhoneNumber") {
      await findPasswordByPhoneNumber(username, user.value.phoneNumber, authCode);
    } else {
      await findPasswordByEmail(username, user.value.email, authCode);
    }
  } else {
    if (radios.value === "radioPhoneNumber") {
      await findIdByPhoneNumber(user.value.phoneNumber, authCode);
    } else {
      await findIdByEmail(user.value.email, authCode)
    }
  }
};

</script>

<style scoped>
.phone-card {
  top: 5%;
  left: 10%;
  width: 80%;
  position: absolute;
}

.email-card {
  top: 50%;
  left: 10%;
  width: 80%;
  position: absolute;
}

#card {
  top: 5%;
  width: 90%;
  left: 5%;
  height: 60%;
  border-radius: 1rem;
  position: relative;
}

#subtext1 {
  margin-top: 3%;
  margin-bottom: 1%;
  margin-left: 2%;
}

#kinds-card {
  background-color: rgb(230, 245, 350);
}

.next-button {
  top: 90%;
  height: 6%;
  left: 7%;
  width: 86%;
  position: absolute;
}

</style>
