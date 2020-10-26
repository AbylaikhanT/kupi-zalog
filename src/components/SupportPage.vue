<template>
  <div class="profile">
    <ProfileNavbar company></ProfileNavbar>
    <div class="content">
      <ProfileCompanySidebar tab="support" company></ProfileCompanySidebar>
      <Support></Support>
    </div>
  </div>
</template>

<script>
import ProfileNavbar from "@/components/ProfileNavbar";
import ProfileCompanySidebar from "@/components/ProfileCompanySidebar";
import Support from "@/components/Support";

export default {
  name: "SupportPage",
  components: {
    ProfileNavbar,
    ProfileCompanySidebar,
    Support,
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
