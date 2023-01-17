<template>
  <v-app id="inspire">
    <v-app-bar
      app
      color="light-blue"
      flat
      height="100"
    >
      <v-container class="py-0 fill-height">
        <v-avatar
          class="mr-12"
          color="grey darken-1"
          size="50"
        ></v-avatar>

        <v-btn
          v-for="link in links"
          :key="link"
          text
        >
          {{ link }}
        </v-btn>

        <v-spacer></v-spacer>

        <v-responsive max-width="260">
          <v-text-field
            dense
            flat
            hide-details
            rounded
            solo-inverted
          ></v-text-field>
        </v-responsive>
      </v-container>
    </v-app-bar>

    <v-main class="grey lighten-3">
      <v-container>
        <v-row>
          <v-col cols="2">
            <v-sheet rounded="lg">
              <v-list color="transparent">
                <v-list-item
                  v-for="n in 5"
                  :key="n"
                  link
                >
                  <v-list-item-content>
                    <v-list-item-title>
                      List Item {{ n }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-divider class="my-2"></v-divider>

                <v-list-item
                  link
                  color="grey lighten-4"
                >
                  <v-list-item-content>
                    <v-list-item-title>
                      Star
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-sheet>
          </v-col>

          <v-col>
            <v-sheet
              min-height="70vh"
              rounded="lg"
            >
              <v-row>
                <v-col v-for="n in 31" :key="n" cols="auto">
                  <v-card height="150" width="150">

                    <v-card-title class="white text-center py-3">Title</v-card-title>
                    <v-card-text>Text</v-card-text>
                    
                    <v-card-actions class="justify-center">
                      <v-btn color="red lighten-1" text @click="reserve">
                        REMOVE
                      </v-btn>
                    </v-card-actions>

                  </v-card>
                </v-col>
              </v-row>
              <!--  -->
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
  export default {
    data: () => ({
      links: [
        'Dashboard',
        'Messages',
        'Profile',
        'Updates',
      ],
    }),
  }
</script>