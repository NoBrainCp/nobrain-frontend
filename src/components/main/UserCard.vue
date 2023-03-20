<template>
  <v-row class="card-row">
    <v-col v-for="followUser in followUsers"
           :key="followUser.userId"
           cols="auto">
      <v-card class="user-card">
        <div class="card-container">
          <div class="card-left">
            <div class="image-container justify-center align-center">
              <v-img
                  cover
                  class="user-profile-image"
                  :src="followUser.profileImage === null ? '../src/assets/images/nobrain-no-image.png' : followUser.profileImage"
                  @click="moveToUser(followUser.username)">
              </v-img>
            </div>
            <h3 class="text-center text-username" @click="moveToUser(followUser.username)">
              {{ followUser.username }}
            </h3>
          </div>
          <div>
            <div class="bookmark-text-container">
              <div class="bookmark-icon">Bookmark</div>
              <span class="bookmark-text">15개</span>
            </div>
            <div class="follow-container">
              <div class="follow-text">
                팔로우
                <span class="follow-count">15</span>
              </div>
              <div class="follow-text">
                팔로잉
                <span class="follow-count">10</span>
              </div>
            </div>
            <v-btn
                color="red-darken-1"
                class="follow-btn"
                @click="clickFollow">
              <v-icon class="follow-icon">mdi mdi-account-multiple-minus</v-icon>
              팔로우 취소
            </v-btn>
          </div>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import {onMounted, ref, toRefs, watch, watchEffect} from "vue";
import {useRoute} from "vue-router";
import {followStore} from "../../store/follow/follow";
import router from "../../router";
import {
  followAndUnfollow,
  getFollowCount,
  getFollowerList,
  getFollowingList,
  isFollow
} from "../../api/follow/followApi";

export default {
  name: 'UserCard',

  setup() {
    const route = useRoute();
    const username = route.params.username;
    const followUsers = ref([]);
    const data = ref({
      followObj: {
        followerCount: 0,
        followingCount: 0,
        follow: Boolean,

        followButton: {
          text: '',
          color: String,
          icon: String,
        }
      },
    });

    // watchEffect(async () => {
    //   const window = followStore.state.window;
    //   console.log("USER CARD WATCH EFFECT");
    //   setFollowUsers(window, username);
    // }, {
    //   lazy: false,
    //   deep: false
    // });

    watch(() => (followStore.state.followWindow), (newValue) => {
      const username = route.params.username;
      console.log("USER CARD WATCH");
      setFollowUsers(newValue, username);
    });

    onMounted(async () => {
      try {
        const username = route.params.username;
        const value = followStore.state.followWindow;
        console.log("USER CARD ON MOUNTED");
        setFollowUsers(value, username);
        const follow = await isFollow(data.user.userId);
        data.value.followObj.follow = follow.data.data;
      } catch (error) {
        console.log(error);
      }
    });

    const showFollowCount = async () => {
      try {
        const followCount = await getFollowCount(username);
        data.value.followObj.followerCount = followCount.data.data.followerCnt;
        data.value.followObj.followingCount = followCount.data.data.followingCnt;
      } catch (error) {
        alert(error.response.data.message);
      }
    };

    watch(() => data.value.followObj.follow, (newValue) => {
      const followButton = data.value.followObj.followButton;
      followButton.text = newValue ? "팔로우 취소" : "팔로우";
      followButton.color = newValue ? "#E53935" : "#03A9F4";
      followButton.icon = newValue ? "mdi mdi-account-multiple-minus" : "mdi mdi-account-multiple-plus";
      showFollowCount();
    });

    watch(() => followStore.state.followWindow, (newValue) => {
      setFollowUsers(newValue, username);
      console.log(newValue);
    })

    const setFollowUsers = (value, username) => {
      if (value === 'follower') {
        getUserFollowers(username);
      } else if (value === 'following') {
        getUserFollowings(username);
      }
    };

    const getUserFollowers = async (username) => {
      try {
        const response = await getFollowerList(username);
        followUsers.value = response.data.list;
      } catch (error) {
        console.log(error);
      }
    };

    const getUserFollowings = async (username) => {
      try {
        const response = await getFollowingList(username);
        followUsers.value = response.data.list;
        console.log(response.data.list);
      } catch (error) {
        console.log(error);
      }
    };

    return {
      followUsers,
      ...toRefs(data)
    }
  },

  methods: {
    moveToUser(username) {
      router.push(`/${username}`).then(() => {
        window.location.reload();
      });
    },

    async clickFollow() {
      await followAndUnfollow(this.user.userId);
      this.data.followObj.follow = !this.data.followObj.follow;
    },
  }
}
</script>

<style scoped>
.card-row {
  margin: 1px 0 15px 1px;
}

.user-card {
  width: 350px;
  height: 200px;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.6);
  transition: box-shadow 0.3s ease-in-out;
}

.user-card:hover {
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.6);
}

.card-container {
  display: flex;
}

.card-left {
  width: 50%;
  height: 100%;
}

.card-left:hover {
  color: #03A9F4;
}

.card-left:hover .image-container {
  border: 1px solid #03A9F4;
}

.user-profile-image {
  cursor: pointer;
  width: 100%;
  height: 100%;
}

.image-container {
  margin: 7px 0 5px 10px;
  width: 150px;
  height: 150px;
  border: 1px solid #d2d2d2;
  border-radius: 130px;
  overflow: hidden;
  display: flex;
  align-content: center;
}

.text-username:hover {
  cursor: pointer;
}

.bookmark-text-container {
  display: flex;
  margin: 17px 0 0 20px;
}

.bookmark-icon {
  width: 75px;
  display: flex;
  align-content: center;
  justify-content: center;

  margin-right: 5px;
  font-size: 12px;
  font-weight: 500;
  color: #9d9d9d;

  border: 2px solid #d2d2d2;
  border-radius: 10px;
}

.bookmark-text {
  margin-top: 1px;
  font-size: 12px;
  font-weight: 500;
  color: #9d9d9d;
}

.follow-container {
  margin: 15px 0 0 40px;
}

.follow-text {
  font-weight: 200;
}

.follow-count {
  margin-left: 5px;
  color: #03A9F4;
}

.follow-icon {
  margin-right: 7px;
}

.follow-btn {
  width: 40%;
  border-radius: 30px;
  position: absolute;
  bottom: 15px;
  right: 25px;
}
</style>