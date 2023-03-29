<template>
  <v-container>
    <v-row align-content="center" justify="center" id="all">
      <v-col cols="12" sm="10">
        <v-card class="elevation-6 mt-8" id="back">
          <v-row>
            <v-col cols="12" md="2" class="blue rounded-br-xl"></v-col>
            <v-col cols="12" md="8">
              <v-card-text class="mt-12">
                <h1 class="text-center">Sign Up for an Account</h1>
                <br/>
                <v-row align-center justify="center">
                  <v-col cols="12" sm="12">
                    <v-row>
                      <v-col col="12" sm="10">
                        <v-text-field
                            v-model="user.name"
                            label="Nickname"
                            bg-color="white"
                            color="blue"
                            maxlength="15"
                            clearable
                            :rules="[rules.name]"
                        />
                      </v-col>
                      <v-col col="12" sm="2">
                        <v-btn
                            color="#BBDEFB"
                            class="mt-2"
                            @click="validateUsername(user.name)"
                        >
                          check
                          <!-- nameCheck dialog -->
                          <SignUpDialog :dialogObj="dialogObj"/>
                        </v-btn>
                      </v-col>
                    </v-row>
                    <v-text-field
                        v-model="user.email"
                        label="E-mail"
                        bg-color="white"
                        color="blue"
                        clearable
                        :rules="[rules.email]"
                    />
                    <v-row>
                      <v-col col="12" sm="10">
                        <v-text-field
                            v-model="user.loginId"
                            label="Id"
                            bg-color="white"
                            color="blue"
                            maxlength="20"
                            clearable
                            :rules="[rules.loginId]"
                        />
                      </v-col>
                      <v-col col="12" sm="2">
                        <v-btn
                            color="#BBDEFB"
                            class="mt-2"
                            @click="validateLoginId(user.loginId)"
                        >
                          check
                          <!-- idCheck dialog -->
                          <SignUpDialog :dialogObj="dialogObj"/>
                        </v-btn>
                      </v-col>
                    </v-row>
                    <v-text-field
                        v-model="user.password"
                        label="Password"
                        bg-color="white"
                        hint="숫자와 특수문자를 포함한 8글자 이상"
                        color="blue"
                        type="password"
                        maxlength="25"
                        clearable
                        :rules="[rules.password]"
                    />
                    <v-text-field
                        v-model="user.passwordCheck"
                        label="Password check"
                        bg-color="white"
                        color="blue"
                        type="password"
                        maxlength="25"
                        clearable
                    />

                    <v-text-field
                        v-model="user.phoneNumber"
                        label="Phone number"
                        bg-color="white"
                        hint="-를 제외한 핸드폰 번호"
                        color="blue"
                        maxlength="15"
                        oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"
                        clearable
                        :rules="[rules.phoneNumber]"
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
                          name="currentDate"
                          id="date"
                          style="margin: 0 5px; float: right"
                      />
                    </v-row>
                    <div style="padding: 10px 0"></div>
                    <v-btn color="blue" dark block tile @click="signUp()"
                    >Sign up
                      <v-dialog v-model="dialog" activator="parent">
                        <!-- 로그인 실패: (id or name) not check  -->
                        <v-card
                            v-if="isExistsName === true"
                            class="mx-auto"
                            max-width="500"
                            style="width: 500px; height: 200px"
                        >
                          <v-card-title
                              class="text-center"
                              style="margin-top: 10%"
                          >
                            닉네임 체크를 해주세요.
                          </v-card-title>
                          <v-card-actions style="margin-top: 10%">
                            <v-btn color="primary" block @click="dialog = false"
                            >Close
                            </v-btn
                            >
                          </v-card-actions>
                        </v-card>
                        <v-card
                            v-if="isExistsId === true"
                            class="mx-auto"
                            max-width="500"
                            style="width: 500px; height: 200px"
                        >
                          <v-card-title
                              class="text-center"
                              style="margin-top: 10%"
                          >
                            아이디 체크를 해주세요.
                          </v-card-title>
                          <v-card-actions style="margin-top: 10%">
                            <v-btn color="primary" block @click="dialog = false"
                            >Close
                            </v-btn
                            >
                          </v-card-actions>
                        </v-card>
                        <!-- 이메일 중복, 전화번호 중복, 패스워드 불일치 -->
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
                            {{ errorMessage }}
                          </v-card-title>
                          <v-card-actions style="margin-top: 10%">
                            <v-btn color="primary" block @click="dialog = false"
                            >Close
                            </v-btn
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
                            Welcome!
                          </v-card-title>
                          <v-card-actions style="margin-top: 10%">
                            <v-btn
                                color="primary"
                                block
                                @click="dialog = false"
                                to="/sign-in"
                            >로그인 창으로 이동
                            </v-btn
                            >
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </v-btn>
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
import SignUpDialog from "../../components/dialog/SignUpDialog.vue";
import {signUpUser} from "../../api/user/userApi";
import {existsLoginId, existsUsername} from "../../api/user/userApi";
import {ref} from "vue";

const user = ref({
  name: "",
  email: "",
  loginId: "",
  password: "",
  passwordCheck: "",
  phoneNumber: "",
  birthDate: "",
});

const dialogObj = ref({
  title: "",
  isShow: false,
  isExist: false,
});

const errorMessage = ref("");
const isExistsName = ref("");
const isExistsId = ref("");
const isSubmit = ref("");
const isError = ref("");
const dialog = ref(false);

const rules= ref({
  name: v => !!v || '닉네임은 필수 입력 항목입니다.',
  email: v => !!v || '이메일은 필수 입력 항목입니다.',
  loginId: v => !!v || '로그인 ID는 필수 입력 항목입니다',
  password: v => !!v || '비밀번호는 필수 입력 항목입니다.',
  phoneNumber: v => !!v || '핸드폰 번호는 필수 입력 항목입니다.'
});

const validateUsername = async (name) => {
  await existsUsername(name).then((response) => {
    isExistsName.value = response.data.data;
    dialogObj.value.isExist = response.data.data;
    if (dialogObj.value.isExist) {
      dialogObj.value.title = "이미 존재하는 닉네임 입니다.";
    } else {
      dialogObj.value.title = "사용 가능한 닉네임 입니다.";
    }
  }).catch((error) => {
    console.log(error);
    dialogObj.value.isExist = true;
    dialogObj.value.title = "가입할 수 없는 닉네임 입니다.";
  });
};

const validateLoginId = async(loginId) => {
  await existsLoginId(loginId).then((response) => {
    isExistsId.value = response.data.data;
    dialogObj.value.isExist = response.data.data;

    if (dialogObj.value.isExist) {
      dialogObj.value.title = "이미 존재하는 아이디 입니다.";
    } else {
      dialogObj.value.title = "사용 가능한 아이디 입니다.";
    }
  }).catch((error) => {
    console.log(error);
    dialogObj.value.isExist = true;
    dialogObj.value.title = "가입할 수 없는 아이디 입니다.";
  })
};

const signUp = async () => {
    isError.value = 200;
    if (!isExistsId.value && !isExistsName.value) {
      user.value.birthDate = document.querySelector('#date').value;
      await signUpUser(user.value).then((response) => {
        isSubmit.value = response.data.success;
      }).catch((error) => {
        isError.value = error.response.data.status;
        errorMessage.value = error.response.data.message;
      });
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
  background-image: url("../../assets/images/background.jpg");
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  opacity: 0.5;
}

#all {
  margin-top: 3%;
}

</style>
