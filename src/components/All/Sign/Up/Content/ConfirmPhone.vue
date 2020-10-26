<template>
  <div class="forgot">
    <InputPhone :phone="phone" placeholder="Телефон"></InputPhone>
    <span>Пожалуйста введите код подтверждения из смс</span>
    <InputText @changed="setCode" placeholder="Код из смс"></InputText>
    <div class="controls">
      <SecondaryButton @clicked="moveBack()">Назад</SecondaryButton>
      <PrimaryButton @clicked="checkCode()">Далее</PrimaryButton>
    </div>
  </div>
</template>

<script>
import InputPhone from "@/components/Core/InputPhone";
import InputText from "@/components/Core/InputText";
import PrimaryButton from "@/components/Core/PrimaryButton";
import SecondaryButton from "@/components/Core/SecondaryButton";

export default {
  name: "SignUpConfirmPhone",
  components: {
    InputText,
    PrimaryButton,
    SecondaryButton,
  },
  props: {
    phone: String,
  },
  data() {
    return {
      code: "",
    };
  },
  methods: {
    moveBack() {
      this.$emit("back", true);
    },
    moveForward() {
      this.$emit("forward", true);
    },
    setCode(code) {
      this.code = code;
    },
    checkCode() {
      this.$emit("code", this.code);
      this.moveForward();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/variables";

.forgot {
  display: flex;
  flex-direction: column;

  span {
    margin-bottom: 5px;
    color: $dark-gray2;
  }

  .text {
    &:not(:first-of-type) {
      margin-top: 15px;
    }
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
