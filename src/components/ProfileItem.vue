<template>
  <a v-bind:href="'/item/' + item.id" class="item">
    <div class="image-wrapper">
      <div
        v-bind:style="
          'background-image: url(https://api.kupizalog.kz/' +
          item.image.path +
          ');'
        "
        class="image"
      ></div>
      <div class="overlay">
        <div class="edit">
          <i class="fas fa-pencil-alt"></i>
        </div>
        <div class="image-count">5</div>
      </div>
    </div>
    <div class="desc">
      <div class="name">{{ item.name }}</div>
      <div class="price">{{ item.price }} KZT</div>
      <div class="bottom-row">
        <div>г. Алматы</div>
        <div>{{ created_at }}</div>
      </div>
    </div>
    <div class="controls">
      <button class="promote">Продвигать</button>
      <button>Удалить</button>
    </div>
  </a>
</template>

<script>
export default {
  name: "ProfileItem",
  props: {
    item: Object,
  },
  computed: {
    created_at: function () {
      if (this.item) {
        return window.moment(this.item.created_at).format("DD.MM.YYYY");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/_variables.scss";

.item {
  width: 230px;
  height: 410px;
  margin: 0 40px 40px 0;
  padding-bottom: 15px;
  border: 1px solid $border-gray;
  border-radius: 6px;
  background: $white;
  font-family: $font;
  z-index: 1;

  &:hover {
    box-shadow: 0 2.5px 5px 0 $gray;
    z-index: 20;
  }

  .image-wrapper {
    height: 205px;
    border-bottom: 1px solid $border-gray;
    position: relative;

    .image {
      height: 100%;
      background-size: cover;
      background-position: center;
      border-radius: 6px 6px 0 0;
    }

    .overlay {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;

      .edit {
        position: absolute;
        top: 15px;
        right: 15px;
        font-size: 17px;
        color: $light-black;
      }

      .image-count {
        position: absolute;
        bottom: 2px;
        left: 2px;
        padding: 3px 7px;
        font-size: 12px;
        color: $dark-gray;
        border: 1px solid $item-gray;
        background: $white;
      }
    }
  }

  .desc {
    padding: 15px;

    .name {
      font-size: 16px;
      line-height: 19px;
      font-weight: 500;
      color: $black;
      width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .price {
      font-size: 14px;
      line-height: 16px;
      font-weight: bold;
      color: $green;
      margin: 10px 0 15px 0;
    }

    .bottom-row {
      font-size: 12px;
      line-height: 14px;
      color: $dark-gray;
      display: flex;
      justify-content: space-between;
    }
  }

  .controls {
    padding: 0 10px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;

    button {
      margin-top: 10px;
      width: 100%;
      height: 35px;
      border: 1px solid $blue;
      border-radius: 5px;
      background: $white;
      font-weight: bold;
      font-size: 14px;
      line-height: 19px;
      color: $blue;

      &:first-child {
        margin-top: 0;
      }

      &.promote {
        border: 0;
        background: $yellow;
        color: $white;
      }
    }
  }
}

a {
  text-decoration: none;

  &:link {
    text-decoration: none;
  }

  &:visited {
    text-decoration: none;
  }

  &:hover {
    text-decoration: none;
  }

  &:active {
    text-decoration: none;
  }
}
</style>
