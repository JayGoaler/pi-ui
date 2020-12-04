<template>
  <div class="main_div">
    <h1>{{ msg }}</h1>
    <div class="treeDiv">
      <el-tree
        :data="list"
        :accordion="true"
        :render-content="renderContent"
        :expand-on-click-node="false"
        :default-expanded-keys="expandedList"
        node-key="id"
        :highlight-current="true"
        @node-expand="nodeExpand"
      />
    </div>
    <el-drawer
      title="上传文件至服务器"
      :before-close="handleClose"
      :visible.sync="dialog"
      :with-header="false"
      direction="rtl"
      custom-class="demo-drawer"
      ref="drawer"
    >
      <div class="demo-drawer__content">
        <el-form :model="form">
          <el-form-item label="文件上传" prop="fysjtDesc">
            <el-upload
              class="upload-demo"
              ref="upload"
              action="/file/uploadFile"
              :on-success="handleUploadSuccess"
              :data="getfileData()"
              :file-list="fileList"
              :auto-upload="false"
            >
              <el-button slot="trigger" size="small" type="primary"
                >选取附件</el-button
              >
              <el-button
                style="margin-left: 10px;"
                size="small"
                type="success"
                @click="submitUpload"
                >上传到服务器</el-button
              >
            </el-upload>
          </el-form-item>
        </el-form>
      </div>
    </el-drawer>
  </div>
</template>

<script>
export default {
  props: {
    msg: String
  },
  data() {
    return {
      dialog: false,
      loading: false,
      formLabelWidth: "80px",
      list: [],
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      fileData: {
        id: ""
      },
      fileList: [],
      expandedList: []
    };
  },
  mounted: function() {
    this.send();
  },
  methods: {
    send() {
      this.axios({
        method: "get",
        url: "/fileSystem/getFileTree"
      }).then(async resp => {
        if (resp.status === 200 && resp.data.success) {
          this.list = await this.setTreeData(resp.data.data, "parentId", "id");
        }
      });
    },
    // eslint-disable-next-line no-unused-vars
    handleClose(done) {
      this.$confirm("确定要关闭吗？")
        .then(e => {
          console.log(e);
          this.dialog = false;
        })
        .catch(e => {
          console.log(e);
        });
    },
    cancelForm() {
      this.loading = false;
      this.dialog = false;
      clearTimeout(this.timer);
    },
    // eslint-disable-next-line no-unused-vars
    renderContent(h, { node, data, store }) {
      return (
        <span class="custom-tree-node">
          <span>{node.label}</span>
          <span>
            <el-button size="mini" type="text" on-click={() => this.open(data)}>
              {data.file ? "下载" : "上传"}
            </el-button>
          </span>
        </span>
      );
    },
    open(data) {
      if (data.file) {
        this.$confirm("确定要下载文件？").then(e => {
          console.log(e);
          window.open("/file/" + data.id);
          this.$notify({
            title: "成功",
            message: "下载文件成功！",
            type: "success"
          });
        });
        return;
      }
      this.dialog = true;
      this.fileData.id = data.id;
    },
    getfileData() {
      return this.fileData;
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    // eslint-disable-next-line no-unused-vars
    handleUploadSuccess(response, file, fileList) {
      // 文件上传成功后的操作
      if (response.success) {
        this.$notify({
          title: "成功",
          message: "上传成功！",
          type: "success"
        });
        this.$refs.upload.clearFiles();
        this.dialog = false;
        this.send();
      }
    },
    nodeExpand(data) {
      this.expandedList = [];
      this.expandedList.push(data.id);
      console.log(this.expandedList);
    },
    setTreeData(arr, fdm, dm) {
      // 删除所有的children,以防止多次调用
      arr.forEach(function(item) {
        delete item.children;
      });
      // 构建map
      let map = {};
      arr.forEach(i => {
        //  构建以id为键 当前数据为值
        map[i[dm]] = i;
      });
      let treeData = [];
      arr.forEach(child => {
        const mapItem = map[child[fdm]]; // 判断当前数据的parentId是否存在map中
        if (mapItem) {
          //  存在则表示当前数据不是最顶层的数据
          //  注意： 这里的map中的数据是引用了arr的它的指向还是arr,当mapItem改变时arr也会改变，踩坑点
          (mapItem.children || (mapItem.children = [])).push(child); // 这里判断mapItem中是否存在child
        } else {
          //  不存在则是顶层数据
          treeData.push(child);
        }
      });
      return treeData;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
.treeDiv {
  width: 50%;
}
</style>
