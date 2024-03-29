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
                  :src="followUser.profileImage === null ? '../src/assets/images/user-no-image.png' : followUser.profileImage"
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
              <span class="bookmark-text">{{ followUser.bookmarkCount }}개</span>
            </div>
            <div class="follow-container">
              <div class="follow-text">
                팔로워
                <span class="follow-count">{{ followUser.followerCount }}</span>
              </div>
              <div class="follow-text">
                팔로잉
                <span class="follow-count">{{ followUser.followingCount }}</span>
              </div>
            </div>
            <v-btn
                v-if="myName !== followUser.username"
                :color="followUser.isFollow ? '#E53935' : '#03A9F4'"
                class="follow-btn"
                @click="clickFollow(followUser.userId, followUser.username)">
              <v-icon class="follow-icon">
                {{ followUser.isFollow ? 'mdi-account-multiple-minus' : 'mdi-account-multiple-plus' }}
              </v-icon>
              {{ followUser.isFollow ? '팔로우 취소' : '팔로우' }}
            </v-btn>
          </div>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
import {onMounted, ref, watch} from "vue";
import {useRoute} from "vue-router";
import {followStore} from "../../store/follow/follow";
import router from "../../router";
import {
  followAndUnfollow,
  getFollowCount,
  getFollowerList,
  getFollowingList,
} from "../../api/follow/followApi";
import {getUserIdFromStorage, getUsernameFromStorage} from "../../utils/storage";

const route = useRoute();
const username = ref(route.params.username);
const myName = ref(getUsernameFromStorage());
const followUsers = ref([]);


const getUserFollowers = async (username) => {
  await getFollowerList(username).then((response) => {
    followUsers.value = response.data.list;
  }).catch((error) => {
    console.log(error);
  })
};

const getUserFollowings = async (username) => {
  await getFollowingList(username).then((response) => {
    followUsers.value = response.data.list;
  }).catch((error) => {
    console.log(error);
  })
};

const setFollowUsers = async (value, username) => {
  if (value === 'follower') {
    await getUserFollowers(username);
  } else if (value === 'following') {
    await getUserFollowings(username);
  }
};

onMounted(async () => {
  try {
    const value = followStore.state.followWindow;
    await setFollowUsers(value, username.value);
  } catch (error) {
    console.log(error);
  }
});

watch(() => followStore.state.followWindow, (newValue) => {
  setFollowUsers(newValue, username.value);
});

watch(() => followStore.state.cardStatus, (newValue) => {
  const username = getUsernameFromStorage();
  const followUser = followUsers.value.find(follow => follow.username === username);

  if (newValue) {
    followUser.followingCount++;
  } else {
    followUser.followingCount--;
  }
});

watch(() => route.params.username, (newUsername) => {
    router.push(`/${newUsername}`);
    window.location.reload();
});

const moveToUser = (username) => {
  router.push(`/${username}`);
};

const clickFollow = async (userId, username) => {
  await followAndUnfollow(userId).then(() => {
    const followUser = followUsers.value.find(follow => follow.userId === userId);
    followUser.isFollow = !followUser.isFollow;
    followStore.state.status = !followStore.state.status;

    getFollowCount(username).then((response) => {
      followUser.followerCount = response.data.data.followerCnt;
    });
  });

  setMyFollowingCnt();
};

const setMyFollowingCnt = () => {
  const username = getUsernameFromStorage();
  const followUser = followUsers.value.find(follow => follow.username === username);
  
  if (followUser !== undefined) {
    getFollowCount(username).then((response) => {
      followUser.followingCount = response.data.data.followingCnt;
    });
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
  border: 1px solid #0363f4;
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
  color: white;
  margin-right: 7px;
}

.follow-btn {
  width: 40%;
  color: white;
  border-radius: 30px;
  position: absolute;
  bottom: 15px;
  right: 25px;
}
</style>
