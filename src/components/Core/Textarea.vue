<template>
  <div class="textarea">
    <span v-if="label">{{ label }}</span>
    <textarea
      v-model="content"
      @keyup="changed()"
      @keyup.enter="entered()"
      :placeholder="placeholder"
    ></textarea>
  </div>
</template>

<script>
export default {
  name: "Textarea",
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
  },
};
</script>

<style lang="scss" scoped>
@import "src/assets/variables";

.textarea {
  display: flex;
  flex-direction: column;

  span {
    margin-bottom: 10px;
    color: $gray;
  }

  textarea {
    padding: 10px 15px;
    max-width: 100%;
    width: 500px;
    height: 135px;
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
