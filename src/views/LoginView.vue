<template>
  <v-container>
    <v-row align-content="center" justify="center">
      <v-col cols="12" sm="10">
        <v-card class="elevation-6 mt-8">
          <v-window v-model="step">
            <v-window-item :value="1">
              <v-row>
                <v-col cols="12" md="6">
                  <v-card-text class="mt-12">
                    <h2 class="text-center">Login in to Your Account</h2>
                    <br />
                    <h6 class="text-center grey--text">
                      Log in to your account so you can continue builiding
                    </h6>
                    <v-row align-center justify="center">
                      <v-col cols="12" sm="8">
                        <v-text-field
                          label="Id"
                          outlined
                          dense
                          color="blue"
                          autocomplete="fasle"
                          class="mt-8"
                        />
                        <v-text-field
                          label="Password"
                          outlined
                          dense
                          color="blue"
                          autocomplete="false"
                          type="password"
                        />
                        <v-row>
                          <v-col cols="12" sm="7">
                            <v-checkbox
                              label="Remember Me"
                              class="mt-n5"
                              color="blue"
                            >
                            </v-checkbox>
                          </v-col>
                        </v-row>

                        <v-btn color="blue" class="mt-n7" dark block tile
                          >Log in</v-btn
                        >
                        <v-col cols="12" sm="10">
                          <span class="caption blue--text"
                            >Did you forget your password?</span
                          >
                        </v-col>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-col>
                <v-col cols="12" md="6">
                  <div style="padding: 30px 0"></div>
                  <h3 class="text-center">Welcome to Nodrain.</h3>
                  <img
                    class="center"
                    src="/src/assets/nobrainlogo.png"
                    alt="NobrainLogo"
                    style="
                      height: 200px;
                      width: 200px;
                      object-fit: cover;
                      margin-left: 29%;
                    "
                  />
                  <div style="text-align: center">
                    <v-card-text class="white--text">
                      <h3 class="text-center">Don't Have an Account Yet?</h3>
                      <h6 class="text-center">Sign up here</h6>
                    </v-card-text>
                    <div class="text-center">
                      <v-btn absolute="true" tile outlined dark @click="step++"
                        >Sing up</v-btn
                      >
                    </div>
                  </div>
                </v-col>
              </v-row>
            </v-window-item>
            <v-window-item :value="2">
              <v-row>
                <v-col cols="12" md="6" class="blue rounded-br-xl">
                  <div style="text-align: center; padding: 180px 0">
                    <v-card-text class="white--text">
                      <h3 class="text-center">Alredy Signed up?</h3>
                      <h6 class="text-center">
                        Log in to your account so you can continue building
                        and<br />
                        editing your onboarding flows
                      </h6>
                    </v-card-text>
                    <div class="text-center">
                      <br />
                      <v-btn tile outlined dark @click="step--">Log in</v-btn>
                    </div>
                  </div>
                </v-col>

                <v-col cols="12" md="6">
                  <v-card-text class="mt-12">
                    <h2 class="text-center">Sign Up for an Account</h2>
                    <br />
                    <h6 class="text-center grey--text">
                      Let's get you all set up so you can start creatin your
                      <br />
                      first onboarding experiance
                    </h6>
                    <v-row align-center justify="center">
                      <v-col cols="12" sm="8">
                        <v-text-field
                          label="Name"
                          outlined
                          dense
                          color="blue"
                          autocomplete="false"
                          class="mt-4"
                        />

                        <v-text-field
                          label="Email"
                          outlined
                          dense
                          color="blue"
                          autocomplete="false"
                        />
                        <v-text-field
                          label="Id"
                          outlined
                          dense
                          color="blue"
                          autocomplete="false"
                        />
                        <v-text-field
                          label="Password"
                          outlined
                          dense
                          color="blue"
                          autocomplete="false"
                          type="password"
                        />

                        <v-text-field
                          label="PhoneNumber"
                          outlined
                          dense
                          color="blue"
                          autocomplete="false"
                        />
                        <v-text-field
                          label="Birthdate"
                          outlined
                          dense
                          color="blue"
                          autocomplete="false"
                        />
                        <div style="padding: 10px 0"></div>
                        <v-btn color="blue" dark block tile>Sign up</v-btn>

                        <div style="padding: 10px 0"></div>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-col>
              </v-row>
            </v-window-item>
          </v-window>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    step: 1,
  }),
  props: {
    source: String,
  },
};
</script>
<style scoped>
.v-application .rounded-bl-xl {
  border-bottom-left-radius: 300px !important;
}
.v-application .rounded-br-xl {
  border-bottom-right-radius: 300px !important;
}
</style>
