<template>
  <el-container>
    <el-header style="text-align: right; font-size: 12px">
      <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>查看</el-dropdown-item>
          <el-dropdown-item>新增</el-dropdown-item>
          <el-dropdown-item>删除</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span v-on:click="great">王小虎</span>
    </el-header>
    <el-container >
      <el-aside width="200px" class="el-aside">
        <!-- :default-active="defaultActive" -->
        <el-menu
          text-color="#000"
          active-text-color="#409eff"
          :default-active="$route.fullPath"
          :router="true"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-message"></i>导航一
            </template>
            <!-- <el-menu-item-group> -->
            <!-- <el-menu-item index="1-1" @click="linkTo({name:'HelloWorld',query:{index:'1-1'}})">选项1</el-menu-item>
            <el-menu-item index="1-2" @click="linkTo({name:'About',query:{index:'1-2'}})">选项2</el-menu-item> -->
            <el-menu-item index="/index/HelloWorld">选项1</el-menu-item>
            <el-menu-item index="/index/about">选项2</el-menu-item>
            <el-menu-item index="/test">选项3</el-menu-item>
            <!-- </el-menu-item-group> -->
            <el-menu-item-group>
              <el-menu-item index="/chooseEntrance">选项4</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
              <template slot="title">选项5</template>
              <el-menu-item index="1-4-1">选项5-1</el-menu-item>
            </el-submenu>
          </el-submenu>

          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-menu"></i>导航二
            </template>
            <el-menu-item-group>
              <el-menu-item index="2-1">选项1</el-menu-item>
              <el-menu-item index="2-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="2-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="2-4">
              <template slot="title">选项4</template>
              <el-menu-item index="2-4-1">选项4-1</el-menu-item>
            </el-submenu>
          </el-submenu>

          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-setting"></i>导航三
            </template>
            <el-menu-item-group>
              <el-menu-item index="3-1">选项1</el-menu-item>
              <el-menu-item index="3-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="3-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="3-4">
              <template slot="title">选项4</template>
              <el-menu-item index="3-4-1">选项4-1</el-menu-item>
            </el-submenu>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container  style="display:flex;flex-direction: column;">
        <tags-view/>
        <el-main>
          <transition name="fade-transform" mode="out-in">
            <keep-alive :include="cachedViews">
              <router-view :key="key"/>
            </keep-alive>
          </transition>
        </el-main>
        <!-- <el-footer>Footer</el-footer> -->
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import TagsView from "@/components/TagsView";
export default {
  components: {
    TagsView
  },
    computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.fullPath
    }
  },
  data: function() {
    // let defaultActive="";
    const item = {
      date: "2016-05-02",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1518 弄"
    };
    return {
      tableData: Array(2).fill(item),
      itemIndex: "1-1",
      defaultActive: ""
    };
  },
  mounted() {
    console.log(this.$route);
    // this.handleSelectMenuItem(this.$route.query.index);
  },
  // 在 `methods` 对象中定义方法
  methods: {
    great: function() {
      console.log("aaaa");
    },
    linkTo: function(router) {
      this.$router.push(router);
    },
    handleSelectMenuItem: function(key) {
      console.log(key);
      this.defaultActive = key;
    }
  },
  watch: {
    $route(val) {
      console.log(val);
    //   this.handleSelectMenuItem(val.query.index);
    }
  }
};
</script>

<style  type="text/scss" lang="scss" scoped>
.nav-item {
  text-decoration-line: none;
  color: black;
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: $theme-color;
  line-height: 60px;
}

.el-menu {
  border: none;
}

.el-aside {
  color: #333;
  text-align: center;
  height: inherit;
}

.el-aside::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}
.el-aside::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #535353;
}
.el-aside::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background: #ededed;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
  overflow-x: hidden;
}

.el-container {
  /* margin-bottom: 40px; */
  height: 100%;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>