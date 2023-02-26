<template>
  <v-container id="container">
    <v-row align-content="center" justify="center" id="all">
      <v-col cols="12" sm="12" id="col">
        <v-card id="back" class="elevation-6 mt-10">
          <div id="row">
            <v-col cols="12" md="6">
              <v-card-text class="mt-15">
                <h2 class="text-center">Login in to Your Account</h2>
                <br />
                <h6 class="text-center grey--text">
                  Log in to your account so you can continue builiding
                </h6>
                <v-row align-center justify="center">
                  <v-col cols="12" sm="8" class="mt-8">
                    <v-text-field
                      label="Id"
                      bg-color="white"
                      color="blue"
                      v-model="id"
                    />
                    <v-text-field
                      label="Password"
                      bg-color="white"
                      color="blue"
                      type="password"
                      v-model="password"
                    />
                    <v-row>
                      <v-col cols="12" sm="7">
                        <v-checkbox
                          label="Remember Me"
                          class="mt-n5"
                          color="blue"
                          v-model="isRememberId"
                        >
                        </v-checkbox>
                      </v-col>
                    </v-row>
                    <v-btn
                      color="blue"
                      class="mt-n7"
                      dark
                      block
                      tile
                      @click="signIn()"
                    >
                      Log in
                    </v-btn>
                    <v-col cols="12" sm="10">
                      <a
                        class="caption text"
                        id="forgetpassword"
                        href="/forgetpassword"
                        >Did you forget your password?</a
                      >
                    </v-col>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-col>
            <v-col cols="12" md="6">
              <div style="padding: 30px 0"></div>
              <h3 class="text-center">Welcome to Nodrain.</h3>
              <div class="text-center">
                <img
                  class="center"
                  src="../../assets/imges/nobrainlogo.png"
                  alt="NobrainLogo"
                  style="width: 200px"
                />
              </div>
              <div class="text-center">
                <v-card-text class="white--text">
                  <h3 class="text-center">Don't Have an Account Yet?</h3>
                  <h6 class="text-center">Sign up here</h6>
                </v-card-text>
                <div class="text-center">
                  <v-btn
                    absolute="true"
                    tile
                    outlined
                    dark
                    to="/signup"
                    color="#BBDEFB"
                    >Sing up
                  </v-btn>
                </div>
              </div>
            </v-col>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import router from "../../router";

export default {
  name: "SignIn",
  data() {
    return {
      id: this.$cookies.get("loginIdCookie"),
      password: "",
      isRememberId: true,
    };
  },

  methods: {
    async signIn() {
      try {
        let result = await axios
          .post("/api/signin", {
            loginId: this.id,
            password: this.password,
          })
          .then((res) => {
            let routerParam = res.data.data.username;

            if (res.status === 200) {
              let id = this.id;
              let password = this.password;
              // this.store.dispatch("login", {id, password});

              if (this.isRememberId) {
                this.$cookies.set("loginIdCookie", this.id);
              }

              router.push({
                name: "main",
                params: {
                  username: routerParam,
                },
              });
            }
          });
      } catch (err) {
        // alert(err.response.data.message);
        console.log(err);
      }
    },
  },
};
</script>

<style scoped>
#all {
  margin-top: 2%;
}

#col {
  display: flex;
  align-items: center;
  justify-content: center;
}

#back {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 85%;
  height: 100%;
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

.v-text-field label {
  font-weight: bold;
}

#row {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

#forgetpassword {
  color: black;
  font-weight: bold;
  font-size: 17px;
  text-decoration-line: none;
}

#forgetpassword:hover {
  color: rgb(101, 104, 189);
  text-decoration-line: underline;
}

.v-col-sm-12 {
  height: 800px;
}
</style>
