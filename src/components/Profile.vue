<template>
  <v-container>
    <v-row>
      <v-col>
        <div class="headerFont mb-2">
          <v-icon class="mdi mdi-account-circle mb-2 mr-2" style="color:#03A9F4"/>
          회원정보 수정
          <v-btn
              class="close-btn"
              color="blue"
              @click="information"
          >{{ this.btnState }}
          </v-btn>
        </div>
        <v-divider class="border-opacity-100"></v-divider>
        <div class="mt-6">
          <v-expansion-panels
              variant="popout"
              v-model="panel"
              multiple
          >
            <v-expansion-panel value="name">
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
                          variant="outlined"
                          prepend-inner-icon="mdi-rename"
                          :label=store.state.username
                          bg-color="white"
                          color="blue"
                      />
                    </v-col>
                    <v-col cols="12" sm="4">
                      <v-btn
                          color="blue"
                          class="btn"
                          @click=""
                      >
                        <!--클릭시 닉네임 판별 + 변경 메소드-->
                        변경하기
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-card>
              </v-expansion-panel-text>
            </v-expansion-panel>
            <v-expansion-panel value="profile">
              <v-expansion-panel-title
                  color="blue"
              >
                프로필 이미지 변경
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                <v-card>
                  <v-row class="ml-1 mt-2">
                    <v-col cols="12" sm="4">
                      <div class="mt-7">
                        ㆍ프로필 이미지<br>
                        (최대 2MB 이미지까지 업로드 하실 수 있어요)
                        (gif,png,jpg,jpeg 확장자인 이미지 파일을 업로드 하실 수 있어요)
                      </div>
                    </v-col>
                    <v-col cols="12" sm="5">
                      <v-img
                          class="profile-img"
                          :width="250"
                          :height="250"
                          src="src/assets/images/nobrain-no-image.png"
                      />
                    </v-col>
                    <v-col cols="12" sm="3">
                      <v-btn
                          class="btn mt-10"
                          color="blue">
                        변경하기
                      </v-btn>
                      <v-btn
                          class="btn mt-10"
                          color="red">
                        삭제하기
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-card>
              </v-expansion-panel-text>
            </v-expansion-panel>
            <v-expansion-panel value="email">
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
                      >{{ store.state.userEmail }}
                      </v-text-field>
                      <div class="font-weight-light ml-3 mb-3">
                        No brain을 제한없이 사용하기 위해 E-mail 인증을 해주세요.
                      </div>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <v-btn
                          color="blue"
                          class="btn"
                          @click=""
                      >
                        인증하기
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-card>
              </v-expansion-panel-text>
            </v-expansion-panel>
            <v-expansion-panel value="password">
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
                          class="btn"
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
import {store} from "../store";

export default {
  name: 'profile',
  computed: {
    store() {
      return store
    }
  },

  data: () => ({
    panel: ['name', 'profile', 'email', 'password'],
    btnState: "Close All"
  }),

  methods: {
    information() {
      if (this.btnState==="Close All") {
        this.panel = [];
        this.btnState = "Open All"
      } else {
        this.panel = ['name', 'profile', 'email', 'password'];
        this.btnState = "Close All"
      }
    }
  }
}
</script>

<style>
.headerFont {
  font-size: 40px;
}

.btn {
  margin-top: 2%;
  margin-left: 10%;
  height: 40%;
  width: 50%;
}

.profile-img {
  border-radius: 100%;
  border: 2px solid lightgray;
  margin-bottom: 5%;
}

.close-btn {
  margin-left: 45%;
}

</style>