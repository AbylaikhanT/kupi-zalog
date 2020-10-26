<template>
  <div
    v-if="ad"
    :style="{ backgroundImage: `url('${ad.url}')` }"
    @click="redirect(ad.link)"
    class="ad"
  >
    <span v-if="!ad || !ad.url">{{ ad.alt }}</span>
  </div>
</template>

<script>
export default {
  name: "HorizontalAd",
  data() {
    return {
      ad: undefined,
    };
  },
  methods: {
    redirect(url) {
      window.location = `/${url}`;
    },
  },
  created() {
    this.$http.get("promotion-ads").then(
      function (response) {
        this.ad = response.data;
      }.bind(this)
    );
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/variables";

.ad {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 1170px;
  height: 250px;
  background-position: center;
  background-size: cover;
  border: 1px solid $gray;
  border-radius: 5px;

  span {
    color: $dark-blue;
    font-size: 16px;
    font-weight: 500;
  }
}

@media screen and (max-width: 1170px) {
  .ad {
    display: none;
  }
}
</style>
