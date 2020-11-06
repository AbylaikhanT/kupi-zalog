<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'App',

  components: {},

  data: () => ({
    //
  }),
};
</script>
<style>
@import '../node_modules/@fortawesome/fontawesome-free/css/all.min.css';


* {
  font-family: Roboto, sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 120%;
  box-sizing: border-box;
}
</style>