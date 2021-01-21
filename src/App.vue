<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
      <router-link :to="{name: 'login'}">Вход</router-link>
      <router-link :to="{name: 'admin_homepage'}">Админка</router-link>
    </div>
    <div class="container">
      <router-multi-view/>
    </div>
  </div>
</template>