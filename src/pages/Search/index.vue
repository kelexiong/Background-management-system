<template>
  <div>
    <h1>params传参----{{ $route.params.keyword }}</h1>
    <h1>query传参----{{ $route.query.k }}</h1>
  </div>
</template>

<script>
export default {
  name: 'Search'
}
</script>

<style lang="less" scoped></style>
