<template>
    <div>
        <h1>Страницы</h1>
        <div>
            <router-link
                class="btn btn-success"
                :to="{name: 'pages_new'}"
            >
                Создать страницу
            </router-link>
            <div>
                <table class="table table-sm mt-5">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Head</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="page in pages"
                            :key="page.id"
                        >
                            <td>
                                {{ page.id }}
                            </td>
                            <td>
                                <router-link :to="{name: 'pages_edit', params: {pageId: page.id}}">
                                    {{ page.header }}
                                </router-link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: "ListPage",
    data(){
      return {
        pages: []
      }
    },
    mounted() {
      this.getPages()
    },
    methods: {
      getPages(){
        this.$httpClient.get('/api/pages/')
          .then(r => {
            this.pages = r.data.items
          })
      }
    }
  }
</script>
