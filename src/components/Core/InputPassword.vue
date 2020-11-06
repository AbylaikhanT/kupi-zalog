<template>
  <div class="password">
    <span v-if="label">{{ label }}</span>
    <div class="input-wrapper">
      <input
        v-model="content"
        @change="changed()"
        @keyup.enter="entered()"
        :type="isShown ? 'text' : 'password'"
        :placeholder="placeholder"
      />
      <div @click="isShown = !isShown">
        <i v-if="!isShown" class="far fa-eye"></i>
        <i v-else class="far fa-eye-slash"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "InputPassword",
  props: {
    password: String,
    label: String,
    placeholder: String,
  },
  watch: {
    password(newPassword) {
      this.content = newPassword;
    },
  },
  data() {
    return {
      isShown: false,
      content: this.password ? this.password : "",
    };
  },
  methods: {
    changed() {
      this.$emit("changed", this.content);
    },
    entered() {
      this.$emit("entered", true);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "src/assets/variables";

.password {
  display: flex;
  flex-direction: column;

  span {
    margin-bottom: 10px;
    color: $gray;
  }

  .input-wrapper {
    display: flex;
    max-width: 100%;
    width: 420px;
    height: 40px;
    padding: 0 20px 0 15px;
    border: 1px solid $gray;
    border-radius: 5px;
    background-color: $white;

    @media screen and (max-width: 1170px) {
      width: 100%;
    }

    input {
      flex: 1;
      border: 0;
      outline: none;
      background-color: transparent;

      &::placeholder {
        color: $light-gray2;
      }
    }

    div {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
