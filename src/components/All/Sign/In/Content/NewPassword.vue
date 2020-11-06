<template>
  <div class="new">
    <span>Создайте новый пароль для кабинета</span>
    <InputPassword
      @changed="setPassword"
      placeholder="Новый пароль"
    ></InputPassword>
    <InputPassword
      @changed="setPasswordRepeat"
      placeholder="Повторите пароль"
    ></InputPassword>
    <div class="controls">
      <SecondaryButton @clicked="moveBack()">Назад</SecondaryButton>
      <PrimaryButton @clicked="changePassword()">Войти</PrimaryButton>
    </div>
  </div>
</template>

<script>
import InputPassword from "@/components/Core/InputPassword";
import PrimaryButton from "@/components/Core/PrimaryButton";
import SecondaryButton from "@/components/Core/SecondaryButton";

export default {
  name: "SignInNewPassword",
  components: {
    InputPassword,
    PrimaryButton,
    SecondaryButton,
  },
  props: {
    phone: String,
  },
  watch: {
    phone(phone) {
      this.userPhone = phone;
    },
  },
  data() {
    return {
      userPhone: this.phone,
      password: "",
      passwordRepeat: "",
    };
  },
  methods: {
    moveBack() {
      this.$emit("back", true);
    },
    moveForward() {
      this.$emit("forward", true);
    },
    setPassword(password) {
      this.password = password;
    },
    setPasswordRepeat(passwordRepeat) {
      this.passwordRepeat = passwordRepeat;
    },
    changePassword() {
      this.$http
        .post("user/forgot_password/", {
          phone: this.userPhone,
          password1: this.password,
          password2: this.passwordRepeat,
        })
        .then(
          function (response) {
            if (response.data.status) {
              this.$store.commit("setForgotPassword", "");
              this.$store.commit("setNewPassword", false);
              this.$notify({
                group: "sign",
                title: "Успешно!",
                text: response.data.detail,
                type: "success",
              });
              this.moveForward();
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
  created() {
    if (this.$store.state.newPassword) {
      this.userPhone = this.$store.state.forgotPassword;
    }
  },
};
</script>

<style lang="scss" scoped>
@import "src/assets/variables";

.new {
  display: flex;
  flex-direction: column;

  span {
    color: $dark-gray2;
  }

  .password {
    margin-top: 15px;
  }

  .controls {
    margin-top: 30px;
    display: flex;

    button {
      flex: 1;

      &:not(:first-of-type) {
        margin-left: 20px;
      }
    }
  }
}
</style>
