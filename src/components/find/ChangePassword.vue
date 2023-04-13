<template>
  <v-card-text class="change-password">
    <h2 class="body-card-title text-h3 font-weight-bold text-center">
      Nobrain
    </h2>
    <h2 class="body-card-sub-title font-weight-regular text-center">
      비밀번호 변경
    </h2>
    <v-col cols="12" sm="10" class="text-card">
    <v-text-field
        class="mb-10 font-weight-bold"
        prepend-inner-icon="mdi-account"
        bg-color="#B3E5FC"
        disabled
    > {{ userData.username }}
    </v-text-field>

    <v-text-field
        v-model="userData.password"
        label="비밀번호"
        hint="숫자와 특수문자를 포함한 8글자 이상"
        color="blue"
        type="password"
        variant="outlined"
        maxlength="20"
        clearable
        :rules="[rules.password]"/>
      <v-row class="mt-2 mb-3">
        <div class="ml-5 mb-1 font-weight-bold">비밀번호 강도:</div>
        <div id=password-strength class="ml-1 font-weight-bold"> {{ passwordStrength }}</div>
      </v-row>
    <v-text-field
        v-model="userData.passwordCheck"
        label="비밀번호 확인"
        color="black"
        type="password"
        maxlength="20"
        variant="outlined"
        @keydown.enter="checkPassword"
        clearable/>
      <v-row>
        <v-col cols="12" sm="8">
          <div class="password-text ml-2 mt-4"
               v-if="userData.passwordCheck"
               :style="{color: isPasswordCheck ? 'green' : 'red'}"
          >
            <v-icon
                class="mt-n1"
                :icon="isPasswordCheck ? 'mdi mdi-check-circle-outline' : 'mdi mdi-alert-circle-outline'"
            ></v-icon>
            {{ passwordText }}
          </div>
        </v-col>
      </v-row>
    <v-btn
        block
        variant="outlined"
        height="50px"
        color="blue"
        @click="checkPassword"
        class="btn">
      변경하기
    </v-btn>
    </v-col>
  </v-card-text>
</template>

<script setup>
import router from "../../router";
import {ref, watch} from "vue";
import {resetPassword} from "../../api/user/userApi";
import {store} from "../../store";

const userData = ref({
  username: store.state.username,
  password: "",
  passwordCheck: "",
});

const rules = ref({
  password: v => !!v || '비밀번호는 필수 입력 항목입니다.',
});

const passwordStrength = ref("");
const isPasswordCheck = ref(false);
const passwordText = ref("");

//패스워드 8자리 정규식 체크
watch(() => userData.value.password, () => {
  const checkStrength = new RegExp("(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})");
  const passwordColor = document.getElementById("password-strength");
  if (checkStrength.test(userData.value.password)) {
    passwordStrength.value = "안전";
    passwordColor.style.color = "green";
  } else {
    passwordStrength.value = "위험";
    passwordColor.style.color = "red";
  }
});
//패스워드와 패스워크 체크 일치 체크
watch(() => [userData.value.passwordCheck,userData.value.password] ,() => {
  if (userData.value.password === userData.value.passwordCheck) {
    passwordText.value = "패스워드가 일치합니다";
    isPasswordCheck.value = true;
    return;
  }
  passwordText.value = "패스워드가 일치하지 않습니다.";
  isPasswordCheck.value = false;
});
const checkPassword = async () => {
  if (passwordStrength.value === "위험" || !isPasswordCheck ) {
    return alert("패스워드가 일치하지 않습니다.");
  }
  await resetPassword(userData.value).then(() => {
    alert("비밀번호 변경이 완료되었습니다.");
    router.push("/");
  }).catch((error) => {
    console.log(error.response);
  })
};

</script>

<style scoped>

.change-password {
  position: absolute;
  height: 100%;
  width: 100%;
}

.body-card-title {
  color: #0363f4;
  top: 2%;
  position: relative;
}

.body-card-sub-title {
  top: 4%;
  position: relative;
}

.text-card {
  left: 8%;
  top: 18%;
  position: absolute;
}
.btn {
  font-size: 18px;
  top: 120%;
  position: absolute;
}

hr {
  background-color: rgba(56, 51, 51, 0.257);
  height: 2pt;
  margin-bottom: 1%;
}

</style>
