<template>
  <div class="choice">
    <PrimaryButton @clicked="clicked(true)">Хочу купить</PrimaryButton>
    <PrimaryButton @clicked="clicked(false)">Хочу продать</PrimaryButton>
  </div>
</template>

<script>
import PrimaryButton from "@/components/Core/PrimaryButton";

export default {
  name: "SignUpChoice",
  components: {
    PrimaryButton,
  },
  methods: {
    clicked(isUser) {
      this.$emit("isUser", isUser);
      this.$emit("forward", true);
    },
  },
};
</script>

<style lang="scss" scoped>
.choice {
  display: flex;
  flex-direction: column;

  button {
    flex: 1;

    &:not(:first-of-type) {
      margin-top: 15px;
    }
  }
}
</style>
