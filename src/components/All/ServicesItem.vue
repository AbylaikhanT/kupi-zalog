<template>
  <div @click="clicked(id)" class="item">
    <div class="top">
      <div :style="getBackground(image)" class="image"></div>
      <div class="overlay">
        <div :class="{ selected: selected }" class="choice">
          <i class="fas fa-check"></i>
        </div>
      </div>
    </div>
    <div class="info">
      <span class="name">{{ name }}</span>
      <span class="price">{{ price }} KZT</span>
      <div class="description">
        <span>{{ date }}</span>
      </div>
    </div>
    <div class="controls">
      <PrimaryButton v-if="selected">Выбрать</PrimaryButton>
      <SecondaryButton v-else>Выбрать</SecondaryButton>
    </div>
  </div>
</template>

<script>
import PrimaryButton from "@/components/Core/PrimaryButton";
import SecondaryButton from "@/components/Core/SecondaryButton";

export default {
  name: "ServiceItem",
  components: {
    PrimaryButton,
    SecondaryButton,
  },
  props: {
    id: Number,
    image: String,
    name: String,
    price: Number,
    created_at: String,
    selected: Boolean,
  },
  computed: {
    date: function () {
      return this.created_at
        ? window.moment(this.created_at).format("DD.MM.YYYY")
        : "";
    },
  },
  methods: {
    clicked(id) {
      this.$emit("clicked", id);
    },
    getBackground(image) {
      return image
        ? `background-image: url('https://api.kupizalog.kz/${image}');`
        : "";
    },
  },
};
</script>

<style lang="scss" scoped>
@import "src/assets/variables";

.item {
  width: 230px;
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

      .choice {
        position: absolute;
        top: 16px;
        left: 16px;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 45px;
        height: 45px;
        background-color: $light-gray8;
        border-radius: 50%;
        color: $dark-gray4;

        i {
          font-size: 26px;
        }

        &.selected {
          background-color: $blue;
          color: $white;
        }
      }
    }
  }

  .info {
    padding: 20px 20px 0 20px;
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
  }

  .controls {
    margin-top: 15px;
    padding: 0 10px 15px 10px;

    button {
      width: 100%;
    }
  }
}
</style>
