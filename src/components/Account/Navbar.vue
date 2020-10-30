<template>
  <div class="navbar">
    <div @click="toggleNavbarMenu()" class="menu">
      <i class="fas fa-bars"></i>
    </div>
    <div class="left">
      <span @click="redirect('home')" class="logo">Kupizalog</span>
      <span @click="redirectToInfo(tab.slug)" v-for="tab in infoTabs">{{
        tab.name
      }}</span>
    </div>
    <div class="right">
      <div class="desktop">
        <AccountDropdown></AccountDropdown>
        <AccountProductButton></AccountProductButton>
      </div>
      <div @click="toggleDropdownMenu()" class="mobile">
        <i class="far fa-user"></i>
        <i class="fas fa-angle-down"></i>
      </div>
    </div>
    <DropdownMenu
      v-if="dropdownMenuShown"
      @toggled="toggleDropdownMenu()"
    ></DropdownMenu>
  </div>
</template>

<script>
import AccountDropdown from "@/components/Account/Dropdown";
import AccountProductButton from "@/components/Account/ProductButton";
import DropdownMenu from "@/components/All/DropdownMenu";

export default {
  name: "AccountNavbar",
  components: {
    AccountDropdown,
    AccountProductButton,
    DropdownMenu,
  },
  data() {
    return {
      tabs: [],
      dropdownMenuShown: false,
    };
  },
  computed: {
    infoTabs() {
      return this.tabs.filter((tab) => tab.type === 1);
    },
  },
  methods: {
    redirect(name, params) {
      this.$router.push({
        name: name,
        params: params,
      });
    },
    redirectToInfo(slug) {
      this.redirect("info", {
        slug: slug,
      });
    },
    toggleNavbarMenu() {
      this.$emit("navbarMenu", true);
    },
    toggleDropdownMenu() {
      this.dropdownMenuShown = !this.dropdownMenuShown;
      this.$emit("dropdownMenu", true);
    },
  },
  created() {
    this.$http.get("page/list").then(
      function (response) {
        this.tabs = response.data;
      }.bind(this)
    );
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/variables";

.navbar {
  width: 100vw;
  height: 80px;
  padding: 0 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: $blue;
  color: $white;
  position: relative;

  @media screen and (max-width: 1170px) {
    position: sticky;
    top: 0;
    left: 0;
    z-index: 1000;
  }

  .menu {
    display: none;
  }

  .left {
    display: flex;
    align-items: center;

    span {
      font-weight: 500;
      cursor: pointer;

      &:not(:first-child) {
        margin-left: 40px;
      }
    }

    .logo {
      text-transform: uppercase;
      font-size: 20px;
      font-weight: bold;
    }
  }

  .right {
    .desktop {
      display: flex;
      align-items: center;

      button {
        margin-left: 35px;
      }
    }

    .mobile {
      display: none;
    }
  }
}

@media screen and (max-width: 1170px) {
  .navbar {
    .menu {
      display: block;
      color: $white;
    }

    .left {
      span {
        display: none;
      }

      .logo {
        display: block;
      }
    }

    .right {
      .desktop {
        display: none;
      }

      .mobile {
        display: flex;
        color: $white;
      }
    }
  }
}
</style>
