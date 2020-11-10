<template>
  <div class="wrapper">
    <div class="inner-row">
      <div class="left">
        <div class="category dropdown">
          <div class="surface">
            <i class="fas fa-briefcase"></i>
            <div
              v-if="selectedCategory"
              :class="{ selected: selectedCategory }"
            >
              {{ selectedCategory.name }}
            </div>
            <div v-else>Во всех разделах</div>
            <i class="fas fa-angle-down"></i>
          </div>
          <div v-if="showCategory" class="content">
            <div class="content-row">
              <div
                class="outer"
                :class="{ 'outer-hover': showCategory }"
                @click="chooseCategory('', 1)"
              >
                Во всех разделах
              </div>
            </div>
            <div
              v-for="(category, index) in categories"
              :key="index"
              class="content-row"
            >
              <div
                class="outer outer-after"
                :class="{ 'outer-hover': showCategory }"
                @click="chooseCategory(category, 1)"
              >
                {{ category.name }}
              </div>
              <div class="middle" :class="{ 'outer-hover': showCategory }">
                <div
                  v-for="(middle, index) in category.children"
                  :class="{ 'middle-hover': hoveredCategory === middle.id }"
                  @mouseover="hoveredCategory = middle.id"
                  :key="index"
                  class="middle-value"
                >
                  <div class="value" @click="chooseCategory(middle, 2)">
                    {{ middle.name }}
                  </div>
                  <div class="inner">
                    <div
                      v-for="(inner, index) in middle.children"
                      @click="chooseCategory(inner, 3)"
                      class="inner-value"
                      :key="index"
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
              @keyup="handleSearch"
              placeholder="Быстрый поиск"
            />
            <div @click="toggleFilters()" class="input"></div>
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
                :key="index"
              >
                {{ result }}
              </div>
            </div>
          </div>
        </div>
        <div class="location dropdown">
          <div class="surface">
            <i class="fas fa-map-marker-alt"></i>
            <div
              v-if="selectedLocation"
              :class="{ selected: selectedLocation }"
            >
              {{ selectedLocation.title }}
            </div>
            <div v-else>Весь Казахстан</div>
            <i class="fas fa-angle-down"></i>
          </div>
          <div v-if="showLocation" class="content">
            <div class="content-row">
              <div
                class="outer"
                :class="{ 'outer-hover': showLocation }"
                @click="chooseLocation(false)"
              >
                Весь Казахстан
              </div>
            </div>
            <div
              v-for="(region, index) in regions"
              :key="index"
              class="content-row"
            >
              <div
                class="outer outer-after"
                :class="{ 'outer-hover': showLocation }"
                @click="chooseLocation(region, 1)"
              >
                {{ region.title }}
              </div>
              <div class="middle" :class="{ 'outer-hover': showLocation }">
                <div
                  v-for="(middle, index) in region.children"
                  :key="index"
                  :class="{ 'middle-hover': hoveredLocation === middle.id }"
                  @mouseover="hoveredLocation = middle.id"
                  class="middle-value"
                >
                  <div class="value" @click="chooseLocation(middle, 2)">
                    {{ middle.title }}
                  </div>
                  <div class="inner">
                    <div
                      v-for="(inner, index) in middle.children"
                      :key="index"
                      @click="chooseLocation(inner, 3)"
                      class="inner-value"
                    >
                      {{ inner.title }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button @click="redirectToSearchPage()">
          <i class="fas fa-search"></i>
          <span>Найти</span>
        </button>
      </div>
      <div v-if="!hide" class="right">
        <a class="mr-2" @click="$router.push('all')">
          <div>
            <button
              @click="selectedType = undefined"
              :class="{ active: $route.name === 'allItems' }"
            >
              <i class="fas fa-border-all"></i>
            </button>
            <span>Все</span>
          </div>
        </a>
        <a class="mr-2" @click="redirect('items-of-lombards', {}, {}, false)">
          <div>
            <button
              @click="selectedType = 1"
              :class="{ active: selectedType === 1 }"
            >
              <i class="far fa-gem"></i>
            </button>
            <span>Ломбард</span>
          </div>
        </a>
        <a @click="redirect('items-of-banks', {}, {}, false)">
          <div>
            <button
              @click="selectedType = 2"
              :class="{ active: selectedType === 2 }"
            >
              <i class="money-bag"></i>
            </button>
            <span>Банк</span>
          </div>
        </a>
        <div v-if="$store.getters.loggedIn" class="favorite">
          <button @click="redirect('user-favorites')">
            <i class="far fa-star"></i>
          </button>
          <span>Избранные</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "Search",
  metaInfo() {
    return {
      title:
        this.selectedCategory?.name ||
        "KUPIZALOG.KZ база залогового имущества Казахстана!",
      meta: [
        {
          name: "description",
          //content:  this.description,
        },
      ],
    };
  },
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
          return this.searchQuery || '';
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
            .get(
              "product/prefix",
              {
                params: {
                  word: this.searchQuery,
                },
              },
              {
                headers: {
                  Authorization: this.$store.state.token,
                },
              }
            )
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
      let location = "";
      location += this.selectedCategory ? "/" + this.getParentSlug() : "/all";
      location += this.selectedLocation
        ? "/v-" + this.selectedLocation.slug
        : "";
      location += this.selectedType ? "?type=" + this.selectedType + "&query=" + (this.search || '') : ("?query=" + (this.search || ''));
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
      this.showCategory = false;
      setTimeout(
        function () {
          this.hoveredCategory = true;
          this.showCategory = true;
        }.bind(this),
        10
      );
    },
    removeHoverLocation: function () {
      this.hoveredLocation = false;
      this.showLocation = false;
      setTimeout(
        function () {
          this.hoveredLocation = true;
          this.showLocation = true;
        }.bind(this),
        10
      );
    },
    toggleFilters() {
      this.$emit("toggled", true);
    },
    getParentSlug: function () {
      if (this.selectedCategoryDepth === 1) {
        return this.selectedCategory.slug;
      } else if (this.selectedCategoryDepth === 2) {
        return (
          this.categories.find((res) => res.id === this.selectedCategory.parent)
            .slug +
          "/" +
          this.selectedCategory.slug
        );
      }
      let totalSlug = "";
      this.categories.forEach((res) => {
        const subCategory = res.children.find(
          (item) => item.id === this.selectedCategory.parent
        );
        if (subCategory) {
          totalSlug = `${res.slug}/${subCategory.slug}/${this.selectedCategory.slug}`;
        }
      });
      return totalSlug;
    },
  },
  mounted: function () {
    function findGetParameter(parameterName) {
      var result = null,
        tmp = [];
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
      if (parameterName === "location") {
        return 1;
      }
      if (parameterName === "location_id") {
        result_array = location.pathname.split("?")[0].split("/v-");
        if (result_array.length > 1) {
          result = result_array[1];
        } else {
          return null;
        }
        return result;
      }
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
              } else {
                for (let middle of outer.children) {
                  if (category === 2 && category_id === middle.slug) {
                    this.selectedCategory = middle;
                    this.selectedCategoryDepth = 2;
                  } else {
                    for (let inner of middle.children) {
                      if (category === 3 && category_id === inner.slug) {
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
    this.$http
      .get("regions/cities", {
        headers: {
          Authorization: this.$store.state.token,
        },
      })
      .then(
        function (response) {
          this.regions = response.data;

          let location = findGetParameter("location");
          if (location) {
            location = parseInt(location);
            const location_id = findGetParameter("location_id");
            for (let outer of this.regions) {
              if (location === 1 && location_id === outer.slug) {
                this.selectedLocation = outer;
                this.selectedLocationDepth = 1;
              } else {
                for (let middle of outer.children) {
                  if (location === 2 && location_id === middle.slug) {
                    this.selectedLocation = middle;
                    this.selectedLocationDepth = 2;
                  } else {
                    for (let inner of middle.children) {
                      if (location === 3 && location_id === inner.slug) {
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
@import "src/assets/variables";

.wrapper {
  display: flex;
  justify-content: center;

  .inner-row {
    flex: 1;
    max-width: 1170px;
    color: $blue;
    display: flex;
    flex-direction: row;

    @media screen and (max-width: 1170px) {
      flex-direction: column;
    }

    .left {
      flex: 1;
      display: flex;
      height: 50px;
      border-radius: 5px;

      @media screen and (max-width: 1170px) {
        height: 40px;
      }

      .dropdown {
        cursor: pointer;
        position: relative;
        flex: 1;

        .surface {
          height: 100%;
          display: flex;
          align-items: center;
          background: $white;
          border: 1px solid $gray;

          .selected {
            color: $avatar-black;
          }

          i {
            font-size: 14px;

            &:first-child {
              margin-left: 15px;
              margin-right: 10px;
            }

            &:last-child {
              margin-right: 22px;
              color: $black;
            }
          }

          div {
            flex: 1;
            color: $dark-gray;
          }
        }

        .content {
          display: none;
          position: absolute;
          z-index: 20;
          color: black;
          border-radius: 6px;
          box-shadow: 0 1.5px 3px 0 rgba(185, 197, 205, 0.4);

          .content-row {
            display: flex;

            &:first-child {
              .outer {
                border-width: 1px 1px 0 1px;
                border-radius: 6px 6px 0 0;
              }
            }

            &:last-child {
              .outer {
                border-width: 0 1px 1px 1px;
                border-radius: 0 0 6px 6px;
              }
            }

            .outer {
              width: 280px;
              height: 34px;
              padding: 0 15px 0 20px;
              background: $white;
              color: $avatar-black;
              font-size: 14px;
              display: flex;
              align-items: center;
              border: solid $gray;
              border-width: 0 1px 0 1px;

              &.outer-hover:hover {
                background: $blue;
                color: $white;

                & ~ .middle {
                  display: block;
                }
              }

              &.outer-after::after {
                content: "\f054";
                font-family: "Font Awesome 5 Free";
                font-size: 12px;
                font-weight: 900;
                margin-left: auto;
              }
            }

            .middle {
              width: 250px;
              display: none;
              box-shadow: 0 1.5px 3px 0 rgba(185, 197, 205, 0.4);
              border-radius: 6px;
              position: absolute;
              left: 280px;

              &.outer-hover:hover {
                display: block;
              }

              & .middle-hover {
                & .inner {
                  display: block;
                }
              }

              .middle-value {
                display: flex;

                &:first-child {
                  & > .value {
                    border-top-left-radius: 6px;
                    border-top-right-radius: 6px;
                    border-top-width: 1px;
                    border-right-width: 1px;
                    border-left-width: 1px;
                  }
                }

                &:last-child {
                  & > .value {
                    border-bottom-right-radius: 6px;
                    border-bottom-left-radius: 6px;
                    border-right-width: 1px;
                    border-bottom-width: 1px;
                    border-left-width: 1px;
                  }
                }

                .inner {
                  .inner-value {
                    &:first-child {
                      border-top-left-radius: 6px;
                      border-top-right-radius: 6px;
                      border-top-width: 1px;
                      border-right-width: 1px;
                      border-left-width: 1px;
                    }

                    &:last-child {
                      border-bottom-right-radius: 6px;
                      border-bottom-left-radius: 6px;
                      border-right-width: 1px;
                      border-bottom-width: 1px;
                      border-left-width: 1px;
                    }
                  }
                }
              }

              & .value,
              .inner-value {
                width: 100%;
                height: 34px;
                padding: 0 15px 0 20px;
                background: $white;
                border: solid $gray;
                border-width: 0 1px 0 1px;
                display: flex;
                align-items: center;

                &:hover {
                  background: $active-gray;
                }
              }

              .inner {
                width: 250px;
                display: none;
                box-shadow: 0 1.5px 3px 0 rgba(185, 197, 205, 0.4);
                border-radius: 6px;
                position: absolute;
                left: 250px;
              }
            }
          }
        }

        &:hover .content {
          display: block;
        }
      }

      .category {
        @media screen and (max-width: 1170px) {
          display: none;
        }

        .surface {
          border-radius: 6px 0 0 6px;
          border: 1px solid $gray;
        }
      }

      .location {
        @media screen and (max-width: 1170px) {
          display: none;
        }

        .surface {
          i {
            &:first-child {
              color: $yellow;
            }
          }
        }
      }

      .search {
        flex: 1;

        .surface {
          height: 100%;
          background: $white;
          font-size: 14px;
          border-top: 1px solid $gray;
          border-bottom: 1px solid $gray;
          display: flex;
          align-items: center;
          position: relative;

          @media (max-width: 1170px) {
            border-radius: 5px 0 0 5px;
          }

          i {
            color: $red;
            margin-left: 15px;
            margin-right: 10px;

            @media (max-width: 1170px) {
              display: none;
            }
          }

          input {
            height: 100%;
            color: $avatar-black;
            font-size: 16px;
            outline: none;

            @media (max-width: 1170px) {
              padding: 10px 15px;
              width: 100%;
            }

            &::placeholder {
              font-size: 14px;
              color: $dark-gray;

              @media (max-width: 1170px) {
                color: transparent;
              }
            }
          }

          div {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 100;
            display: none;

            @media (max-width: 1170px) {
              display: flex;
            }
          }
        }

        .search-content {
          padding: 11px 15px;
          background: $white;
          border: 1px solid $gray;
          border-radius: 6px;
          box-shadow: 0 1.5px 3px 0 rgba(185, 197, 205, 0.4);
          position: absolute;
          z-index: 20;

          @media (min-width: 1200px) {
            width: 360px;
          }

          .header {
            color: $profile-password-gray;
            font-size: 10px;
          }

          .results {
            color: $light-black;
            font-size: 14px;
            margin-top: 10px;

            .result {
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;

              &:hover {
                cursor: pointer;
              }

              &.selected {
                background: $active-gray;
              }
            }
          }
        }
      }

      button {
        background: $blue;
        color: $white;
        font-weight: bold;
        width: 130px;
        height: 100%;
        border-radius: 0 5px 5px 0;
        outline: none;

        @media (max-width: 1170px) {
          width: 50px;
        }

        i {
          display: none;
          font-size: 20px;

          @media (max-width: 1170px) {
            display: block;
          }
        }

        span {
          @media (max-width: 1170px) {
            display: none;
          }
        }
      }
    }

    .right {
      display: flex;
      margin-left: 20px;

      @media (max-width: 1170px) {
        margin: 20px 0 0 0;
      }

      div {
        display: flex;
        flex-direction: column;
        align-items: center;

        &:not(:first-child) {
          margin-left: 15px;
        }

        button {
          width: 50px;
          height: 50px;
          background: $white;
          border: 1px solid $gray;
          border-radius: 6px;
          display: flex;
          justify-content: center;
          align-items: center;

          &.active {
            background: $yellow;
            border: 0;
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

      .favorite {
        display: none;

        @media screen and (max-width: 1170px) {
          display: flex;
        }
      }
    }
  }
}
</style>
