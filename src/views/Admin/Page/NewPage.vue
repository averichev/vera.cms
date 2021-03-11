<template>
    <div>
        <h1>Создание страницы</h1>
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
            <b-form-group
                label="Описание"
                label-for="description"
            >
                <b-form-input
                    id="description"
                    v-model="page.description"
                    placeholder="meta-tag description"
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
    name: 'NewPage',
    components: {Editor},
    data() {
      return {
        page: {
          header: '',
          content: null,
          description: null
        }
      }
    },
    methods: {
      submit(e) {
        e.preventDefault()
        this.$httpClient
          .post('/api/page/add', this.page)
          .then(() => {
            this.$router.push({name: "pages"})
          })
      }
    }
  }
</script>
