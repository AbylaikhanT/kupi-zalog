<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <div class="tabs">
          <div
            @click="$store.commit('moveToInfo')"
            :class="{ active: info || edit }"
            class="tab"
          >
            <i class="far fa-user"></i>
            <span>Мой профиль</span>
          </div>
          <div
            @click="$store.commit('moveToSettings')"
            :class="{ active: settings }"
            class="tab"
          >
            <i class="fas fa-cog"></i>
            <span>Настройки</span>
          </div>
          <div
            @click="$store.commit('moveToFavorite')"
            :class="{ active: favorite }"
            class="tab"
          >
            <i class="far fa-star"></i>
            <span>Избранные</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileTabs",
  computed: {
    info: function () {
      return this.$store.state.info;
    },
    edit: function () {
      return this.$store.state.edit;
    },
    settings: function () {
      return this.$store.state.settings;
    },
    favorite: function () {
      return this.$store.state.favorite;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../..src/assets/variables/_variables.scss";

.container {
  padding-top: 60px;
  padding-bottom: 50px;
}

.tabs {
  border-bottom: 1px solid $border-gray;
  display: flex;
  z-index: 1;

  .tab {
    width: 170px;
    color: $border-gray;
    font-size: 16px;
    line-height: 19px;
    display: flex;
    justify-content: center;
    padding-top: 10px;
    padding-bottom: 10px;
    cursor: pointer;
    position: relative;
    bottom: -2px;
    z-index: 2;

    &.active {
      color: $blue;
      border-bottom: 3px solid $blue;
    }

    i {
      margin-right: 12px;
    }
  }
}
</style>
