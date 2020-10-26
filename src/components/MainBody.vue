<template>
  <div></div>
</template>

<script>

export default {
  name: "MainBody",
  components: {
  },
};
</script>

<style lang="scss" scoped>
.body {
  display: flex;

  .left {
    width: 860px;
  }

  .right {
    margin-left: 40px;
    flex: 1;
    max-width: 270px;
  }
}

@media screen and (max-width: 1170px) {
  .body {
    margin-top: 30px;
    padding: 0 20px;

    .left {
      width: 100%;
    }

    .right {
      display: none;
    }
  }
}
</style>
