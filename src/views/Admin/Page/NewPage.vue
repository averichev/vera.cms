<template>
    <div>
        <h1>Создание страницы</h1>
        <b-form @submit.prevent="submit">
            <b-form-group id="name" label="Название" label-for="name">
                <b-form-input
                    id="input-2"
                    v-model="page.header"
                    placeholder="укажите название страницы"
                    required
                >
                </b-form-input>
            </b-form-group>
            <Editor ref="editor" v-model="page.content"/>
            <div class="mt-3">
                <b-button type="submit" variant="primary">Сохранить</b-button>
            </div>
        </b-form>
    </div>
</template>

<script>
  import Editor from "@/components/Editor";
  import axios from "axios";

  export default {
    name: "NewPage",
    components: {Editor},
    data() {
      return {
        page: {
          header: '',
          content: null
        }}
    },
    methods: {
      submit(e) {
        e.preventDefault();
        console.log("submit")
        console.log(this.page)
        axios.post('http://localhost:5000/api/page/add', this.page)
        .then(r => {
          console.log(r.data)
        })
      }
    }
  }
</script>