<template>
  <div id="app" style="width: 100%; height: 100%;">
    <div id="nav">
      |<router-link to="/">Demo</router-link>|
      <router-link to="/about">About</router-link>|
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
