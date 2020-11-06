<template>
  <div class="wrapper">
    <div @click="$emit('close')" class="overlay"></div>
    <div class="window">
      <div class="top">
        <div class="icon">
          <i class="fas fa-exclamation-triangle"></i>
        </div>
        <div class="header">Удалить все данные</div>
        <div class="text">Вы действительно хотите удалить все данные?</div>
      </div>
      <div class="bottom">
        <button @click="$emit('close')">Отмена</button>
        <button>Удалить</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileModal",
};
</script>

<style lang="scss" scoped>
@import "../..src/assets/variables/_variables.scss";

.wrapper {
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: $font;

  .overlay {
    background: rgba(0, 0, 0, 0.6);
    width: 100vw;
    height: 100vh;
  }

  .window {
    position: absolute;
    z-index: 105;
    width: 360px;
    background: $white;
    border: 1px solid $gray;
    border-radius: 4px;

    .top {
      padding: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;

      .icon {
        width: 100%;
        font-size: 25px;
        color: $yellow;
      }

      .header {
        margin-top: 25px;
        font-weight: 500;
        font-size: 20px;
        line-height: 24px;
        color: $black;
      }

      .text {
        margin-top: 20px;
        font-size: 14px;
        color: $dark-gray;
        width: 230px;
        text-align: center;
      }
    }

    .bottom {
      margin-top: 37px;
      display: flex;

      button {
        width: 50%;
        height: 50px;
        border-top: 1px solid $gray;
        font-weight: bold;
        font-size: 12px;
        line-height: 14px;
        color: $black;
        text-transform: uppercase;

        &:last-child {
          border-left: 1px solid $gray;
        }
      }
    }
  }
}
</style>
