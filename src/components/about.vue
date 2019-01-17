<template>
  <div>
    <h1>about</h1>
    <p>{{aboutMsg}}</p>
    <router-link to="/index">index</router-link>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>
<script>
import HelloWorld from "./HelloWorld.vue";
export default {
  name: "app",
  components: {
    HelloWorld
  },
  data() {
    return {
      aboutMsg: "我是about!"
    };
  }
};
</script>


<style>

</style>