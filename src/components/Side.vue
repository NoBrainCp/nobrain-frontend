<template>
  <v-navigation-drawer
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
    >
<!--      <h3>-->
<!--        {{user.name}}-->
<!--      </h3>-->

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

    <div v-if="!rail" id="btn-container">
      <v-btn class="btn" color="light-blue" height="50">
        전체보기
      </v-btn>
      <v-btn class="btn" color="red-lighten-1" height="50">
        팔로우
      </v-btn>
    </div>

    <hr/>

    <v-list class="category-list" density="compact" nav>
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
      rail: true,
    }
  },
}
</script>

<style scoped>
#follow-container {
  display: flex;
  justify-content: center;
  margin-left: 10px;
  margin-bottom: 20px;
}

#following {
  margin-left: 10px;
}

.follow-items {
  font-size: 14px;
  color: black;
  text-decoration: none;
}

.follow-items:hover {
  color: cornflowerblue;
  text-underline: cornflowerblue;
}

#btn-container {
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 10px;
}

.btn {
  width: 45%;
  font-size: 13px;
}

.category-header-container {
  display: flex;
  justify-content: space-between;
}

.category-list {
  margin-top: 20px;
}

.category-header {
  font-size: 15px;
  font-weight: bold;
}
</style>