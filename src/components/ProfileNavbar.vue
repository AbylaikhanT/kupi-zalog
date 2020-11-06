<template>
  <div class="navbar">
    <div class="left">
      <a href="/" class="logo">Kupizalog</a>
      <a href="/">О сайте</a>
      <a href="/">Помощь</a>
      <a href="/">Правила</a>
      <a href="/">Реклама</a>
      <a href="/">Контакты</a>
    </div>
    <div class="right">
      <div>
        <i class="fas fa-user"></i>
        <span>Личный кабинет</span>
        <i class="fas fa-chevron-down"></i>
      </div>
      <button v-if="company" @click="redirectToAddProduct()">
        <i class="fas fa-plus"></i>
        Подать объявление
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileNavbar",
  props: {
    company: Boolean,
  },
  methods: {
    redirectToAddProduct: function () {
      window.location = "/new/profile/company/add-product";
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../..src/assets/variables/_variables.scss";

.navbar {
  width: 100vw;
  height: 80px;
  padding: 0 30px;
  display: flex;
  justify-content: space-between;
  background: $blue;
  flex-shrink: 0;

  .left {
    display: flex;
    align-items: center;

    @include anchor($white);

    a {
      font-size: 14px;
      line-height: 17px;
      font-family: $font;
      font-weight: bold;
      margin-left: 40px;
    }

    .logo {
      text-transform: uppercase;
      font-size: 20px;
      line-height: 26px;
      color: $white;
      font-weight: bold;
      font-family: $font;
      margin-left: 0;
    }
  }

  .right {
    color: $white;
    cursor: pointer;
    display: flex;
    align-items: center;

    span {
      font-family: $font;
      font-size: 16px;
      line-height: 19px;
      margin: 0 8px;
    }

    button {
      border: 1px solid $white;
      border-radius: 5px;
      padding: 12px 20px;
      font-size: 12px;
      line-height: 16px;
      font-weight: 600;
      font-family: $font;
      margin-left: 35px;

      i {
        font-size: 10px;
        margin-right: 8px;
        font-weight: 800;
      }
    }
  }
}
</style>
