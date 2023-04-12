<template>
  <v-container class="profile-container">
    <v-row>
      <v-col class="main-container">
        <div class="headerFont header-container">
          <div class="text-h4">
            <v-icon class="mdi mdi-account-circle mb-2 mr-2" style="color:#03A9F4"/>
            <span class="header-title">회원정보 수정</span>
          </div>
          <v-spacer></v-spacer>
          <v-btn
              class="open-close-btn"
              color="blue"
              elevation="3"
              @click="information">
            {{ buttonState }}
          </v-btn>
        </div>
        <v-divider class="border-opacity-100 ml-5 mr-5"></v-divider>
        <div class="mt-6">
          <v-expansion-panels
              variant="popout"
              v-model="panel"
              multiple
          >
            <v-expansion-panel value="name" elevation="6" @click="clickPanels('name')">
              <v-expansion-panel-title
                  color="blue"
              >
                닉네임 변경
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                <v-card>
                  <v-row class="ml-1 mt-2">
                    <v-col cols="12" sm="8">
                      <v-text-field
                          v-model="name"
                          variant="outlined"
                          prepend-inner-icon="mdi-rename"
                          :label="myInfo.username"
                          bg-color="white"
                          color="blue"
                      />
                    </v-col>
                    <v-col cols="12" sm="4">
                      <v-btn
                          color="blue"
                          width="100"
                          height="52"
                          variant="outlined"
                          class="btn-change-name"
                          elevation="3"
                          @click="changeUsername(name)"
                      >
                        변경하기
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-card>
              </v-expansion-panel-text>
            </v-expansion-panel>
            <v-expansion-panel value="profile" elevation="6" @click="clickPanels('profile')">
              <v-expansion-panel-title
                  color="blue"
              >
                프로필 이미지 변경
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                <v-card>
                  <v-row class="ml-1 mt-2">
                    <v-col cols="12" sm="3">
                      <div class="mt-7">
                        ㆍ프로필 이미지
                        <v-spacer/>
                        (최대 2MB 이미지까지 업로드 하실 수 있어요)
                        (gif,png,jpg,jpeg 확장자인 이미지 파일을 업로드 하실 수 있어요)
                      </div>
                    </v-col>
                    <v-col cols="12" sm="6" class="img-container">
                      <v-img
                          class="profile-img"
                          width="250"
                          height="250"
                          :src="myInfo.urlProfileImage"
                      >
                      </v-img>
                    </v-col>
                    <v-col cols="12" sm="3" class="btn-profile-container">
                      <v-row class="mt-1 mr-2" justify="end">
                        <v-btn
                            color="light-blue"
                            class="text-none mr-5"
                            elevation="3"
                            min-width="130"
                            height="50"
                            variant="outlined"
                            prepend-icon="mdi mdi-upload"
                            @click="updateProfileImg"
                        >
                          변경하기
                        </v-btn>
                      </v-row>
                      <v-row justify="end">
                        <v-btn
                            class="mt-5 mr-10"
                            elevation="3"
                            width="130"
                            height="50"
                            variant="outlined"
                            prepend-icon="mdi mdi-delete"
                            color="red"
                            @click="deleteProfileImg"
                        >
                          삭제하기
                        </v-btn>
                      </v-row>
                      <v-row justify="end">
                        <v-btn
                            class="mt-15 mr-10"
                            elevation="3"
                            width="130"
                            height="50"
                            variant="outlined"
                            prepend-icon="mdi mdi-file"
                            color="grey"
                            @click="imgFileObj.dialog = true;"
                        >
                          파일 가져오기
                        </v-btn>
                        <ImageFileDialog
                            :imgFileObj="imgFileObj"
                            @submit="onFileChanged"
                        />
                      </v-row>
                    </v-col>
                  </v-row>
                </v-card>
              </v-expansion-panel-text>
            </v-expansion-panel>
            <v-expansion-panel value="email" elevation="6" @click="clickPanels('email')">
              <v-expansion-panel-title
                  color="blue">
                이메일 인증
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                <v-card>
                  <v-row class="ml-1 mt-2">
                    <v-col cols="12" sm="8">
                      <v-text-field
                          variant="outlined"
                          prepend-inner-icon="mdi-email"
                          bg-color="white"
                          color="blue"
                      >{{ myInfo.email }}
                      </v-text-field>
                      <div class="font-weight-light ml-3 mb-3">
                        No brain 을 제한없이 사용하기 위해 E-mail 인증을 해주세요.
                      </div>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <v-btn
                          color="blue"
                          class="btn"
                          elevation="3"
                          width="100"
                          height="52"
                          variant="outlined"
                          @click="sendAuthentication"
                      >
                        인증하기
                      </v-btn>
                      <AuthDialog
                          :authObj="authObj"
                          @submit="checkAuthCode"
                      />
                    </v-col>
                  </v-row>
                </v-card>
              </v-expansion-panel-text>
            </v-expansion-panel>
            <v-expansion-panel value="password" elevation="6" @click="clickPanels('password')">
              <v-expansion-panel-title
                  color="blue">
                비밀번호 변경하기
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                <v-card>
                  <v-row class="ml-1 mt-2">
                    <v-col cols="12" sm="8">
                      <v-text-field
                          v-model="passwordData.prePassword"
                          variant="outlined"
                          label="현재 비밀번호"
                          prepend-inner-icon="mdi-lock"
                          bg-color="white"
                          type="password"
                          color="blue"
                      />
                      <v-text-field
                          v-model="passwordData.newPassword"
                          variant="outlined"
                          label="새로운 비밀번호"
                          hint="숫자와 특수문자를 포함한 8글자 이상"
                          prepend-inner-icon="mdi-lock"
                          type="password"
                          bg-color="white"
                          color="blue"
                      />
                      <v-text-field
                          v-model="passwordData.passwordCheck"
                          variant="outlined"
                          label="비밀번호 확인"
                          type="password"
                          prepend-inner-icon="mdi-lock"
                          bg-color="white"
                          color="blue"
                      />
                    </v-col>
                    <v-col cols="12" sm="4" class="justify-sm-end">
                      <v-btn
                          color="blue"
                          class="btn-change-password"
                          elevation="3"
                          width="100"
                          height="52"
                          variant="outlined"
                          @click="changeUserPassword"
                      >
                        변경하기
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-card>
              </v-expansion-panel-text>
            </v-expansion-panel>
            <v-expansion-panel value="deactivate" elevation="6" @click="clickPanels('deactivate')">
              <v-expansion-panel-title
                  color="blue">
                회원 탈퇴
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                <v-card>
                  <v-row class="ml-1 mt-2">
                    <v-col cols="12" sm="8">
                      <v-text-field
                          v-model="username"
                          variant="outlined"
                          prepend-inner-icon="mdi-account"
                          bg-color="white"
                          color="blue"
                          label="닉네임"
                          :hint="myInfo.username"
                      >
                      </v-text-field>
                      <div class="font-weight-light ml-3 mb-3">
                        No brain 을 탈퇴하기 위해서는 닉네임을 입력해야 합니다.
                      </div>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <v-btn
                          color="red"
                          class="btn"
                          elevation="3"
                          width="100"
                          height="52"
                          variant="outlined"
                          @click="validateUsername"
                      >
                        탈퇴하기
                      </v-btn>
                      <ConfirmDialog
                          :confirmObj="confirmObj"
                          @delete="deleteAccount"
                          @close="closeConfirmDialog"
                      />
                    </v-col>
                  </v-row>
                </v-card>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import router from "../../router";
import {userStore} from "../../store/user/user";
import ImageFileDialog from "../dialog/ImageFileDialog.vue";
import AuthDialog from "../dialog/AuthDialog.vue";
import ConfirmDialog from "../dialog/ConfirmDialog.vue";
import {
  changeName,
  changePassword,
  changeProfileImage, deactivateAccount, deleteProfileImage,
  getMyProfile
} from "../../api/user/userApi";
import {onMounted, ref, watch} from "vue";
import {sendAuthenticationMail, sendEmailAndCode} from "../../api/mail/mailApi";
import {
  clearStorage,
  getEmailFromStorage,
  getUserIdFromStorage,
  getUsernameFromStorage,
  saveUsernameToStorage
} from "../../utils/storage";


const panel = ref(['name']);
const buttonState = ref('Open All');
const name = ref("");
const username = ref("");
const passwordData = ref({
  prePassword: "",
  newPassword: "",
  passwordCheck: "",
});

const confirmObj = ref({
  dialog: false,
  title: "회원 탈퇴",
  text: "정말 No brain 을 탈퇴 하시겠습니까?",
  buttonText: "탈퇴"
});

const myInfo = ref({
  username: getUsernameFromStorage(),
  email: getEmailFromStorage(),
  profileImage: {},
  urlProfileImage: '',
});

const imgFileObj = ref({
  dialog: false,
  title: "프로필 이미지 변경",
  files: [],
  imgUrl: ""
})

const authObj = ref({
  dialog: false,
})

watch(() => (myInfo.value.profileImage), (newValue) => {
  myInfo.value.profileImage = newValue;
})

watch(() => (userStore.state.status), async () => {
  const myProfile = await getMyProfile();
  myInfo.value.username = myProfile.data.data.username;
})

onMounted(async () => {
  try {
    const myProfile = await getMyProfile();
    myInfo.value.username = myProfile.data.data.username;
    myInfo.value.email = myProfile.data.data.email;
    myInfo.value.urlProfileImage = myProfile.data.data.profileImage;
    if (myInfo.value.profileImage === null) {
      myInfo.value.profileImage = "src/assets/images/nobrain-no-image.png";
    }
  } catch (error) {
    console.log(error);
  }
});

const information = () => {
  if (buttonState.value === 'Close All') {
    panel.value = [];
    buttonState.value = 'Open All';
  } else {
    panel.value = ['name', 'profile', 'email', 'password', 'deactivate'];
    buttonState.value = 'Close All';
  }
};

const changeUsername = async () => {
  await changeName({
    newName: name.value
  }).then(() => {
    saveUsernameToStorage(name.value);
    userStore.state.status = !userStore.state.status;
    userStore.commit('setUsername', name.value);
    router.replace(`/${name.value}`);
    name.value = "";
    alert("변경이 완료되었습니다.");
  }).catch((error) => {
    console.log(error);
    alert("동일한 닉네임이 존재합니다.");
  })
};

const onFileChanged = (file) => {
  if (file.map(file => file.size) > 2000000) {
    alert("이미지의 크기가 적절하지 않습니다.");
    return;
  }
  myInfo.value.profileImage = file[0];
  myInfo.value.urlProfileImage = URL.createObjectURL(file[0]);
};

const updateProfileImg = async () => {
  await changeProfileImage(myInfo.value.profileImage).then(() => {
    userStore.commit("setProfileImage", myInfo.value.urlProfileImage);
    alert("변경이 완료되었습니다.");
  }).catch((error) => {
    alert("이미지를 선택해주세요");
    console.log(error);
  })
};

const deleteProfileImg = async () => {
  await deleteProfileImage().then(() => {
    myInfo.value.urlProfileImage = null;
    userStore.commit("setProfileImage", myInfo.value.urlProfileImage);
    alert("삭제가 완료되었습니다.");
  }).catch((error) => {
    alert("이미지 삭제 실패");
    console.log(error);
  })
};

const sendAuthentication = async() => {
  authObj.value.dialog = true;
  await sendAuthenticationMail(myInfo.value.email).then(() => {
  }).catch((error) => {
    console.log(error);
  })
};

const checkAuthCode = async(authCode) => {
  await sendEmailAndCode(myInfo.value.email, authCode).then(() => {
    alert("인증이 성공 하였습니다.");
  }).catch((error) => {
    alert("인증번호가 일치하지 않습니다.");
    console.log(error);
  })
};

const changeUserPassword = async() => {
  await changePassword(passwordData.value).then(() => {
    alert("비밀번호가 변경되었습니다.");
    passwordData.value = {};
  }).catch((error) => {
    console.log(error);
    alert("비밀번호가 변경되지 않았습니다.");
  })
};

const validateUsername = () => {
  if (username.value === myInfo.value.username) {
    confirmObj.value.dialog = true;
  } else {
    alert("사용자의 닉네임이 일치하지 않습니다.");
  }
};

const deleteAccount = async () => {
  await deactivateAccount(getUserIdFromStorage()).then(() => {
    confirmObj.value.dialog = false;
    alert("회원 탈퇴가 완료되었습니다.");
    clearStorage();
    router.replace('/');
  }).catch((error) => {
    console.log(error);
  })
};

const closeConfirmDialog = () => {
  confirmObj.value.dialog = false;
};

const clickPanels = (value) => {
  panel.value = [value];
  buttonState.value = "Open All";
};
</script>

<style scoped>
.profile-container {
  margin-left: 0;
  width: 70%;
}

@media (max-width: 1800px) {
  .profile-container {
    width: 80%;
  }
}

@media (max-width: 1500px) {
  .profile-container {
    width: 90%;
  }
}

@media (max-width: 1200px) {
  .profile-container {
    width: 100%;
  }
}

.main-container {
  position: relative;
  right: 15px;
  bottom: 50px;
}

.header-container {
  display: flex;
  margin: 0 20px;
}

.open-close-btn {
  margin-top: 15px;
}

.img-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.profile-img {
  border-radius: 100%;
  border: 2px solid lightgray;
  margin: 0 200px 5%;
}

.btn-change-password {
  position: absolute;
  bottom: 21px;
}
</style>
