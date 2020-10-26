<template>
  <div class="categories">
    <div v-for="(category, index) in categories" :key="index">
      <a
        :href="'/' + category.category.slug"
        :style="'background-image: url(https://api.kupizalog.kz' + category.icon.path + ');'">
      </a>

      <span>{{ category.category.name }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Categories",

  data: function () {
    return {
      categories: [],
    };
  },
  mounted: function () {
    this.$http
      .get("fast_access_to_category", {
        headers: {
          Authorization: this.$store.state.token,
        },
      })
      .then(
        function (response) {
          this.categories = response.data;
        }.bind(this)
      );
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/variables";

.categories {
  margin-top: 30px;
  flex: 1;
  display: flex;
  justify-content: space-between;
  max-width: 1170px;

  & > div {
    width: 60px;
    display: flex;
    flex-direction: column;
    align-items: center;

    a {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 60px;
      height: 60px;
      background: $white;
      border: 1px solid $blue;
      border-radius: 180px;
      font-size: 22px;
      background-size: 35%;
      background-position: center;
      background-repeat: no-repeat;

      &:link {
        color: $blue;
        text-decoration: none;
      }

      &:visited {
        color: $blue;
        text-decoration: none;
      }

      &:hover {
        color: $blue;
        text-decoration: none;
      }

      &:active {
        color: $blue;
        text-decoration: none;
      }
    }

    span {
      font-size: 12px;
      line-height: 14px;
      color: $light-black;
      margin-top: 15px;
      text-align: center;
    }
  }
}

@media screen and (max-width: 1170px) {
  .categories {
    display: none;
  }
}
</style>
