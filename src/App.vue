<template>
    <div id="app">
        <div id="nav">
            <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> -->
        </div>
        <router-view />
    </div>
</template>
<script>
export default {
    name: 'app',
    data() {
        return {};
    },
    components: {},
    computed: {},
    created() {},
    watch: {}
};
</script>
<style lang="scss">
@import './assets/css/main.css';
@import './assets/css/color-dark.css'; /*深色主题*/
/*@import "./assets/css/theme-green/color-green.css";   浅绿色主题*/
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

#nav {
    padding: 30px;

    a {
        font-weight: bold;
        color: #2c3e50;

        &.router-link-exact-active {
            color: #42b983;
        }
    }
}
</style>
