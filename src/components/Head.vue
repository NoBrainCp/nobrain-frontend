<template>
  <v-app-bar height="100" style="position: fixed">
    <img
        src="../assets/images/logo_transparent.png"
        alt="nobrain-logo"
        class="logo"
    />

    <v-text-field
        class="search-input"
        placeholder="Search"
        append-icon="mdi-magnify"
    >
      <template #prepend-inner>
        <v-btn
            class="search-btn"
            type="submit"
            width="120"
            height="50"
            append-icon="mdi mdi-menu-down"
        >
          ALL
        </v-btn>
      </template>
    </v-text-field>

    <v-spacer></v-spacer>

    <v-menu
        v-model="menu"
        location="top start"
        origin="top start"
    >
      <template v-slot:activator="{ props }">
        <v-chip
            pill
            v-bind="props"
            link
            class="account-menu"
            color="light-blue"
        >
          <v-avatar start>
            <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img>
          </v-avatar>

          Yoon
        </v-chip>
      </template>

      <v-card width="300">
        <v-list bg-color="light-blue">
          <v-list-item>
            <template v-slot:prepend>
              <v-avatar image="https://cdn.vuetifyjs.com/images/john.png"></v-avatar>
            </template>

            <v-list-item-title>Yoon</v-list-item-title>

            <v-list-item-subtitle>Yoon@gmail.com</v-list-item-subtitle>

            <template v-slot:append>
              <v-list-item-action>
                <v-btn
                    icon
                    variant="text"
                    @click="menu = false"
                >
                  <v-icon>mdi-close-circle</v-icon>
                </v-btn>
              </v-list-item-action>
            </template>
          </v-list-item>
        </v-list>

        <v-list>
          <v-list-item v-for="(menu, index) in menus" :key="index" link>
            <v-list-item-content>
              <div class="account-container">
                <v-icon>{{menu.icon}}</v-icon>
                <v-list-item-title class="account-title">{{menu.title}}</v-list-item-title>
              </div>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>
  </v-app-bar>
</template>


<script>
export default {
  name: 'Headed',
  data () {
    return {
      menus: [
        { title: "Profile", icon: "mdi-account" },
        { title: "Change Password", icon: "mdi-key" },
        { title: "Setting", icon: "mdi-cog" },
        { title: "Logout", icon: "mdi-logout" },
      ],
      menu: false,
      gridView: false,
    }
  },
}
</script>

<style scoped>
.logo {
  width: 200px;
  cursor: pointer;
  margin-left: 30px;
  filter: invert(55%) sepia(22%) saturate(7378%) hue-rotate(167deg) brightness(99%) contrast(98%);
}

.search-input {
  border: 3px solid #03A9F4;
  border-radius: 100px;
  margin-left: 100px;
  height: 60px;
}

.search-btn {
  color: white;
  background-color: #03A9F4;
  border-radius: 100px;
  position: relative;
  bottom: 13px;
  right: 9px;
}

.account-menu {
  display: flex;
  justify-content: center;
  height: 40px;
  width: 110px;
  margin-right: 60px;
}

.account-container {
  display: flex;
}

.account-title {
  margin-left: 20px;
}
</style>