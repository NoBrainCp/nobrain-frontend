<template>
  <v-card class="text-center" id="card" variant="outlined">
    <v-card-text class="mx-3">
      <v-radio-group
          v-model="radios">
        <div class="email-card">
          <v-radio
              label="본인확인 이메일로 인증"
              value="radioEmail"
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
  sendEmailAndLoginId, sendMailAndPassword,
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

const radios = ref("radioEmail");

const sendAuthCodeFromEmail = async (email) => {
  await sendAuthenticationEmail(email).then(() => {
    authObj.value.dialog = true;
  }).catch(() => {
    alert("이메일을 확인해주세요.");
  });
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
    console.log(error);
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
    console.log(error);
  })
};

const checkAuthCode = async () => {
  const username = store.state.username;
  const authCode = authObj.value.authCode;

  if (username) {
    await findPasswordByEmail(username, user.value.email, authCode);
  } else {
    await findIdByEmail(user.value.email, authCode)
  }
};

</script>

<style scoped>

.email-card {
  left: 5%;
  width: 90%;
  position: absolute;
}

#card {
  top: 10%;
  width: 90%;
  left: 5%;
  height: 30%;
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
  top: 70%;
  height: 6%;
  left: 7%;
  width: 86%;
  position: absolute;
}

</style>
