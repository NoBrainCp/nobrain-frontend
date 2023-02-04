<template>
  <v-container>
    <v-row align-content="center" justify="center" id="all">
      <v-col cols="12" sm="10">
        <v-card class="elevation-6 mt-8" id="back">
          <v-row>
            <v-col cols="12" md="2" class="blue rounded-br-xl"> </v-col> 
            <v-col cols="12" md="8">
              <v-card-text class="mt-12">
                <h1 class="text-center">Sign Up for an Account</h1>
                <br />
                <h5 class="text-center grey--text">
                  Let's get you all set up so you can start creatin your
                  <br />
                  <br />
                </h5>
                <v-row align-center justify="center">
                  <v-col cols="12" sm="12">
                    <v-row>
                      <v-col col="12" sm="10">
                        <v-text-field
                          v-model="user.name"
                          label="Nickname"
                          id="name"
                          bg-color="white"
                          color="blue"
                        />
                      </v-col>
                      <v-col col="12" sm="2">
                        <v-btn
                          color="#BBDEFB"
                          class="mt-2"
                          @click="checkDuplicationName()"
                          >
                          <!-- TODO: CHECK! 함수에 user.name 지운 이유는 script 단에서 vue라는 spa의 특징중 하나인 데이터의 양방향 바인딩이 가능해서 
                             script 단에서 user.value.name으로 바로 사용 가능함-->
                          <!-- @click="checkDuplicationName(user.name)" -->
                          check
                          <!-- namecheck dialog -->
                          <SignUpDialog v-bind:dialog="dialogObj"/>
                        </v-btn>
                      </v-col>
                    </v-row>
                    <v-text-field
                      v-model="user.email"
                      label="Email"
                      id="email"
                      bg-color="white"
                      color="blue"
                    />
                    <v-row>
                      <v-col col="12" sm="10">
                        <v-text-field
                          v-model="user.loginId"
                          label="Id"
                          id="account"
                          bg-color="white"
                          color="blue"
                        />
                      </v-col>
                      <v-col col="12" sm="2">
                        <v-btn
                          color="#BBDEFB"
                          class="mt-2"
                          @click="checkDuplicationId(user.loginId)"
                        >
                          check
                          <!-- idcheck dialog -->
                          <SignUpDialog v-bind:dialog="dialogObj"/>
                        </v-btn>
                      </v-col>
                    </v-row>
                    <v-text-field
                      v-model="user.password"
                      label="Password"
                      id="password"
                      bg-color="white"
                      hint="숫자와 특수문자를 포함한 8글자 이상"
                      color="blue"
                      type="password"
                    />
                    <v-text-field
                      v-model="user.passwordCheck"
                      label="Password check"
                      bg-color="white"
                      color="blue"
                      type="password"
                    />

                    <v-text-field
                      v-model="user.phoneNumber"
                      label="Phone number"
                      id="phonenumber"
                      bg-color="white"
                      hint="-를 제외한 핸드폰 번호"
                      color="blue"
                    />
                    <v-row>
                      <label
                        for="Date"
                        class="ma-5"
                        style="font-size: 22px; color: #363636"
                        >BirthDay</label
                      >
                      <input
                        type="date"
                        name="Currentdate"
                        v-model=user.birthDate
                        id="date"
                        style="margin: 0 5px; float: right"
                      />
                    </v-row>
                    <div style="padding: 10px 0"></div>
                    <v-btn color="blue" dark block tile @click="send()"
                      >Sign up
                      <v-dialog v-model="dialog" activator="parent">
                        <!-- 로그인 실패: (id or name) not check  -->
                        <v-card
                          v-if="
                            isExistsId === true ||
                            isExistsId === '' ||
                            isExistsName === true ||
                            isExistsName === ''
                          "
                          class="mx-auto"
                          max-width="500"
                          style="width: 500px; height: 200px"
                        >
                          <v-card-title
                            class="text-center"
                            style="margin-top: 10%"
                          >
                            닉네임 혹은 아이디 체크를 해주세요.
                          </v-card-title>
                          <v-card-actions style="margin-top: 10%">
                            <v-btn color="primary" block @click="dialog = false"
                              >Close</v-btn
                            >
                          </v-card-actions>
                        </v-card>

                        <!-- 이메일과 전화번호 중복 -->
                        <v-card
                          v-if="isError === 400"
                          class="mx-auto"
                          max-width="500"
                          style="width: 500px; height: 200px"
                        >
                          <v-card-title
                            class="text-center"
                            style="margin-top: 10%"
                          >
                            이메일 또는 전화번호가 중복 되었습니다.
                          </v-card-title>
                          <v-card-actions style="margin-top: 10%">
                            <v-btn color="primary" block @click="dialog = false"
                              >Close</v-btn
                            >
                          </v-card-actions>
                        </v-card>

                        <!-- 로그인 성공 -->
                        <v-card
                          v-if="
                            isSubmit === true &&
                            isExistsId === false &&
                            isExistsName === false
                          "
                          class="mx-auto"
                          max-width="500"
                          style="width: 500px; height: 200px"
                        >
                          <v-card-title
                            class="text-center"
                            style="margin-top: 10%"
                          >
                            Welcome to Nobrain
                          </v-card-title>
                          <v-card-actions style="margin-top: 10%">
                            <v-btn
                              color="primary"
                              block
                              @click="dialog = false"
                              to="/signin"
                              >로그인 창으로 이동</v-btn
                            >
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </v-btn>
                    <!-- <p>{{ isError }}</p> -->
                    <div style="padding: 10px 0"></div>
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

<script setup>
/**
 * vue 페이지 구성중 Vue3의 script단은 options API와 composition API를 사용하여 개발 진행할 수 있음
 * 여기서 options API와 composition API를 혼용하여 사용하게 되면 lifecycle hook이 뒤틀려 에러를 뿜어낼수 있음
 * lifecycle hook 참고 -> https://vuejs.org/guide/essentials/lifecycle.html#lifecycle-diagram
 * 
 * 현재 NoBrain은 Vue3의 composition 과 options 둘 다 사용하고 있기 때문에 코드의 일관성이 떨어짐
 * 그래서 composition API로 통일하여 개발 진행 하고자함
 * 
 * composition API 샘플코드 -> https://vuejs.org/examples/#simple-component
 * props 샘플 코드 -> https://vuejs.org/tutorial/#step-12
 * emit 샘플 코드 -> https://vuejs.org/tutorial/#step-13
 * 
 * #compostions api 사용시 주의사항
 * this는 사용할 수 없음 
 * script단에서 ref로 선언한 변수를 사용시 .value를 써줘야 사용가능
 * ex) const testNm = ref('테스트 네임');
 *     console.log("textNm 호출" , testNm.value);
 */

 /**
  * TODO:
  * 1. axios 는 src/api 폴더 만든후 공통으로 사용 
  * 2. SignUpDialog 쪽도 composition 적용 해야함
  * 3. dialog 같은 건 공통으로 뺴는 연습 -> 현재 validation 부분의 dialog가 하드코딩 되있음
  * 4. 일단은 composition api의 구조로 변경했을떄의 소스이니 구조만 익히셈
  */
import axios from "axios";
import { ref } from "vue";
import SignUpDialog from "../../components/dialog/SignUpDialog.vue";

const user = ref({
  name: "",
  email: "",
  loginId: "",
  password: "",
  passwordCheck: "",
  phoneNumber: "",
  birthDate: "",
});

const dialogObj = ref(
  {
    title: "",
    isShow: false,
    isExist: false,
  },
)

const isExistsName = ref("");
const isExistsId = ref("");
const isExistsEmail = ref("");
const isSubmit = ref("");
const isError = ref("");
const dialog = ref(false);
const dialogId = ref(false);
const dialogName = ref(false);

const checkDuplicationName = () => {
  console.log("check Dupli name : ", user.value.name);
  axios.get("/api/username/" + user.value.name + "/exists")
      .then((res) => {
        isExistsName.value = res.data.data;
        dialogObj.value.isExist = res.data.data;
        if (dialogObj.value.isExist) {
          dialogObj.value.title = "이미 존재하는 닉네임 입니다.";
        } else {
          dialogObj.value.title = "사용 가능한 닉네임 입니다.";
        }
      })
      .catch((err) => {
        dialogObj.value.isExist = true;
        dialogObj.value.title = "가입할 수 없는 닉네임 입니다.";
      });
};

const checkDuplicationId = (loginId) => {
  axios.get("/api/loginId/" + loginId + "/exists")
      .then((res) => {
        isExistsId.value = res.data.data;
        dialogObj.value.isExist = res.data.data;
        if (dialogObj.value.isExist) {
          dialogObj.value.title = "이미 존재하는 아이디 입니다.";
        } else {
          dialogObj.value.title = "사용 가능한 아이디 입니다.";
        }
      })
      .catch((err) => {
        dialogObj.value.isExist = true;
        dialogObj.value.title = "가입할 수 없는 아이디 입니다.";
      });
}

const send = async () => {
  try {
    // isError.value = 200;
    if (isExistsId.value === false && isExistsName.value === false) {
      const params = {
        name: user.value.name,
        email: user.value.email,
        loginId: user.value.loginId,
        password: user.value.password,
        passwordCheck: user.value.passwordCheck,
        phoneNumber: user.value.phoneNumber,
        //birthDate: document.querySelector("#date").value,
        birthDate: user.value.birthDate,
      }
      console.log("Methods Send Param : ", params)
      let result = await axios.post("/api/signup", params );
      isSubmit.value = result.data.success;
    }
  } catch (err) {
    isError.value = err.response.data.status;
  }
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
  background-image: url("../../assets/imges/background.jpg");
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  opacity: 0.5;
}
#currentDate {
  size: 10px;
}

#exists {
  color: red;
  font-size: 15px;
  font-weight: bold;
  text-align: left;
  top: 3;
}

#notexists {
  color: blue;
  font-size: 15px;
  font-weight: bold;
  text-align: left;
}
.v-input__details {
  display: none;
}
#all {
  margin-top: 3%;
}
</style>
