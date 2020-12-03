<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/respberryPi.jpg" />
    <File msg="Welcome to Your RespberryPi" />
  </div>
</template>

<script>
// @ is an alias to /src
import File from "@/components/File.vue";

export default {
  name: "Home",
  components: {
    File
  }
};
</script>
<style scoped>
img {
  width: 20%;
}
</style>
