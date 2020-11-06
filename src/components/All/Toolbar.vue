<template>
  <div class="toolbar">
    <div :class="{ line: $store.getters.loggedIn }" class="content">
      <div @click="toggleNavbarMenu()" class="menu">
        <i class="fas fa-bars"></i>
      </div>
      <div :class="{ sign: $store.getters.loggedIn }" class="left">
        <div @click="redirect('home', {}, {}, true)" class="logo"></div>
        <!--<CityPicker></CityPicker>-->
      </div>
      <div v-if="$store.getters.loggedIn" class="right">
        <div class="section">
          <Favorites></Favorites>
        </div>
        <div class="section dropdown-desktop">
          <AccountDropdown isBlue></AccountDropdown>
        </div>
        <div @click="toggleDropdownMenu()" class="section dropdown-mobile">
          <i class="far fa-user"></i>
          <i class="fas fa-angle-down"></i>
        </div>
      </div>
      <div v-else class="right sign">
        <div class="section">
          <Sign></Sign>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CityPicker from "@/components/All/CityPicker";
import Messages from "@/components/All/Messages";
import Favorites from "@/components/All/Favorites";
import AccountDropdown from "@/components/Account/Dropdown";
import Sign from "@/components/All/Sign";

export default {
  name: "Toolbar",
  components: {
    CityPicker,
    Messages,
    Favorites,
    AccountDropdown,
    Sign,
  },
  methods: {
    toggleNavbarMenu() {
      this.$emit("toggledNavbarMenu", true);
    },
    toggleDropdownMenu() {
      this.$emit("toggledDropdownMenu", true);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "src/assets/variables";

.toolbar {
  display: flex;
  justify-content: center;

  .content {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1170px;

    &:not(.line) {
      @media screen and (max-width: 1170px) {
        flex-wrap: wrap;
        justify-content: flex-start;
      }
    }

    .menu {
      display: none;
      i {
        font-size: 20px;
      }
    }

    .left {
      display: flex;
      align-items: center;

      &:not(.sign) {
        @media screen and (max-width: 1170px) {
          margin-left: 30px;
        }
      }

      .logo {
        margin-right: 20px;
        width: 159px;
        height: 27px;
        background-image: url("../../assets/img/logo.png");
        background-size: contain;
        cursor: pointer;
      }
    }

    .right {
      display: flex;
      align-items: center;

      &.sign {
        @media screen and (max-width: 1170px) {
          margin-top: 20px;
          flex-basis: 100%;
        }
      }

      .section {
        &:not(:first-of-type) {
          margin-left: 40px;
        }
      }
    }

    .dropdown-mobile {
      display: none;
    }
  }
}

@media screen and (max-width: 1170px) {
  .toolbar {
    .content {
      .menu {
        display: block;
        color: $blue;
      }

      .left {
        flex-direction: column;

        .logo {
          margin-right: 0;
        }

        .city {
          margin-top: 5px;
        }
      }

      .right {
        .messages,
        .favorites {
          display: none;
        }

        .section {
          &:not(:first-of-type) {
            margin-left: 0;
          }
        }
      }

      .dropdown-desktop {
        display: none;
      }

      .dropdown-mobile {
        display: flex;
        color: $blue;
      }
    }
  }
}
</style>

