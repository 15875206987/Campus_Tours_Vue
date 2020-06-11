<template>
  <Menu theme="light" @on-select="selectCategory" style="overflow-y: scroll; height: 550px;">
    <Submenu name="1">
      <template slot="title">
        <Icon type="ios-paper" />
        学习
      </template>
      <Menu-item v-for="(item,index) in livingcategories" :key="index"  :name="item.category_id" class="menuitem">
        {{item.category_name}}
        <div>
          <Icon type="md-build" @click="updateCategory(item)"/>
          <Icon type="md-trash" @click="deleteCategory(item.category_id)"/>
        </div>
      </Menu-item>
    </Submenu>
    <Submenu name="2">
      <template slot="title">
        <Icon type="ios-people" />
        生活
      </template>
      <Menu-item v-for="(item,index) in studycategories" :key="index"  :name="item.category_id" class="menuitem">
        {{item.category_name}}
        <div>
          <Icon type="md-build" @click="updateCategory(item)"/>
          <Icon type="md-trash" @click="deleteCategory(item.category_id)"/>
        </div>
      </Menu-item>
    </Submenu>
    <Modal
      v-model="openUpdate"
      title="Update Category"
      width="300"
      ok-text="修改"
      @on-ok="updateCategoryToRemote">
          <i-select placeholder="please select a parent-category" v-model="formData.parent_id">
            <i-option :value="1">学习</i-option>
            <i-option :value="2">生活</i-option>
          </i-select>
            <Input placeholder="please input category name" style="margin-top: 10px;" v-model="formData.category_name"></Input>
    </Modal>
  </Menu>
</template>
<script>
    import {mapState,mapActions} from 'vuex'
    export default {
        name: "SideBar",
      data(){
          return{
            openUpdate:false,
            formData:{
              category_id:0,
              parent_id:1,
              category_name:''
            }
          }
      },
      computed:{
          ...mapState(['livingcategories','studycategories'])
      },
      methods:{
        ...mapActions(['getLivingCategories','getStudyCategories','selectMarkerPoints']),
        selectCategory(name){
          this.selectMarkerPoints(name)
        },
        updateCategory(item){
          this.formData.category_id = item.category_id
          this.formData.parent_id = item.category_parent
          this.formData.category_name = item.category_name
          this.openUpdate = true
        },
        updateCategoryToRemote(){
          this.$store.dispatch('updateCategory',this.formData)
        },
        deleteCategory(category_id){
          this.$Modal.warning({
            title: '删除',
            content: '<p>是否确认删除该分类?</p>',
            closable:true,
            onOk: () => {
              this.$store.dispatch("deleteCategory",category_id)
            }
          });
        }
      },
      mounted() {
          //让actions做ajax请求数据
        this.$store.dispatch('getLivingCategories')
        this.$store.dispatch('getStudyCategories')
      }
    }
</script>

<style scoped>
.menuitem{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
</style>
