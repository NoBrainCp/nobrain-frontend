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
            {{ this.btnState }}
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
                          @click="changeName(name)"
                      >
                        <!--클릭시 닉네임 판별 + 변경 메소드-->
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
                          :src="myInfo.profileImage"
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
                          variant="outlined"
                          label="현재 비밀번호"
                          prepend-inner-icon="mdi-lock"
                          bg-color="white"
                          color="blue"
                      />
                      <v-text-field
                          variant="outlined"
                          label="새로운 비밀번호"
                          hint="숫자와 특수문자를 포함한 8글자 이상"
                          prepend-inner-icon="mdi-lock"
                          bg-color="white"
                          color="blue"
                      />
                      <v-text-field
                          variant="outlined"
                          label="비밀번호 확인"
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
                          @click=""
                      >
                        변경하기
                      </v-btn>
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

<script>
import {changeName, changeProfileImage, getMyProfile} from "../../api/user/userApi";
import {
  deleteUsernameFromCookie,
  getEmailFromCookie,
  getUserIdFromCookie,
  getUsernameFromCookie,
  saveUsernameToCookie
} from "../../utils/cookies";
import router from "../../router";
import {userStore} from "../../store/user/user";
import {onMounted, ref, watch} from "vue";
import ImageFileDialog from "../dialog/ImageFileDialog.vue";
import AuthDialog from "../dialog/AuthDialog.vue";
import {sendAuthenticationMail, sendEmailAndCode} from "../../api/mail/mailApi";

export default {
  name: 'profile',
  components: {AuthDialog, ImageFileDialog},

  data: () => ({
    panel: ['name'],
    btnState: "Open All",
    name: "",
  }),

  setup() {
    const myInfo = ref({
      username: getUsernameFromCookie(),
      email: getEmailFromCookie(),
      profileImage: ""
    });

    const imgFileObj = ref({
      dialog: false,
      title: "프로필 이미지 변경",
      files: [],
      // imgFile: null,
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
        myInfo.value.profileImage = myProfile.data.data.profileImage;
        if (myInfo.value.profileImage === null) {
          myInfo.value.profileImage = "src/assets/images/nobrain-no-image.png";
        }
      } catch (error) {
        console.log(error);
      }
    });

    return {myInfo, imgFileObj, authObj};
  },

  methods: {
    information() {
      if (this.btnState === "Close All") {
        this.panel = [];
        this.btnState = "Open All"
      } else {
        this.panel = ['name', 'profile', 'email', 'password'];
        this.btnState = "Close All"
      }
    },

    async changeName(name) {
      try {
        await changeName(getUserIdFromCookie(), name);
        deleteUsernameFromCookie();
        saveUsernameToCookie(name);
        userStore.state.status = !userStore.state.status;
        userStore.commit('setUsername', name);
        alert("변경이 완료되었습니다.");
        this.name = "";
        await router.push(`/${name}`);
      } catch (error) {
        alert("동일한 닉네임이 존재합니다.");
      }
    },

    onFileChanged(file) {
      if (file.map(v => v.size) > 2000000) {
        alert("이미지의 크기가 적절하지 않습니다.");
        return;
      }
      console.log(file[0]);
      this.myInfo.profileImage = URL.createObjectURL(file[0]);
      console.log(this.myInfo.profileImage);
    },

    async updateProfileImg() {
      try {
        await changeProfileImage(this.myInfo.profileImage);
        userStore.commit("setProfileImage", this.myInfo.profileImage);
      } catch (error) {
        alert(error);
      }
    },

    deleteProfileImg() {
      this.imgFileObj.imgUrl = "src/assets/images/nobrain-no-image.png";
    },

    sendAuthentication() {
      try {
        this.authObj.dialog = true;
        const email = getEmailFromCookie();
        sendAuthenticationMail(email);
      } catch (error) {
        console.log(error);
      }
    },

    async checkAuthCode(authCode) {
      try {
        const email = getEmailFromCookie();
        console.log(authCode);
        await sendEmailAndCode(email, authCode);
        alert("인증이 성공 하였습니다.");
      } catch {
        console.log(authCode);
        alert("인증번호가 일치하지 않습니다.");
      }

    },

    clickPanels(pan) {
      this.panel = [pan];
      this.btnState = "Open All";
    },


  },
}
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