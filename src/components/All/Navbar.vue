 <template>
  <div class="navbar">
    <div class="content">
      <div class="left">
        <span @click="redirectToInfo(tab.slug)" v-for="tab in infoTabs">{{
          tab.name
        }}</span>
      </div>
      <div class="right">
        <AccountProductButton></AccountProductButton>
      </div>
    </div>
  </div>
</template>

<script>
import AccountProductButton from "@/components/Account/ProductButton";

export default {
  name: "Navbar",
  props: {
    tabs: Array,
  },
  components: {
    AccountProductButton,
  },
  computed: {
    infoTabs() {
      return this.tabs.filter((tab) => tab.type === 1);
    },
  },
  methods: {
    redirectToInfo(slug) {
      this.$router.push({
        name: "info",
        params: {
          slug: slug,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "src/assets/variables";

.navbar {
  display: flex;
  justify-content: center;
  width: 100vw;
  height: 60px;
  background-color: $blue;
  color: $white;

  .content {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1170px;

    .left {
      display: flex;

      span {
        font-weight: 500;
        cursor: pointer;

        &:not(:first-child) {
          margin-left: 40px;
        }
      }
    }
  }
}

@media screen and (max-width: 1170px) {
  .navbar {
    display: none;
  }
}
</style>
