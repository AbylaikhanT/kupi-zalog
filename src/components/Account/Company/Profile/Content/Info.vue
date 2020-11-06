<template>
  <div class="info">
    <Header>Профиль</Header>
    <div class="content">
      <div class="column">
        <Card>
          <CardMain @clicked="moveToEdit()" company></CardMain>
          <CardValue icon="far fa-id-badge" label="Имя, Фамилия">{{
            ownerFullName
          }}</CardValue>
          <CardValue icon="fas fa-university" label="Тип учреждения">{{
            $store.state.company.type.title
          }}</CardValue>
          <CardValue icon="far fa-building" label="Тип организации">{{
            $store.state.company.structure.title
          }}</CardValue>
          <CardValue icon="fas fa-building" label="Название организации">{{
            $store.state.company.structure_title
          }}</CardValue>
          <CardValue icon="fas fa-id-badge" label="БИН/ИИН">{{
            $store.state.company.iin
          }}</CardValue>
          <CardValue icon="fas fa-map-marker-alt" label="Регион">{{
            region
          }}</CardValue>
          <CardValue icon="far fa-address-book" label="Адрес">{{
            $store.state.company.address
          }}</CardValue>
        </Card>
        <Card>
          <CardHeader>Контактная информация</CardHeader>
          <CardValue icon="fas fa-mobile-alt" label="Телефон">{{
            phone
          }}</CardValue>
          <CardValue icon="far fa-envelope" label="Адрес эл. почты">{{
            $store.state.company.public_email
          }}</CardValue>
        </Card>
      </div>
      <div class="column">
        <Card>
          <CardHeader>Статистика</CardHeader>
          <CardValue label="Количество товаров">{{
            $store.state.company.ads_count
          }}</CardValue>
        </Card>
        <Card>
          <CardHeader>Описание</CardHeader>
          <CardDescription>{{
            $store.state.company.description
          }}</CardDescription>
        </Card>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Account/Header";
import Card from "@/components/Core/Card/Card";
import CardMain from "@/components/Core/Card/Sections/Main";
import CardHeader from "@/components/Core/Card/Sections/Header";
import CardValue from "@/components/Core/Card/Sections/Value";
import CardDescription from "@/components/Core/Card/Sections/Description";

export default {
  name: "AccountCompanyProfileInfo",
  components: {
    Header,
    Card,
    CardMain,
    CardHeader,
    CardValue,
    CardDescription,
  },
  computed: {
    ownerFullName() {
      return `${this.$store.state.company.owner.first_name}, ${this.$store.state.company.owner.last_name}`;
    },
    phone() {
      return this.$store.state.company.public_number
        ? `+7 (${this.$store.state.company.public_number.substring(
            0,
            3
          )}) ${this.$store.state.company.public_number.substring(
            3,
            6
          )}-${this.$store.state.company.public_number.substring(
            6,
            8
          )}-${this.$store.state.company.public_number.substring(8, 10)}`
        : "";
    },
    region() {
      return `${
        this.$store.state.company.city.parent
          ? `${this.$store.state.company.city.parent.title}, `
          : ""
      }${this.$store.state.company.city.title}`;
    },
  },
  methods: {
    moveToEdit() {
      this.$router.push({
        name: "company-profile-edit",
      });
    },
  },
  created() {
    this.$store.dispatch("setCompany");
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
    display: flex;

    @media screen and (max-width: 1170px) {
      flex-direction: column;
    }

    .column {
      display: flex;
      flex-direction: column;

      &:not(:first-child) {
        margin-left: 40px;
      }

      @media screen and (max-width: 1170px) {
        &:not(:first-child) {
          margin: 40px 0 0 0;
        }
      }

      .card {
        &:not(:first-child) {
          margin-top: 40px;
        }
      }
    }
  }
}
</style>
