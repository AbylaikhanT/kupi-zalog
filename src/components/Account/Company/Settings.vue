<template>
  <div class="settings">
    <Header>Настройки</Header>
    <div class="content">
      <div class="header">Изменить пароль</div>
      <div class="phone">
        <span class="label">Ваш номер: </span>
        <span>{{ phone }}</span>
      </div>
      <div class="passwords">
        <InputPassword
          :password="password"
          @changed="setPassword"
          label="Старый пароль"
        ></InputPassword>
        <InputPassword
          :password="password1"
          @changed="setPassword1"
          label="Новый пароль"
        ></InputPassword>
        <InputPassword
          :password="password2"
          @changed="setPassword2"
          label="Повторите пароль"
        ></InputPassword>
      </div>
      <div class="controls">
        <SecondaryButton @clicked="reset()">Отменить</SecondaryButton>
        <PrimaryButton @clicked="changePassword()"
          >Сохранить изменения</PrimaryButton
        >
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Account/Header";
import InputPassword from "@/components/Core/InputPassword";
import PrimaryButton from "@/components/Core/PrimaryButton";
import SecondaryButton from "@/components/Core/SecondaryButton";

export default {
  name: "AccountCompanySettings",
  components: {
    Header,
    InputPassword,
    PrimaryButton,
    SecondaryButton,
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
  data() {
    return {
      password: "",
      password1: "",
      password2: "",
    };
  },
  methods: {
    setPassword(password) {
      this.password = password;
    },
    setPassword1(password1) {
      this.password1 = password1;
    },
    setPassword2(password2) {
      this.password2 = password2;
    },
    reset() {
      this.password = "";
      this.password1 = "";
      this.password2 = "";
    },
    changePassword() {
      this.$http
        .put(
          "user/profile/",
          {
            password: this.password,
            password1: this.password1,
            password2: this.password2,
          },
          {
            headers: {
              Authorization: this.$store.state.token,
            },
          }
        )
        .then(
          function (response) {
            if (response.data.status) {
              this.$store.dispatch("signOut");
              this.$notify({
                group: "sign",
                title: "Успешно!",
                text: "Вы успешно сменили пароль.",
                type: "success",
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

.settings {
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 1170px) {
    width: 100%;
  }

  .content {
    margin-top: 50px;
    padding: 0 30px;
    display: flex;
    flex-direction: column;

    @media screen and (max-width: 1170px) {
      padding: 0 30px 30px 30px;
    }

    .header {
      font-size: 22px;
      color: $black;
    }

    .phone {
      margin-top: 20px;
      font-size: 16px;
      color: $dark-blue;

      .label {
        color: $gray;
      }
    }

    .passwords {
      margin-top: 20px;

      .password {
        margin-top: 20px;
      }
    }

    .controls {
      margin-top: 30px;
      display: flex;
      justify-content: space-between;

      @media screen and (max-width: 1170px) {
        flex-direction: column;
        justify-content: flex-start;
      }

      button {
        flex: 1;

        &:last-child {
          margin-left: 20px;

          @media screen and (max-width: 1170px) {
            margin: 20px 0 0 0;
          }
        }
      }
    }
  }
}
</style>
