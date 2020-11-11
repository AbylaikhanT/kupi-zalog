<template>
  <div class="buy">
    <AccountBack @clicked="redirect('company-services-list')"></AccountBack>
    <div class="breadcrumbs">
      <AccountBreadcrumbs :breadcrumbs="breadcrumbs"></AccountBreadcrumbs>
    </div>
    <!--<div class="filter">-->
    <!--<SearchFilter></SearchFilter>-->
    <!--</div>-->
    <div class="info">
      <span>Итого: {{ type.price }} монет</span>
      <PrimaryButton @clicked="buy(false)">Оплатить</PrimaryButton>
    </div>
    <h5>Выберите товар<span v-if="type.slug === 'sale'" style="font-weight: 500; font-size: 20px">ы</span></h5>
    <h5 class="mb-3" v-if="type.slug === 'sale'">Примечание: Можно выбрать максимум до 10 товаров.</h5>
    <div class="items">
      <ServicesItem
        v-for="item in items"
        :key="item.id"
        :id="item.id"
        :image="item.image.path"
        :name="item.name"
        :price="item.price"
        :created_at="item.created_at"
        @clicked="selected"
      ></ServicesItem>
    </div>
  </div>
</template>

<script>
import AccountBack from "@/components/Account/Back";
import AccountBreadcrumbs from "@/components/Account/Breadcrumbs";
import PrimaryButton from "@/components/Core/PrimaryButton";
import ServicesItem from "@/components/All/ServicesItem";

export default {
  name: "AccountUserServicesBuy",
  components: {
    AccountBack,
    AccountBreadcrumbs,
    PrimaryButton,
    ServicesItem,
  },
  data() {
    return {
      breadcrumbs: [],
      type: {},
      items: [],
      selectedItems: [],
    };
  },
  methods: {
    redirect(route, params) {
      this.$router.push({
        name: route,
        params: params,
      });
    },
    selected(id) {
      const index = this.selectedItems.indexOf(id);
      if (index === -1) {
        this.selectedItems.push(id);
      } else {
        this.selectedItems.splice(index, 1);
      }
    },
    buy(product) {
      if (
        confirm(
          product
            ? `Вы действительно хотите продвинуть объявление?`
            : `Вы действительно хотите купить "${this.type.name}" за ${this.type.price} монет?`
        )
      ) {
        const params = {
          type_id: this.$route.params.type,
          ad_ids: this.selectedItems.join(","),
        };
        this.$http
            .post("monetizations/create", params, {
            headers: {
              Authorization: this.$store.state.token,
            },
          })
          .then(
            function (response) {
              if (response.data.status) {
                this.$store.commit("setListingSuccess", true);
                this.$store.dispatch("setBalance");
                this.redirect("company-services-list");
                if (this.selectedItems.length === 1) {
                  this.$notify({
                    group: "sign",
                    title: "Успешно!",
                    text: "Объявление успешно добавлено в продвигаемые.",
                    type: "success",
                  });
                } else {
                  this.$notify({
                    group: "sign",
                    title: "Успешно!",
                    text: "Объявления успешно добавлены в продвигаемые.",
                    type: "success",
                  });
                }
              }
            }.bind(this)
          );
      } else {
        this.$store.commit("setListing", false);
        this.$store.commit("setListingSuccess", false);
        this.redirect("company-services-list");
      }
    },
  },
  created() {
    if (this.$store.getters.listingSet) {
      this.selectedItems.push(this.$store.state.listing);
      this.$store.commit("setListing", false);
      this.buy(true);
    } else {
      this.$http
        .get(`monetizations/page/${this.$route.params.type}`, {
          headers: {
            Authorization: this.$store.state.token,
          },
        })
        .then(
          function (response) {
            this.type = response.data.type;
            this.items = response.data.ads;
            this.breadcrumbs = [
              {
                title: "Платные услуги",
                route: "company-services-list",
              },
              {
                title: this.type.name,
              },
            ];

            if (this.$route.params.product) {
              this.selectedItems.push(this.$route.params.product);
            }
          }.bind(this)
        );
    }
  },
};
</script>

<style lang="scss" scoped>
@import "src/assets/variables";

.buy {
  padding: 40px 30px;

  .breadcrumbs {
    margin: 30px 0;

    @media screen and (max-width: 1170px) {
      .breadcrumbs {
        flex-wrap: wrap;
      }
    }
  }

  .info {
    margin: 20px 0;
    display: flex;
    flex-direction: column;
    width: 180px;

    span {
      color: $dark-blue;
      font-size: 20px;
    }

    button {
      margin-top: 20px;
    }
  }

  .items {
    display: flex;
    flex-wrap: wrap;
    width: 1040px;

    @media screen and (max-width: 1170px) {
      width: 100%;
      justify-content: center;
    }

    .item {
      &:not(:first-child) {
        @media screen and (max-width: 1170px) {
          margin-top: 40px;
        }
      }

      &:not(:nth-child(4n + 1)) {
        margin-left: 40px;

        @media screen and (max-width: 1170px) {
          margin-left: 0;
        }
      }

      &:not(:nth-child(1)):not(:nth-child(2)):not(:nth-child(3)):not(:nth-child(4)) {
        margin-top: 40px;
      }
    }
  }
}
</style>
