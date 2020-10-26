<!-- Не рабочий компонент пхду -->
<template>
  <div class="dropdown">
    <div class="category section">
      <div class="surface">
        <i class="fas fa-briefcase"></i>
        <span v-if="selectedCategory" :class="{ selected: selectedCategory }">{{
          selectedCategory.name
        }}</span>
        <span v-else>Во всех разделах</span>
        <i class="fas fa-angle-down"></i>
      </div>
      <div class="content">
        <div class="content-row">
          <div
            class="outer"
            :class="{ 'outer-hover': showCategory }"
            @click="chooseCategory(false)"
          >
            Во всех разделах
          </div>
        </div>
        <div v-for="category in categories" class="content-row">
          <div
            class="outer outer-after"
            :class="{ 'outer-hover': showCategory }"
            @click="chooseCategory(category, 1)"
          >
            {{ category.name }}
          </div>
          <div class="middle" :class="{ 'outer-hover': showCategory }">
            <div
              v-for="middle in category.children"
              :class="{ 'middle-hover': hoveredCategory === middle.id }"
              @mouseover="hoveredCategory = middle.id"
            >
              <div class="value" @click="chooseCategory(middle, 2)">
                {{ middle.name }}
              </div>
              <div class="inner">
                <div
                  v-for="inner in middle.children"
                  @click="chooseCategory(inner, 3)"
                  class="value"
                >
                  {{ inner.name }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="search">
      <div class="surface">
        <i class="fas fa-search"></i>
        <input
          v-model="search"
          @keyup.up="moveUp()"
          @keyup.down="moveDown()"
          @keyup.enter="submit()"
          @keyup="getResults()"
          placeholder="Быстрый поиск"
        />
      </div>
      <div v-if="resultsShown" class="search-content">
        <div class="header">Похожие</div>
        <div class="results">
          <div
            v-for="(result, index) in results"
            :class="{ selected: index === selectedResult }"
            @mouseover="selectedResult = index"
            @click="resultsShown = false"
            class="result"
          >
            {{ result }}
          </div>
        </div>
      </div>
    </div>
    <div v-if="!hideLocation" class="location section">
      <div class="surface">
        <i class="fas fa-map-marker-alt"></i>
        <span v-if="selectedLocation" :class="{ selected: selectedLocation }">{{
          selectedLocation.title
        }}</span>
        <span v-else>Весь Казахстан</span>
        <i class="fas fa-angle-down"></i>
      </div>
      <div class="content">
        <div class="content-row">
          <div
            class="outer"
            :class="{ 'outer-hover': hoveredLocation }"
            @click="chooseLocation(false)"
          >
            Весь Казахстан
          </div>
        </div>
        <div v-for="region in regions" class="content-row">
          <div
            class="outer outer-after"
            :class="{ 'outer-hover': showLocation }"
            @click="chooseLocation(region, 1)"
          >
            {{ region.title }}
          </div>
          <div class="middle" :class="{ 'outer-hover': showLocation }">
            <div
              v-for="middle in region.children"
              :class="{ 'middle-hover': hoveredLocation === middle.id }"
              @mouseover="hoveredLocation = middle.id"
            >
              <div class="value" @click="chooseLocation(middle, 2)">
                {{ middle.title }}
              </div>
              <div class="inner">
                <div
                  v-for="inner in middle.children"
                  @click="chooseLocation(inner, 3)"
                  class="value"
                >
                  {{ inner.title }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <button @click="redirect('search')">Найти</button>
  </div>
</template>

<script>
export default {
  name: "SearchFilter",
  props: {
    hideLocation: Boolean,
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
          this.$emit("query", this.results[this.selectedResult]);
          return this.results[this.selectedResult];
        } else {
          this.$emit("query", this.searchQuery);
          return this.searchQuery;
        }
      },
      set: function (newValue) {
        if (this.selectedResult !== false) {
          this.selectedResult = false;
        }
        this.searchQuery = newValue;
        this.$emit("query", this.searchQuery);
      },
    },
  },
  methods: {
    moveUp() {
      if (this.selectedResult === false) {
        this.selectedResult = this.results.length - 1;
      } else {
        this.selectedResult--;
        if (this.selectedResult < 0) {
          this.selectedResult = this.results.length - 1;
        }
      }
    },
    moveDown() {
      if (this.selectedResult === false) {
        this.selectedResult = 0;
      } else {
        this.selectedResult++;
        if (this.selectedResult >= this.results.length) {
          this.selectedResult = 0;
        }
      }
    },
    submit() {
      this.search();
    },
    getResults() {
      if (this.searchQuery.length > 0) {
        this.$http
            .get("product/prefix", {
            params: {
              word: this.searchQuery,
            },
            headers: {
              Authorization: this.$store.state.token,
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
    },
    search: function () {
      this.$emit("search", true);
    },
    chooseCategory: function (category, depth) {
      this.selectedCategory = category;
      this.selectedCategoryDepth = depth;
      this.removeHoverCategory();
      this.$emit("category", this.selectedCategory);
    },
    chooseLocation: function (location, depth) {
      this.selectedLocation = location;
      this.selectedLocationDepth = depth;
      this.removeHoverLocation();
      this.$emit("location", this.selectedLocation);
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
  mounted() {
    if (this.$route.query.query) {
      this.search = this.$route.query.query;
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

          let category = this.$route.query.category;
          if (category) {
            category = parseInt(category);
            const category_id = parseInt(this.$route.query.category_id);
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
    if (!hideLocations) {
      this.$http
        .get("regions/cities", {
          headers: {
            Authorization: this.$store.state.token,
          },
        })
        .then(
          function (response) {
            this.regions = response.data;

            let location = this.$route.query.location;
            if (location) {
              location = parseInt(location);
              const location_id = parseInt(this.$route.query.location_id);
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
    }
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/variables";

.dropdown {
  flex: 1;
  display: flex;
  height: 50px;

  @media screen and (max-width: 1170px) {
    display: none;
  }

  .section {
    position: relative;
    flex: 1;
    cursor: pointer;

    .surface {
      height: 100%;
      display: flex;
      align-items: center;
      background-color: $white;

      .selected {
        color: $dark-blue;
      }

      i {
        &:first-child {
          margin-left: 15px;
          margin-right: 10px;
        }

        &:last-child {
          margin-right: 20px;
          color: $black;
        }
      }

      span {
        flex: 1;
        color: $dark-gray;
      }
    }

    .content {
      display: none;
      position: absolute;
      z-index: 1;
      border-radius: 5px;
      box-shadow: 0 1.5px 3px 0 rgba(185, 197, 205, 0.4);
      color: $black;

      .content-row {
        display: flex;

        &:first-child {
          .outer {
            border-width: 1px 1px 0 1px;
            border-radius: 5px 5px 0 0;
          }
        }

        &:last-child {
          .outer {
            border-width: 0 1px 1px 1px;
            border-radius: 0 0 5px 5px;
          }
        }

        .outer {
          padding: 0 15px 0 20px;
          display: flex;
          align-items: center;
          width: 280px;
          height: 35px;
          background-color: $white;
          border: solid $gray;
          border-width: 0 1px 0 1px;
          color: $dark-blue;

          &.outer-hover:hover {
            background-color: $blue;
            color: $white;

            & ~ .middle {
              display: block;
            }
          }

          &.outer-after::after {
            margin-left: auto;
            content: "\f054";
            font-family: "Font Awesome 5 Free";
            font-size: 12px;
            font-weight: 900;
          }
        }

        .middle {
          display: none;
          position: absolute;
          left: 280px;
          width: 250px;
          border-radius: 5px;
          box-shadow: 0 1.5px 3px 0 rgba(185, 197, 205, 0.4);

          &.outer-hover:hover {
            display: block;
          }

          & .middle-hover {
            & .inner {
              display: block;
            }
          }

          & > div {
            display: flex;

            &:first-child {
              .value {
                border-width: 1px 1px 0 1px;
                border-radius: 5px 5px 0 0;
              }
            }

            &:last-child {
              .value {
                border-width: 0 1px 1px 1px;
                border-radius: 0 0 5px 5px;
              }
            }

            .inner {
              .value {
                &:first-child {
                  border-width: 1px 1px 0 1px;
                  border-radius: 5px 5px 0 0;
                }

                &:last-child {
                  border-width: 0 1px 1px 1px;
                  border-radius: 0 0 5px 5px;
                }
              }
            }
          }

          & .value {
            padding: 0 15px 0 20px;
            display: flex;
            align-items: center;
            width: 100%;
            height: 35px;
            background-color: $white;
            border: solid $gray;
            border-width: 0 1px 0 1px;

            &:hover {
              background: $light-gray3;
            }
          }

          .inner {
            display: none;
            position: absolute;
            left: 250px;
            width: 250px;
            border-radius: 5px;
            box-shadow: 0 1.5px 3px 0 rgba(185, 197, 205, 0.4);
          }
        }
      }
    }

    &:hover .content {
      display: block;
    }
  }

  .category {
    .surface {
      border: 1px solid $light-gray2;
      border-right: 0;
      border-radius: 5px 0 0 5px;

      i {
        color: $blue;
      }
    }
  }

  .location {
    .surface {
      border: 1px solid $light-gray2;
      border-right: 0;
      border-left: 0;

      i {
        color: $yellow2;
      }
    }
  }

  .search {
    flex: 1;
    min-width: 360px;
    border: 1px solid $light-gray2;

    .surface {
      padding: 10px 15px;
      display: flex;
      align-items: center;
      height: 100%;
      background-color: $white;

      i {
        margin-right: 15px;
        color: $red2;
      }

      input {
        flex: 1;
        height: 100%;
        color: $dark-blue;
        outline: none;

        &::placeholder {
          color: $gray;
        }
      }
    }

    .search-content {
      padding: 10px 15px;
      position: absolute;
      z-index: 1;
      min-width: 360px;
      background-color: $white;
      border: 1px solid $gray;
      border-radius: 5px;
      box-shadow: 0 1.5px 3px 0 rgba(185, 197, 205, 0.4);

      .header {
        color: $dark-gray5;
        font-size: 10px;
      }

      .results {
        margin-top: 10px;
        color: $dark-gray;

        .result {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;

          &:hover {
            cursor: pointer;
          }

          &.selected {
            background-color: $light-gray3;
          }
        }
      }
    }
  }

  button {
    min-width: 130px;
    height: 100%;
    display: flex;
    justify-content: center;
    background-color: $blue;
    border-radius: 0 5px 5px 0;
    color: $white;
    font-weight: bold;
  }
}
</style>
