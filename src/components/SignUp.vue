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
                          v-model="name"
                          label="Nickname"
                          id="name"
                          bg-color="white"
                          color="blue"
                        />
                      </v-col>
                      <v-col col="12" sm="2">
                        <v-btn color="#BBDEFB" class="mt-2"> check </v-btn>
                      </v-col>
                    </v-row>

                    <v-text-field
                      v-model="email"
                      label="Email"
                      id="email"
                      bg-color="white"
                      color="blue"
                    />
                    <v-row>
                      <v-col col="12" sm="10">
                        <v-text-field
                          v-model="id"
                          label="Id"
                          id="id"
                          bg-color="white"
                          color="blue"
                        />
                      </v-col>
                      <v-col col="12" sm="2">
                        <v-btn color="#BBDEFB" class="mt-2"> check </v-btn>
                      </v-col>
                    </v-row>

                    <v-text-field
                      v-model="password"
                      label="Password"
                      id="password"
                      bg-color="white"
                      hint="숫자와 특수문자를 포함한 8글자 이상"
                      color="blue"
                      type="password"
                    />
                    <v-text-field
                      v-model="passwordcheck"
                      label="Password check"
                      bg-color="white"
                      color="blue"
                      type="password"
                    />

                    <v-text-field
                      v-model="phonenumber"
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
                        name="date"
                        id="currentDate"
                        style="margin: 0 5px; float: right"
                      />
                    </v-row>

                    <div style="padding: 10px 0"></div>
                    <v-btn color="blue" dark block tile @click="send()"
                      >Sign up</v-btn
                    >
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
export default {
  name: "SignUp",

  data: () => ({
    name: "",
    email: "",
    id: "",
    password: "",
    phonenumber: "",
  }),
  methods: {
    send() {
      console.log(data);
      axios.post("/api/signup", this.data);
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
</style>
