<template>
  <v-container>
    <v-row align-content="center" justify="center">
      <v-col cols="12" sm="10">
        <v-card class="elevation-6 mt-8">
          <v-row>
            <v-col cols="12" md="4" class="blue rounded-br-xl">
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

            <v-col cols="12" md="8">
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
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'SignUp',
}
</script>

<style scoped>

</style>