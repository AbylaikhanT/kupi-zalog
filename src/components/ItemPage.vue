<template>
  <div class="item-wrapper">
    <div class="breadcrumbs-wrapper">
      <Breadcrumbs :breadcrumbs="breadcrumbs"></Breadcrumbs>
    </div>
    <div class="content-wrapper">
      <ItemDetail v-bind:id="parseInt(this.slug.split('-').pop())"></ItemDetail>
    </div>
  </div>
</template>

<script>
import Breadcrumbs from "@/components/All/Breadcrumbs";
import ItemDetail from "@/components/ItemDetail";

export default {
  name: "ItemPage",
  components: {
    Breadcrumbs,
    ItemDetail,
  },
  props: {
    slug: String,
  },
  data() {
    return {
      breadcrumbs: [],
    };
  },
  created() {
    this.$http
      .get(`product/${this.slug.split("-").pop()}`, {
        headers: {
          Authorization: this.$store.state.token,
        },
      })
      .then(
        function (response) {
          this.breadcrumbs = [
            {
              title: "Главная",
              route: "home",
              slug: "",
            },
          ];
          response.data.categories = response.data.categories.reverse();
          response.data.categories.forEach(
            function (category) {
              this.breadcrumbs.push({
                title: category.name,
                route: "search_in_category",
                params: {
                  category: category.slug,
                },
              });
            }.bind(this)
          );
        }.bind(this)
      );
  },
};
</script>

<style lang="scss" scoped>
.item-wrapper {
  width: 860px;

  @media screen and (max-width: 1170px) {
    padding: 0 20px;
    width: 100%;
  }

  .breadcrumbs-wrapper {
    width: 1170px;

    @media screen and (max-width: 1170px) {
      width: 100%;
    }
  }

  .content-wrapper {
    margin-top: 20px;
  }
}
</style>
