<template>
  <v-app-bar height="100" style="position: fixed" flat border>
    <img
        src="../assets/images/logo_transparent.png"
        alt="nobrain-logo"
        class="logo"
        @click="home"

    />

    <v-text-field
        v-model="searchObj.text"
        class="search-input"
        placeholder="Search"
        append-icon="mdi-magnify"
        @keyup="search"
    >

      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn
              class="search-btn"
              type="submit"
              append-icon="mdi mdi-menu-down"
              v-bind="props"
          >
            {{searchObj.condition}}
          </v-btn>
        </template>
        <v-list class="search-item-list">
          <v-list-item
              v-for="(item, index) in searchConditions"
              :key="index"
              :value="index"
              @click="selectSearchCondition(item.title)"
              class="search-items"
          >
            <v-list-item-title
                :value="item.title">
              {{ item.title }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

    </v-text-field>

    <v-spacer/>
    <v-spacer/>

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
            elevation="3"
            class="account-chip"
        >
          <v-avatar start>
            <v-img src="https://cdn.vuetifyjs.com/images/john.jpg"></v-img>
          </v-avatar>
          {{store.state.username}}
        </v-chip>
      </template>

      <v-card width="300">
        <v-list bg-color="light-blue">
          <v-list-item class="search-list">
            <template v-slot:prepend>
              <v-avatar image="https://cdn.vuetifyjs.com/images/john.jpg"></v-avatar>
            </template>

            <v-list-item-title>{{myInfo.username}}</v-list-item-title>

            <v-list-item-subtitle>{{myInfo.email}}</v-list-item-subtitle>

            <template v-slot:append>
              <v-list-item-action>
                <v-btn
                    icon
                    variant="text"
                    @click="menu=!menu"
                >
                  <v-icon>mdi-close-circle</v-icon>
                </v-btn>
              </v-list-item-action>
            </template>
          </v-list-item>
        </v-list>

        <v-list>
          <v-list-item @click="$emit('setting', 'setting')">
            <v-list-item-content>
              <div class="account-container">
                <v-icon class="mdi mdi-cog"></v-icon>
                <v-list-item-title class="account-title">Setting</v-list-item-title>
              </div>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <div class="account-container">
                <v-icon class="mdi mdi-logout"></v-icon>
                <v-list-item-title class="account-title">Logout</v-list-item-title>
              </div>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>
  </v-app-bar>
</template>


<script>
import {store} from "../store";
import {getEmailFromCookie, getUsernameFromCookie} from "../utils/cookies";
import router from "../router";
import mainView from "../views/MainView.vue";

export default {
  name: 'Headed',
  computed: {
    store() {
      return store
    }
  },
  data () {
    return {
      myInfo: {
        username: getUsernameFromCookie(),
        email: getEmailFromCookie(),
      },

      menus: [
        { title: "Setting", icon: "mdi-cog" },
        { title: "Logout", icon: "mdi-logout" },
      ],

      searchConditions: [
        { title: "MY" },
        { title: "FOLLOW" },
        { title: "ALL" }
      ],

      searchObj: {
        condition: "My",
        text: "",
      },

      menu: false,
      gridView: false,
    }
  },

  methods: {
    search() {
      console.log(this.searchObj.text);
      console.log(this.searchObj.condition);
    },

    home() {
      router.push("/"+getUsernameFromCookie());
    },

    selectSearchCondition(title) {
      this.searchObj.condition = title;
    }
  }
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
  margin-left: 75px;
  height: 60px;
}

.search-btn {
  width: 160px;
  height: 50px;
  position: relative;
  bottom: 1px;
  right: 14px;
  background-color: #03A9F4;
  border-radius: 100px;
  color: white;
  font-size: 15px;
}

.search-item-list {
  border: 2px solid #03A9F4;
}

.search-items {
  display: flex;
  justify-content: center;
  width: 150px;
  margin: 0 auto;
  border-radius: 10px;
  color: #03A9F4;
  font-weight: bold;
}

.search-items:hover {
  background: rgba(192, 186, 186, 0.38);
}

.account-chip {
  display: flex;
  justify-content: center;
  height: 40px;
  width: 110px;
  margin-right: 60px;
}

.account-chip:hover {
  background: #03A9F4;
  opacity: 0.7;
  color: white;
}

.account-container {
  display: flex;
}

.account-title {
  margin-left: 20px;
}
</style>

<style>
.v-input__control {
  display: flex;
  align-items: center;
  height: 55px;
}

.search-input .v-field__overlay {
  display: none !important;
}

.search-input .v-field__outline {
  display: none !important;
}

.v-input--horizontal .v-input__append {
  cursor: pointer;
  padding-right: 20px;
}

.v-menu .v-overlay__content {
  border-radius: 20px;
}
</style>

