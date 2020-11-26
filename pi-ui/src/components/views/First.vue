<template>
  <el-form>
    <el-form-item>
      <el-tree :data="list"></el-tree>
    </el-form-item>
  </el-form>
</template>
<script>
const axios = require('axios')
export default {
  data () {
    return {
      list: []
    }
  },
  mounted: function () {
    this.send()
  },
  methods: {
    send () {
      axios({
        method: 'get',
        url: 'http://192.168.8.176:9527/fileSystem/getFileTree'
      }).then(async resp => {
        console.log(resp)
        if (resp.status === 200 && resp.data.success) {
          this.list = await this.setTreeData(resp.data.data, 'parentId', 'id')
          console.log(this.list)
        }
      })
    },
    setTreeData (arr, fdm, dm) {
      // 删除所有的children,以防止多次调用
      arr.forEach(function (item) {
        delete item.children
      })
      // 构建map
      let map = {}
      arr.forEach(i => {
        //  构建以id为键 当前数据为值
        map[i[dm]] = i
      })
      let treeData = []
      arr.forEach(child => {
        const mapItem = map[child[fdm]]// 判断当前数据的parentId是否存在map中
        if (mapItem) {
          //  存在则表示当前数据不是最顶层的数据
          //  注意： 这里的map中的数据是引用了arr的它的指向还是arr,当mapItem改变时arr也会改变，踩坑点
          (mapItem.children || (mapItem.children = [])).push(child)// 这里判断mapItem中是否存在child
        } else {
          //  不存在则是顶层数据
          treeData.push(child)
        }
      })
      return treeData
    }
  }
}
</script>
