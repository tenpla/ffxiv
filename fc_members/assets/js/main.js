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
    dc: null,
    fc_name: null,
    fc_tag: null,
    fc_slogan: null,
    fc_description: null,
    fc_members: [],
    member: [],
    c_result: [],
    profs: [],
    cj: [],
    c_id: null,
  },
  mounted() {
    var self = this;
    this.show = true;
    axios
      .post('https://xivapi.com/freecompany/' + fc_id + '?data=FCM')
      .then(json => {
        this.result = json;
        var fc = json.data.FreeCompany;
        var fc_members = json.data.FreeCompanyMembers;
          console.dir(fc);
          console.dir(fc_members);
          fc_url = 'https://jp.finalfantasyxiv.com/lodestone/freecompany/' + fc_id + '/';
        this.crest = '<a href="' + fc_url + '" target="fc">' + '<img src="' + fc.Crest[0] + '" class="crest">' + '<img src="' + fc.Crest[1] + '" class="crest">' + '<img src="' + fc.Crest[2] + '" class="crest">' + '</a>';
        this.server = fc.Server;
        this.dc = fc.DC;
        this.fc_name = fc.Name,
        this.fc_tag = fc.Tag;
        this.fc_slogan = fc.Slogan;
        this.fc_description = fc.ActiveMemberCount;
        this.fc_members = fc_members;
        // fc_membersの数だけ繰り返す。
        fc_members.forEach((member, i) => {
          console.log(member.ID)
          axios.post('https://xivapi.com/character/' + member.ID + '?data=CJ')
            // 個人データをc_jsonとして取得
            .then(c_json => {
              // その中のClassJobsをprofsに入れる。
              profs = c_json.data.Character;
              this.cj = profs.ClassJobs;
              this.c_id = profs.ID;
              console.log('name=' + profs.Name);
              member['class_job'] = profs.ClassJobs;
              console.dir(member);
            })
            .catch(error => console.log(error))
        });
        console.dir(fc_members);
      })
      .catch(error => console.log(error))
      .then(function () {
        self.show = false;
      });
  }
})
