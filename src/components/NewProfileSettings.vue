<template>
  <div class="profile">
    <ProfileNavbar></ProfileNavbar>
    <div class="content">
      <ProfileUserSidebar active="settings"></ProfileUserSidebar>
      <div class="main">
        <h1>Настройки</h1>
        <ProfileSettings
          phone="8 (747) 3984489"
          password="8 (747) 3984489"
        ></ProfileSettings>
      </div>
    </div>
  </div>
</template>

<script>
import ProfileNavbar from "@/components/ProfileNavbar";
import ProfileUserSidebar from "@/components/ProfileUserSidebar";
import ProfileSettings from "@/components/ProfileSettings";

export default {
  name: "NewProfileSettings",
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

    .main {
      padding: 40px 30px;

      h1 {
        font-size: 30px;
        margin-bottom: 50px;
      }
    }
  }
}
</style>
