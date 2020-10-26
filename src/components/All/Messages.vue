<template>
  <div @click="redirect('user-messages')" class="messages">
    <i class="far fa-envelope"></i>
    <span>Сообщения</span>
    <span v-if="count">({{ count }})</span>
  </div>
</template>

<script>
export default {
  name: "Messages",
  data() {
    return {
      count: 0,
    };
  },
  methods: {
    redirect(route) {
      this.$router.push({ name: route });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/variables";

.messages {
  display: flex;
  align-items: center;
  color: $blue;
  cursor: pointer;

  i {
    margin-right: 8px;
  }

  span {
    font-size: 16px;

    &:not(:first-of-type) {
      margin-left: 4px;
    }
  }
}
</style>
