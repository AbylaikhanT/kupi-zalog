<template>
  <div class="info">
    <Header>Профиль</Header>
    <div class="content">
      <Card>
        <CardMain @clicked="moveToEdit()"></CardMain>
        <CardHeader>Контактная информация</CardHeader>
        <CardValue icon="fas fa-mobile-alt" label="Телефон">{{
          phone
        }}</CardValue>
        <CardValue icon="far fa-envelope" label="Адрес эл. почты">{{
          $store.state.info.email
        }}</CardValue>
      </Card>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Account/Header";
import Card from "@/components/Core/Card/Card";
import CardMain from "@/components/Core/Card/Sections/Main";
import CardHeader from "@/components/Core/Card/Sections/Header";
import CardValue from "@/components/Core/Card/Sections/Value";

export default {
  name: "AccountUserProfileInfo",
  components: {
    Header,
    Card,
    CardMain,
    CardHeader,
    CardValue,
  },
  computed: {
    phone() {
      return this.$store.state.info.phone
        ? `+7 (${this.$store.state.info.phone.substring(
            0,
            3
          )}) ${this.$store.state.info.phone.substring(
            3,
            6
          )}-${this.$store.state.info.phone.substring(
            6,
            8
          )}-${this.$store.state.info.phone.substring(8, 10)}`
        : "";
    },
  },
  methods: {
    moveToEdit() {
      this.$router.push({
        name: "user-profile-edit",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "src/assets/variables";

.info {
  display: flex;
  flex-direction: column;

  .content {
    padding: 40px 30px;
  }
}
</style>
