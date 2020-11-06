<template>
  <div class="messages">
    <Header>Сообщения</Header>
    <div class="content">
      <h5>У вас еще нет ни одного диалога</h5>
      <span>Здесь будут отображены все ваши диалоги.</span>
      <span>Вы можете начать диалог на странице любого объявления.</span>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Account/Header";

export default {
  name: "AccountUserMessages",
  components: {
    Header,
  },
};
</script>

<style lang="scss" scoped>
@import "src/assets/variables";

.messages {
  flex: 1;
  display: flex;
  flex-direction: column;

  .content {
    padding: 90px 30px;
    display: flex;
    flex-direction: column;
    align-items: center;

    h5 {
      margin-bottom: 20px;
      color: $black;
      font-size: 20px;
    }
  }
}
</style>
