<template>
  <div :class="{ small: small }" class="photo">
    <div v-if="background" :style="background" class="image"></div>
    <div v-if="background" @click="removePhoto()" class="icon minus">
      <i class="fas fa-minus"></i>
    </div>
    <div v-else class="icon">
      <i class="fas fa-plus"></i>
    </div>
    <label>
      <input @change="changed" type="file" accept="image/x-png,image/jpeg" />
    </label>
  </div>
</template>

<script>
export default {
  name: "InputPhoto",
  props: {
    url: String,
    small: Boolean,
  },
  data() {
    return {
      imageUrl: this.url,
      image: undefined,
    };
  },
  watch: {
    url(newUrl) {
      this.imageUrl = newUrl;
    },
  },
  computed: {
    background() {
      return this.image
        ? `background-image: url('${this.image}');`
        : this.imageUrl
        ? `background-image: url('https://api.kupizalog.kz${this.imageUrl}');`
        : "";
    },
  },
  methods: {
    changed($event) {
      const reader = new FileReader();
      reader.addEventListener(
        "load",
        function (file) {
          this.image = file.target.result;
        }.bind(this)
      );
      reader.readAsDataURL($event.target.files[0]);
      this.$emit("changed", $event.target.files[0]);
    },
    removePhoto() {
      this.image = undefined;
      this.imageUrl = undefined;
      this.$emit("changed", undefined);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "src/assets/variables";

.photo {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 155px;
  height: 125px;
  background-color: $light-gray6;
  border: 1px solid $dark-gray3;
  border-radius: 5px;

  &.small {
    width: 110px;
    height: 90px;

    .icon {
      width: 25px;
      height: 25px;
    }
  }

  label {
    position: absolute;
    margin: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
    z-index: 10;

    input {
      display: none;
    }
  }

  .image {
    position: absolute;
    width: 100%;
    height: 100%;
    background-size: contain;
    background-position: center;
  }

  .icon {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 35px;
    height: 35px;
    background-color: $blue;
    border-radius: 50%;
    color: $white;

    &.minus {
      background-color: $red;
      cursor: pointer;
      z-index: 15;
    }
  }
}
</style>
