<template>
  <div class="city">
    <div class="surface">
      <span>Мой город</span>
      <span @click="isOpen = !isOpen" class="active">{{
        $store.getters.cityPicked ? $store.state.city.title : "Выберите город"
      }}</span>
    </div>
    <div v-if="isOpen" class="content">
      <div class="header">
        <span>Выберите город</span>
        <span @click="selectCity(undefined)" class="active">Все</span>
      </div>
      <div class="query">
        <InputText @changed="setQuery" placeholder="Поиск"></InputText>
      </div>
      <div class="cities">
        <span
          @click="selectCity(city)"
          v-for="(city, index) of queriedCities"
          :key="index"
          :class="{
            selected:
              $store.getters.cityPicked && $store.state.city.id === city.id,
          }"
          >{{ city.title }}</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import InputText from "@/components/Core/InputText";

export default {
  name: "CityPicker",
  components: {
    InputText,
  },
  data() {
    return {
      isOpen: false,
      cities: [],
      query: "",
    };
  },
  computed: {
    queriedCities() {
      return this.cities.filter((city) => {
        return (
          city.title.toLowerCase().indexOf(this.query.toLowerCase()) !== -1
        );
      });
    },
  },
  methods: {
    setQuery(query) {
      this.query = query;
    },
    selectCity(city) {
      this.$store.commit("setCity", city);
      this.isOpen = false;
    },
  },
  created() {
    this.$http
      .get("cities", {
        headers: {
          Authorization: this.$store.state.token,
        },
      })
      .then(
        function (response) {
          this.cities = response.data;
        }.bind(this)
      );
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/variables";

.city {
  position: relative;
  display: flex;
  flex-direction: column;
  color: $dark-blue;

  .active {
    color: $blue;
    text-decoration: underline;
    text-decoration-style: dashed;
    cursor: pointer;
  }

  .surface {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 110px;
    height: 35px;

    @media screen and (max-width: 1170px) {
      height: auto;
    }
  }

  .content {
    position: absolute;
    top: 35px;
    left: calc(-1 * (350px - 110px) / 2);
    z-index: 10;
    width: 350px;
    overflow: hidden;
    border: 1px solid $light-gray2;
    border-radius: 5px;
    box-shadow: 0 3px 6px rgba(185, 197, 205, 0.4);
    background-color: $white;

    @media screen and (max-width: 1170px) {
      left: 0 !important;
      right: 0;
    }

    .header {
      display: flex;
      justify-content: space-between;
      padding: 20px 20px 0 20px;
    }

    .query {
      padding: 10px 20px;
    }

    .cities {
      display: flex;
      flex-wrap: wrap;

      span {
        display: flex;
        align-items: center;
        cursor: pointer;
        width: 50%;
        padding: 10px 35px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

        &:hover {
          background-color: $blue;
          color: $white;
        }

        &.selected {
          background-color: $blue;
          color: $white;
        }
      }
    }
  }
}

@media screen and (max-width: 1170px) {
  .city {
    .surface {
      flex-direction: row;
      width: 159px;

      span {
        font-size: 12px;
      }
    }

    .content {
      left: calc(-1 * (230px - 159px) / 2);
      width: 230px;
    }
  }
}
</style>
