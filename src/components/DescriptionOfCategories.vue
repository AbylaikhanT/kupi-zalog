<template>
  <div>
    <h2>{{ categoryName }}</h2>
  </div>
</template>

<script>
export default {
  name: "DescriptionOfCategories",
  data: function () {
    return {
      categories: [],
      selectedCategory: undefined,
      selectedCategoryDepth: undefined,
      categoryName: "",
    };
  },
  metaInfo() {
    return {
      title: this.categoryName,
      meta: [
        {
          name:"description",
          content:this.categoryName,
        },
      ],
    };
  },
  mounted: function () {
    function findGetParameter(parameterName) {
      var result = null;
      var result_array = null;
      if (parameterName === "category") {
        if (location.pathname.includes("search")) {
          return null;
        }
        result_array = location.pathname
          .split("?")[0]
          .split("/v-")[0]
          .split("/");
        result = result_array.length - 1;
        return result;
      }
      if (parameterName === "category_id") {
        if (location.pathname.includes("search")) {
          return null;
        }
        result = location.pathname
          .split("?")[0]
          .split("/v-")[0]
          .split("/")
          .slice(-1)[0];
        return result;
      }
      return result;
    }

    this.$http
      .get("categories", {
        headers: {
          Authorization: this.$store.state.token,
        },
      })
      .then(
        function (response) {
          this.categories = response.data;

          let category = findGetParameter("category");
          if (category) {
            category = parseInt(category);
            const category_id = findGetParameter("category_id");
            for (let outer of this.categories) {
              if (category === 1 && category_id === outer.slug) {
                this.selectedCategory = outer;
                this.selectedCategoryDepth = 1;
                this.categoryName = outer.name;
              } else {
                for (let middle of outer.children) {
                  if (category === 2 && category_id === middle.slug) {
                    this.selectedCategory = middle;
                    this.selectedCategoryDepth = 2;
                    this.categoryName = middle.name;
                  } else {
                    for (let inner of middle.children) {
                      if (category === 3 && category_id === inner.slug) {
                        this.selectedCategory = inner;
                        this.selectedCategoryDepth = 3;
                        this.categoryName = inner.name;
                      }
                    }
                  }
                }
              }
            }
          }
        }.bind(this)
      );

    this.$http
      .get("fast_access_to_category", {
        headers: {
          Authorization: this.$store.state.token,
        },
      })
      .then(
        function (response) {
          this.categories = response.data;
          if (location.pathname !== "/") {
            const category = this.categories.find(
              (res) =>
                res.category.slug ===
                location.pathname.slice(1, location.pathname.length)
            );
            if (category) {
              this.categoryName = category.category.name;
            }
          }
        }.bind(this)
      );
  },
};
</script>

<style scoped>
div {
  margin-top: 20px;
}
</style>
