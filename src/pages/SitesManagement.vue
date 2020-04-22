<template>
  <div class="layout-content">
    <Row>
      <i-col span="5">
        <side-bar></side-bar>
      </i-col>
      <i-col span="19">
        <div class="layout-content-main">
          <sites-table></sites-table>
        </div>
      </i-col>
    </Row>
  </div>
</template>

<script>
  import SideBar from "../components/SideBar";
  import SitesTable from "../components/SitesTable";
    export default {
        name: "SitesManagement",
        components:{
          SideBar,
          SitesTable
        }
    }
</script>

<style scoped>
  .layout-content{
    min-height: 200px;
    margin: 15px;
    overflow: hidden;
    background: #fff;
    border-radius: 4px;
  }
  .layout-content-main{
    padding: 10px;
    height: 560px;
  }
</style>
