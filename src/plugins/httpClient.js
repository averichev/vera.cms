import axios from 'axios'

function createAxiosInstance(){
  const baseUrl = process.env.VUE_APP_BASE_URL;
  let headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  const token = localStorage.getItem('vera.token');
  if (token) {
    headers.Authorization = 'Bearer '+ token
  }
  return axios.create({
    baseURL: baseUrl,
    headers: headers,
  })
}

function install(pVue) {
  if (install.installed) return;
  install.installed = true;
  const client = createAxiosInstance();
  pVue.prototype.$httpClient = {
    get(path){
      return client.get(path)
    },
    post(path, data){
      return client.post(path, data)
    }
  }
}

let plugin = {
  install: install
};
let GlobalVue = null;
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue;
}
if (GlobalVue) {
  GlobalVue.use(plugin);
}

export {install};
export default plugin;
