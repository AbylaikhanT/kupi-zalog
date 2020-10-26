<template>
  <div>
    <div @click="toggle()" class="overlay"></div>
    <div class="sidebar">
      <div class="avatar">
        <div :style="background" class="img"></div>
      </div>
      <div class="name">{{ fullName }}</div>
      <div
        @click="redirect('user-profile-info')"
        :class="{ active: isActive('user-profile') }"
        class="section"
      >
        <i class="fas fa-user"></i>
        <span>Мой профиль</span>
      </div>
      <div
        @click="redirect('user-favorites')"
        :class="{ active: isActive('user-favorites') }"
        class="section"
      >
        <i class="fas fa-star"></i>
        <span>Избранные</span>
      </div>
      <!--<div @click="redirect('user-messages')"-->
      <!--:class="{ 'active': isActive('user-messages') }"-->
      <!--class="section">-->
      <!--<i class="far fa-envelope"></i>-->
      <!--<span>Сообщения</span>-->
      <!--</div>-->
      <div
        @click="redirect('user-settings')"
        :class="{ active: isActive('user-settings') }"
        class="section"
      >
        <i class="fas fa-cog"></i>
        <span>Настройки</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AccountUserSidebar",
  computed: {
    fullName() {
      return `${this.$store.state.info.first_name} ${this.$store.state.info.last_name}`;
    },
    background() {
      return this.$store.getters.hasCompany &&
        this.$store.state.company.image.path
        ? `background-image: url('https://api.kupizalog.kz${this.$store.state.company.image.path}');`
        : "";
    },
  },
  methods: {
    redirect(name) {
      this.$router.push({ name: name });
    },
    isActive(name) {
      return this.$route.matched.some((route) => route.name === name);
    },
    toggle() {
      this.$emit("toggled", true);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/variables";

.overlay {
  display: none;

  @media screen and (max-width: 1170px) {
    display: flex;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 900;
    background: transparent;
  }
}

.sidebar {
  flex-shrink: 0;
  width: 280px;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: $dark-gray;
  color: $white;
  position: relative;
  z-index: 2000;

  .avatar {
    display: flex;
    justify-content: center;
    margin-top: 50px;

    .img {
      width: 80px;
      height: 80px;
      background-color: $white;
      background-position: center;
      background-size: contain;
      border: 1px solid $light-gray7;
      border-radius: 50%;
    }
  }

  .name {
    display: flex;
    justify-content: center;
    margin: 15px 0 40px 0;
    font-size: 14px;
    font-weight: 500;
  }

  .section {
    height: 50px;
    padding: 0 20px;
    display: flex;
    align-items: center;
    cursor: pointer;

    &.active {
      background-color: rgba(0, 0, 0, 0.25);
    }

    i {
      font-size: 15px;
    }

    span {
      margin-left: 20px;
      font-size: 18px;
    }
  }
}

@media screen and (max-width: 1170px) {
  .sidebar {
    position: fixed;
    top: 80px;
    left: 0;
    z-index: 1000;
    height: 100%;
  }
}
</style>
