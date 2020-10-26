<template>
  <div class="">
    <div class="inner-row">
      <div v-if="!hide" class="right">
        <div>
          <button
            @click="selectedType = undefined"
            :class="{ active: !selectedType }"
          >
            <i class="fas fa-border-all"></i>
          </button>
          <span>Все</span>
        </div>
        <div>
          <button
            @click="selectedType = 1"
            :class="{ active: selectedType === 1 }"
          >
            <i class="far fa-gem"></i>
          </button>
          <span>Ломбываываард</span>
        </div>
        <div>
          <button
            @click="selectedType = 2"
            :class="{ active: selectedType === 2 }"
          >
            <i class="money-bag"></i>
          </button>
          <span>Банкasdasd</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Search",
  props: {
    hide: Boolean,
  },
  data: function () {
    return {
      searchQuery: "",
      resultsShown: false,
      results: [],
      selectedResult: undefined,
      categories: [],
      regions: [],
      showCategory: true,
      showLocation: true,
      selectedCategory: undefined,
      selectedCategoryDepth: undefined,
      selectedLocation: undefined,
      selectedLocationDepth: undefined,
      hoveredCategory: undefined,
      hoveredLocation: undefined,
      selectedType: undefined,
    };
  },
  computed: {
    search: {
      get: function () {
        if (this.selectedResult !== false) {
          return this.results[this.selectedResult];
        } else {
          return this.searchQuery;
        }
      },
      set: function (newValue) {
        if (this.selectedResult !== false) {
          this.selectedResult = false;
        }
        this.searchQuery = newValue;
      },
    },
  },
  methods: {
    handleSearch: function (e) {
      if (e.keyCode === 38) {
        if (this.selectedResult === false) {
          this.selectedResult = this.results.length - 1;
        } else {
          this.selectedResult--;
          if (this.selectedResult < 0) {
            this.selectedResult = this.results.length - 1;
          }
        }
      } else if (e.keyCode === 40) {
        if (this.selectedResult === false) {
          this.selectedResult = 0;
        } else {
          this.selectedResult++;
          if (this.selectedResult >= this.results.length) {
            this.selectedResult = 0;
          }
        }
      } else if (e.keyCode === 13) {
        this.redirectToSearchPage();
      } else {
        if (this.searchQuery.length > 0) {
          this.$http
            .get("product/prefix", {
              params: {
                word: this.searchQuery,
              },
            })
            .then(
              function (response) {
                this.results = response.data;
                this.resultsShown = true;
              }.bind(this)
            );
        } else {
          this.results = [];
          this.resultsShown = false;
        }
      }
    },
    redirectToSearchPage: function () {
      let location = "/search?";
      location += this.search ? "&query=" + this.search : "";
      location += this.selectedCategory
        ? "&category=" +
          this.selectedCategoryDepth +
          "&category_id=" +
          this.selectedCategory.id
        : "";
      location += this.selectedLocation
        ? "&location=" +
          this.selectedLocationDepth +
          "&location_id=" +
          this.selectedLocation.id
        : "";
      location += this.selectedType ? "&type=" + this.selectedType : "";
      window.location = location;
    },
    chooseCategory: function (category, depth) {
      this.selectedCategory = category;
      this.selectedCategoryDepth = depth;
      this.removeHoverCategory();
    },
    chooseLocation: function (location, depth) {
      this.selectedLocation = location;
      this.selectedLocationDepth = depth;
      this.removeHoverLocation();
    },
    removeHoverCategory: function () {
      this.hoveredCategory = false;
      setTimeout(
        function () {
          this.hoveredCategory = true;
        }.bind(this),
        10
      );
    },
    removeHoverLocation: function () {
      this.hoveredLocation = false;
      setTimeout(
        function () {
          this.hoveredLocation = true;
        }.bind(this),
        10
      );
    },
  },
  mounted: function () {
    function findGetParameter(parameterName) {
      var result = null,
        tmp = [];
      var items = location.search.substr(1).split("&");
      for (var index = 0; index < items.length; index++) {
        tmp = items[index].split("=");
        if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
      }
      return result;
    }

    if (findGetParameter("query")) {
      this.search = findGetParameter("query");
    }

    if (findGetParameter("type")) {
      this.selectedType = parseInt(findGetParameter("type"));
    }

    this.$http.get("categories").then(
      function (response) {
        this.categories = response.data;

        let category = findGetParameter("category");
        if (category) {
          category = parseInt(category);
          const category_id = parseInt(findGetParameter("category_id"));
          for (let outer of this.categories) {
            if (category === 1 && category_id === outer.id) {
              this.selectedCategory = outer;
              this.selectedCategoryDepth = 1;
            } else {
              for (let middle of outer.children) {
                if (category === 2 && category_id === middle.id) {
                  this.selectedCategory = middle;
                  this.selectedCategoryDepth = 2;
                } else {
                  for (let inner of middle.children) {
                    if (category === 3 && category_id === inner.id) {
                      this.selectedCategory = inner;
                      this.selectedCategoryDepth = 3;
                    }
                  }
                }
              }
            }
          }
        }
      }.bind(this)
    );
    this.$http.get("regions/cities").then(
      function (response) {
        this.regions = response.data;

        let location = findGetParameter("location");
        if (location) {
          location = parseInt(location);
          const location_id = parseInt(findGetParameter("location_id"));
          for (let outer of this.regions) {
            if (location === 1 && location_id === outer.id) {
              this.selectedLocation = outer;
              this.selectedLocationDepth = 1;
            } else {
              for (let middle of outer.children) {
                if (location === 2 && location_id === middle.id) {
                  this.selectedLocation = middle;
                  this.selectedLocationDepth = 2;
                } else {
                  for (let inner of middle.children) {
                    if (location === 3 && location_id === inner.id) {
                      this.selectedLocation = inner;
                      this.selectedLocationDepth = 3;
                    }
                  }
                }
              }
            }
          }
        }
      }.bind(this)
    );
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/variables";

.right {
  display: flex;
  margin-top: 20px;

  @media (min-width: 992px) {
    margin-top: 0;
    margin-left: 22px;
  }

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 15px;

    &:last-child {
      margin-right: 0;
    }

    button {
      width: 50px;
      height: 50px;
      background: $white;
      border: 1px solid $gray;
      border-radius: 6px;
      display: flex;
      justify-content: center;

      &.active {
        background: $active-gray;
      }

      i {
        font-size: 17px;

        &.money-bag {
          display: block;
          width: 17px;
          height: 20px;
          background-image: url("../assets/img/icons/money-bag.svg");
        }
      }
    }

    span {
      font-size: 12px;
      margin-top: 7px;
    }
  }
}
</style>
