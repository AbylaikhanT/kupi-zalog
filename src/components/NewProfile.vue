<template>
  <div class="profile">
    <ProfileNavbar></ProfileNavbar>
    <div class="content">
      <ProfileUserSidebar active="user"></ProfileUserSidebar>
      <div></div>
    </div>
  </div>
</template>

<script>
import ProfileNavbar from "@/components/ProfileNavbar";
import ProfileUserSidebar from "@/components/ProfileUserSidebar";
import ProfileSettings from "@/components/ProfileSettings";

export default {
  name: "NewProfile",
  components: {
    ProfileNavbar,
    ProfileUserSidebar,
    ProfileSettings,
  },
};
</script>

<style lang="scss" scoped>
.profile {
  height: 100vh;
  display: flex;
  flex-direction: column;

  .content {
    flex: 1;
    display: flex;
  }
}
</style>
