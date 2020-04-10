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
    server: null,
    fc_name: null,
    fc_tag: null,
    fc_slogan: null,
    fc_description: null,
    fc_members: null
  },
  mounted() {
    var self = this;
    this.show = true;
    axios
      .post('https://xivapi.com/freecompany/' + fc_id + '?data=FCM')
      .then(json => {
        this.result = json,
          fc = json.data.FreeCompany,
          fc_members = json.data.FreeCompanyMembers,
          console.dir(fc),
          console.dir(fc_members),
          fc_url = 'https://jp.finalfantasyxiv.com/lodestone/freecompany/' + fc_id + '/';
        this.crest = '<a href="' + fc_url + '" target="fc">' + '<img src="' + fc.Crest[0] + '" class="crest">' + '<img src="' + fc.Crest[1] + '" class="crest">' + '<img src="' + fc.Crest[2] + '" class="crest">' + '</a>',
          this.server = '<span class="stitle">ワールド:</span>' + fc.Server + ' (' + fc.DC + ')',
          this.fc_name = fc.Name,
          this.fc_tag = '[' + fc.Tag + ']',
          this.fc_slogan = fc.Slogan,
          this.fc_description = '<span class="stitle">メンバー数:</span><span id="fc_member_count">' + fc.ActiveMemberCount + '人</span>',
          this.fc_members = fc_members
      })
      .catch(error => console.log(error))
      .then(function () {
        self.show = false;
      });
  }
})
