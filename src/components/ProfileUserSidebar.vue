<template>
  <div class="sidebar">
    <div class="avatar">
      <div class="img"></div>
    </div>
    <div class="name">
      <span>{{
        $store.state.first_name
          ? $store.state.first_name
          : $store.state.email
          ? $store.state.email
          : $store.state.phone
      }}</span>
    </div>
    <div :class="{ active: this.active === 'user' }" class="section">
      <i class="fas fa-user"></i>
      <span>Мой профиль</span>
    </div>
    <div :class="{ active: this.active === 'favorites' }" class="section">
      <i class="fas fa-star"></i>
      <span>Избранные</span>
    </div>
    <div :class="{ active: this.active === 'settings' }" class="section">
      <i class="fas fa-cog"></i>
      <span>Настройки</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileSidebarUser",
  props: {
    active: String,
  },
};
</script>

<style lang="scss" scoped>
@import "src/assets/variables";

.sidebar {
  max-width: 280px;
  flex: 1;
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
      background: $white;
    }
  }

  .name {
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

    &.active {
      background: rgba(0, 0, 0, 0.25);
    }

    i {
      font-size: 15px;
      margin-right: 20px;
    }

    span {
      font-size: 18px;
      line-height: 22px;
      font-weight: 600;
    }
  }
}
</style>
