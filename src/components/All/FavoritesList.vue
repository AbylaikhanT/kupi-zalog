<template>
  <div class="favorites-list">
    <div class="items">
      <Item
        v-for="(item, key) in items"
        :key="key"
        :id="item.id"
        :slug="item.slug"
        :image="item.image.path"
        :tag="item.monetization_icon"
        :count="item.quantity_of_image"
        :favorite="item.favorite"
        :name="item.name"
        :price="item.price"
        :city="item.company.city"
        :created_at="item.created_at"
        @clicked="redirect('item', { slug: item.slug })"
      ></Item>
    </div>
    <!--<div :class="{'hidden': (page === pagesCount)}" class="more">-->
    <!--<button @click="nextPage()">Смотреть больше</button>-->
    <!--</div>-->
  </div>
</template>

<script>
import Item from "@/components/All/Item";

export default {
  name: "FavoritesList",
  components: {
    Item,
  },
  data() {
    return {
      items: [],
      page: 1,
      pagesCount: undefined,
    };
  },
  methods: {
    getItems(data) {
      return this.mine ? data : data.ads;
    },
    nextPage: function () {
      this.$http
        .get(`product/favorite?page=${++this.page}`, {
          headers: {
            Authorization: this.$store.state.token,
          },
        })
        .then(
          function (response) {
            this.items = this.items.concat(response.data);
          }.bind(this)
        );
    },
    redirect(route, params) {
      this.$router.push({
        name: route,
        params: params,
      });
    },
  },
  mounted: function () {
    this.$http
      .get("product/favorite", {
        headers: {
          Authorization: this.$store.state.token,
        },
      })
      .then(
        function (response) {
          this.items = response.data;
        }.bind(this)
      );
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/variables";

.favorites-list {
  padding-top: 40px;
  padding-bottom: 0;
  width: 100%;

  .items {
    display: flex;
    flex-wrap: wrap;
    max-width: 860px;
    width: 100%;

    @media screen and (max-width: 1170px) {
      flex-direction: column;
      max-width: 100%;
    }

    .item {
      &:not(:nth-child(3n + 1)) {
        margin-left: 40px;
      }

      &:not(:nth-child(1)):not(:nth-child(2)):not(:nth-child(3)) {
        margin-top: 40px;
      }

      @media screen and (max-width: 1170px) {
        &:not(:nth-child(3n + 1)) {
          margin-left: 0;
        }

        &:not(:first-child) {
          margin-top: 40px;
        }
      }
    }
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

  h3 {
    margin-bottom: 25px;
    font-size: 24px;
    font-weight: 500;
    color: $light-black;
  }
}

@media screen and (max-width: 1170px) {
  .vip {
    .items {
      flex-direction: column;

      .item {
        &:not(:first-child) {
          margin-top: 30px;
        }

        &:not(:nth-child(3n + 1)) {
          margin-left: 0;
        }

        &:not(:nth-child(1)):not(:nth-child(2)):not(:nth-child(3)) {
          margin-top: 30px;
        }
      }
    }
  }
}
</style>
