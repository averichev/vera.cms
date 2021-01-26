<template>
    <div>
        <h1>Вход</h1>
        <b-form @submit="onSubmit">
            <b-form-group
                id="input-group-1"
                label="Логин"
                label-for="input-1"
            >
                <b-form-input
                    id="input-1"
                    v-model="form.username"
                    placeholder=""
                    required
                />
            </b-form-group>

            <b-form-group
                id="input-group-2"
                label="Пароль"
                label-for="input-2"
            >
                <b-form-input
                    id="input-2"
                    v-model="form.password"
                    type="password"
                    required
                />
            </b-form-group>

            <b-button
                type="submit"
                variant="primary"
            >
                Войти
            </b-button>
        </b-form>
    </div>
</template>

<script>
  export default {
    name: "Login",
    data () {
      return {
        form: {
          username: '',
          password: ''
        },
        userChecked: false,
      }
    },
    computed: {
      currentUser () {
        return this.$store.state.authUser
      },
      isUserLoggedIn(){
        return this.userChecked === true && this.currentUser !== null
      }
    },
    methods: {
      onSubmit (event) {
        event.preventDefault()
        this.$httpClient
          .post('/api/login', this.form)
          .then(r => {
            this.$store.commit('updateToken', r.data.token)
          })
      }
    }
  }
</script>
