<template>
  <div class="item">
    <div class="item-row">
      <div class="left">
        <div
          v-if="images.length > 0"
          :style="
            'background-image: url(https://api.kupizalog.kz/' +
            images[selected].path +
            ');'
          "
          class="cover"
        ></div>
        <div class="images">
          <div
            v-for="(img, index) in images"
            :key="index"
            :style="
              'background-image: url(https://api.kupizalog.kz/' +
              img.path +
              ');'
            "
            @click="changeImage(index)"
          ></div>
        </div>
        <div v-if="item.product" class="description">
          <span class="heading">Описание</span>
          <p>{{ item.product.content }}</p>
        </div>
      </div>
      <div class="right">
        <h1 v-if="item.product" class="name">{{ item.product.name }}</h1>
        <div class="price-row">
          <div v-if="item.product" class="price">{{ priceFormatted }}</div>
          <div
            v-if="item.monetization_icon"
            class="discount"
            :style="
              'background-image: url(https://api.kupizalog.kz/' +
              item.monetization_icon +
              ');'
            "
          ></div>
        </div>
        <div class="desc">
          <div v-for="characteristic of item.characteristics" :key="characteristic.id" class="desc-row">
            <span class="label">{{ characteristic.title }}:</span>
            <span class="value">{{ characteristic.value }}</span>
          </div>
        </div>
        <div v-if="item.product" class="city-date">
          <div class="city">
            <i class="fas fa-map-marker-alt"></i>
            <span>Город: {{ item.product.company.city }}</span>
          </div>
          <div class="date">
            <i class="far fa-clock"></i>
            <span>Опубликовано: {{ created_at }}</span>
          </div>
          <div @click="addFavorite()" class="favorite">
            <i
              :class="{
                'fas fa-star': item.product.favorite,
                'far fa-star': !item.product.favorite,
              }"
            ></i>
            <span>{{
              item.product.favorite
                ? "Удалить из избранного"
                : "Добавить в избранное"
            }}</span>
          </div>
        </div>
        <div v-if="mine" class="edit">
          <SecondaryButton
            @clicked="redirect('company-listing-item-edit', { id: id })"
            >Редактировать страницу</SecondaryButton
          >
        </div>
        <div v-else class="contacts">
          <div class="heading">Связаться с продавцом</div>
          <div class="seller">
            <i class="far fa-user"></i>
            <span>Продавец:</span>
            <span
              v-if="item.product"
              @click="redirect('pawnshop', { id: item.product.company.id })"
              class="seller-name"
              >{{ item.product.company.title }}</span
            >
          </div>
          <div class="phone">
            <a v-if="phoneShown" :href="'tel:' + phonePart">{{ phonePart }}</a>
            <a v-else>{{ phonePart }}</a>
            <div v-if="!phoneShown" @click="show" class="show">
              показать телефон
            </div>
        </div>
        <p class="mt-2">
          <span>Номер компании: </span><a :href="'tel:' + phonePart">{{ getCompanyNum }}</a>
        </p>
        </div>
        <!--<div class="controls">-->
        <!--<button class="message">Написать</button>-->
        <!--<button class="call">Позвонить</button>-->
        <!--</div>-->
      </div>
    </div>
    <!--<div class="map">Карта</div>-->
  </div>
</template>

<script>
import SecondaryButton from "@/components/Core/SecondaryButton";

export default {
  name: "ItemDetail",
  created() {
    this.$http.get(`product/${this.id}`).then(
      function (response) {
        this.item = response.data;
        document.title = this.item.product.name;
        this.meta = document.createElement("meta");
        this.meta.name = "description";
        this.meta.setAttribute("content", this.item.product.description);
        document.getElementsByTagName("head")[0].appendChild(this.meta);
        this.item.images.unshift(this.item.product.image);
        this.images = this.item.images;
        this.$emit("name", this.item.product.name);
      }.bind(this)
    );
  },
  components: {
    SecondaryButton,
  },
  props: {
    id: Number,
    mine: Boolean,
  },
  data: function () {
    return {
      selected: 0,
      images: [],
      phoneShown: false,
      item: {},
      favorite: false,
      loading: false,
      companyNum: '',
    };
  },
  computed: {
    created_at() {
      if (this.item) {
        return window.moment(this.item.product.created_at).format("DD.MM.YYYY");
      }
      return 0
    },
    getCompanyNum() {
      if (!this.item.product) {
        return "";
      }
      return "+7" + this.item.product.company.public_number.toString();
    },
    phoneParsed() {
      if (!this.item.product) {
        return "";
      }
      let phone = "+7" + this.item.product.public_number.toString();
      return (
        phone.substring(0, 2) +
        " (" +
        phone.substring(2, 5) +
        ") " +
        phone.substring(5)
      );
    },
    phonePart() {
      return this.phoneShown
        ? this.phoneParsed
        : this.phoneParsed.substring(0, 8);
    },
    priceFormatted() {
      return new Intl.NumberFormat("kk-KZ", {
        style: "currency",
        currency: "KZT",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(this.item.product.price);
    },
  },
  methods: {
    changeImage: function (index) {
      this.selected = index;
    },
    show: function () {
      this.phoneShown = true;
    },
    addFavorite() {
      if (this.item.product.favorite) {
        // todo   Redirect User to Login or Registration Page if no token
        this.$http
            .delete(
            `product/favorite/${this.item.product.id}`,
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
                this.item.product.favorite = false;
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
                this.item.product.favorite = true;
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
  background: $white;
  border: 1px solid $item-gray;
  border-radius: 6px;
  padding: 30px;
  display: flex;
  flex-direction: column;

  .item-row {
    display: flex;

    @media screen and (max-width: 1170px) {
      flex-direction: column;
    }

    .left {
      width: 410px;

      @media screen and (max-width: 1170px) {
        width: 100%;
      }

      .cover {
        width: 100%;
        height: 300px;
        border-radius: 6px;
        background-size: cover;
        background-position: center;
      }

      .images {
        margin-top: 20px;
        display: flex;
        flex-wrap: wrap;

        div {
          width: 60px;
          height: 60px;
          background-size: cover;
          background-position: center;
          border-radius: 6px;
          margin-right: 10px;
          margin-bottom: 10px;
          cursor: pointer;

          &:nth-child(6n) {
            margin-right: 0;
          }

          &:last-child {
            margin-right: 0;
          }
        }
      }

      .description {
        margin-top: 30px;
        color: $dark-blue;

        .heading {
          font-size: 18px;
          font-weight: 500;
        }

        p {
          margin: 10px 0 0 0;
        }
      }
    }

    .right {
      flex: 1;
      margin-left: 50px;
      display: flex;
      flex-direction: column;
      overflow: hidden;

      @media screen and (max-width: 1170px) {
        margin: 20px 0 0 0;
      }

      .name {
        font-size: 24px;
        font-weight: 500;
        line-height: 28px;
        color: $avatar-black;
        padding-top: 10px;
      }

      .price-row {
        margin-top: 20px;
        display: flex;
        position: relative;
        justify-content: space-between;

        .price {
          font-size: 24px;
          font-weight: 500;
          line-height: 28px;
          color: $green;
        }

        .discount {
          width: 75px;
          height: 24px;
          background-image: url("../assets/img/icons/discount.svg");
          background-size: contain;
          display: flex;
          align-items: center;
          padding-left: 13px;
          font-size: 12px;
          line-height: 14px;
          font-weight: bold;
          color: $white;
        }
      }

      .desc {
        margin-top: 30px;

        .desc-row {
          font-size: 14px;
          line-height: 16px;
          margin-bottom: 12px;

          &:last-child {
            margin-bottom: 0;
          }

          .label {
            color: $avatar-black;
          }

          .value {
            color: $blue;
          }
        }
      }

      .city-date {
        margin-top: 25px;

        .favorite {
          i {
            color: $favorite-yellow;
          }

          span {
            color: $blue;
            cursor: pointer;
          }
        }

        div {
          margin-top: 12px;

          &:first-child {
            margin-top: 0;
          }
        }

        i {
          margin-right: 7px;
          color: $red;
        }

        span {
          font-size: 14px;
          line-height: 16px;
          color: $avatar-black;
        }
      }

      .edit {
        margin-top: 25px;
      }

      .contacts {
        margin-top: 35px;

        .heading {
          font-size: 18px;
          font-weight: 500;
          line-height: 21px;
          color: $avatar-black;
        }

        .seller {
          display: flex;
          align-items: center;
          font-size: 14px;
          line-height: 16px;
          margin-top: 15px;

          .seller-name {
            color: $blue;
            font-size: 14px;
            margin-left: 5px;
            cursor: pointer;
          }

          i {
            margin-right: 7px;
          }
        }

        .phone {
          margin-top: 20px;
          display: flex;
          align-items: flex-end;

          .show {
            cursor: pointer;
            color: $blue;
            text-decoration: underline;
            margin-left: 5px;
          }

          a {
            font-size: 18px;
            font-weight: 500;
          }
        }
      }

      .controls {
        margin-top: 40px;
        display: flex;

        .message {
          border: 1px solid $blue;
          color: $blue;
        }

        .call {
          margin-left: 30px;
          background: $blue;
          color: $white;
        }

        button {
          flex: 1;
          height: 36px;
          font-size: 12px;
          font-weight: bold;
          border-radius: 6px;
        }
      }
    }
  }

  .map {
    width: 100%;
    height: 292px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid $border-gray;
    border-radius: 6px;
    margin-top: 70px;
  }
}
</style>
