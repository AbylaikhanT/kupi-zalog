<template>
  <div class="phone">
    <span v-if="label">{{ label }}</span>
    <input
      v-model="content"
      v-mask="'+7 (###) ###-##-##'"
      @change="changed()"
      @keydown.enter="entered()"
      placeholder="+7 (___) ___-__-__"
      type="text"
      :disabled="disabled"
    />
  </div>
</template>

<script>
export default {
  name: "InputPhone",
  props: {
    phone: String,
    label: String,
    disabled: Boolean,
  },
  data() {
    return {
      content: this.phone
        ? `+7 (${this.phone.substring(0, 3)}) ${this.phone.substring(
            3,
            6
          )} ${this.phone.substring(6, 8)} ${this.phone.substring(8, 10)}`
        : "",
    };
  },
  methods: {
    changed() {
      const phone = this.content.replace(/\D/g, "").slice(1);
      this.$emit("changed", phone);
    },
    entered() {
      this.$emit("entered", true);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "src/assets/variables";

.phone {
  display: flex;
  flex-direction: column;

  span {
    margin-bottom: 10px;
    color: $gray;
  }

  input {
    padding: 0 15px;
    max-width: 100%;
    width: 500px;
    height: 40px;
    border: 1px solid $gray;
    border-radius: 5px;
    outline: none;
    background-color: $white;
    color: $dark-blue;

    &::placeholder {
      color: $dark-blue;
    }
  }
}
</style>
