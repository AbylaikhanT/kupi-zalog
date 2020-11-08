<template>
  <div class="listings">
    <div class="items">
      <CompanyItem
        v-for="(item, key) in items"
        :key="key"
        :id="item.id"
        :image="item.image.path"
        :tag="item.monetization_icon"
        :favorite="item.favorite"
        :name="item.name"
        :price="item.price"
        :city="item.company.city"
        :created_at="item.created_at"
        :published="item.published"
      ></CompanyItem>
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
import CompanyItem from "@/components/All/CompanyItem";

export default {
  name: "ListingsList",
  components: {
    CompanyItem,
  },
  data() {
    return {
      items: [],
      url: `product/company-ads/${this.$store.state.company.id}`,
      page: 1,
      pagesCount: undefined,
    };
  },
  methods: {
    nextPage: function () {
      const payload = {
        page: ++this.page,
      };
      this.$http.get(this.url, payload).then(
        function (response) {
          this.items = this.items.concat(response.data.ads);
        }.bind(this)
      );
    },
  },
  created() {
    this.$http.get(this.url).then(
      function (response) {
        this.items = response.data.ads;
        this.pagesCount = response.data["all-pages"];
      }.bind(this)
    );
  },
};
</script>

<style lang="scss" scoped>
@import "src/assets/variables";

.listings {
  padding-top: 40px;
  padding-bottom: 0;

  @media screen and (max-width: 1170px) {
    max-width: 100%;
    width: 100%;
  }

  .items {
    display: flex;
    flex-wrap: wrap;
    max-width: 960px;

    @media screen and (max-width: 1170px) {
      max-width: 100%;
      justify-content: center;
    }

    .item {
      &:not(:first-child) {
        @media screen and (max-width: 1170px) {
          margin-top: 40px;
        }
      }

      &:not(:nth-child(3n + 1)) {
        margin-left: 40px;

        @media screen and (max-width: 1170px) {
          margin-left: 0;
        }
      }

      &:not(:nth-child(1)):not(:nth-child(2)):not(:nth-child(3)) {
        margin-top: 40px;
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
</style>
