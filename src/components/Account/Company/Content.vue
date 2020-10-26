<template>
  <div class="content">
    <AccountCompanySidebar
      v-if="sidebar"
      @toggled="toggleSidebar()"
    ></AccountCompanySidebar>
    <router-view></router-view>
  </div>
</template>

<script>
import AccountCompanySidebar from "@/components/Account/Company/Sidebar";

export default {
  name: "AccountCompanyContent",
  components: {
    AccountCompanySidebar,
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
