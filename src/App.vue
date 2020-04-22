<template>
  <div id="app">
    <div class="layout">
      <navigation></navigation>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
      <div class="layout-copy">
        2020 KaitingLiu
      </div>
    </div>
  </div>
</template>

<script>
  import Navigation from "./components/Navigation";
export default {
  name: 'App',
  components:{
    Navigation
  }
}
</script>

<style>
  .layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    height: 100%;
  }
  .layout-copy{
    text-align: center;
    padding: 10px 0 20px;
    color: #9ea7b4;
  }
  page{
    height: 100%;
  }
</style>
