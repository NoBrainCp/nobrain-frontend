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
                          <SignUpDialog v-bind:dialog="dialogObj"/>
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
                          <SignUpDialog v-bind:dialog="dialogObj"/>
                        </v-btn>
                      </v-col>
                    </v-row>
                    <v-text-field
                        v-model="user.password"
                        label="Password"
                        bg-color="white"
                        hint="????????? ??????????????? ????????? 8?????? ??????"
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
                        hint="-??? ????????? ????????? ??????"
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
                        <!-- ????????? ??????: (id or name) not check  -->
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
                            ????????? ????????? ????????????.
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
                            ????????? ????????? ????????????.
                          </v-card-title>
                          <v-card-actions style="margin-top: 10%">
                            <v-btn color="primary" block @click="dialog = false"
                            >Close
                            </v-btn
                            >
                          </v-card-actions>
                        </v-card>
                        <!-- ????????? ??????, ???????????? ??????, ???????????? ????????? -->
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

                        <!-- ????????? ?????? -->
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
                            >????????? ????????? ??????
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

<script>
import SignUpDialog from "../../components/dialog/SignUpDialog.vue";
import {signUpUser} from "../../api";
import {existsLoginId, existsUsername} from "../../api/user/userApi";

export default {
  name: "SignUp",
  components: {SignUpDialog},
  data: () => ({
    user: {
      name: "",
      email: "",
      loginId: "",
      password: "",
      passwordCheck: "",
      phoneNumber: "",
      birthDate: "",
    },

    rules: {
      name: v => !!v || '???????????? ?????? ?????? ???????????????.',
      email: v => !!v || '???????????? ?????? ?????? ???????????????.',
      loginId: v => !!v || '????????? ID??? ?????? ?????? ???????????????',
      password: v => !!v || '??????????????? ?????? ?????? ???????????????.',
      phoneNumber: v => !!v || '????????? ????????? ?????? ?????? ???????????????.'
    },

    dialogObj: {
      title: "",
      isShow: false,
      isExist: false,
    },

    isExistsName: true,
    isExistsId: true,
    isExistsEmail: "",
    isSubmit: "",
    isError: "",
    dialog: false,
    dialogId: false,
    dialogName: false,
    errorMessage: "",
  }),

  methods: {
    async validateUsername(name) {
      try {
        const response = await existsUsername(name);
        this.isExistsName = response.data.data;
        this.dialogObj.isExist = response.data.data;

        if (this.dialogObj.isExist) {
          this.dialogObj.title = "?????? ???????????? ????????? ?????????.";
        } else {
          this.dialogObj.title = "?????? ????????? ????????? ?????????.";
        }
      } catch (err) {
        this.dialogObj.isExist = true;
        this.dialogObj.title = "????????? ??? ?????? ????????? ?????????.";
      }
    },

    async validateLoginId(loginId) {
      try {
        const response = await existsLoginId(loginId);
        this.isExistsId = response.data.data;
        this.dialogObj.isExist = response.data.data;

        if (this.dialogObj.isExist) {
          this.dialogObj.title = "?????? ???????????? ????????? ?????????.";
        } else {
          this.dialogObj.title = "?????? ????????? ????????? ?????????.";
        }
      } catch (err) {
        this.dialogObj.isExist = true;
        this.dialogObj.title = "????????? ??? ?????? ????????? ?????????.";
      }
    },

    async signUp() {
      try {
        this.isError = 200;
        if (this.isExistsId === false && this.isExistsName === false) {
          this.user.birthDate = document.querySelector("#date").value;
          const data = await signUpUser(this.user);
          this.isSubmit = data.data.success;
        }
      } catch (err) {
        this.isError = err.response.data.status;
        this.errorMessage = err.response.data.message;
      }
    },
  },
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
