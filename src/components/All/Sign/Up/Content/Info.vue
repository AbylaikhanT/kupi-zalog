<template>
  <div class="info">
    <span v-if="isUser">Вы регистрируетесь в виде покупателя</span>
    <span v-else>Вы автоматически становитесь нашим партнером по продажам</span>
    <InputText @changed="setFirstName" placeholder="Имя*"></InputText>
    <InputText @changed="setLastName" placeholder="Фамилия*"></InputText>
    <InputPhone @changed="setPhone" placeholder="Телефон*"></InputPhone>
    <InputPassword
      @changed="setPassword"
      placeholder="Придумайте пароль*"
    ></InputPassword>
    <InputPassword
      @changed="setPasswordRepeat"
      placeholder="Повторите пароль*"
    ></InputPassword>
    <InputText @changed="setEmail" placeholder="Электронная почта"></InputText>
    <span>* Обязательны для заполнения</span>
    <InputCheckbox @changed="setAgreed">
      Я соглашаюсь с
      <a href="/agreement" target="_blank"
        >пользовательским соглашением</a
      >
      и
      <a href="/politicconf" target="_blank"
        >политикой конфиденциальности</a
      >
    </InputCheckbox>
    <div class="controls">
      <SecondaryButton @clicked="moveBack()">Назад</SecondaryButton>
      <PrimaryButton @clicked="moveForward()">Далее</PrimaryButton>
    </div>
  </div>
</template>

<script>
import InputPhone from "@/components/Core/InputPhone";
import InputText from "@/components/Core/InputText";
import InputPassword from "@/components/Core/InputPassword";
import InputCheckbox from "@/components/Core/InputCheckbox";
import PrimaryButton from "@/components/Core/PrimaryButton";
import SecondaryButton from "@/components/Core/SecondaryButton";

export default {
  name: "SignUpInfo",
  components: {
    InputPhone,
    InputText,
    InputPassword,
    InputCheckbox,
    PrimaryButton,
    SecondaryButton,
  },
  props: {
    isUser: Boolean,
  },
  data() {
    return {
      phone: "",
      firstName: "",
      lastName: "",
      email: "",
      password1: "",
      password2: "",
      agreed: false,
    };
  },
  methods: {
    setPhone(phone) {
      this.phone = phone;
    },
    setFirstName(firstName) {
      this.firstName = firstName;
    },
    setLastName(lastName) {
      this.lastName = lastName;
    },
    setEmail(email) {
      this.email = email;
    },
    setPassword(password) {
      this.password1 = password;
    },
    setPasswordRepeat(password) {
      this.password2 = password;
    },
    setAgreed(agreed) {
      this.agreed = agreed;
    },
    moveBack() {
      this.$emit("back", true);
    },
    moveForward() {
      if (this.agreed) {
        this.$emit("info", {
          phone: this.phone,
          first_name: this.firstName,
          last_name: this.lastName,
          email: this.email,
          password1: this.password1,
          password2: this.password2,
        });
        this.$emit("forward", true);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "src/assets/variables";

.info {
  display: flex;
  flex-direction: column;

  span {
    color: $dark-gray2;

    &:not(:first-of-type) {
      margin-top: 15px;
    }
  }

  .phone,
  .text,
  .password,
  .checkbox {
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
