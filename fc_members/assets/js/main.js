console.log('fc_id=' + fc_id);

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

//Vueのインスタンスの定義
new Vue({
  el: '#app',
  data: {
    show: false,
    result: null,
    crest: null,
    server: null
  },
  mounted() {
    var self = this;
    this.show = true;
    axios
      .post('https://xivapi.com/freecompany/' + fc_id + '?data=FCM')
      .then(json => {
        this.result = json,
          free_company = json.data.FreeCompany,
          free_companyMembers = json.data.FreeCompanyMembers,
          console.dir(free_company),
          console.dir(free_companyMembers),
          fc_url = 'https://jp.finalfantasyxiv.com/lodestone/freecompany/' + fc_id + '/';
        this.crest = '<a href="' + fc_url + '" target="fc">' + '<img src="' + free_company.Crest[0] + '" class="crest">' + '<img src="' + free_company.Crest[1] + '" class="crest">' + '<img src="' + free_company.Crest[2] + '" class="crest">' + '</a>',
          this.server = '<span class="stitle">ワールド:</span>' + free_company.Server + ' (' + free_company.DC + ')'
      })
      .catch(error => console.log(error))
      .then(function () {
        // self.show = false;
      });
  }
})
