<template>
    <div id="app">
        <div>
            <div v-if="isUserLoggedIn === true">
                <header>
                    <nav class="navbar navbar-expand-sm navbar-light navbar-toggleable-sm bg-white border-bottom box-shadow mb-3">
                        <div class="container">
                            <a
                                class="navbar-brand"
                                href="/"
                            >Vera.CMS</a>
                            <button
                                class="navbar-toggler"
                                type="button"
                                data-toggle="collapse"
                                data-target=".navbar-collapse"
                                aria-controls="navbarSupportedContent"
                                aria-expanded="false"
                                aria-label="Toggle navigation"
                            >
                                <span class="navbar-toggler-icon" />
                            </button>
                            <div class="navbar-collapse collapse d-sm-inline-flex flex-sm-row-reverse">
                                <b-navbar-nav class="ml-auto">
                                    <b-nav-item-dropdown right>
                                        <template
                                            v-if="currentUser"
                                            v-slot:button-content
                                        >
                                            <em>{{ currentUser.userName }}</em>
                                        </template>
                                        <b-dropdown-item @click="logout">
                                            Выход
                                        </b-dropdown-item>
                                    </b-nav-item-dropdown>
                                </b-navbar-nav>
                            </div>
                        </div>
                    </nav>
                </header>
                <section>
                    <div class="container">
                        <div class="row">
                            <div class="col-md-3">
                                <div>
                                    <b-nav
                                        pills
                                        vertical
                                    >
                                        <b-nav-item :to="{name: 'home'}">
                                            Главная
                                        </b-nav-item>
                                        <b-nav-item :to="{name: 'pages'}">
                                            Страницы
                                        </b-nav-item>
                                    </b-nav>
                                </div>
                            </div>
                            <div class="col-md-9">
                                <router-view />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <div v-else>
                <div class="container">
                    <Login />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
  import Login from './components/Login'
  export default {
    name: 'App',
    components:{
      Login
    },
    data() {
      return {
        userChecked: false,
      }
    },
    computed: {
      currentRouteName() {
        return this.$route.name;
      },
      currentUser () {
        return this.$store.state.authUser
      },
      isUserLoggedIn(){
        return this.userChecked === true && this.currentUser !== null
      },
      jwt(){
        return this.$store.state.jwt
      }
    },
    watch: {
      jwt(val){
        if (val !== null) {
          this.checkUser()
        }
      }
    },
    mounted() {
      this.checkUser();
    },
    methods: {
      logout () {
        this.$store.commit('removeToken')
        this.$store.commit(
          'setAuthUser',
          { authUser: null, isAuthenticated: false },
        )
      },
      checkUser () {
        this.$httpClient
          .get('/api/user/')
          .then((response) => {
            this.$store.commit(
              'setAuthUser',
              { authUser: response.data, isAuthenticated: true },
            )
            this.userChecked = true
          })
          .catch((error) => {
            if (error.response.status) {
              this.$store.commit(
                'setAuthUser',
                { authUser: null, isAuthenticated: false },
              )
            }
            this.userChecked = true
          })
      },
    }
  }
</script>
