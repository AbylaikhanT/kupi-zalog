<template>
  <div @click="goToPawnshop()" class="pawnshop">
    <span>{{ title }}</span>
  </div>
</template>

<script>
export default {
  name: "Pawnshop",
  props: {
    id: Number,
    title: String,
    logo: String,
    sale: Boolean,
  },
  computed: {
    backgroundImage() {
      return this.logo
        ? `background-image: url(https://api.kupizalog.kz${this.logo}`
        : "";
    },
  },
  methods: {
    goToPawnshop() {
      if (this.sale) {
        this.redirect(
          "pawnshop",
          {
            id: this.id,
          },
          {
            sale: true,
          }
        );
      } else {
        this.redirect("pawnshop", {
          id: this.id,
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "src/assets/variables";

.pawnshop {
  width: 260px;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: $white;
  background-position: center;
  background-size: 12.5%;
  background-repeat: no-repeat;
  border: 1px solid $gray;
  border-radius: 5px;
  cursor: pointer;
  box-sizing: border-box;

  span {
    padding: 0 8px;
    max-width: 280px;
    color: $blue;
    font-size: 16px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  @media screen and (max-width: 1170px) {
    width: 100%;
    background-size: contain;
  }
}
</style>
