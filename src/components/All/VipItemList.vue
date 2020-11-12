<template>
  <div class="vip">
    <h2>VIP-объявления</h2>
    <div class="items">
      <Item
        v-for="(item, index) in items"
        :key="index"
        :slug="item.slug"
        :id="item.id"
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
  name: "VipItemList",

  components: {
    Item,
  },
  props: {
    mine: Boolean,
  },
  computed: {
    url() {
      return this.mine
        ? `product/company-ads/${this.$store.state.company.id}`
        : "monetizations/vip-products";
    },
  },
  mounted() {
    document.documentElement.scrollTop = 0;
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
    nextPage() {
      this.$http
        .get(`${this.url}?page=${++this.page}`, {
          headers: {
            Authorization: this.$store.state.token,
          },
        })
        .then(
          function (response) {
            this.items = this.items.concat(this.getItems(response.data));
          }.bind(this)
        );
    },
    checkScroll(el) {
      var top = el.offsetTop;
      var height = el.offsetHeight;

      while (el.offsetParent) {
        el = el.offsetParent;
        top += el.offsetTop;
      }

      return (
        top >= window.pageYOffset &&
        top + height <= window.pageYOffset + window.innerHeight
      );
    },
    infiniteScroll() {
      const more = document.getElementsByClassName("more")[0];
      if (this.page < this.pagesCount && this.checkScroll(more)) {
        this.nextPage();
      }
    },
  },
  created() {
    this.$http
      .get(this.url, {
        headers: {
          Authorization: this.$store.state.token,
        },
      })
      .then(
        function (response) {
          this.items = this.getItems(response.data);
          this.pagesCount = response.data["all-pages"];
        }.bind(this)
      );
    document.addEventListener("scroll", this.infiniteScroll);
  },
  destroyed() {
    document.removeEventListener("scroll", this.infiniteScroll);
  },
};
</script>

<style lang="scss" scoped>
@import "src/assets/variables";

.vip {
  padding-top: 0px;
  padding-bottom: 0;

  .items {
    display: flex;
    flex-wrap: wrap;
    max-width: 860px;

    .item {
      &:not(:nth-child(3n + 1)) {
        margin-left: 40px;
      }

      &:not(:nth-child(1)):not(:nth-child(2)):not(:nth-child(3)) {
        margin-top: 40px;
      }
    }
  }
  h2 {
    padding-bottom: 35px;
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
    padding-top: 0;

    .items {
      max-width: 100%;
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
