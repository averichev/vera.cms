<template>
    <div id="app">
        <div id="nav">
            <router-link to="/">
                Home
            </router-link>
            <router-link :to="{name: 'login'}">
                Вход
            </router-link>
            <router-link :to="{name: 'admin_homepage'}">
                Админка
            </router-link>
        </div>
        <div class="container">
            <router-multi-view />
        </div>
    </div>
</template>
<script>
  export default {
    name: 'Login',
    data () {
      return {
        user: null
      }
    },
    mounted() {
      this.$httpClient.get('/api/user/')
        .then(r => {
          console.log(r)
        })
    }
  }
</script>
