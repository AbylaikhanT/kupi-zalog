<template>
  <div class="pagination">
    <button class="more">Смотреть больше</button>
    <div class="pages">
      <button>Назад</button>
      <button v-for="i in 8" :class="{ active: i == 1 }">{{ i }}</button>
      <button>Вперед</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Pagination",
};
</script>

<style lang="scss" scoped>
@import "@/assets/_variables.scss";

.pagination {
  font-family: $font;
  display: flex;
  flex-direction: column;
  align-items: center;

  .more {
    margin-top: 80px;
    font-size: 14px;
    font-weight: bold;
    color: $button-gray;
    width: 220px;
    height: 50px;
    border: 1px solid $button-gray;
    border-radius: 6px;
  }

  .pages {
    display: flex;
    margin-top: 70px;
    width: 100%;

    button {
      margin-right: 10px;
      border: 1px solid $border-gray;
      border-radius: 6px;
      color: $completely-black;
      width: 40px;
      height: 40px;
      font-size: 16px;
      font-weight: 500;
      background: $white;

      &:first-child {
        border-color: $button-gray;
        width: 120px;

        &::before {
          content: "\f053";
          font-family: "Font Awesome 5 Free";
          font-weight: 900;
          margin-right: 20px;
        }
      }

      &:last-child {
        border-color: $button-gray;
        width: 120px;
        margin-right: 0;

        &::after {
          content: "\f054";
          font-family: "Font Awesome 5 Free";
          font-weight: 900;
          margin-left: 20px;
        }
      }

      &.active {
        background: $blue;
        color: $white;
        border: 0;
      }
    }
  }
}
</style>
