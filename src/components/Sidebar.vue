<template>
  <div class="sidebar">
    <div class="avatar">
      <!--<div class="img" :style="'background-image: url(http://api.kupizalog.com/' + $store.state.userInfo.image + ');'"></div>-->
    </div>
    <div class="email">
      <span>{{ $store.state.userInfo.name }}</span>
    </div>
    <div class="section menu">
      <i class="far fa-building"></i>
      <span>Компания</span>
    </div>
    <a
      :class="{ active: tab === 'products' }"
      href="/new/profile/company/products"
      class="section"
    >
      <i class="fab fa-adversal"></i>
      <span>Мои объявления</span>
    </a>
    <div class="section">
      <i class="far fa-envelope"></i>
      <span>Сообщение</span>
    </div>
    <a
      :class="{ active: tab === 'services' }"
      href="/new/profile/company/services"
      class="section"
    >
      <i class="fas fa-dollar-sign"></i>
      <span>Платные услуги</span>
    </a>
    <!--<div class="section">-->
    <!--<i class="fas fa-gavel"></i>-->
    <!--<span>Аукцион</span>-->
    <!--</div>-->
    <div class="section menu">
      <i class="fas fa-cog"></i>
      <span>Настройки</span>
    </div>
    <!--<div class="section menu">-->
    <!--<i class="fas fa-plus-square"></i>-->
    <!--<span>Дополнительные функции</span>-->
    <!--</div>-->
    <a
      :class="{ active: tab === 'support' }"
      href="/new/profile/company/support"
      class="section"
    >
      <i class="fas fa-headset"></i>
      <span>Служба поддержки сайта</span>
    </a>
    <!--<div class="section">-->
    <!--<i class="fas fa-desktop"></i>-->
    <!--<span>CPM</span>-->
    <!--</div>-->
    <!--<div @click="signOut()" class="section">-->
    <!--<i class="fas fa-door-open"></i>-->
    <!--<span>Выйти</span>-->
    <!--</div>-->
  </div>
</template>

<script>
export default {
  name: "AccountCompanySidebar",
  props: {
    tab: String,
  },
  methods: {
    signOut: function () {
      this.$store.commit("setLoggedIn", false);
      this.$store.commit("setUserInfo", "");
      this.$store.commit("setAccessToken", "");
      window.location = "/";
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/variables";
@import "@/assets/mixins";

.sidebar {
  max-width: 280px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  background: $light-black;

  .avatar {
    display: flex;
    justify-content: center;
    margin-top: 50px;

    .img {
      width: 80px;
      height: 80px;
      border-radius: 360px;
      background-size: contain;
    }
  }

  .email {
    display: flex;
    justify-content: center;
    margin-top: 15px;
    margin-bottom: 40px;

    span {
      font-weight: 600;
      font-size: 14px;
      line-height: 17px;
      color: $white;
    }
  }

  .section {
    padding: 18px 20px;
    display: flex;
    align-items: center;
    color: $white;
    cursor: pointer;

    &:hover {
      background: rgba(0, 0, 0, 0.25);
    }

    &.active {
      background: rgba(0, 0, 0, 0.25);
    }

    &.menu {
      &::after {
        font-family: "Font Awesome 5 Free";
        font-weight: 600;
        content: "\f078";
        margin-left: auto;
      }
    }

    i {
      width: 15px;
      text-align: center;
      font-size: 15px;
      margin-right: 20px;
    }

    span {
      font-size: 18px;
      line-height: 22px;
      font-weight: 600;
    }
  }

  a {
    @include a($white);
  }
}
</style>
