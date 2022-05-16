<template>
<div>
<!--头部导航栏-->
  <Navbar></Navbar>
<!--  tab栏-->
  <Tab></Tab>
</div>
</template>

<script>
import Navbar from './Navbar'
import Tab from './Tab'

export default {
  name: 'Home',
  components: { Navbar, Tab }
}
</script>

<style scoped>

</style>
