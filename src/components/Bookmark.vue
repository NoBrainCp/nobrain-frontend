<template>
  <v-col>
    <v-row>
      <v-col v-for="n in 7" :key="n" cols="auto">

          <v-hover>
            <template v-slot:default="{ hover }">
              <v-card
                  class="mx-auto"
                  max-width="388"
              >
                <v-img src="https://cdn.vuetifyjs.com/images/cards/forest-art.jpg">
                  <v-col>
                    <v-btn
                        icon="mdi-star"
                        color="secondary"
                        height="40"
                        width="40"
                    ></v-btn>
                  </v-col>
                </v-img>

                <v-card-text>
                  <h2 class="text-h6 primary--text">
                    Title
                  </h2>
                  Description
                </v-card-text>

                <v-card-title>
                  <v-rating
                      :value="4"
                      dense
                      color="orange"
                      background-color="orange"
                      hover
                      class="mr-2"
                  ></v-rating>


                  <span class="primary--text text-subtitle-2">Date</span>
                </v-card-title>

                <v-fade-transition>
                  <v-overlay
                      v-if="hover"
                      absolute
                      color="#036358"
                  >
                    <v-btn>See more info</v-btn>
                  </v-overlay>
                </v-fade-transition>
              </v-card>
            </template>
          </v-hover>

      </v-col>
    </v-row>
  </v-col>
</template>

<script>
  export default {
    name: 'Bookmark',
    data: () => ({
      overlay: false,
    }),
  }
</script>

<style scoped>
.v-card:hover {
  transition: opacity .4s ease-in-out;
}

/*.v-card:not(.on-hover) {*/
/*  opacity: 0.6;*/
/*}*/

.show-btns {
  color: rgba(255, 255, 255, 1) !important;
}
</style>