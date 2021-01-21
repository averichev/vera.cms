<template>
    <div>
        <div id="editorjs"></div>
    </div>
</template>

<script>
  import EditorJS from '@editorjs/editorjs';
  import Header from '@editorjs/header';
  import List from '@editorjs/list';


  export default {
    name: "Editor",
    data() {
      return {
        editor: null
      }
    },
    mounted() {
      this.editor = new EditorJS({
        holder: 'editorjs',
        tools: {
          header: Header,
          list: List
        },
        minHeight: 0
      });
    },
    methods: {
      getData() {
        this.editor.save().then((outputData) => {
          console.log('Article data: ', outputData)
        }).catch((error) => {
          console.log('Saving failed: ', error)
        });
      }
    },
    beforeUnmount(){
      this.editor.destroy();
    },
  }
</script>