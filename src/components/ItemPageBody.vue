<template>
  <div class="container">
    <div class="row no-gutters">
      <div class="col-9">
        <ItemDetail
          v-bind:id="parseInt(this.slug.split('-').pop())"
        ></ItemDetail>
      </div>
    </div>
  </div>
</template>

<script>
import ItemDetail from "@/components/ItemDetail";

export default {
  name: "ItemPageBody",
  props: {
    id: String,
  },
  components: {
    ItemDetail,
  },
};
</script>

<style lang="scss" scoped>
.container {
  padding-top: 0;
  padding-bottom: 100px;
}
</style>
