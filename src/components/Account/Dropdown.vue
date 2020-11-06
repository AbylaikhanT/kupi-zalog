<template>
  <div class="dropdown">
    <div
      @click="isOpen = !isOpen"
      :class="{ 'surface--blue': isBlue }"
      class="surface"
    >
      <i class="far fa-user"></i>
      <span>Личный кабинет</span>
      <i v-if="!isOpen" class="fas fa-angle-down"></i>
      <i v-else class="fas fa-angle-up"></i>
    </div>
    <div v-if="isOpen" @click="isOpen = false" class="overlay"></div>
    <div v-if="isOpen" class="content">
      <div class="section">{{ fullName }}</div>
      <div class="section">
        <div @click="redirect('user-profile-info')" class="section-row">
          <i class="far fa-user"></i>
          <span>Мой профиль</span>
        </div>
        <div
          @click="redirect('company-profile-info')"
          v-if="$store.getters.hasCompany"
          class="section-row"
        >
          <i class="far fa-building"></i>
          <span>Профиль компании</span>
        </div>
        <div @click="redirect('user-settings')" class="section-row">
          <i class="fas fa-cog"></i>
          <span>Настройки</span>
        </div>
      </div>
      <div @click="$store.dispatch('signOut')" class="section">
        <div class="section-row">
          <i class="fas fa-sign-out-alt"></i>
          <span>Выйти из аккаунта</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AccountDropdown",
  props: {
    isBlue: Boolean,
  },
  data() {
    return {
      isOpen: false,
    };
  },
  computed: {
    fullName() {
      return `${this.$store.state.info.first_name} ${this.$store.state.info.last_name}`;
    },
  },
  methods: {
    redirect(name) {
      this.$router.push({ name: name });
      this.isOpen = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "src/assets/variables";

.dropdown {
  position: relative;
  cursor: pointer;

  .surface {
    color: $white;

    &--blue {
      color: $blue;
    }

    span {
      margin: 0 8px;
      font-size: 16px;
    }
  }

  .overlay {
    background-color: transparent;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 5;
  }

  .content {
    position: absolute;
    top: 20px;
    z-index: 10;
    width: 190px;
    height: 205px;
    border: 1px solid $gray;
    border-radius: 5px;
    box-shadow: 0 3px 6px rgba(208, 215, 221, 0.5);
    background-color: $white;
    color: $dark-blue;

    .section {
      padding: 15px;

      &:not(:first-child) {
        border-top: 1px solid $gray;
      }

      .section-row {
        &:not(:first-child) {
          margin-top: 15px;
        }

        span {
          margin-left: 10px;
        }
      }
    }
  }
}

@media screen and (max-width: 1170px) {
  .dropdown {
    .surface {
      span {
        display: none;
      }
    }
  }
}
</style>
