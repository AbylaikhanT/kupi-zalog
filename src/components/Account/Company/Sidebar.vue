<template>
  <div>
    <div @click="toggle()" class="overlay"></div>
    <div class="sidebar">
      <div class="avatar">
        <div :style="background" class="img"></div>
      </div>
      <div class="info name">{{ $store.state.company.title }}</div>
      <div class="info description">У вас {{ $store.state.balance }} монет</div>
      <div
        @click="redirect('company-profile-info')"
        :class="{ active: isActive('company-profile') }"
        class="section"
      >
        <i class="fas fa-building"></i>
        <span>Компания</span>
      </div>
      <div
        @click="redirect('company-listings-list')"
        :class="{ active: isActive('company-listings-list') }"
        class="section"
      >
        <i class="fas fa-bullhorn"></i>
        <span>Мои объявления</span>
      </div>
      <!--<div @click="redirect('company-messages')"-->
      <!--:class="{ 'active': isActive('company-messages') }"-->
      <!--class="section">-->
      <!--<i class="far fa-envelope"></i>-->
      <!--<span>Сообщения</span>-->
      <!--</div>-->
      <div
        @click="redirect('company-services-list')"
        :class="{ active: isActive('company-services') }"
        class="section"
      >
        <i class="fas fa-dollar-sign"></i>
        <span>Платные услуги</span>
      </div>
      <div
        @click="redirect('company-settings')"
        :class="{ active: isActive('company-settings') }"
        class="section"
      >
        <i class="fas fa-cog"></i>
        <span>Настройки</span>
      </div>
      <div
        @click="redirect('company-support')"
        :class="{ active: isActive('company-support') }"
        class="section"
      >
        <i class="fas fa-headset"></i>
        <span>Служба поддержки сайта</span>
      </div>
      <div
        @click="redirect('company-installment')"
        :class="{ active: isActive('company-installment') }"
        class="section"
      >
        <i class="fas fa-money-check-alt"></i>
        <span><i>Подключить услугу Рассрочка</i></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AccountCompanySidebar",
  computed: {
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
  created() {
    this.$store.dispatch("setBalance");
  },
};
</script>

<style lang="scss" scoped>
@import "src/assets/variables";

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

  .info {
    display: flex;
    justify-content: center;
    font-size: 14px;
    font-weight: 500;
  }

  .name {
    margin-top: 15px;
  }

  .description {
    margin: 5px 0 40px 0;
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
      width: 20px;
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
