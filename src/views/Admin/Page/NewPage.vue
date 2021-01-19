<template>
    <div>
        <h1>Создание страницы</h1>
        <b-form @submit.prevent="submit">
            <b-form-group id="name" label="Название" label-for="name">
                <b-form-input
                    id="input-2"
                    v-model="page.name"
                    placeholder="укажите название страницы"
                    required
                >
                </b-form-input>
            </b-form-group>
            <Editor ref="editor"/>
            <div class="mt-3">
                <b-button type="submit" variant="primary">Сохранить</b-button>
            </div>
        </b-form>
    </div>
</template>

<script>

  import Editor from "@/components/Editor";
  export default {
    name: "NewPage",
    components: {Editor},
    data() {
      return {
        page: {
          name: '',
        }}
    },
    methods: {
      submit(e) {
        e.preventDefault();
        console.log("submit")
        this.$refs.editor.getData();
      }
    }
  }
</script>