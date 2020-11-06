<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <div class="inner-row">
          <div class="left-row">
            <a href="/" class="logo"></a>
            <div class="select-city">
              <div class="top">Мой город</div>
              <div @click="showCities = !showCities" class="bottom">
                <span>{{
                  selectedCity ? selectedCity.title : "Выберите город"
                }}</span>
              </div>
              <div v-if="showCities" class="content">
                <div class="top-row">
                  <div class="left">Выберите город</div>
                  <div
                    @click="
                      selectedCity = undefined;
                      showCities = false;
                    "
                    class="right"
                  >
                    Все
                  </div>
                </div>
                <div class="middle-row">
                  <input v-model="citySearch" type="text" placeholder="Поиск" />
                </div>
                <div class="bottom-row">
                  <div
                    v-for="city of filteredCities"
                    @click="
                      selectedCity = city;
                      showCities = false;
                    "
                    :class="{
                      selected: selectedCity && city.id === selectedCity.id,
                    }"
                  >
                    {{ city.title }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="$store.state.loggedIn" class="right-row">
            <div class="favorite">
              <i class="far fa-star"></i>
              <span>Избранные (7)</span>
            </div>
            <div class="profile">
              <div class="surface">
                <i class="far fa-user"></i>
                <span>Личный кабинет</span>
                <i class="icon fas fa-angle-down"></i>
              </div>
              <div class="content">
                <!--<div v-if="$store.state.userInfo.first_name" @click="redirectToProfile()">{{ $store.state.userInfo.last_name + $store.state.userInfo.first_name + $store.state.userInfo.patronymic }}</div>-->
                <!--<div v-else @click="redirectToProfile()">Фамилия Имя Отчество</div>-->
                <div class="middle">
                  <div>
                    <i class="far fa-user"></i>
                    <span @click="redirectToProfile()">Мой профиль</span>
                  </div>
                  <div v-if="$store.state.userCompany.status">
                    <i class="far fa-user"></i>
                    <span @click="redirectToProfile()">Профиль компании</span>
                  </div>
                  <div>
                    <i class="fas fa-cog"></i>
                    <span @click="redirectToProfile()">Настройки</span>
                  </div>
                </div>
                <div>
                  <i class="fas fa-door-open"></i>
                  <span @click="signOut()">Выйти из аккаунта</span>
                </div>
              </div>
            </div>
            <!--<div class="action">-->
            <!--<button @click="redirectToAddProduct()">-->
            <!--<i class="fas fa-plus"></i>-->
            <!--<span>Подать объявление</span>-->
            <!--</button>-->
            <!--</div>-->
          </div>
          <div v-else class="right-row">
            <div @click="$store.commit('setModalShown', true)" class="sign">
              <div class="in">Вход</div>
              <div class="up">Регистрация</div>
            </div>
          </div>
        </div>
      </div>
      <SignModal
        v-if="$store.state.modalShown"
        @close="$store.commit('setModalShown', false)"
      ></SignModal>
    </div>
  </div>
</template>

<script>
import SignModal from "@/components/SignModal";

export default {
  name: "Toolbar",
  data: function () {
    return {
      hasCompany: false,
      citySearch: "",
      cities: [],
      selectedCity: undefined,
      showCities: false,
    };
  },
  components: {
    SignModal,
  },
  computed: {
    filteredCities: function () {
      const result = [];
      for (const city of this.cities) {
        if (city.title.indexOf(this.citySearch) !== -1) {
          result.push(city);
        }
      }
      return result;
    },
  },
  methods: {
    signOut: function () {
      this.$store.commit("setLoggedIn", false);
      this.$store.commit("setUserInfo", "");
      this.$store.commit("setUserCompany", "");
      this.$store.commit("setAccessToken", "");
      window.location.reload(true);
    },
    redirectToProfile: function () {
      window.location = "/new/profile/company/profile";
    },
    redirectToAddProduct: function () {
      window.location = "/new/profile/company/add-product";
    },
  },
  mounted: function () {
    this.$http.get("cities").then(
      function (response) {
        this.cities = response.data;
      }.bind(this)
    );
  },
};
</script>

<style lang="scss" scoped>
@import "../..src/assets/variables/_variables.scss";

.container {
  padding: 25px 20px 0 20px;

  @media (min-width: 768px) {
    padding: 34px 15px 0 15px;
  }
}

.inner-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.left-row {
  display: flex;
  align-items: center;

  .logo {
    display: block;
    width: 159px;
    height: 27px;
    background-image: url("src/assets/img/logo.png");
    background-size: cover;
  }

  .select-city {
    margin-left: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-size: 14px;
    line-height: 17px;
    position: relative;

    .top {
      color: $avatar-black;
    }

    .bottom {
      span {
        color: $blue;
        border-bottom: 1px dashed $blue;
        cursor: pointer;
      }
    }

    .content {
      position: absolute;
      top: 50px;
      left: -125px;
      border: 1px solid $gray;
      border-radius: 5px;
      box-shadow: 0 3px 6px 0;
      background: $white;
      z-index: 2000;
      width: 350px;

      .top-row {
        padding: 20px 20px 0 20px;
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        line-height: 17px;
        color: $avatar-black;

        .right {
          color: $blue;
          border-bottom: 1px dashed $blue;
          cursor: pointer;
        }
      }

      .middle-row {
        padding: 10px 20px;

        input {
          width: 100%;
          border: 1px solid $gray;
          border-radius: 5px;
          padding: 12px;
        }
      }

      .bottom-row {
        display: flex;
        flex-wrap: wrap;

        & > div {
          width: 50%;
          padding: 10px 35px;
          display: flex;
          align-items: center;

          &:hover {
            background: $blue;
            color: $white;
            cursor: pointer;
          }

          &.selected {
            background: $blue;
            color: $white;
          }
        }
      }
    }
  }
}

.right-row {
  display: flex;
  align-items: center;
  font-family: $font;
  font-size: 16px;
  color: $blue;

  i {
    font-size: 17px;
  }

  div {
    display: flex;
    align-items: center;
  }

  .favorite {
    margin-right: 10px;
    display: none;

    @media (min-width: 768px) {
      margin-right: 50px;
      display: block;
    }

    i {
      margin-right: 8px;
    }
  }

  .profile {
    position: relative;
    cursor: pointer;

    @media (min-width: 768px) {
      &:hover .content {
        display: flex;
      }
    }

    .surface {
      height: 25px;
      position: relative;

      span {
        margin-left: 8px;

        @media (min-width: 768px) {
          margin: 0 8px;
        }
      }

      .icon {
        display: none;

        @media (min-width: 768px) {
          display: block;
        }
      }
    }

    .content {
      position: absolute;
      top: 25px;
      left: -15px;
      display: none;
      flex-direction: column;
      z-index: 20;
      border: 1px solid $border-gray;
      border-radius: 6px;
      background: $white;
      color: $avatar-black;
      font-size: 14px;
      box-shadow: 0 1.5px 3px 0 rgba(208, 215, 221, 0.5);

      & > div {
        width: 190px;
        height: 46px;
        padding: 15px;

        i {
          font-size: 12px;
          margin-right: 10px;
        }
      }

      .middle {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        height: 94px;
        border: solid $border-gray;
        border-width: 0 0 1px 0;

        & > div {
          display: flex;
        }
      }
    }
  }

  .sign {
    cursor: pointer;

    .in {
      &::after {
        content: "/";
        margin: 0 5px;
      }
    }
  }

  .action {
    display: none;

    @media (min-width: 992px) {
      display: block;
    }

    button {
      width: 180px;
      height: 40px;
      border-radius: 6px;
      background: $red;
      color: $white;
      font-size: 12px;
      font-weight: bold;
      display: flex;
      justify-content: center;
      align-items: center;

      i {
        font-size: inherit;
        margin-right: 8px;
      }
    }
  }
}
</style>
