<template>
  <div class="content">
    <AccountUserSidebar
      v-if="sidebar"
      @toggled="toggleSidebar()"
    ></AccountUserSidebar>
    <router-view></router-view>
  </div>
</template>

<script>
import AccountUserSidebar from "@/components/Account/User/Sidebar";

export default {
  name: "AccountUserContent",
  components: {
    AccountUserSidebar,
  },
  props: {
    sidebarShown: Boolean,
  },
  watch: {
    sidebarShown(newSidebarShown) {
      this.sidebar = newSidebarShown;
    },
  },
  data() {
    return {
      sidebar: window.innerWidth > 1170 || this.sidebarShown,
    };
  },
  methods: {
    toggleSidebar() {
      this.sidebar = !this.sidebar;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/variables";

.content {
  min-height: calc(100vh - 80px);
  flex: 1;
  display: flex;
  z-index: 0;
}
</style>
