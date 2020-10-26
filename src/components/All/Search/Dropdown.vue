<template>
  <div class="dropdown">
    <div class="category dropdown">
      <div class="surface">
        <i class="fas fa-briefcase"></i>
        <div v-if="selectedCategory" :class="{ selected: selectedCategory }">
          {{ selectedCategory.name }}
        </div>
        <div v-else>Во всех разделах</div>
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
          @keyup="handleSearch"
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
    <div class="location dropdown">
      <div class="surface">
        <i class="fas fa-map-marker-alt"></i>
        <div v-if="selectedLocation" :class="{ selected: selectedLocation }">
          {{ selectedLocation.title }}
        </div>
        <div v-else>Весь Казахстан</div>
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
    <button>
      <i class="fas fa-search"></i>
      <span @click="redirectToSearchPage()">Найти</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "SearchDropdown",
};
</script>

<style lang="scss" scoped>
@import "@/assets/variables";

.dropdown {
  flex: 1;
  display: flex;
  height: 50px;

  .dropdown {
    cursor: pointer;
    position: relative;
    flex: 1;

    .surface {
      height: 100%;
      display: flex;
      align-items: center;
      background: $white;

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

          & > div {
            display: flex;

            &:first-child {
              .value {
                border-top-left-radius: 6px;
                border-top-right-radius: 6px;
                border-top-width: 1px;
                border-right-width: 1px;
                border-left-width: 1px;
              }
            }

            &:last-child {
              .value {
                border-bottom-right-radius: 6px;
                border-bottom-left-radius: 6px;
                border-right-width: 1px;
                border-bottom-width: 1px;
                border-left-width: 1px;
              }
            }

            .inner {
              .value {
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

          & .value {
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
    border: 1px solid $light-gray2;
    border-right: 0;
    border-radius: 5px 0 0 5px;

    .surface {
      border-radius: 6px 0 0 6px;
    }
  }

  .location {
    border: 1px solid $light-gray2;
    border-left: 0;

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
    border: 1px solid $light-gray2;

    .surface {
      height: 100%;
      background: $white;
      font-size: 14px;
      display: flex;
      align-items: center;

      @media (min-width: 768px) {
        border-radius: 0;
      }

      i {
        color: $red;
        margin-left: 15px;
        margin-right: 10px;
        display: none;

        @media (min-width: 768px) {
          display: block;
        }
      }

      input {
        height: 100%;
        color: $avatar-black;
        font-size: 16px;
        outline: none;

        @media (min-width: 1200px) {
          width: 320px;
        }

        &::placeholder {
          font-size: 14px;
          color: transparent;

          @media (min-width: 768px) {
            color: $dark-gray;
          }
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
    width: 50px;
    height: 100%;
    border-radius: 0 5px 5px 0;

    @media (min-width: 768px) {
      width: 130px;
    }

    i {
      font-size: 20px;

      @media (min-width: 768px) {
        display: none;
      }
    }

    span {
      display: none;

      @media (min-width: 768px) {
        display: block;
      }
    }
  }
}
</style>
