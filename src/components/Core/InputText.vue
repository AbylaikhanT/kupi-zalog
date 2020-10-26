<template>
  <div class="text">
    <span v-if="label">{{ label }}</span>
    <input
      v-model="content"
      @change="changed()"
      @keyup="keyuped"
      @keydown="keydowned()"
      @keydown.enter="entered()"
      :placeholder="placeholder"
      type="text"
    />
  </div>
</template>

<script>
export default {
  name: "InputText",
  props: {
    text: String,
    label: String,
    placeholder: String,
  },
  watch: {
    text(newValue) {
      this.content = newValue;
    },
  },
  data() {
    return {
      content: this.text ? this.text : "",
    };
  },
  methods: {
    changed() {
      this.$emit("changed", this.content);
    },
    entered() {
      this.$emit("entered", true);
    },
    keydowned() {
      this.$emit("keydown", true);
    },
    keyuped(event) {
      this.$emit("keyup", {
        text: this.content,
        event: event,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/variables";

.text {
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

    @media screen and (max-width: 1170px) {
      width: 100%;
    }

    &::placeholder {
      color: $light-gray2;
    }
  }
}
</style>
