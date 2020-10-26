<!--Component is not using-->
<template>
  <div class="toolbar">
    <div class="link">Распродажа</div>
    <div class="link">Топ-ломбарды</div>
    <div @click="toggled()" class="overlay"></div>
    <div class="content">
      <div @click="redirectTo('home')" class="logo"></div>
      <div class="tabs">
        <span
          @click="redirectTo('info', { slug: tab.slug })"
          v-for="tab in tabs"
          v-if="tab.type === 1"
          >{{ tab.name }}</span
        >
      </div>
      <i class="fas fa-times fa-lg cross" @click="toggled()"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavbarMenu",
  props: {
    tabs: Array,
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
@import "@/assets/variables";

.toolbar {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;

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
    left: 0;
    z-index: 2;
    width: 320px;
    height: 100vh;
    background-color: $white;
    display: flex;
    flex-direction: column;
    padding: 20px;
    font-size: 18px;
    color: $blue;

    .cross {
      position: absolute;
      z-index: 2;
      right: 20px;
      top: 20px;
      size: 9px;
    }

    .logo {
      width: 159px;
      height: 27px;
      background-image: url("../../assets/img/logo.png");
      background-size: contain;
      cursor: pointer;
    }

    .tabs {
      margin-top: 35px;
      display: flex;
      flex-direction: column;

      span {
        &:not(:first-child) {
          margin-top: 30px;
        }
      }
    }

    .link {
      margin-top: 30px;
    }
  }
}
</style>
