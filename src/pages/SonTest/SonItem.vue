<template>
  <div>
    <div v-for="(item,index) in dataList" :key="index">{{ item }}</div>
  </div>
</template>

<script>
export default {
  name: "SonItme",
  props: {
    dataList: {
      type: Array,
      default: () => []
    },
    mounted() {
      console.log(this.dataList);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>