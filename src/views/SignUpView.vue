<template>
  <v-parallax
      class="parallax"
      src="/../src/assets/images/sign-up-background.jpg"
  >
    <img
        src="../assets/images/logo_transparent.png"
        alt="nobrain-logo"
        class="mainLogo ml-16 mt-n7"
        @click="home"
    />
    <div id="mainText"></div>

    <v-card class="card"
            v-if="isShow"
            :style="{opacity: opacity}"
    >
      <v-card-text>
        <div class="card-text1 ml-1 mb-3"> 닉네임을 입력해주세요</div>
        <v-row>
          <v-col cols="12" sm="8">
            <v-text-field
                append-inner-icon="mdi mdi-rename-outline"
                class="text-field"
                v-model="user.name"
                label="닉네임"
                variant="outlined"
                color="black"
                maxlength="15"
                clearable
                :rules="[rules.name]"
            />
          </v-col>
          <v-col cols="12" sm="4">
            <v-btn
                color="black"
                variant="outlined"
                class="mt-2"
                @click="validateUsername(user.name)"
            > 확인
            </v-btn>
            <v-icon
                v-if="!isCheckName"
                size="30"
                class="ml-4 mt-2 mdi mdi-check-circle"
                color="green"/>
          </v-col>
        </v-row>
        <div class="card-text1 ml-1 mb-3" v-if="!isCheckName"> 이메일을 입력해주세요</div>
        <v-row v-if="!isCheckName">
          <v-col cols="12" sm="8">
            <v-text-field
                append-inner-icon="mdi mdi-email-outline"
                v-model="user.email"
                label="Email"
                variant="outlined"
                color="black"
                clearable
                :rules="[rules.email]"
            />
          </v-col>
          <v-col cols="12" sm="4">
            <v-btn
                color="black"
                variant="outlined"
                class="mt-2"
                @click="validateEmail(user.email)"
            > 확인
            </v-btn>
            <v-icon
                v-if="isCheckEmail"
                size="30"
                class="ml-4 mt-2 mdi mdi-check-circle"
                color="green"/>
          </v-col>
        </v-row>
        <div class="card-text1 ml-1 mb-3" v-if="isCheckEmail"> 비밀번호를 입력해주세요</div>
        <v-row v-if="isCheckEmail">
          <v-col cols="12" sm="8">
            <v-text-field
                v-model="user.password"
                label="비밀번호"
                hint="숫자와 특수문자를 포함한 8글자 이상"
                color="black"
                type="password"
                variant="outlined"
                maxlength="25"
                clearable
                :rules="[rules.password]"/>
          </v-col>
        </v-row>
        <v-row v-if="isCheckEmail">
          <div class="ml-5 mb-1"><Strong>비밀번호 강도:</strong></div>
          <div id=password-strength class="ml-1"><Strong> {{ passwordStrength }} </strong></div>
        </v-row>
        <v-row v-if="isCheckPassword">
          <v-col cols="12" sm="8">
            <v-text-field
                v-model="user.passwordCheck"
                label="비밀번호 확인"
                color="black"
                type="password"
                maxlength="25"
                variant="outlined"
                clearable/>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="8">
            <div class="password-text ml-2 mt-n7"
                 v-if="user.passwordCheck"
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
        <v-row class="justify-center align-center mt-3" v-if="isPasswordCheck">
          <v-btn
              class="mb-7"
              color="black"
              variant="outlined"
              @click="signUp"
          >
            회원가입
          </v-btn>
        </v-row>
      </v-card-text>
    </v-card>
  </v-parallax>
</template>

<script setup>
import {existsEmail, signUpUser} from "../api/user/userApi";
import {existsUsername} from "../api/user/userApi";
import {onMounted, ref, watch} from "vue";
import router from "../router";
import {resolvePackageData} from "vite";

const isShow = ref(false);
const user = ref({
  name: "",
  email: "",
  password: "",
  passwordCheck: "",
});

const text = ref("노브레인에 오신 것을 환영합니다.w귀하를 모시게 되어 기쁘게 생각하며w 가능한 최고의 경험을 제공할 수 있기를 기대합니다.");
const cnt = ref(0);
const opacity = ref(0);
const isCheckName = ref(true);
const isCheckEmail = ref(false);
const isCheckPassword = ref(false);
const isPasswordCheck = ref(false);
const passwordText = ref("");
const passwordStrength = ref("");

const rules = ref({
  name: v => !!v || '닉네임은 필수 입력 항목입니다.',
  email: v => !!v || '이메일은 필수 입력 항목입니다.',
  password: v => !!v || '비밀번호는 필수 입력 항목입니다.',
});

const textIncrease = async () => {
  if (cnt.value < text.value.length) {
    document.querySelector("#mainText").innerHTML +=
        text.value.charAt(cnt.value) === 'w' ? "<br/>" : text.value.charAt(cnt.value);
    cnt.value += 1;
    setTimeout(textIncrease, 10);
  } else {
    isShow.value = true;
  }
};


onMounted(() => {
  textIncrease();
});

watch(() => isShow.value, () => {
  let opt = 0;
  const intervalId = setInterval(() => {
    opt += 0.1;
    if (opt >= 1) {
      clearInterval(intervalId);
    }
    opacity.value = opt;
  }, 100);
});

watch(() => user.value.name, () => {
  if (!isCheckName.value) {
    isCheckName.value = true;
  }
});

watch(() => user.value.email, () => {
  if (isCheckEmail.value) {
    isCheckEmail.value = false;
  }
});

//패스워드 8자리 정규식 체크
watch(() => user.value.password, () => {
  const checkStrength = new RegExp("(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})");
  const passwordColor = document.getElementById("password-strength");
  if (checkStrength.test(user.value.password)) {
    isCheckPassword.value = true;
    passwordStrength.value = "안전";
    passwordColor.style.color = "green";
  } else {
    isCheckPassword.value = false;
    passwordStrength.value = "위험";
    passwordColor.style.color = "red";
  }
});

//패스워드와 패스워크 체크 일치 체크
watch(() => user.value.passwordCheck, () => {
  if (user.value.password === user.value.passwordCheck) {
    passwordText.value = "패스워드가 일치합니다";
    isPasswordCheck.value = true;
    return;
  }
  passwordText.value = "패스워드가 일치하지 않습니다.";
  isPasswordCheck.value = false;
});


const validateUsername = async (name) => {
  await existsUsername(name).then((response) => {
    isCheckName.value = response.data.data;
    if (isCheckName.value) {
      alert("이미 사용중인 닉네임 입니다.");
    }
  }).catch((error) => {
    console.log(error);
  });
};

//test
const validateEmail = async (email) => {
  await existsEmail(email).then((response) => {
    console.log(response.data.data);
  })
}

const signUp = async () => {
  await signUpUser(user.value).then(() => {
    alert("노브레인에 오신 것을 환영합니다.");
    home();
  }).catch((error) => {
    alert("빈칸을 확인해주세요.");
    console.log(error);
  })
};
const home = () => {
  router.push("/");
};
</script>

<style scoped>

.parallax {
  height: 100vh;
  position: relative;
}

.mainLogo {
  height: 190px;
  cursor: pointer;
  filter: invert(55%) sepia(22%) saturate(7378%) hue-rotate(167deg) brightness(99%) contrast(98%);
}

.card {
  background-image: linear-gradient(to right, #B388FF, #8C9EFF, #84FFFF, #CCFF90);
  top: 22% ;
  left: 50%;
  width: 500px;
  height: auto;
  transform: translate(-50%, 0%);
  border: 1px solid;
  border-radius: 0.5rem;
  position: fixed;
  transition: opacity 1s;
}

#mainText {
  font-family: neoFont, serif;
  min-width: 1rem;
  font-size: 1rem;
  top: 15%;
  left: 50%;
  text-align: center;
  padding: 30px 0;
  position: absolute;
  transform: translate(-50%, -50%);
}

.card-text1 {
  color: #3949AB;
  font-size: 1.2rem;
  font-weight: bold;
}

.password-text {
  font-size: 12pt;
  font-weight: bold;
}

</style>
