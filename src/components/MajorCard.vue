<template>
  <div>
    <Card v-for="(item) in selectedMajorList" style="width:350px">
      <p slot="title">
        <Icon type="ios-film-outline"></Icon>
        {{item.major_id}}
      </p>
      <button slot="extra" type="primary">查看相关景点</button>
      <img :src="item.major_picURL"/>
      <label>{{item.major_desc}}</label>
    </Card>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
    export default {
        name: "MajorCard",
        computed:{
          ...mapState(['selectedMajorList'])
        }
    }
</script>

<style scoped>

</style>
