<template>
  <div @click="clicked(id)" class="item">
    <div class="top">
      <div :style="getStyle(image)" class="image"></div>
      <div class="overlay">
        <div :style="getStyle(tag)" class="tag"></div>
        <div
          @click="redirect('company-listing-item-detail', { id: id })"
          class="edit"
        >
          <i class="fas fa-pen"></i>
        </div>
      </div>
    </div>
    <div class="info">
      <span class="name">{{ name }}</span>
      <span class="price">{{ priceFormatted }}</span>
      <div class="description">
        <span>г. {{ city }}</span>
        <span>{{ date }}</span>
      </div>
      <div class="controls">
        <PrimaryButton @clicked="action()" :class="{ published: published }">{{
          published ? "Продвигать" : "Опубликовать"
        }}</PrimaryButton>
        <SecondaryButton @clicked="deleteListing()">Удалить</SecondaryButton>
      </div>
    </div>
  </div>
</template>

<script>
import PrimaryButton from "@/components/Core/PrimaryButton";
import SecondaryButton from "@/components/Core/SecondaryButton";

export default {
  name: "CompanyItem",
  components: {
    PrimaryButton,
    SecondaryButton,
  },
  props: {
    id: Number,
    image: String,
    tag: String,
    count: Number,
    favorite: Boolean,
    name: String,
    price: Number,
    city: String,
    created_at: String,
    published: Boolean,
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
  methods: {
    clicked(id) {
      this.$emit("clicked", id);
    },
    getStyle(image) {
      return image
        ? `background-image: url('https://api.kupizalog.kz/${image}');`
        : "";
    },
    action() {
      if (this.published) {
        this.$store.commit("setListing", this.id);
        this.redirect("company-services-list");
      } else {
        this.$http
            .post(
            `product/${this.id}/publish`,
            {},
            {
              headers: {
                Authorization: this.$store.state.token,
              },
            }
          )
          .then(
            function (response) {
              if (response.status === 200 || response.status === 201) {
                this.$router.go();
                this.$notify({
                  group: "sign",
                  title: "Успешно!",
                  text: `Вы успешно опубликовали "${this.name}".`,
                  type: "success",
                });
              }
            }.bind(this)
          );
      }
    },
    deleteListing() {
      if (confirm(`Вы действительно хотите удалить "${this.name}"?`)) {
        this.$http
            .delete(`product/${this.id}`, {
            headers: {
              Authorization: this.$store.state.token,
            },
          })
          .then(
            function (response) {
              if (response.status === 200 || response.status === 201) {
                this.$router.go();
                this.$notify({
                  group: "sign",
                  title: "Успешно!",
                  text: `Вы успешно удалилил "${this.name}".`,
                  type: "success",
                });
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
  width: 260px;
  height: 430px;
  background-color: $white;
  border: 1px solid $gray;
  border-radius: 5px;
  cursor: pointer;

  .top {
    position: relative;
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
        top: 5px;
        left: -10px;
        width: 60px;
        height: 25px;
        background-size: contain;
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

      .edit {
        position: absolute;
        top: 5px;
        right: 5px;
        color: $light-gray2;

        &.active {
          color: $yellow;
        }
      }
    }
  }

  .info {
    padding: 20px;
    display: flex;
    flex-direction: column;

    .name {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: $dark-blue2;
      font-size: 16px;
      font-weight: 500;
    }

    .price {
      margin-top: 10px;
      color: $green;
      font-weight: bold;
    }

    .description {
      margin-top: 10px;
      display: flex;
      justify-content: space-between;
      color: $gray;
      font-size: 12px;
    }

    .controls {
      margin-top: 15px;

      button {
        width: 100%;

        &.published {
          background-color: $yellow3;
          border: 1px solid $yellow3;
        }

        &:not(:first-child) {
          margin-top: 10px;
        }
      }
    }
  }
}
</style>
