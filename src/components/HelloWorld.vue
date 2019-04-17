<template>
  <div>
    <table-tree :columns="columns" :treeStructure="true" :defaultExpandAll="true" :data-source="menuData"></table-tree>
  </div>
</template>
<script>
import tableTree from "./tableTree";
export default {
  data() {
    return {
      columns: [
        {
          text: "名称",
          dataIndex: "event"
        },
        {
          text: "编号",
          dataIndex: "id"
        },
        {
          text: "条形码",
          dataIndex: "timeLine"
        },
        {
          text: "是否需要价格",
          dataIndex: "comment"
        },
        {
          text: "排序",
          dataIndex: "num1"
        }
      ],
      menuData: [
        {
          id: 0,
          event: "事件0",
          timeLine: 50,
          comment: "否",
          num1: 60
        },
        {
          id: 1,
          event: "事件1",
          timeLine: 100,
          comment: "否",
          num1: 60,
          children: [
            {
              id: 2,
              event: "事件2",
              timeLine: 10,
              comment: "否",
              num1: 60
            },
            {
              id: 3,
              event: "事件3",
              timeLine: 90,
              comment: "否",
              num1: 60,
              children: [
                {
                  id: 5,
                  event: "事件5",
                  timeLine: 10,
                  comment: "否",
                  num1: 60
                },
                {
                  id: 6,
                  event: "事件6",
                  timeLine: 75,
                  comment: "否",
                  num1: 60,
                  children: [
                    {
                      id: 7,
                      event: "事件7",
                      timeLine: 50,
                      comment: "否",
                      num1: 60,
                      children: []
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    };
  },
  components: {
    tableTree
  }
};
</script>
<style lang="less" scoped>
</style>
