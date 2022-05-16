<template>
  <van-nav-bar fixed >
    <template v-slot:left>
      <img src="@/assets/logo.png" class="logo" alt="">
      <span style="color: white;margin-top: 3px">头条</span>
    </template>
    <template #right >
      <van-icon name="search" size="0.48rem" @click="$router.push('/search')" color="#fff"/>
    </template>
  </van-nav-bar>
</template>

<script>

export default {
  name: 'Navbar'
}
</script>

<style scoped>
.logo {
  width: 35px;
  height: 30px;
}
</style>
