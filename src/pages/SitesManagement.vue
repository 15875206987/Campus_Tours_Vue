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
    <div class="fixed-button">
      <Button type="error" shape="circle" icon="md-add" @click="addCategoryOrSite"></Button>
    </div>
    <Modal v-model="openChoice" footer-hide="true" width="250">
      <Button @click="addCategory">增加类别</Button>
      <Button @click="addSite">增加景点</Button>
    </Modal>
    <Modal v-model="openAddSite">
      <add-site-from-site-management></add-site-from-site-management>
    </Modal>
    <Modal
      v-model="openAddCategory"
      title="Add Category"
      width="300"
      ok-text="添加"
      @on-ok="addCategoryToRemote">
      <i-select placeholder="please select a parent-category" v-model="formData.category_parent">
        <i-option value="1">学习</i-option>
        <i-option value="2">生活</i-option>
      </i-select>
      <Input placeholder="please input category name" style="margin-top: 10px;" v-model="formData.category_name"></Input>
    </Modal>
  </div>
</template>

<script>
  import SideBar from "../components/SideBar";
  import SitesTable from "../components/SitesTable";
  import addSiteFromSiteManagement from "../components/addSiteFromSiteManagement";
    export default {
        name: "SitesManagement",
        components:{
          addSiteFromSiteManagement,
          SideBar,
          SitesTable,
        },
        data(){
          return{
            openChoice:false,
            openAddCategory:false,
            openAddSite:false,
            formData:{
              category_name:'',
              category_parent:1
            }
          }
        },
        methods:{
          addCategoryOrSite(){
            this.openChoice = true
          },
          addCategory(){
            this.openAddCategory = true
          },
          addSite(){
            this.openAddSite = true
          },
          addCategoryToRemote(){
            this.$store.dispatch('addCategoryToRemote',this.formData)
          }
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
  .fixed-button{
    padding: 10px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }
</style>
