<template>
  <div class="top">
    <h2>TOП товары</h2>
    <div class="items">
      <Item
        v-for="(item, key) in items"
        :key="key"
        :id="item.id"
        :image="item.image.path"
        :tag="item.monetization_icon"
        :count="item.quantity_of_image"
        :favorite="item.favorite"
        :name="item.name"
        :price="item.price"
        :city="item.company.city"
        :created_at="item.created_at"
        :slug="item.slug"
        class="item"
      ></Item>
    </div>
    <div
      :class="{ hidden: page === pagesCount || items.length === 0 }"
      class="more"
    >
      <button @click="nextPage()">Смотреть больше</button>
    </div>
  </div>
</template>

<script>
import Item from "@/components/All/Item";

export default {
  name: "TopItems",
  components: {
    Item,
  },
  data: function () {
    return {
      items: [],
      page: 1,
      pagesCount: undefined,
    };
  },
  methods: {
    nextPage: function () {
      this.$http.get("monetizations/top?page=" + ++this.page).then(
        function (response) {
          this.items = this.items.concat(response.data.ads);
        }.bind(this)
      );
    },
  },
  mounted: function () {
    this.$http.get("monetizations/top").then(
      function (response) {
        this.items = response.data.ads;
        this.pagesCount = response.data["all-pages"];
      }.bind(this)
    );
    document.documentElement.scrollTop = 0;
  },
};
</script>

<style lang="scss" scoped>
@import "src/assets/variables";

.top {
  padding-top: 0px;
  padding-bottom: 0;

  @media (min-width: 768px) {
    padding-top: 80px;
  }

  .items {
    display: flex;
    flex-wrap: wrap;
    max-width: 960px;
  }

  .item {
    margin-right: 25px;
  }

  .more {
    display: flex;
    justify-content: center;
    margin-top: 40px;

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
  h2 {
    padding-bottom: 35px;
  }
  h3 {
    font-size: 24px;
    font-weight: 500;
    color: $light-black;
  }
}
</style>
