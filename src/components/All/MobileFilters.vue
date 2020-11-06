<template>
  <div class="mobile-filter">
    <div class="mobile-filter__header">
      <div class="mobile-filter__header__title">Фильтр</div>
      <div @click="toggled()" class="mobile-filter__header__close">
        <i class="fas fa-times"></i>
      </div>
    </div>
    <div class="mobile-filter__content">
      <Value label="Поиск объявлений">
        <div class="search">
          <InputText
            :text="query"
            @changed="setQuery"
            @keyup="handleSearch"
            placeholder="Поиск объявлений"
          ></InputText>
          <div v-if="resultsShown" class="search-content">
            <div class="header">Похожие</div>
            <div class="results">
              <div
                v-for="(result, index) in results"
                :key="index"
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
      </Value>
      <Value label="Выберите категорию">
        <Select
          :options="categories"
          :option="selectedCategory"
          :isSelected="!!selectedCategory"
          name="name"
          @changed="setCategory"
        ></Select>
      </Value>
      <Value v-if="selectedCategory" label="Выберите подкатегорию">
        <Select
          :options="subcategories"
          :option="selectedSubCategory"
          :isSelected="!!selectedSubCategory"
          name="name"
          @changed="setSubCategory"
        ></Select>
      </Value>
      <Value v-if="has_subsubcategories" label="Выберите субкатегорию">
        <Select
          :options="subsubcategories"
          :option="selectedSubSubCategory"
          :isSelected="!!selectedSubSubCategory"
          name="name"
          @changed="setSubSubCategory"
        ></Select>
      </Value>
      <Value label="Выберите регион">
        <Select
          :options="locations"
          :option="selectedLocation"
          :isSelected="!!selectedLocation"
          name="title"
          @changed="setLocation"
        ></Select>
      </Value>
      <Value v-if="has_cities" label="Выберите Город">
        <Select
          :options="cities"
          :option="selectedCity"
          :isSelected="!!selectedCity"
          name="title"
          @changed="setCity"
        ></Select>
      </Value>
      <div class="mobile-filter__content__show">
        <PrimaryButton @clicked="redirectToSearch()">Показать</PrimaryButton>
      </div>
    </div>
  </div>
</template>

<script>
import Value from "@/components/Core/Value";
import InputText from "@/components/Core/InputText";
import Select from "@/components/Core/Select";
import PrimaryButton from "@/components/Core/PrimaryButton";

export default {
  name: "MobileFilters",
  components: {
    Value,
    InputText,
    Select,
    PrimaryButton,
  },
  data() {
    return {
      categories: [],
      subcategories: undefined,
      subsubcategories: undefined,
      locations: [],
      cities: undefined,
      query: this.$route.query.query,
      selectedCategory: undefined,
      selectedSubCategory: undefined,
      selectedSubSubCategory: undefined,
      finalCategory: undefined,
      selectedLocation: undefined,
      selectedCity: undefined,
      finalLocation: undefined,
      selectedType: undefined,
      selectedResult: undefined,
      resultsShown: false,
      results: [],
      has_subsubcategories: undefined,
      has_cities: undefined,
      new_slug: "",
    };
  },
  methods: {
    getAsArray(object) {
      if (object.length > 0) {
        let result = [];
        for (let i = 0; i < object.length; i++) {
          object[i].pk = object[i].id;
          object[i].id = i + 1;
          result.push(object[i]);
        }
        return result;
      }

      return false;
    },
    setQuery(query) {
      this.query = query;
    },
    setCategory(id) {
      this.selectedCategory = id;
      this.finalCategory = this.categories[id - 1].slug;
      this.new_slug = this.finalCategory;
      this.selectedSubCategory = null;
      this.subcategories = this.getAsArray(this.categories[id - 1].children);
    },
    setSubCategory(id) {
      this.selectedSubCategory = id;
      this.finalCategory = this.subcategories[id - 1].slug;
      this.new_slug =
        this.categories[this.selectedCategory - 1].slug +
        "/" +
        this.finalCategory;
      this.selectedSubSubCategory = null;
      this.subsubcategories = this.getAsArray(
        this.subcategories[id - 1].children
      );
      if (this.subsubcategories.length > 0) {
        this.has_subsubcategories = 1;
      } else {
        this.has_subsubcategories = null;
      }
    },
    setSubSubCategory(id) {
      this.selectedSubSubCategory = id;
      this.finalCategory = this.subsubcategories[id - 1].slug;
      this.new_slug += "/" + this.finalCategory;
    },
    setLocation(id) {
      this.selectedLocation = id;
      this.finalLocation = this.locations[id - 1].slug;
      this.selectedCity = null;
      this.cities = this.getAsArray(this.locations[id - 1].children);
      if (this.cities.length > 0) {
        this.has_cities = 1;
      } else {
        this.has_cities = null;
      }
    },
    setCity(id) {
      this.selectedCity = id;
      this.finalLocation = this.cities[id - 1].slug;
    },
    setLombard(selected) {
      if (selected) {
        this.selectedType = 1;
      }
    },
    setBank(selected) {
      if (selected) {
        this.selectedType = 2;
      }
    },
    toggled() {
      this.$emit("toggled", true);
    },
    redirectToSearch() {
      var newLocation = "";
      if (this.new_slug) {
        newLocation += "/";
        newLocation += this.new_slug;
        this.new_slug = "";
      }
      if (this.finalLocation) {
        newLocation += "/v-" + this.finalLocation;
      }
      if (!newLocation) {
        newLocation = "/search";
      }
      if (this.query) {
        newLocation += "?&query=" + this.query;
      }
      if (this.selectedType) {
        newLocation += "&type=" + this.selectedType;
      }
      window.location = newLocation;
    },
    handleSearch: function (event) {
      this.query = event.text;
      const e = event.event;
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
        this.redirectToSearch();
      } else {
        if (this.query.length > 0) {
          this.$http
            .get(
              "product/prefix",
              {
                params: {
                  word: this.query,
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
  },
  created() {
    if (this.$route.query.category_id) {
      this.selectedCategory = parseInt(this.$route.query.category_id);
    }
    if (this.$route.query.location_id) {
      this.selectedLocation = parseInt(this.$route.query.location_id);
    }
    if (this.$route.query.type) {
      this.selectedType = parseInt(this.$route.query.type);
    }
    this.$http.get("categories").then(
      function (response) {
        this.categories = this.getAsArray(response.data);
      }.bind(this)
    );
    this.$http.get("regions/cities").then(
      function (response) {
        this.locations = this.getAsArray(response.data);
      }.bind(this)
    );
  },
};
</script>

<style lang="scss" scoped>
@import "src/assets/variables";

.mobile-filter {
  width: 100vw;
  min-height: 100vh;
  display: none;
  flex-direction: column;
  top: 0;
  bottom: 0;
  position: fixed;
  z-index: 100;
  overflow-y: scroll;
  overflow-x: hidden;
  @media screen and (max-width: 1170px) {
    display: flex;
  }

  &__header {
    width: 100%;
    height: 60px;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: $blue;
    color: $white;

    &__title {
      font-size: 16px;
      font-weight: 500;
    }

    &__close {
      cursor: pointer;
    }
  }

  &__content {
    width: 100%;
    height: auto;
    min-height: 100%;
    padding: 30px 0;
    position: relative;
    background-color: $light-gray;

    .value {
      padding: 0 20px;

      &:not(:first-child) {
        margin-top: 20px;
      }
    }

    .search {
      width: 100%;
      position: relative;
      z-index: 100;

      .search-content {
        padding: 11px 15px;
        width: 100%;
        background: $white;
        border: 1px solid $gray;
        border-radius: 6px;
        box-shadow: 0 1.5px 3px 0 rgba(185, 197, 205, 0.4);
        position: absolute;
        z-index: 20;

        .header {
          color: $profile-password-gray;
          font-size: 10px;
        }

        .results {
          width: 100%;
          color: $light-black;
          font-size: 14px;
          margin-top: 10px;

          .result {
            width: 100%;
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

    &__show {
      margin-top: 30px;
      right: 20px;
      bottom: 30px;
      left: 30px;

      button {
        width: 100%;
        height: 50px;
      }
    }
  }

  &__checkbox {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &:not(:first-child) {
      margin-top: 20px;
    }
  }
}
</style>
