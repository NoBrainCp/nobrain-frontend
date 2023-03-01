<template>
  <v-navigation-drawer
      width="320"
      v-model="drawer"
      :rail="rail"
      permanent
      @click="rail = false"
      style="position: fixed"
  >
    <v-list-item
        prepend-avatar="https://randomuser.me/api/portraits/men/89.jpg"
        nav
        title="Yoon"
        subtitle="leeyt1201@gmail.com"
        class="account-item"
    >

      <template v-slot:append>
        <v-btn
            variant="text"
            icon="mdi-chevron-left"
            @click.stop="rail = !rail"
        ></v-btn>
      </template>
    </v-list-item>

    <div v-if="!rail" id="follow-container">
      <a href="#" class="follow-items">팔로워: {{user.follower}}</a>
      <a href="#" class="follow-items" id="following">팔로잉: {{user.following}}</a>
    </div>

    <div v-if="!rail" class="follow-btn-container">
      <v-btn id="follow-btn" class="btn" :color="followButton.color" @click="clickFollow()">
        <v-icon id="follow-icon">{{followButton.icon}}</v-icon>
        {{followButton.text}}
      </v-btn>
    </div>

    <div v-if="!rail" id="btn-container">
      <v-btn class="btn btn-show-all" color="#00BCD4" prepend-icon="mdi mdi-text-box-multiple">
        전체보기
      </v-btn>
      <v-btn class="btn" color="#009688" prepend-icon="mdi mdi-bookmark">
        북마크 추가
      </v-btn>
    </div>

    <v-divider v-if="rail" class="account-divider"></v-divider>

    <v-list density="compact" nav>
      <div class="category-header-container" v-if="!rail">
        <v-list-subheader class="category-header">카테고리</v-list-subheader>
        <v-btn size="25" icon="mdi-plus"></v-btn>
      </div>

      <v-divider v-if="!rail"></v-divider>

      <v-list-item v-for="(category, i) in categories" :key="i"
                   :value="category" active-color="light-blue">
        <template v-slot:prepend>
          <v-icon :icon="category.icon"></v-icon>
        </template>
        <v-list-item-title v-text="category.text"></v-list-item-title>
      </v-list-item>
    </v-list>

  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'Side',
  data () {
    return {
      drawer: true,
      rail: false,

      user: {
        name: "Yoon",
        follower: 100,
        following: 10
      },

      categories: [
        { text: 'My Files', icon: 'mdi-folder' },
        { text: 'Shared with me', icon: 'mdi-account-multiple' },
        { text: 'Starred', icon: 'mdi-star' },
        { text: 'Recent', icon: 'mdi-history' },
        { text: 'Offline', icon: 'mdi-check-circle' },
        { text: 'Uploads', icon: 'mdi-upload' },
        { text: 'Backups', icon: 'mdi-cloud-upload' },
      ],

      followButton: {
        text: "팔로우",
        color: "#03A9F4",
        icon: "mdi mdi-account-multiple-plus",
      },

      follow: true,
    }
  },

  methods: {
    clickFollow() {
      this.follow = !this.follow;

      if (this.follow) {
        this.followButton.text = "팔로우 취소";
        this.followButton.color = "#E53935";
        this.followButton.icon = "mdi mdi-account-multiple-minus"
      } else {
        this.followButton.text = "팔로우";
        this.followButton.color = "#03A9F4";
        this.followButton.icon = "mdi mdi-account-multiple-plus"
      }
    }
  }
}
</script>

<style scoped>
.account-item {
  margin-top: 10px;
}

.account-divider {
  margin-top: 10px;
}

.follow-items {
  font-size: 14px;
  color: black;
  text-decoration: none;
}

.follow-items:hover {
  color: #03A9F4;
  text-decoration: underline;
  text-underline: #03A9F4;
}

#follow-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  font-weight: 500;
}

#following {
  margin-left: 20px;
}

.follow-btn-container {
  display: flex;
  justify-content: center;
}

#follow-icon {
  margin-right: 8px;
}

#follow-btn {
  width: 305px;
  height: 50px;
  background: #03A9F4;
  font-size: 15px;
}

.btn-show-all {
  margin-right: 5px;
}

#btn-container {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
  margin-top: 15px;
}

.btn {
  width: 150px;
  height: 65px;
  color: white;
  font-size: 13px;
  font-weight: bold;
  border-radius: 10px;
}

.category-header-container {
  display: flex;
  justify-content: space-between;
  margin-top: 25px;
}

.category-list {
  margin-top: 20px;
}

.category-header {
  font-size: 15px;
  font-weight: bold;
}
</style>