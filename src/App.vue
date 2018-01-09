<template>
  <div id="app">
    <el-container>
      <el-header>Header</el-header>
      <el-container>
        <el-menu class="el-menu-vertical"
          default-active="1"
          :collapse="isCollapse"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <i class="collapse" 
            :class="isCollapse ? 'el-icon-d-arrow-right' : 'el-icon-d-arrow-left'"
            @click="onCollapseClick"></i>
          <el-menu-item index="1" @click="onMenuItemClick('index')" >
            <i class="el-icon-menu"></i>
            <span slot="title">控制台</span>
          </el-menu-item>
          <el-menu-item index="2" @click="onMenuItemClick('movie')">
            <i class="el-icon-view"></i>
            <span slot="title">电影管理</span>
          </el-menu-item>
          <el-menu-item index="3" @click="onMenuItemClick('type')">
            <i class="el-icon-setting"></i>
            <span slot="title">类别管理</span>
          </el-menu-item>
        </el-menu>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      isCollapse: false
    }
  },
  methods: {
    onCollapseClick() {
      this.isCollapse = !this.isCollapse
    },
    onMenuItemClick(path) {
      this.$router.push(path)
    }
  }
}
</script>

<style lang="scss">
  @import './style/common';
  #app {
    height: 100%;
    width: 100%;
  }
  .el-container {
    height: 100%;
    width: 100%;
  }
  .el-menu {
    height: 100%;
    .collapse {
      text-align: center;
      display: block;
      height: 30px;
      line-height: 30px;
      color: #fff;
      &:hover {
        background-color: #434A50;
      }
    }
  }
  .el-menu-vertical:not(.el-menu--collapse) {
    width: 12%;
    min-height: 400px;
  }
  
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    height: 200px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
  }

  .el-main {
    background-color: #fff;
  }
</style>
