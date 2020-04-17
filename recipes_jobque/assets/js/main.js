// loading
Vue.component('v-loading', {
  props: {
    text: {
      default: 'Loading...',
      type: String
    },
    show: {
      default: false,
      type: Boolean
    }
  },
  template: '<div v-if="show" class="wrapper loading_wrapper"><div class="cluster"><div class="loading"></div><span v-text="text"></span></div></div>'
});

// Pagenation
Vue.component('paginate', VuejsPaginate);

//Vueのインスタンスの定義
new Vue({
  el: '#app',
  data: {
    show: false,
    result: null,
    page: null,
    length: null
  },
  mounted() {
    var self = this;
    this.show = true;
    axios
      // .post('https://xivapi.com/Recipe?language=ja')
      .post('https://xivapi.com/Item/106?language=ja')
      .then(json => {
        console.dir(json);
        this.result = json;
        this.page = json['data']['Pagination']['Page'];
        this.length = json['data']['Pagination']['PageTotal'];
      })
      .catch(error => console.log(error))
      .then(function () {
        self.show = false;
      });
  }
})
