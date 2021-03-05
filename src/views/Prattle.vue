<template>
  <div class="prattle">
    <h1>{{ prattle }}</h1>
    <el-button size="small" type="success" round @click="getNext"
      >下一条</el-button
    >
  </div>
</template>

<script>
export default {
  props: {
    prattle: String
  },
  mounted: function() {
    this.getNext();
  },
  methods: {
    getNext() {
      this.axios({
        method: "get",
        url: "/prattle/get"
      }).then(async resp => {
        if (resp.status === 200) {
          this.prattle = resp.data.data;
        }
      });
    }
  }
};
</script>
