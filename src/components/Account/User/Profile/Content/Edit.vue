<template>
  <div class="edit">
    <AccountBack @clicked="moveTo('user-profile-info')"></AccountBack>
    <div class="breadcrumbs">
      <AccountBreadcrumbs :breadcrumbs="breadcrumbs"></AccountBreadcrumbs>
    </div>
    <div class="content">
      <div class="main">
        <Value label="Фото">
          <InputPhoto
            :url="$store.state.company.image.path"
            @changed="setPhoto"
          ></InputPhoto>
        </Value>
        <div class="name">
          <Value label="Имя">{{ $store.state.info.first_name }}</Value>
          <Value label="Фамилия">{{ $store.state.info.last_name }}</Value>
        </div>
      </div>
      <Header compact>Контактная информация</Header>
      <div class="contacts">
        <EditPhone></EditPhone>
        <Value label="Эл. почта">
          <InputText @changed="setEmail"></InputText>
        </Value>
      </div>
      <PrimaryButton @clicked="update()">Сохранить изменения</PrimaryButton>
    </div>
  </div>
</template>

<script>
import AccountBack from "@/components/Account/Back";
import AccountBreadcrumbs from "@/components/Account/Breadcrumbs";
import Header from "@/components/Account/Header";
import Value from "@/components/Core/Value";
import InputPhoto from "@/components/Core/InputPhoto";
import InputText from "@/components/Core/InputText";
import PrimaryButton from "@/components/Core/PrimaryButton";
import EditPhone from "@/components/Account/User/Profile/Content/EditPhone";

export default {
  name: "AccountUserProfileEdit",
  components: {
    AccountBack,
    AccountBreadcrumbs,
    Header,
    Value,
    InputPhoto,
    InputText,
    PrimaryButton,
    EditPhone,
  },
  data() {
    return {
      breadcrumbs: [
        {
          title: "Профиль",
          route: "user-profile-info",
        },
        {
          title: "Редактировать профиль",
        },
      ],
      photo: undefined,
      email: undefined,
    };
  },
  methods: {
    moveTo(route) {
      this.$router.push({ name: route });
    },
    setPhoto(photo) {
      this.photo = photo;
    },
    setEmail(email) {
      this.email = email;
    },
    update() {
      // const formData = new FormData();
      // formData.append('images[0]', this.photo);
      // formData.append('email', this.email);
      // this.$http.put('user/profile/', formData, {
      //     headers: {
      //         Authorization: this.$store.state.token
      //     }
      // }).then(function(response) {
      //     console.log(response);
      // }.bind(this));
    },
  },
};
</script>

<style lang="scss" scoped>
@import "src/assets/variables";

.edit {
  padding: 40px 30px;

  @media screen and (max-width: 1170px) {
    width: 100%;
  }

  .breadcrumbs {
    margin: 30px 0;

    @media screen and (max-width: 1170px) {
      flex-wrap: wrap;
    }
  }

  .content {
    display: flex;
    flex-direction: column;

    .main {
      display: flex;

      @media screen and (max-width: 1170px) {
        flex-direction: column;
      }

      .name {
        .value {
          margin-left: 20px;

          @media screen and (max-width: 1170px) {
            margin: 20px 0 0 0;
          }

          &:not(:first-of-type) {
            margin-top: 20px;
          }
        }
      }
    }

    .header {
      margin-top: 20px;
    }

    .contacts {
      display: flex;
      flex-direction: column;

      .edit-phone,
      .value {
        margin-top: 20px;
      }
    }

    button {
      margin-top: 30px;
      width: 230px;
    }
  }
}
</style>
