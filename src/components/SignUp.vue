<template>
  <v-container>
    <v-row align-content="center" justify="center">
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
                          @click="namecheck(user.name)"
                        >
                          check
                        </v-btn>
                      </v-col>
                    </v-row>
                    <!-- <div>{{ isExistsName }}</div> -->
                    <p id="exists-name" v-if="isExistsName === true">
                      이미 존재하는 닉네임 입니다.
                    </p>
                    <p id="notexists-name" v-if="isExistsName === false">
                      사용 가능한 닉네임 입니다.
                    </p>
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
                        <v-btn color="#BBDEFB" class="mt-2">
                          <!-- @click="idcheck" -->
                          check
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
                      v-model="user.passwordcheck"
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
                        id="date"
                        style="margin: 0 5px; float: right"
                      />
                    </v-row>

                    <div style="padding: 10px 0"></div>

                    <v-btn color="blue" dark block tile @click="send()"
                      >Sign up
                      <v-dialog v-model="dialog" activator="parent">
                        <v-card
                          v-if="isSubmit === true"
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
                    <p></p>
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
import axios from "axios";
import { ref, onMounted } from "vue";
export default {
  name: "SignUp",

  data() {
    return {
      dialog: false,
    };
  },
  data: () => ({
    user: {
      name: "",
      email: "",
      loginId: "",
      password: "",
      passwordcheck: "",
      phoneNumber: "",
      birthDate: "",
    },
    isExistsName: "",
    isSubmit: "",
  }),
  methods: {
    // goSignIn(){
    //   this.$router.push("")
    // }
    async namecheck(name) {
      let result = axios
        .get("/api/username/" + name + "/exists")
        .then((res) => {
          this.isExistsName = res.data.data;
          console.log(this.isExistsName);
          console.log(res.data.data);
        });
      // return data.isExistsName;
    },
    // async idcheck() {
    //   let result = axios.post("http://localhost:3000/memo", {
    //     loginId: this.loginId,
    //   });
    // },
    async send() {
      // const data = reactive({
      //   success: false,
      //   messeage: "",
      // });
      let result = await axios
        .post("/api/signup", {
          name: this.user.name,
          email: this.user.email,
          loginId: this.user.loginId,
          password: this.user.password,
          passwordcheck: this.user.passwordcheck,
          phoneNumber: this.user.phoneNumber,
          birthDate: document.querySelector("#date").value,
        })
        .then((res) => {
          console.log(res.data);
          console.log(res.data.success);
          this.isSubmit = res.data.success;

          // console.log(data.message);
        });
      // return { data };
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
  background-image: url("../assets/imges/background.jpg");
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

#exists-name {
  color: red;
  font-size: 15px;
  font-weight: bold;
  text-align: left;
  top: 3;
}

#notexists-name {
  color: blue;
  font-size: 15px;
  font-weight: bold;
  text-align: left;
}
.v-input__details {
  display: none;
}
</style>
