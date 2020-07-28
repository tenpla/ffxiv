// loading
// Vue.component('v-loading', {
//   props: {
//     text: {
//       default: 'Loading...',
//       type: String
//     },
//     show: {
//       default: false,
//       type: Boolean
//     }
//   },
//   template: `
//   <div v-if="show" class="wrapper loading_wrapper">
//     <div class="cluster">
//       <div class="loading"></div>
//       <span v-text="text"></span>
//     </div>
//   </div>`
// });

//Vueのインスタンスの定義
// new Vue({
//   el: '#app',
//   data: {
//     members: [{ id: 29173511, name: `Ten Pla` }],
//     member: [],
//     profs: [],
//     cj: [],
//     c_id: null,
//   },
//   name: 29173510
//   ,
//   mounted() {
//     var self = this;
//     this.show = true;
//     axios
//       this.members = members;
//       // membersの数だけ繰り返す。
//       members.forEach((member, i) => {
//         console.log(member.ID)
//         axios.post('https://xivapi.com/character/' + member.ID + '?data=CJ')
//           // 個人データをc_jsonとして取得
//           .then(c_json => {
//             // その中のClassJobsをprofsに入れる。
//             profs = c_json.data.Character;
//             this.cj = profs.ClassJobs;
//             this.c_id = profs.ID;
//             console.log('name=' + profs.Name);
//             member['class_job'] = profs.ClassJobs;
//             console.dir(member);
//           })
//           .catch(error => console.log(error))
//       });
//       console.dir(members);
//   }
// })


// import VueLocalStorage from 'vue-localstorage'

// Vue.use(VueLocalStorage)

var app = new Vue({
  el: "#app",
  data: {
    members: [{
      id: 29173510,
      name: `Ten Pla`
    },
    {
      id: 25658724,
      name: `Indigo Cat`
    },
    {
      id: 29367989,
      name: `Yumeko`
    }
    ],
    id: 29369012,
    name: '取得中'
  },
  methods: {
    addItem() {
      var max = this.members.reduce(function (a, b) {
        return a > b.id ? a : b.id
      }, 0)
      this.members.push({
        id: max + 1,
        name: this.name
      })
      console.dir(this.members);
    },
    removeItem(index) {
      this.members.splice(index, 1)
      console.dir(this.members);
    }
  }
});

// mounted() {
//   var self = this;
//   this.show = true;
//   axios
//     this.members = members;
//     // membersの数だけ繰り返す。
//     members.forEach((member, i) => {
//       console.log(member.ID)
//       axios.post('https://xivapi.com/character/' + member.ID + '?data=CJ')
//         // 個人データをc_jsonとして取得
//         .then(c_json => {
//           // その中のClassJobsをprofsに入れる。
//           profs = c_json.data.Character;
//           this.cj = profs.ClassJobs;
//           this.c_id = profs.ID;
//           console.log('name=' + profs.Name);
//           member['class_job'] = profs.ClassJobs;
//           console.dir(member);
//         })
//         .catch(error => console.log(error))
//     });
//     console.dir(members);
// }
Vue.component('price', {
    data: function () {
        return {
            items: []
        }
    },
    mounted: function ()  {
        var self = this;
        axios
            .get('data.json')
                .then(function (res) {
                    self.items = res.data;
                });
    },
  template: `<table>
      <tr v-for="item in items">
        <td>{{ item.title }}</td><td>{{ item.price }}</td>
      </tr>
      </table>`
});