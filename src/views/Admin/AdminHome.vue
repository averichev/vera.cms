<template>
    <div>
        <h1>Административная панель</h1>
        <div>
            <router-link :to="{name: 'admin_page_new'}" class="btn btn-success">Создать страницу</router-link>
        </div>
        <div class="container">
            <router-view/>
        </div>
        <footer>
            <span class="small text-muted">{{frontVersion}}</span>
        </footer>
    </div>

</template>

<script>
/* global GIT_DESCRIBE */
export default {
  name: 'AdminHome',
  computed: {
    frontVersion () {
      return GIT_DESCRIBE.tag
    }
  }
}
</script>
