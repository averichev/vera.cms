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
    props: {
      value: null
    },
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
        minHeight: 0,
        onChange: (r) => {
          console.log('Now I know that Editor\'s content changed!')
          r.saver.save().then((outputData) => {
            this.$emit('input', outputData);
          }).catch((error) => {
            console.log('Saving failed: ', error)
          });
        }
      });
    },
    methods: {
    },
    beforeUnmount(){
      this.editor.destroy();
    },
  }
</script>