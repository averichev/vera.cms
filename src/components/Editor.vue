<template>
    <div>
        <div id="editorjs" />
    </div>
</template>

<script>
  import EditorJS from '@editorjs/editorjs'
  import Header from '@editorjs/header'
  import List from '@editorjs/list'
  import CodeBox from '@bomdi/codebox'
  import InlineCode from '@editorjs/inline-code'
  import RawTool from '@editorjs/raw'

  export default {
    name: 'Editor',
    props: {
      value: {
        type: Object,
        default: function (){
          return {}
        }
      }
    },
    data () {
      return {
        editor: null,
        editorIsReady: false
      }
    },
    computed: {
      editorIsReadyRender(){
        return this.editorIsReady && this.value!==null
      }
    },
    watch: {
      editorIsReadyRender(data){
        if (data === true) {
          this.editor.render(this.value)
        }
      }
    },
    mounted () {
      if (this.editor !== null) {
        this.editor.destroy()
      }
      this.initEditor();
    },
    methods: {
      initEditor(){
        this.editor = new EditorJS({
          holder: 'editorjs',
          tools: this.editorTools(),
          onChange: (r) => {
            r.saver.save().then((outputData) => {
              this.$emit('input', outputData)
            }).catch((error) => {
              console.log('Saving failed: ', error)
            })
          },
          onReady: () => {
            this.editorIsReady = true
          }
        })
      },
      editorTools(){
        return {
          header: Header,
          list: List,
          codeBox: {
            class: CodeBox,
            config: {
              themeURL: 'https://unpkg.com/@highlightjs/cdn-assets@10.6.0/styles/darcula.min.css',
              themeName: 'darcula',
              useDefaultTheme: 'darcula'
            }
          },
          inlineCode: {
            class: InlineCode,
            shortcut: 'CMD+SHIFT+M',
          },
          raw: RawTool,
        }
      }
    }
  }
</script>
