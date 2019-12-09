<template>
  <div>
    <CommonLayout>
      <SonItem :dataList="dataList" />
    </CommonLayout>
  </div>
</template>

<script>
import CommonLayout from "@/pages/commonLayout";
import SonItem from "./SonItem";
export default {
  name: "SonTest",
  components: { CommonLayout, SonItem },
  data() {
    return {
      dataList: []
    };
  },
  created() {
    this.dataList = [1, 1, 2, 3, 4, 5, 6, 7, 8];
  }
};
</script>

<style lang="scss" scoped>
</style>