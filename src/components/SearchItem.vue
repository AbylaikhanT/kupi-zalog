<template>
  <div class="item" @click="clicked">
    <div class="left">
      <div
        class="image"
        :style="
          'background-image: url(https://api.kupizalog.kz' + image.path + ');'
        "
      ></div>
      <!--<div class="vip">-->
      <!--<span>VIP</span>-->
      <!--</div>-->
      <div
        v-if="monetization_icon"
        class="discount"
        :style="
          'background-image: url(https://api.kupizalog.kz/' +
          monetization_icon +
          ');'
        "
      >
        <!--<span>-100%</span>-->
      </div>
      <div class="image-count">{{ quantity_of_image }}</div>
    </div>
    <div class="right">
      <div class="top-row">
        <div class="name-price">
          <a :href="'/item/' + slug">
            <div class="name">{{ name }}</div>
          </a>
          <div class="price">{{ price_formatted }}</div>
        </div>
        <div class="desc">{{ content }}</div>
      </div>
      <div class="bottom-row">
        <div class="city-date">
          <div class="city">
            <i class="fas fa-map-marker-alt"></i>
            <span>г. {{ company.city }}</span>
          </div>
          <div class="date">
            <i class="far fa-clock"></i>
            <span>{{ created_at_formatted }}</span>
          </div>
        </div>
        <div class="favorite">
          <i v-bind:class="{ active: isFavorite }" class="fas fa-star"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchItem",
  props: {
    id: Number,
    slug: String,
    image: Object,
    name: String,
    content: String,
    price: Number,
    created_at: String,
    monetization_icon: String,
    quantity_of_image: Number,
    company: Object,
    favorite: Boolean,
  },
  computed: {
    created_at_formatted() {
      return window.moment(this.created_at).format("DD.MM.YYYY");
    },
    price_formatted() {
      return new Intl.NumberFormat("kk-KZ", {
        style: "currency",
        currency: "KZT",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(this.price);
    },
  },
  watch: {
    favorite(favorite) {
      this.isFavorite = favorite;
    },
  },
  data() {
    return {
      isFavorite: this.favorite,
    };
  },
  methods: {
    clicked(e) {
      if (
        e.target.classList.contains("favorite") ||
        e.target.parentElement.classList.contains("favorite")
      ) {
        this.addFavorite();
      } else {
        this.redirect("item", { slug: this.slug });
      }
    },
    addFavorite() {
      if (this.isFavorite) {
        this.$http
            .delete(
            `product/favorite/${this.id}`,
            {},
            {
              headers: {
                Authorization: this.$store.state.token,
              },
            }
          )
          .then(
            function (response) {
              if (response.status === 200) {
                this.$notify({
                  group: "sign",
                  title: "Удалено!",
                  text: "Продукт успешно удален из избранного.",
                  type: "success",
                });
                this.isFavorite = false;
              }
            }.bind(this)
          );
      } else {
        this.$http
            .post(
            "product/favorite",
            {
              ad: this.id,
            },
            {
              headers: {
                Authorization: this.$store.state.token,
              },
            }
          )
          .then(
            function (response) {
              if (response.status === 201) {
                this.$notify({
                  group: "sign",
                  title: "Добавлено!",
                  text: "Продукт успешно добавлен в избранное.",
                  type: "success",
                });
                this.isFavorite = true;
              }
            }.bind(this)
          );
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "src/assets/variables";

.item {
  display: flex;
  border: 1px solid $border-gray;
  border-radius: 6px;
  background: $white;
  height: 140px;
  padding: 10px;
  cursor: pointer;

  &:hover {
    box-shadow: 2.5px 0 5px 0 $gray;
  }

  .left {
    position: relative;
    width: 145px;

    .image {
      width: 145px;
      height: 121px;
      /*background-image: url('../..src/assets/variables/img/item.png');*/
      background-size: cover;
      background-position: center center;
    }

    .vip {
      position: absolute;
      top: 10px;
      left: -20px;
      z-index: 1;
      width: 45px;
      height: 20px;
      background-image: url("../assets/img/icons/money-bag.svg");
      background-size: contain;

      span {
        position: absolute;
        top: 3px;
        left: 13px;
        color: $white;
        font-size: 10px;
        font-weight: bold;
        line-height: 11px;
      }
    }

    .discount {
      position: absolute;
      top: 10px;
      left: -20px;
      z-index: 1;
      width: 45px;
      height: 20px;
      /*background-image: url('../assets/img/icons/money-bag.svg');*/
      background-size: contain;

      span {
        position: absolute;
        top: 3px;
        left: 6px;
        color: $white;
        font-size: 10px;
        font-weight: bold;
        line-height: 11px;
      }
    }

    .image-count {
      position: absolute;
      bottom: 3px;
      left: 5px;
      border: 1px solid $item-gray;
      color: $gray3;
      font-size: 10px;
      line-height: 11px;
      padding: 4px 6px;
      background: $white;
    }
  }

  .right {
    flex: 1;
    margin-left: 12px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .top-row {
      display: flex;
      flex-direction: column;
      width: 100%;
      max-width: 100%;

      .name-price {
        max-width: 661px;
        display: flex;
        justify-content: space-between;

        @media screen and (max-width: 1170px) {
          max-width: 150px;
          flex-direction: column;
          justify-content: flex-start;
        }

        .name {
          width: 100%;
          max-width: 100%;
          font-size: 16px;
          font-weight: 500;
          line-height: 19px;
          color: $black;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;

          @media screen and (max-width: 1170px) {
            max-width: 150px;
          }
        }

        .price {
          flex-shrink: 0;
          font-size: 18px;
          font-weight: bold;
          line-height: 21px;
          color: $green;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;

          @media screen and (max-width: 1170px) {
            max-width: 150px;
            margin-top: 10px;
          }
        }
      }

      .desc {
        max-width: 661px;
        flex: 1;
        margin-top: 10px;
        font-size: 10px;
        line-height: 11px;
        color: $border-gray;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

        @media screen and (max-width: 1170px) {
          max-width: 150px;
        }
      }
    }

    .bottom-row {
      display: flex;
      justify-content: space-between;

      @media screen and (max-width: 1170px) {
        display: none;
      }

      .city-date {
        display: flex;
        color: $gray3;
        font-size: 12px;
        line-height: 14px;

        div {
          display: flex;
          align-items: flex-end;
        }

        .date {
          margin-left: 30px;
        }

        i {
          color: $red;
          margin-right: 7px;
        }
      }

      .favorite {
        color: $light-gray2;
        cursor: pointer;

        .active {
          color: $yellow;
        }
      }
    }
  }
}
</style>
