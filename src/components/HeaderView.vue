<script setup lang="ts">

</script>

<template>
<div class="header-block">
  <RouterLink to="/main" class="header-block__logo">
    <span class="header-block__logo-title">ОКак<br>Хакатоны</span>
    <span  class="header-block__link">СЕЗОН: FRONTEND</span>
  </RouterLink>
  <RouterLink to="/my" class="header-block__routing">
    <span class="header-block__routing-text">Профиль</span>
    <img src="../assets/img/avatar.png" class="header-block__routing-photo">
  </RouterLink>
</div>
</template>

<style scoped>
.header-block {
  width: 100%;
  height: 100%;
  display: flex;
  padding: 0 25px;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  margin-top: 10px;
}

.header-block__logo {
  display: flex;
  align-items: center;
  text-decoration: none;
}

.header-block__logo-title {
  color: white;
  font-size: 18px;
  line-height: 18px;
  margin-left: 8px;
  font-family: "Unbounded", sans-serif;
}
.header-block__link {
  text-decoration: none;
  margin-left: 16px;
  margin-top: 4px;
  font-size: 12px;
  font-weight: bold;
  border: 1px solid #706cff;
  padding: 5px 10px;
  border-radius: 10px;
  font-family: "Unbounded", sans-serif;
}

.header-block__routing {
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 10px;
}
.header-block__routing-photo {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

</style>