<template>
  <div class="page">
    <AccountNavbar
      @navbarMenu="toggleNavbarMenu()"
      @dropdownMenu="toggleDropdownMenu()"
    ></AccountNavbar>
    <router-view :sidebar-shown="sidebarShown"></router-view>
    <Footer></Footer>
    <notifications group="sign" position="bottom left"></notifications>
  </div>
</template>

<script>
import AccountNavbar from "@/components/Account/Navbar";
import Footer from "@/components/All/Footer";

export default {
  name: "AccountPage",
  components: {
    AccountNavbar,
    Footer,
  },
  data() {
    return {
      sidebarShown: false,
    };
  },
  methods: {
    toggleNavbarMenu() {
      this.sidebarShown = !this.sidebarShown;
    },
    toggleDropdownMenu() {
      this.sidebarShown = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "src/assets/variables";

.page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
