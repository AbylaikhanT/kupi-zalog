<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <div class="navigation">
          <a v-for="nav in path" :href="nav.href" class="nav">{{ nav.name }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Navigation",
  data: function () {
    return {
      path: [
        {
          name: "Главная",
          href: "/",
        },
        {
          name: "Электроника",
          href: "/",
        },
        {
          name: "Компьютеры",
          href: "/",
        },
        {
          name: "Ноутбуки",
          href: "/",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/variables";

.container {
  padding-top: 60px;
  padding-bottom: 20px;
}

.navigation {
  display: flex;

  a {
    color: $blue;
    text-decoration: none;
    font-size: 14px;

    &:link {
      color: $blue;
      text-decoration: none;
    }

    &:visited {
      color: $blue;
      text-decoration: none;
    }

    &:hover {
      color: $blue;
      text-decoration: none;
    }

    &:active {
      color: $blue;
      text-decoration: none;
    }

    &::after {
      content: "/";
      color: $avatar-black;
      margin: 0 5px;
    }

    &:last-child {
      color: $avatar-black;

      &::after {
        content: "";
      }
    }
  }
}
</style>
