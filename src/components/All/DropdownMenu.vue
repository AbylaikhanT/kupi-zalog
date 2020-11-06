<template>
  <div class="toolbar">
    <div @click="toggled()" class="overlay"></div>
    <div class="content">
      <div @click="redirectTo('home')" class="logo"></div>
      <div class="name">{{ fullName }}</div>
      <AccountProductButton show></AccountProductButton>
      <div class="link" @click="redirectTo('user-profile-info')">
        Мой профиль
      </div>
      <div
        class="link"
        @click="redirectTo('company-profile-info')"
        v-if="$store.getters.hasCompany"
      >
        Профиль компании
      </div>
      <div class="link" @click="redirectTo('user-settings')">Настройки</div>
      <div class="link logout" @click="$store.dispatch('signOut')">
        Выйти из аккаунта
      </div>
    </div>
  </div>
</template>

<script>
import AccountProductButton from "@/components/Account/ProductButton";

export default {
  name: "NavbarMenu",
  components: {
    AccountProductButton,
  },
  data() {
    return {
      tabs: [],
    };
  },
  computed: {
    fullName() {
      return `${this.$store.state.info.first_name} ${this.$store.state.info.last_name}`;
    },
  },
  methods: {
    toggled() {
      this.$emit("toggled", true);
    },
    redirectTo(route, params) {
      this.toggled();
      this.redirect(route, params);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "src/assets/variables";

.toolbar {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2000;

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.6);
  }

  .content {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 2000;
    width: 320px;
    height: 100vh;
    background-color: $white;
    display: flex;
    flex-direction: column;
    padding: 20px;
    font-size: 18px;
    color: $blue;

    .logo {
      width: 159px;
      height: 27px;
      background-image: url("../../assets/img/logo.png");
      background-size: contain;
      cursor: pointer;
    }

    .name {
      padding: 20px 0;
      color: $dark-blue;
      border-bottom: 1px solid $dark-gray4;
    }

    .link {
      margin-top: 30px;

      &.logout {
        color: $red;
      }
    }
  }
}
</style>
