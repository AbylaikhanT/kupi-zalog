<template>
  <div @click.exact="clicked" class="item">
    <div class="top">
      <div :style="getStyle(image)" class="image"></div>
      <div class="overlay">
        <div :style="getStyle(tag)" class="tag"></div>
        <div v-if="count" class="count">{{ count }}</div>
        <div @click.stop="clicked" :class="{ active: isFavorite }" class="favorite">
          <i class="fas fa-star"></i>
        </div>
      </div>
    </div>
    <div class="info">
      <span class="name">
        {{ name }}
      </span>
      <span class="price">{{ priceFormatted }}</span>
      <div class="description">
        <span>г. {{ city }}</span>
        <span>{{ date }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Item",
  props: {
    id: Number,
    slug: String,
    image: String,
    tag: String,
    count: Number,
    favorite: Boolean,
    name: String,
    price: Number,
    city: String,
    created_at: String,
  },
  computed: {
    date: function () {
      return this.created_at
        ? window.moment(this.created_at).format("DD.MM.YYYY")
        : "";
    },
    priceFormatted() {
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
    console.log(this.id);
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
        this.$router.push("/item/" + this.slug);
        this.routeToItem();
      }
    },
    getStyle(image) {
      return image
        ? `background-image: url('https://api.kupizalog.kz/${image}');`
        : "";
    },
    routeToItem() {
      this.$router.replace("/item/" + this.slug);
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
  width: 250px;
  height: 330px;
  background-color: $white;
  border: 1px solid $gray;
  border-radius: 5px;
  cursor: pointer;

  @media screen and (max-width: 1170px) {
    width: 100%;
  }

  &:hover {
    box-shadow: 2.5px 0 5px 0 $gray;
  }

  .top {
    position: relative;
    width: 100%;
    height: 220px;
    border-bottom: 1px solid $light-gray;

    .image {
      height: 100%;
      background-size: cover;
      background-position: center;
      border-radius: 5px 5px 0 0;
    }

    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;

      .tag {
        position: absolute;
        top: -40px;
        left: -45px;
        width: 300px;
        height: 125px;
        background-size: contain;
        pointer-events: none;
      }

      .count {
        padding: 3px 6px;
        position: absolute;
        bottom: 5px;
        left: 5px;
        background-color: $white;
        border: 1px solid $light-gray2;
        color: $dark-gray2;
        font-size: 12px;
      }

      .favorite {
        z-index: 1;
        position: absolute;
        top: 5px;
        right: 5px;
        color: $light-gray2;
        cursor: pointer;

        &.active {
          color: $yellow;
        }
      }
    }
  }

  .info {
    width: 100%;
    padding: 20px;
    display: flex;
    flex-direction: column;

    @media screen and (max-width: 1170px) {
      max-width: 100%;
    }

    .name {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: $dark-blue2;
      font-size: 16px;
      font-weight: 500;

      @media screen and (max-width: 1170px) {
        max-width: 100%;
      }
    }

    .price {
      margin-top: 10px;
      color: $green;
      font-weight: bold;

      @media screen and (max-width: 1170px) {
        max-width: 100%;
      }
    }

    .description {
      margin-top: 10px;
      display: flex;
      justify-content: space-between;
      color: $gray;
      font-size: 12px;

      @media screen and (max-width: 1170px) {
        max-width: 100%;
      }
    }
  }
}
</style>
