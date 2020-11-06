<template>
  <div class="fill">
    <span class="header">Вы успешно зарегистрировались!</span>
    <div class="desc">
      Но для активации аккаунта и получения полного пакета услуг, пожалуйста
      <span class="attention">дополните</span>
      информацию вашего профиля.
    </div>
    <div class="controls">
      <SecondaryButton @clicked="moveBack()">Назад</SecondaryButton>
      <PrimaryButton @clicked="moveForward()">Дополнить</PrimaryButton>
    </div>
  </div>
</template>

<script>
import PrimaryButton from "@/components/Core/PrimaryButton";
import SecondaryButton from "@/components/Core/SecondaryButton";

export default {
  name: "SignUpFill",
  components: {
    PrimaryButton,
    SecondaryButton,
  },
  methods: {
    moveBack() {
      this.$emit("back", true);
    },
    moveForward() {
      this.$emit("forward", true);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "src/assets/variables";

.fill {
  display: flex;
  flex-direction: column;

  .header {
    color: $dark-blue;
    font-size: 18px;
    font-weight: 600;
    text-align: center;
  }

  .desc {
    margin-top: 20px;
    color: $dark-blue;
    font-size: 16px;
    text-align: center;

    .attention {
      font-weight: 600;
      text-transform: uppercase;
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
