<template>
  <div class="line" />
  <v-row class="function-background mt-1 scroll-opacity">
    <img src="src/assets/images/light-on.png" alt="light" />
  </v-row>
  <v-row class="scroll-opacity">
    <v-col cols="12" sm="6">
      <div class="d-flex flex-column align-center ml-15">
        <h1 class="main-font">나의 북마크 등록, 공유</h1>
        <h4>
          Nobrain은 간편하게 북마크를 등록하고 사용자들과 공유할 수 있는 소셜
          북마킹 서비스입니다.
        </h4>
      </div>
    </v-col>
    <v-col cols="12" sm="6">
      <v-img
        class="start-page-body-img d-flex align-center mr-15"
        src="src/assets/images/login-page-img.png"
      />
    </v-col>
  </v-row>
  <h1 class="main-font d-flex align-center justify-center">다양한 기능 제공</h1>
  <div class="d-flex align-center justify-md-center mt-10 mr-15 ml-15">
    <v-timeline align="start">
      <v-timeline-item
        v-for="(item, i) in items"
        :key="i"
        fill-dot
        :icon="item.icon"
        :dot-color="item.color"
      >
        <v-card class="scroll-opacity">
          <v-card-title :class="`bg-${item.color}`">
            <h3 class="font-weight-bold ml-6" style="color: white">
              {{ item.title }}
            </h3>
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" sm="6">
                <div class="ml-6 mt-15 align-center justify-center">
                  <h3
                    :id="'item-text' + i"
                    class="font-weight-regular"
                    style="white-space: pre-line"
                  >
                    {{ item.text }}
                  </h3>
                </div>
              </v-col>
              <v-col cols="12" sm="6">
                <v-img :src="item.img" cover class="mt-10"> </v-img>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-timeline-item>
    </v-timeline>
  </div>
</template>
<script setup>
import { onMounted, ref } from "vue";

const items = ref([
  {
    color: "purple-lighten-2",
    title: "즐겨찾기 설정",
    icon: "mdi mdi-star-outline",
    text:
      "한번의 버튼 클릭으로 즐겨찾는 웹 페이지를 저장할 수 있는 편리한 기능입니다.<br><br>" +
      "URL을 기억하거나 페이지를 다시 검색할 필요 없이 <b class='text-blue'>즐겨찾기</b> 버튼을 클릭하여 저장된 북마크의 개인 컬렉션에 페이지를 추가할 수 있습니다.<br><br>" +
      "또한 즐겨찾기를 친구나 동료와 공유할 수도 있으므로 협업 및 검색을 위한 훌륭한 도구로 사용하세요.<br/><br/>" +
      "Nobrain 서비스의 <b class='text-blue'>즐겨찾기</b> 기능을 사용하면 정리된 상태를 유지하고 시간을 절약하며 새롭고 흥미로운 콘텐츠를 발견할 수 있습니다.<br><br>",
    img: "src/assets/images/login-page-favorite.png",
  },
  {
    color: "amber-lighten-1",
    title: "비공개 설정",
    icon: "mdi mdi-lock-outline",
    text:
      "<b class='text-blue'>비공개 설정</b> 기능은 저장된 북마크를 비공개로 유지하고 나만 액세스할 수 있는 기능입니다.<br/><br/>" +
      "즉, 개인 메모, 민감한 정보 또는 혼자만 보관하고 싶은 연구 자료와 같이 다른 사람과 공유하고 싶지 않은 웹 페이지를 저장할 수 있습니다.<br><br>" +
      "북마크를 다른 사람과 공유하기로 결정한 경우 언제든지 공유할 북마크와 비공개로 유지할 북마크를 선택할 수 있습니다. <br><br>" +
      "이렇게 하면 저장된 콘텐츠를 완벽하게 제어할 수 있으므로 필요에 가장 적합한 방식으로 소셜 북마크 서비스를 사용할 수 있습니다.<br><br>",
    img: "src/assets/images/login-page-public.png",
  },
  {
    color: "cyan-lighten-1",
    title: "태그 설정",
    icon: "mdi mdi-tag-outline",
    text:
      "<b class='text-blue'>태그 설정</b> 기능은 설명 태그를 추가하여 저장된 책갈피를 구성할 수 있는 유용한 도구입니다.<br><br>" +
      "태그를 사용하여 저장된 책갈피를 구성하면 원하는 페이지를 쉽고 빠르게 찾을 수 있습니다. 또한 저장된 페이지가 많거나 여러 웹 페이지를 추적해야 하는 프로젝트에서 작업하는 경우에" +
      "특히 유용할 수 있습니다.<br><br>" +
      "전반적으로 태그 설정 기능은 정리를 유지하고 시간을 절약하며 새로운 콘텐츠를 발견하는 데 도움이 되는 정말 강력한 도구입니다. <br><br>" +
      "지금 당장 저장된 북마크에 태그를 추가해 보세요.<br><br>",
    img: "src/assets/images/login-page-tag.png",
  },
  {
    color: "green-accent-2",
    title: "팔로우 서비스",
    icon: "mdi mdi-human-greeting-proximity",
    text:
      "<b class='text-blue'>팔로우 서비스</b>는 사용자가 다른 사용자를 팔로우하고 저장하거나 공유하는 북마크와 같은 활동에 대한 업데이트를 받을 수 있는 기능입니다.<br><br>" +
      " 북마크 서비스에서 팔로우 서비스를 통해 사용자는 다른 사용자를 팔로우하고 저장된 북마크를 볼 수 있습니다. 이를 통해 사용자는 다른 사람이 저장한 북마크를 기반으로 새로운 콘텐츠를 발견하고 북마크 서비스에 소셜 측면을 만들 수 있습니다.<br><br>" +
      "팔로우 서비스는 북마크 서비스의 사회적 측면을 강화하고 사용자가 새로운 콘텐츠를 발견하도록 도울 수 있는 강력한 기능입니다. <br><br>" +
      "지금 당장 다양한 사람들과 팔로우 서비스를 통해 피드를 공유해 보세요.<br><br>",
    img: "src/assets/images/login-page-follow.png",
  },
  {
    color: "blue-accent-2",
    title: "검색 서비스",
    icon: "mdi mdi-book-search-outline",
    text:
      "<b class='text-blue'>My: </b>이 카테고리에서는 사용자가 개인적으로 저장한 책갈피를 검색할 수 있습니다. 사용자는 키워드 또는 태그를 사용하여 개인 컬렉션에 저장한 북마크를 검색할 수 있습니다.<br><br>" +
      " <b class='text-blue'>Follow: </b> 팔로잉 중인 사용자가 저장한 북마크를 검색할 수 있는 카테고리입니다. 사용자는 키워드나 태그를 사용하여 자신이 팔로우하는 다른 사용자가 저장한 북마크를 검색할 수 있습니다.<br><br>" +
      "<b class='text-blue'>All: </b>이 범주에서는 사용자가 북마크 서비스의 데이터베이스에 있는 모든 북마크를 검색할 수 있습니다. 사용자는 키워드 또는 태그를 사용하여 서비스의 모든 사용자가 저장한 북마크를 검색할 수 있습니다. <br><br>",
    img: "src/assets/images/login-page-search.png",
  },
]);

onMounted(() => {
  let observer = new IntersectionObserver((e) => {
    e.forEach((content) => {
      if (content.isIntersecting) {
        content.target.style.opacity = 1;
        content.target.style.transform = "translate(0px, 0px)";
      } else {
        content.target.style.opacity = 0;
        content.target.style.transform = "translate(0px, 100px)";
      }
    });
  });

  let contents = document.querySelectorAll(".scroll-opacity");
  for (let i = 0; i < contents.length; i++) {
    observer.observe(contents[i]);
  }

  for (let i = 0; i < items.value.length; i++) {
    document.querySelector("#item-text" + i).innerHTML = items.value[i].text;
  }
});
</script>

<style scoped>
.scroll-opacity {
  transform: translate(0, 200px);
  opacity: 0;
  transition: all 2s;
}

.line {
  border-top: 1px dotted black;
  height: 1%;
}

.function-background {
  left: 34%;
  position: relative;
}

.main-font {
  margin-top: 10%;
  font-size: 40pt;
}

.start-page-body-img {
  height: 450px;
}
</style>
