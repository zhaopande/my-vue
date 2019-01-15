<template>
  <div>
    <h1>about</h1>
    <p>{{aboutMsg}}</p>
    <router-link to="/index">index</router-link>
    <router-link to="/bar">Go to Bar</router-link>
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
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>