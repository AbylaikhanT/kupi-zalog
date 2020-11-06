<template>
  <div class="favorite">
    <div class="header">Избранные товары</div>
    <div class="items">
      <VipItem
        v-for="(item, key) in items"
        :key="key"
        :image="item.image"
        :name="item.name"
        :price="item.price"
        :city="item.city"
        :date="item.date"
        :discount="item.discount"
        :numImages="item.numImages"
        :favorite="item.favorite"
      ></VipItem>
    </div>
    <div
      :class="{ hidden: page === pagesCount || items.length === 0 }"
      class="more"
    >
      <button>Смотреть больше</button>
    </div>
  </div>
</template>

<script>
import VipItem from "@/components/VipItem.vue";

export default {
  name: "ProfileFavorite",
  components: {
    VipItem,
  },
  data: function () {
    return {
      items: [
        {
          image: "images/item.png",
          name: "iPhone X",
          price: "499 000",
          city: "Алматы",
          date: "06.04.19",
          discount: 10,
          numImages: 5,
          favorite: true,
        },
        {
          image: "images/item.png",
          name: "iPhone X",
          price: "499 000",
          city: "Алматы",
          date: "06.04.19",
          discount: 10,
          numImages: 5,
          favorite: false,
        },
        {
          image: "images/item.png",
          name: "iPhone X",
          price: "499 000",
          city: "Алматы",
          date: "06.04.19",
          discount: 10,
          numImages: 5,
          favorite: true,
        },
        {
          image: "images/item.png",
          name: "iPhone X",
          price: "499 000",
          city: "Алматы",
          date: "06.04.19",
          discount: 10,
          numImages: 5,
          favorite: false,
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../..src/assets/variables/_variables.scss";

.favorite {
  font-family: $font;

  .header {
    font-size: 22px;
    line-height: 25px;
    color: $avatar-black;
  }

  .items {
    display: flex;
    flex-wrap: wrap;
    margin-top: 25px;
  }

  .more {
    display: flex;
    justify-content: center;
    margin: 80px 0 70px 0;

    &.hidden {
      display: none;
    }

    button {
      width: 220px;
      height: 49px;
      font-weight: bold;
      font-size: 14px;
      line-height: 16px;
      color: $button-gray;
      border: 1px solid $button-gray;
      border-radius: 6px;
    }
  }
}
</style>
