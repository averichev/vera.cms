<template>
    <div>
        <h1>Изменение страницы</h1>
        <b-form @submit.prevent="submit">
            <b-form-group
                id="name"
                label="Название"
                label-for="name"
            >
                <b-form-input
                    id="input-2"
                    v-model="page.header"
                    placeholder="укажите название страницы"
                    required
                />
            </b-form-group>
            <Editor
                ref="editor"
                v-model="page.content"
            />
            <div class="mt-3">
                <b-button
                    type="submit"
                    variant="primary"
                >
                    Сохранить
                </b-button>
            </div>
        </b-form>
    </div>
</template>

<script>
  import Editor from '@/components/Editor'

  export default {
    name: 'EditPage',
    components: {Editor},
    data() {
      return {
        page: {
          header: '',
          content: null,
          id: null
        }
      }
    },
    mounted() {
      this.getPage()
    },
    methods: {
      getPage(){
        const pageId = this.$route.params.pageId
        this.$httpClient.get('/api/pages/'+pageId)
          .then(r => {
            this.page = r.data
          })
      },
      submit(e) {
        e.preventDefault()
        this.$httpClient
          .post('/api/page/update/', this.page)
          .then(() => {
            this.$router.push({name: "pages"})
          })
      }
    }
  }
</script>
