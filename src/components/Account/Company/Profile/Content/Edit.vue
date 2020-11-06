<template>
  <div class="edit">
    <AccountBack @clicked="moveTo('company-profile-info')"></AccountBack>
    <div class="breadcrumbs">
      <AccountBreadcrumbs :breadcrumbs="breadcrumbs"></AccountBreadcrumbs>
    </div>
    <div v-if="$store.state.company" class="content">
      <div class="main">
        <Value label="Фото или Логотип">
          <InputPhoto
            :url="$store.state.company.image.path"
            @changed="setPhoto"
          ></InputPhoto>
        </Value>
        <div class="name">
          <Value label="Тип учреждения">{{
            $store.state.company.type.title
          }}</Value>
          <Value label="Название учреждения">{{
            $store.state.company.title
          }}</Value>
        </div>
      </div>
      <Value label="Тип организации">{{
        $store.state.company.structure.title
      }}</Value>
      <Value label="Название организации">{{
        $store.state.company.structure_title
      }}</Value>
      <Value label="Имя">{{ $store.state.company.owner.first_name }}</Value>
      <Value label="Фамилия">{{ $store.state.company.owner.last_name }}</Value>
      <Value label="БИН/ИИН">{{ $store.state.company.iin }}</Value>
      <Value label="Регион">{{ region }}</Value>
      <Value label="Адрес">
        <InputText
          :text="$store.state.company.address"
          @changed="setAddress"
        ></InputText>
      </Value>
      <Header compact>Контактная информация</Header>
      <div class="contacts">
        <Value label="Телефон">
          <InputPhone
            :phone="$store.state.company.public_number"
            @changed="setPhone"
          ></InputPhone>
        </Value>
        <Value label="Эл. почта">
          <InputText
            :text="$store.state.company.public_email"
            @changed="setEmail"
          ></InputText>
        </Value>
      </div>
      <Value label="Описание">
        <Textarea
          :text="$store.state.company.description"
          @changed="setDescription"
        ></Textarea>
      </Value>
      <PrimaryButton @clicked="save">Сохранить изменения</PrimaryButton>
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
import InputPhone from "@/components/Core/InputPhone";
import Textarea from "@/components/Core/Textarea";
import PrimaryButton from "@/components/Core/PrimaryButton";

export default {
  name: "AccountCompanyProfileEdit",
  components: {
    AccountBack,
    AccountBreadcrumbs,
    Header,
    Value,
    InputPhoto,
    InputText,
    InputPhone,
    Textarea,
    PrimaryButton,
  },
  computed: {
    region() {
      return `${
        this.$store.state.company.city.parent
          ? this.$store.state.company.city.parent.title + ", "
          : ""
      }${this.$store.state.company.city.title}`;
    },
  },
  data() {
    return {
      breadcrumbs: [
        {
          title: "Профиль",
          route: "company-profile-info",
        },
        {
          title: "Редактировать профиль",
        },
      ],
      photo: undefined,
      address: "",
      phone: "",
      email: "",
      description: "",
    };
  },
  methods: {
    moveTo(route) {
      this.$router.push({ name: route });
    },
    setPhoto(photo) {
      this.photo = photo;
    },
    setAddress(address) {
      this.address = address;
    },
    setPhone(phone) {
      this.phone = phone;
    },
    setEmail(email) {
      this.email = email;
    },
    setDescription(description) {
      this.description = description;
    },
    save() {
      const formData = new FormData();
      formData.append("address", this.address);
      formData.append("public_number", this.phone);
      formData.append("public_email", this.email);
      formData.append("description", this.description);
      formData.append("image", this.photo);
      this.$http
        .put("companies/profile", formData, {
          headers: {
            Authorization: this.$store.state.token,
          },
        })
        .then(
          function (response) {
            if (response.data.status) {
              this.$store.dispatch("setCompany");
              this.$notify({
                group: "sign",
                title: "Изменено!",
                text: "Профиль успешно изменен.",
                type: "success",
              });
            } else {
              this.$notify({
                group: "sign",
                title: "Ошибка!",
                text: response.data.detail,
                type: "error",
              });
            }
          }.bind(this)
        );
    },
  },
};
</script>

<style lang="scss" scoped>
@import "src/assets/variables";

.edit {
  padding: 40px 30px;

  @media screen and (max-width: 1170px) {
    max-width: 100%;
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

    @media screen and (max-width: 1170px) {
      max-width: 100%;
    }

    .main {
      display: flex;

      @media screen and (max-width: 1170px) {
        flex-direction: column;
      }

      .name {
        .value {
          margin-left: 20px;

          @media screen and (max-width: 1170px) {
            margin-left: 0;
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

    .value {
      margin-top: 20px;
    }

    .contacts {
      display: flex;
      flex-direction: column;

      .phone {
        width: 230px;
      }
    }

    button {
      margin-top: 30px;
      width: 230px;
    }
  }
}
</style>
