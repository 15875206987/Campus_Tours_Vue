<template>
  <Menu mode="horizontal" theme="dark" active-key="1">
    <span class="layout-logo">SCUT TOUR 管理平台</span>
    <div class="layout-nav">
      <Menu-item name="1">
        <Icon type="ios-navigate"></Icon>
        <router-link to="/universitymap" class="nav-link">校园地图</router-link>
      </Menu-item>
      <Menu-item name="2">
        <Icon type="ios-keypad"></Icon>
        <router-link to="/sitesmanagement" class="nav-link">地点管理</router-link>
      </Menu-item>
      <Menu-item name="3">
        <Icon type="ios-analytics"></Icon>
        <router-link to="/schoolintro" class="nav-link">校园介绍</router-link>
      </Menu-item>
    </div>
  </Menu>
</template>

<script>
    export default {
        name: "Navigation"
    }
</script>

<style scoped>
  .layout-logo{
    width: 300px;
    height: 30px;
    float: left;
    top: 15px;
    margin-left: 20px;
    color: white;
    font-size: 20px;
  }
  .layout-nav{
    width: 420px;
    margin: 0 auto;
  }
  .router-link-active{
    color: white;
    font-size: 18px;
  }
  .nav-link{
    color: white;
  }
</style>
