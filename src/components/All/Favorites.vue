<template>
  <div @click="redirect('user-favorites')" class="favorites">
    <i class="far fa-star"></i>
    <span>Избранные</span>
    <span v-if="count">({{ count }})</span>
  </div>
</template>

<script>
export default {
  name: "Favorites",
  data() {
    return {
      count: 0,
    };
  },
  methods: {
    redirect(route) {
      this.$router.push({ name: route });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "src/assets/variables";

.favorites {
  display: flex;
  align-items: center;
  color: $blue;
  cursor: pointer;

  i {
    margin-right: 8px;
  }

  span {
    font-size: 16px;

    &:not(:first-of-type) {
      margin-left: 4px;
    }
  }
}
</style>
