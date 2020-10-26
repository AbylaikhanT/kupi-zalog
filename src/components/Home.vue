<template>
  <div>
    <div class="body">
      <div class="left">
        <VipItemList></VipItemList>
      </div>
    </div>
  </div>
</template>

<script>
import VipItemList from "@/components/All/VipItemList";

export default {
  name: "Home",
  metaInfo() {
    return {
      title: "KUPIZALOG.KZ база залогового имущества Казахстана!",
      meta: [
        {
          name: "description",
          content:
            "Epiloge is about connecting in your field of interest. Our vision is to help people " +
            "share their knowledge, work, projects, papers and ideas and build their network through " +
            "what they do rather where they live, study or work.",
        },
      ],
    };
  },
  components: {
    VipItemList,
  },
};
</script>

<style lang="scss" scoped>
.toolbar-wrapper {
  margin-top: 45px;
}

.search-wrapper {
  margin-top: 45px;

  @media screen and (max-width: 1170px) {
    margin-top: 20px;
    padding: 0 20px;
  }

  .wrapper {
    margin-bottom: 0;
  }
}

.wrapper {
  margin-bottom: 60px;
  display: flex;
  justify-content: center;
}

.content {
  flex: 1;
  max-width: 1170px;

  .categories-wrapper {
    display: block;

    @media screen and (max-width: 1170px) {
      display: none;
    }
  }

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
}

@media screen and (max-width: 1170px) {
  .toolbar-wrapper {
    margin-top: 0;
    padding: 20px;
  }
}
</style>
