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
        <div class="discount">
          <div class="percentage"></div>
          <div
            class="tag"
            :style="
              'background-image: url(https://api.kupizalog.kz/' +
              item.monetization_icon +
              ');'
            "
          ></div>
        </div>
        <div class="image-count">{{ item.quantity_of_image }}</div>
        <div class="favorite">
          <i v-bind:class="{ fav: true }" class="fas fa-star"></i>
        </div>
      </div>
    </div>
    <div class="desc">
      <div class="name">{{ item.name }}</div>
      <div class="price">{{ priceFormatted }}</div>
      <div class="bottom-row">
        <div>г. {{ item.company.city }}</div>
        <div>{{ created_at }}</div>
      </div>
    </div>
  </a>
</template>

<script>
export default {
  name: "VipItem",
  props: {
    item: Object,
  },
  computed: {
    created_at: function () {
      if (this.item) {
        return window.moment(this.item.created_at).format("DD.MM.YYYY");
      }
    },
    priceFormatted() {
      return new Intl.NumberFormat("kk-KZ", {
        style: "currency",
        currency: "KZT",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(this.item.price);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/variables";

.item {
  width: 335px;
  height: 380px;
  margin: 0 42px 40px 0;
  border: 1px solid $border-gray;
  border-radius: 6px;
  background: $white;
  z-index: 1;

  @media (min-width: 992px) {
    width: calc((100% - 84px) / 3);
    height: 380px;
  }

  &:hover {
    box-shadow: 0 2.5px 5px 0 $gray;
    z-index: 20;
  }

  .image-wrapper {
    height: 217px;
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

      .discount {
        position: absolute;
        top: 10px;
        left: -10px;
        display: flex;
        align-items: center;
        z-index: 2;

        .percentage {
          position: absolute;
          left: 10px;
          font-size: 12px;
          font-weight: bold;
          color: $white;
          z-index: 3;
        }

        .tag {
          width: 60px;
          height: 22px;
          background-size: contain;
        }
      }

      .image-count {
        position: absolute;
        bottom: 2px;
        left: 2px;
        padding: 3px 7px;
        font-size: 12px;
        color: $gray3;
        border: 1px solid $item-gray;
        background: $white;
      }

      .favorite {
        position: absolute;
        bottom: 3px;
        right: 3px;
        color: $gray;

        .fav {
          color: $favorite-yellow;
        }
      }
    }
  }

  .desc {
    padding: 20px;

    .name {
      font-size: 16px;
      line-height: 19px;
      font-weight: 500;
      color: $black;
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
      color: $gray3;
      display: flex;
      justify-content: space-between;
    }
  }

  &:nth-child(3n) {
    margin-right: 0;
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
