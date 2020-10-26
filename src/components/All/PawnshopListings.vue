<template>
  <div class="listings">
    <AccountBack @clicked="getBack()"></AccountBack>
    <AccountBreadcrumbs :breadcrumbs="breadcrumbs"></AccountBreadcrumbs>
    <div class="items">
      <Item
        v-for="(item, index) in listings"
        :key="index"
        :id="item.id"
        :slug="item.slug"
        :image="item.image.path"
        :favorite="item.favorite"
        :name="item.name"
        :price="item.price"
        :city="item.company.city"
        :created_at="item.created_at"
        @clicked="redirect('item', { slug: item.slug })"
      ></Item>
    </div>
    <div
      :class="{ hidden: pagesCount === page || pagesCount === 0 }"
      class="more"
    >
      <button @click="nextPage()">Смотреть больше</button>
    </div>
  </div>
</template>

<script>
import AccountBack from "@/components/Account/Back";
import AccountBreadcrumbs from "@/components/Account/Breadcrumbs";
import Item from "@/components/All/Item";

export default {
  name: "PawnshopListings",
  components: {
    AccountBack,
    AccountBreadcrumbs,
    Item,
  },
  data() {
    return {
      breadcrumbs: [],
      listings: [],
      page: 1,
      pagesCount: undefined,
      company: undefined,
    };
  },
  computed: {
    url() {
      return this.$route.query.sale
        ? `monetizations/sell-out/${this.$route.params.id}`
        : `companies/rating/${this.$route.params.id}`;
    },
  },
  watch: {
    "$route.params.id": function (id) {
      this.getListings();
    },
    "$route.query.sale": function (id) {
      this.getListings();
    },
  },
  methods: {
    getBack() {
      this.$router.go(-1);
    },
    nextPage() {
      this.$http
        .get(this.url, {
          params: {
            page: ++this.page,
          },
          headers: {
            Authorization: this.$store.state.token,
          },
        })
        .then(
          function (response) {
            this.listings = this.listings.concat(response.data);
          }.bind(this)
        );
    },
    getListings() {
      this.$http
        .get(this.url, {
          headers: {
            Authorization: this.$store.state.token,
          },
        })
        .then(
          function (response) {
            this.listings = response.data.ads;
            this.pagesCount = response.data["all-pages"];
            this.company = response.data.company;
            this.breadcrumbs = [
              {
                title: "Все ломбарды",
                route: "lombards",
              },
              {
                title: this.company.title,
              },
            ];
            if (this.$route.query.sale) {
              this.breadcrumbs[0].query = {
                sale: true,
              };
            }
          }.bind(this)
        );
    },
  },
  created() {
    this.getListings();
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/variables";

.listings {
  @media screen and (max-width: 1170px) {
    padding: 0 20px;
  }

  .breadcrumbs {
    margin-top: 45px;
  }

  .items {
    margin-top: 40px;
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

    @media screen and (max-width: 1170px) {
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
}
</style>
